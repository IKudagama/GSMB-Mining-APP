import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { LangProvider } from './context/LangContext.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </LangProvider>
    </BrowserRouter>
  </React.StrictMode>
)
