import React, { useEffect, useRef, useState } from 'react';
import { excluirObra, listarGeneros, listarObras, salvarObra } from './api.js';

function FormularioObra({ obra, generos, ocupado, onSalvar, onCancelar }) {
  return (
    <form className="painel" onSubmit={(event) => {
      event.preventDefault();
      const dados = new FormData(event.currentTarget);
      if (!dados.get('imagem').size) dados.delete('imagem');
      onSalvar(obra?.id, dados);
    }}>
      <h2>{obra ? 'Editar obra' : 'Adicionar obra'}</h2>
      <label>Título <input name="titulo" defaultValue={obra?.titulo} maxLength={200} required /></label>
      <label>Data <input name="date" type="date" defaultValue={obra?.date || ''} /></label>
      <div className="campo">
        <label htmlFor="obra-genero">Gênero</label>
        <select id="obra-genero" name="genero" defaultValue={obra?.genero || ''} required>
          <option value="">Selecione</option>
          {generos.map((genero) => <option key={genero.id} value={genero.id}>{genero.nome}</option>)}
        </select>
      </div>
      <label>Imagem <input name="imagem" type="file" accept="image/*" required={!obra} /></label>
      <div className="acoes">
        <button disabled={ocupado || !generos.length}>Salvar</button>
        <button type="button" disabled={ocupado} onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}

export function App() {
  const [generos, setGeneros] = useState([]);
  const [genero, setGenero] = useState('');
  const [obras, setObras] = useState([]);
  const [selecao, setSelecao] = useState(null);
  const [edicao, setEdicao] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [ocupado, setOcupado] = useState(false);
  const [revisao, setRevisao] = useState(0);
  const dialogo = useRef(null);

  useEffect(() => {
    const controle = new AbortController();
    listarGeneros(controle.signal).then(setGeneros).catch((erro) => {
      if (!controle.signal.aborted) setErro(erro.message);
    });
    return () => controle.abort();
  }, []);

  useEffect(() => {
    const controle = new AbortController();
    setCarregando(true);
    listarObras(genero, controle.signal).then(setObras).catch((erro) => {
      if (!controle.signal.aborted) {
        setObras([]);
        setErro(erro.message);
      }
    }).finally(() => {
      if (!controle.signal.aborted) setCarregando(false);
    });
    return () => controle.abort();
  }, [genero, revisao]);

  useEffect(() => {
    const elemento = dialogo.current;
    if (selecao && !elemento.open) elemento.showModal();
    if (!selecao && elemento.open) elemento.close();
  }, [selecao]);

  async function alterarObra(operacao) {
    setOcupado(true);
    setErro('');
    try {
      await operacao();
      setEdicao(null);
      setSelecao(null);
      setRevisao((valor) => valor + 1);
    } catch (erro) {
      setErro(erro.message);
    } finally {
      setOcupado(false);
    }
  }

  return (
    <>
      <header>
        <h1>Galeria Vincent Van Gogh</h1>
        <button onClick={() => { setErro(''); setEdicao({}); }}>Adicionar obra</button>
      </header>
      <main>
        {erro && <p role="alert">{erro}</p>}
        {edicao && (
          <>
            <FormularioObra key={edicao.id || 'nova'} obra={edicao.id ? edicao : null}
              generos={generos} ocupado={ocupado}
              onSalvar={(id, dados) => alterarObra(() => salvarObra(id, dados))}
              onCancelar={() => setEdicao(null)} />
            {!generos.length && <p>Cadastre um gênero no painel administrativo para adicionar obras.</p>}
          </>
        )}
        <h2>Obras</h2>
        <div className="filtro">
          <label htmlFor="filtro-genero">Filtrar por gênero</label>
          <select id="filtro-genero" value={genero} onChange={(event) => { setErro(''); setGenero(event.target.value); }}>
            <option value="">Todos</option>
            {generos.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
          </select>
        </div>
        {carregando ? <p role="status">Carregando obras…</p> : (
          <div className="galeria">
            {!obras.length && !erro && <p>Nenhuma obra cadastrada.</p>}
            {obras.map((obra) => (
              <button className="item" key={obra.id} onClick={() => { setErro(''); setSelecao(obra); }}>
                {obra.imagem_url && <img className="hover-img" src={obra.imagem_url} alt="" />}
                <strong>{obra.titulo}</strong>
                <small>{[obra.genero_nome, obra.date?.slice(0, 4)].filter(Boolean).join(' · ')}</small>
              </button>
            ))}
          </div>
        )}
      </main>
      <dialog ref={dialogo} onClose={() => setSelecao(null)}>
        {selecao && (
          <>
            <h2>{selecao.titulo}</h2>
            {selecao.imagem_url && <img className="obra-ampliada" src={selecao.imagem_url} alt={selecao.titulo} />}
            <p>{[selecao.genero_nome, selecao.date].filter(Boolean).join(' · ')}</p>
            {erro && <p role="alert">{erro}</p>}
            <div className="acoes">
              <button disabled={ocupado} onClick={() => { setEdicao(selecao); setSelecao(null); }}>Editar</button>
              <button disabled={ocupado} onClick={() => {
                if (window.confirm('Excluir “' + selecao.titulo + '”?')) {
                  alterarObra(() => excluirObra(selecao.id));
                }
              }}>Excluir</button>
              <button disabled={ocupado} onClick={() => setSelecao(null)}>Fechar</button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
