import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from 'react'
import { useState } from 'react'
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Post from "./pages/Post";
import NewPost from "./pages/NewPost";
import NoPage from './pages/NoPage';
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/checkAuth`, {
      method: 'POST',
      credentials: "include",
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.auth === true) {
          setLoggedIn(true)
        }
      })
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
          <Route index element={<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path='/post' element={<Post />} />
          <Route path='/new-post' element={<NewPost />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
