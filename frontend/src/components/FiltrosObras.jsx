import React, { useId } from 'react';
import './FiltrosObras.css';

export function FiltrosObras({ busca, genero, generos, onBusca, onGenero, onLimpar }) {
  const buscaId = useId();
  const generoId = useId();

  return (
    <div className="filtros-obras" role="search" aria-label="Buscar e filtrar obras">
      <div className="filtros-obras-campo">
        <label htmlFor={buscaId}>Buscar por título</label>
        <input id={buscaId} type="search" value={busca}
          onChange={(evento) => onBusca(evento.target.value)} />
      </div>
      <div className="filtros-obras-campo">
        <label htmlFor={generoId}>Filtrar por gênero</label>
        <select id={generoId} value={genero} onChange={(evento) => onGenero(evento.target.value)}>
          <option value="">Todos</option>
          {generos.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}
        </select>
      </div>
      {(busca || genero) && <button type="button" onClick={onLimpar}>Limpar filtros</button>}
    </div>
  );
}
