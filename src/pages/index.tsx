import React from 'react'
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import Home from './home'

const Container = styled.section`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`

const Pages = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Container>
  )
}

export default Pages
