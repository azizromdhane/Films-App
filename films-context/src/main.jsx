import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'                 // <- pas ./src/App
import './styles/styles.css'            // <- pas ./src/styles/styles.css

createRoot(document.getElementById('root')).render(<App />)
