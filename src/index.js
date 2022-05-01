import React from 'react'
import ReactDOM from 'react-dom'
import App from './app/App'

import './auth/middleware'

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
