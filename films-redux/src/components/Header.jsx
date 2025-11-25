
import React from 'react';
export default function Header({count}){
  return (
    <header className="header">
      <h1>Films App — Comparatif</h1>
      <div className="likes-badge">{count} favori(s)</div>
    </header>
  );
}
