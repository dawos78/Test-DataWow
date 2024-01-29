import React from 'react'
import { store } from './state/store.ts'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './views/App.tsx'
import './assets/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={ store }> 
    <App />
    </Provider>
  </React.StrictMode>,
)
