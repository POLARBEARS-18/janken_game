import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { OptionsProvider } from 'context/optionsContext'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <OptionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </OptionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
