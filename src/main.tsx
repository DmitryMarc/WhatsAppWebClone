import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App' 
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/model/appStore'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
