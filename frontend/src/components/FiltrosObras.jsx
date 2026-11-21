import React, { useId } from 'react';
import { ListFilter, Search, X } from 'lucide-react';
import './FiltrosObras.css';

export function FiltrosObras({ busca, genero, generos, onBusca, onGenero, onLimpar }) {
  const buscaId = useId();
  const generoId = useId();

  return (
    <div className="ui-superficie filtros-obras" role="search" aria-label="Buscar e filtrar obras">
      <div className="filtros-obras-campo">
        <label htmlFor={buscaId}>
          <Search className="ui-icone" aria-hidden="true" /> Buscar por título
        </label>
        <input className="ui-campo" id={buscaId} type="search" value={busca}
          onChange={(evento) => onBusca(evento.target.value)} />
      </div>
      <div className="filtros-obras-campo">
        <label htmlFor={generoId}>
          <ListFilter className="ui-icone" aria-hidden="true" /> Filtrar por gênero
        </label>
        <select className="ui-campo" id={generoId} value={genero} onChange={(evento) => onGenero(evento.target.value)}>
          <option value="">Todos</option>
          {generos.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
        </select>
      </div>
      {(busca || genero) && (
        <button className="ui-botao" type="button" onClick={onLimpar}>
          <X className="ui-icone" aria-hidden="true" /> Limpar filtros
        </button>
      )}
    </div>
  );
}
