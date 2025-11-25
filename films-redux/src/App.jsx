
import React, {useEffect} from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import FavoritesSidebar from './components/FavoritesSidebar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = 'https://api.themoviedb.org/3/movie/popular';
const KEY = process.env.REACT_APP_TMDB_API_KEY || '';

export const fetchMovies = createAsyncThunk('movies/fetch', async ()=>{
  const res = await fetch(`${API}?api_key=${KEY}&language=fr-FR&page=1`);
  const data = await res.json();
  return data.results || [];
});

const moviesSlice = createSlice({
  name:'movies',
  initialState:{items:[],favs:[],filter:'All',query:'',loading:false},
  reducers:{
    toggleFav(state,action){
      const id=action.payload;
      state.favs = state.favs.includes(id) ? state.favs.filter(x=>x!==id) : [...state.favs,id];
    },
    setFilter(state,action){ state.filter = action.payload },
    setQuery(state,action){ state.query = action.payload }
  },
  extraReducers: builder => {
    builder.addCase(fetchMovies.pending, state=>{state.loading=true})
           .addCase(fetchMovies.fulfilled,(state,action)=>{state.items=action.payload;state.loading=false})
  }
});

const {toggleFav,setFilter,setQuery} = moviesSlice.actions;
const store = configureStore({reducer:{movies:moviesSlice.reducer}});

function InnerApp(){
  const dispatch = useDispatch();
  const {items,favs,filter,query,loading} = useSelector(s=>s.movies);
  useEffect(()=>{ dispatch(fetchMovies()) },[dispatch]);
  const getFiltered = ()=>{
    let out = items;
    if(query) out = out.filter(m=>m.title.toLowerCase().includes(query.toLowerCase()));
    return out;
  };
  const favItems = items.filter(m=>favs.includes(m.id));
  return (
    <>
      <Header count={favs.length} />
      <div className="main-container">
        <div>
          <FilterBar genres={['All','Action','Comedy','Drama']} active={filter} onSetActive={(g)=>dispatch(setFilter(g))} query={query} onQuery={(q)=>dispatch(setQuery(q))} />
          <MovieGrid movies={getFiltered()} favs={favs} toggleFav={(id)=>dispatch(toggleFav(id))} />
        </div>
        <FavoritesSidebar items={favItems} toggleFav={(id)=>dispatch(toggleFav(id))}/>
      </div>
    </>
  );
}

export default function App(){
  return <Provider store={store}><InnerApp/></Provider>;
}
