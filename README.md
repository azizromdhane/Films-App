
# Projet Comparatif - Films App (Context | Redux Toolkit | Zustand)

## Usage rapide
1. Obtenir une clé TMDB et la placer dans un fichier `.env` à la racine de chaque projet :
   REACT_APP_TMDB_API_KEY=YOUR_TMDB_API_KEY

2. Installer et lancer (ex: Vite)
   npm install
   npm run dev

## Structure fournie
- /films-context : implémentation avec React Context
- /films-redux  : implémentation avec Redux Toolkit
- /films-zustand: implémentation avec Zustand
- /css          : styles communs

## Remarques
- Les projets utilisent l'API TMDB (endpoint /movie/popular) ; remplacez la clé.
- Les composants sont volontairement simples et commentés.
- Le README comparatif (dans chaque dossier) donne les différences clés entre les trois approches.
