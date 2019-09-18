import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
// import Test from './Test'

import './styles.module.css'

ReactDOM.render(
  <App items={[{ id: 'asdf', value: 'Nice stuff', complete: null }]} />,
  // <Test />,
  document.getElementById('app')
)
