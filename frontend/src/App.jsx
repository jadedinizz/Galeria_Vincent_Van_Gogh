import React, { useEffect, useRef, useState } from 'react';
import { ImagePlus, Pencil, Trash2, X } from 'lucide-react';
import { CardObra } from './components/CardObra.jsx';
import { FiltrosObras } from './components/FiltrosObras.jsx';
import { ModalObra } from './components/ModalObra.jsx';
import { excluirObra, listarGeneros, listarObras, salvarObra } from './api.js';

function normalizarTitulo(texto) {
  return texto.normalize('NFD').replace(/\p{M}/gu, '').toLocaleLowerCase('pt-BR');
}

export function App() {
  const [generos, setGeneros] = useState([]);
  const [genero, setGenero] = useState('');
  const [busca, setBusca] = useState('');
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

  const termo = normalizarTitulo(busca.trim());
  const obrasVisiveis = obras.filter((obra) => normalizarTitulo(obra.titulo).includes(termo));

  return (
    <>
      <header>
        <h1>Galeria Vincent Van Gogh</h1>
        <button className="ui-botao" type="button" aria-haspopup="dialog" onClick={() => { setErro(''); setEdicao({}); }}>
          <ImagePlus className="ui-icone" aria-hidden="true" /> Adicionar obra
        </button>
      </header>
      <main>
        {erro && !edicao && <p role="alert">{erro}</p>}
        <h2>Obras</h2>
        <FiltrosObras
          busca={busca}
          genero={genero}
          generos={generos}
          onBusca={setBusca}
          onGenero={(valor) => { setErro(''); setGenero(valor); }}
          onLimpar={() => {
            setBusca('');
            if (genero) {
              setErro('');
              setGenero('');
            }
          }}
        />
        {carregando ? <p role="status">Carregando obras…</p> : (
          <>
            {!obrasVisiveis.length && !erro && (
              <p role="status">{termo || genero ? 'Nenhuma obra encontrada.' : 'Nenhuma obra cadastrada.'}</p>
            )}
            <div className="galeria">
              {obrasVisiveis.map((obra) => (
                <CardObra key={obra.id} obra={obra} onAbrir={(item) => { setErro(''); setSelecao(item); }} />
              ))}
            </div>
          </>
        )}
      </main>
      {edicao && (
        <ModalObra
          key={edicao.id || 'nova'}
          obra={edicao.id ? edicao : null}
          generos={generos}
          ocupado={ocupado}
          erro={erro}
          onSalvar={(id, dados) => alterarObra(() => salvarObra(id, dados))}
          onFechar={() => { setErro(''); setEdicao(null); }}
        />
      )}
      <dialog ref={dialogo} className="ui-modal modal-detalhes" aria-labelledby="titulo-obra-detalhes" onClose={() => setSelecao(null)}>
        {selecao && (
          <>
            <h2 id="titulo-obra-detalhes">{selecao.titulo}</h2>
            {selecao.imagem_url && <img className="obra-ampliada" src={selecao.imagem_url} alt={selecao.titulo} />}
            <p>{[selecao.genero_nome, selecao.date].filter(Boolean).join(' · ')}</p>
            {erro && <p role="alert">{erro}</p>}
            <div className="acoes">
              <button className="ui-botao" type="button" disabled={ocupado} onClick={() => {
                dialogo.current.close();
                setErro('');
                setEdicao(selecao);
                setSelecao(null);
              }}>
                <Pencil className="ui-icone" aria-hidden="true" /> Editar
              </button>
              <button className="ui-botao ui-botao--secundario" type="button" disabled={ocupado} onClick={() => {
                if (window.confirm('Excluir “' + selecao.titulo + '”?')) {
                  alterarObra(() => excluirObra(selecao.id));
                }
              }}>
                <Trash2 className="ui-icone" aria-hidden="true" /> Excluir
              </button>
              <button className="ui-botao ui-botao--secundario" type="button" disabled={ocupado} onClick={() => setSelecao(null)}>
                <X className="ui-icone" aria-hidden="true" /> Fechar
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
