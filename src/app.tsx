import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Pages from './pages'
import GlobalStyle from './global-style'

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Pages />
    </BrowserRouter>
  )
}

export default App
