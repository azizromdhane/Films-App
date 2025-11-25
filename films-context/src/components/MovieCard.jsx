
import React from 'react';
export default function MovieCard({movie,isFav,toggleFav}){
  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';
  return (
    <div className="card">
      <button className="like-btn" onClick={e=>{e.stopPropagation(); toggleFav(movie.id)}}>
        {isFav ? '★' : '☆'}
      </button>
      {poster && <img src={poster} alt={movie.title} />}
      <div className="info">
        <div className="title">{movie.title}</div>
        <div className="meta">{movie.release_date || 'N/A'} • {movie.vote_average}</div>
      </div>
    </div>
  );
}
