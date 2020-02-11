import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import './styles.module.css'

ReactDOM.render(
  <App items={[{ id: 'asdf', value: 'Nice stuff', complete: null }]} />,
  document.getElementById('app')
)
