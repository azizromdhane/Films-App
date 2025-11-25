
import React from 'react';
export default function FavoritesSidebar({items,toggleFav}){
  return (
    <aside className="favorites-sidebar">
      <h2>Favoris ({items.length})</h2>
      {items.length===0 ? <p style={{color:'#9ca3af'}}>Aucun favori</p> : items.map(m=>(
        <div className="favorite-item" key={m.id}>
          <img src={m.poster_path ? `https://image.tmdb.org/t/p/w92${m.poster_path}` : ''} alt={m.title} width="40" />
          <span>{m.title}</span>
          <button style={{marginLeft:'auto'}} onClick={()=>toggleFav(m.id)}>✖</button>
        </div>
      ))}
    </aside>
  );
}
