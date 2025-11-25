
import React from 'react';
export default function FilterBar({genres,active,onSetActive,query,onQuery}) {
  return (
    <div className="controls">
      <input className="search" placeholder="Rechercher un titre..." value={query} onChange={e=>onQuery(e.target.value)} />
      {genres.map(g=>(
        <button key={g} className={'filter-btn '+(active===g?'active':'')} onClick={()=>onSetActive(g)}>{g}</button>
      ))}
    </div>
  );
}
