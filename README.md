Comparatif : Context | Redux Toolkit | Zustand

Cette section explique les différences clés entre les trois méthodes de gestion d’état utilisées dans ce projet.

Critère	React Context	Redux Toolkit	Zustand
Concept	Fournit un contexte global pour partager le state via <Context.Provider>	Basé sur Redux : centralise tout le state dans un store avec slices et reducers	Store minimaliste basé sur hooks, très simple et direct
Complexité	Faible pour des projets petits à moyens. Peut devenir verbeux si beaucoup d’actions	Moyenne : plus de configuration mais scalable pour des projets grands	Très faible : moins de boilerplate et facile à utiliser
Boilerplate	Peu, mais nécessite des Providers et Hooks personnalisés	Moyen à élevé : nécessite store, slices, reducers, actions	Très faible : un seul store suffit souvent pour tout
Performance	Peut déclencher des rerenders inutiles si le contexte est grand	Optimisé grâce à Redux Toolkit et selectors	Optimisé : les composants ne rerendent que si le state utilisé change
Debugging / DevTools	DevTools limitées	Excellentes devtools intégrées pour Redux	DevTools optionnelles mais disponibles via plugin Zustand
Facilité d’apprentissage	Simple à comprendre pour les débutants	Moyenne : nécessite de comprendre Redux et Toolkit	Très simple et intuitif pour les hooks
Organisation	Dépend de comment les contexts sont organisés	Structure stricte avec slices, store et reducers	Flexible : tout peut rester dans un fichier ou séparé selon besoin
Exemple d’utilisation	<FilmContext.Provider value={state}>	dispatch(fetchFilms())	const films = useFilmsStore(state => state.films)
Observations

React Context : idéal pour des projets simples ou quand peu de composants partagent le state.

Redux Toolkit : recommandé pour des applications larges avec de nombreuses interactions complexes et besoin de DevTools.

Zustand : parfait pour un état global léger, moins verbeux et très rapide à mettre en place.

💡 Astuce pour l’utilisateur :
Tu peux lancer chaque sous-projet (films-context, films-redux, films-zustand) et observer le même résultat fonctionnel, mais la structure et la gestion du state diffèrent clairement. Cela permet de comparer facilement la lisibilité, le boilerplate et la scalabilité de chaque approche.