import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { LangProvider } from './context/LangContext.jsx'
import ToastProvider from './components/ToastProvider.jsx'
import './styles.css'
import './index.css';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LangProvider>
        <AppProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AppProvider>
      </LangProvider>
      
    </BrowserRouter>
  </React.StrictMode>
)
