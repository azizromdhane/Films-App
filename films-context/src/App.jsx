
import React, {createContext, useContext, useEffect, useState} from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import FavoritesSidebar from './components/FavoritesSidebar';
import './styles/styles.css';
const API = 'https://api.themoviedb.org/3/movie/popular';
const KEY = process.env.REACT_APP_TMDB_API_KEY || '';
const Genres = ['All','Action','Comedy','Drama'];

const MoviesContext = createContext();
export const useMovies = ()=>useContext(MoviesContext);

function MoviesProvider({children}){
  const [movies,setMovies]=useState([]);
  const [favs,setFavs]=useState([]);
  const [filter,setFilter]=useState('All');
  const [query,setQuery]=useState('');
  const [loading,setLoading]=useState(false);

  useEffect(()=>{ fetchMovies(); },[]);
  async function fetchMovies(){
    setLoading(true);
    const res = await fetch(`${API}?api_key=${KEY}&language=fr-FR&page=1`);
    const data = await res.json();
    setMovies(data.results || []);
    setLoading(false);
  }
  const toggleFav = id => setFavs(prev=> prev.includes(id)? prev.filter(x=>x!==id) : [...prev,id]);

  const getFiltered = ()=>{
    let out = movies;
    if(query) out = out.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()));
    // genre filtering simplified (TMDB returns genre_ids) - omitted detailed mapping for brevity
    return out;
  };

  return <MoviesContext.Provider value={{movies,getFiltered,favs,toggleFav,filter,setFilter,query,setQuery,loading}}>
    {children}
  </MoviesContext.Provider>
}

export default function App(){
  return (
    <div className="app">
      <MoviesProvider>
        <InnerApp />
      </MoviesProvider>
    </div>
  );
}

function InnerApp(){
  const {movies,getFiltered,favs,toggleFav,filter,setFilter,query,setQuery,loading} = useMovies();
  const favItems = movies.filter(m=>favs.includes(m.id));
  return (
    <>
      <Header count={favs.length} />
      <div className="main-container">
        <div>
          <FilterBar genres={['All','Action','Comedy','Drama']} active={filter} onSetActive={setFilter} query={query} onQuery={setQuery} />
          <MovieGrid movies={getFiltered()} favs={favs} toggleFav={toggleFav} />
        </div>
        <FavoritesSidebar items={favItems} toggleFav={toggleFav}/>
      </div>
    </>
  );
}
