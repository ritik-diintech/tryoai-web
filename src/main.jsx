import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { PreloaderProvider } from './context/PreloaderContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PreloaderProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PreloaderProvider>
  </React.StrictMode>,
)
