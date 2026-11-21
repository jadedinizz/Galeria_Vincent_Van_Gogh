import React from 'react';
import { ImageOff } from 'lucide-react';
import './CardObra.css';

export function CardObra({ obra, onAbrir }) {
  const metadados = [obra.genero_nome, obra.date?.slice(0, 4)].filter(Boolean).join(' · ');

  return (
    <button className="ui-card card-obra" type="button" aria-haspopup="dialog" onClick={() => onAbrir(obra)}>
      {obra.imagem_url
        ? <img className="card-obra-imagem" src={obra.imagem_url} alt="" loading="lazy" />
        : <span className="card-obra-sem-imagem">
            <ImageOff className="ui-icone" aria-hidden="true" /> Sem imagem
          </span>}
      <strong>{obra.titulo}</strong>
      {metadados && <small>{metadados}</small>}
    </button>
  );
}
