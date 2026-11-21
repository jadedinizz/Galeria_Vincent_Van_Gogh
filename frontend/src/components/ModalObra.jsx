import React, { useId, useLayoutEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';
import './ModalObra.css';

export function ModalObra({ obra, generos, ocupado, erro, onSalvar, onFechar }) {
  const dialogo = useRef(null);
  const tituloId = useId();
  const generoId = useId();

  useLayoutEffect(() => {
    const elemento = dialogo.current;
    elemento.showModal();
    return () => elemento.close();
  }, []);

  function salvar(evento) {
    evento.preventDefault();
    if (ocupado) return;

    const dados = new FormData(evento.currentTarget);
    if (!dados.get('imagem').size) dados.delete('imagem');
    onSalvar(obra?.id, dados);
  }

  return (
    <dialog
      ref={dialogo}
      className="ui-modal modal-obra"
      aria-labelledby={tituloId}
      onCancel={(evento) => {
        evento.preventDefault();
        if (!ocupado) onFechar();
      }}
    >
      <h2 id={tituloId}>{obra ? 'Editar obra' : 'Adicionar obra'}</h2>
      <form onSubmit={salvar} aria-busy={ocupado}>
        <fieldset disabled={ocupado}>
          <label>
            Título
            <input className="ui-campo" name="titulo" defaultValue={obra?.titulo} maxLength={200} required autoFocus />
          </label>
          <label>
            Data (opcional)
            <input className="ui-campo" name="date" type="date" defaultValue={obra?.date || ''} />
          </label>
          <div className="modal-obra-campo">
            <label htmlFor={generoId}>Gênero</label>
            <select className="ui-campo" id={generoId} name="genero" defaultValue={obra?.genero || ''} required>
              <option value="">Selecione</option>
              {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>{genero.nome}</option>
              ))}
            </select>
          </div>
          <label>
            {obra ? 'Nova imagem (opcional)' : 'Imagem'}
            <input className="ui-campo" name="imagem" type="file" accept="image/*" required={!obra} />
          </label>
        </fieldset>
        {!generos.length && <p>Cadastre um gênero no painel administrativo para adicionar obras.</p>}
        {erro && <p className="modal-obra-erro" role="alert">{erro}</p>}
        <div className="modal-obra-acoes">
          <button className="ui-botao ui-botao--secundario" type="button" onClick={onFechar} disabled={ocupado}>
            <X className="ui-icone" aria-hidden="true" /> Cancelar
          </button>
          <button className="ui-botao" type="submit" disabled={ocupado || !generos.length}>
            <Check className="ui-icone" aria-hidden="true" />
            {ocupado ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
      </form>
    </dialog>
  );
}
