import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Headers/Header'
import Dashboard from './view/Dashboard'
import ListItem from './view/ListItem'

function App() {

  return (
    <>
      <Header />
      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/list-item/:id' element={<ListItem />} />
      </Routes>
    </>
  )
}

export default App
