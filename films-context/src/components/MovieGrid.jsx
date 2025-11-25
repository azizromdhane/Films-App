
import React from 'react';
import MovieCard from './MovieCard';
export default function MovieGrid({movies,favs,toggleFav}){
  if(!movies) return <div className="loading">Chargement...</div>;
  return (
    <div className="grid">
      {movies.map(m=>(
        <MovieCard key={m.id} movie={m} isFav={favs.includes(m.id)} toggleFav={toggleFav} />
      ))}
    </div>
  );
}
