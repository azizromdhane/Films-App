
import React, {useEffect} from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import FavoritesSidebar from './components/FavoritesSidebar';
import create from 'zustand';

const API = 'https://api.themoviedb.org/3/movie/popular';
const KEY = process.env.REACT_APP_TMDB_API_KEY || '';

const useStore = create((set,get)=>({
  items:[], favs:[], filter:'All', query:'', loading:false,
  fetchMovies: async ()=>{ set({loading:true}); const res=await fetch(`${API}?api_key=${KEY}&language=fr-FR&page=1`); const d=await res.json(); set({items:d.results||[],loading:false}) },
  toggleFav: (id)=> set(state=>({favs: state.favs.includes(id)? state.favs.filter(x=>x!==id): [...state.favs,id]})),
  setFilter: (f)=> set({filter:f}),
  setQuery: (q)=> set({query:q})
}));

export default function App(){
  return <div className="app"><InnerApp/></div>;
}

function InnerApp(){
  const {items,favs,filter,query,loading,fetchMovies,toggleFav,setFilter,setQuery} = useStore();
  useEffect(()=>{ fetchMovies() },[]);
  const getFiltered = ()=>{
    let out = items;
    if(query) out = out.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()));
    return out;
  };
  const favItems = items.filter(m=>favs.includes(m.id));
  return (
    <>
      <Header count={favs.length}/>
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
