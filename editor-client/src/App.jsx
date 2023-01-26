import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Post from "./pages/Post";
import NoPage from './pages/NoPage';
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout loggedIn={loggedIn} />}>
          <Route index element={<Dashboard loggedIn={loggedIn} />} />
          <Route path='/new-post' element={<Post />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
