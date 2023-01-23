import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from 'react';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Post from "./pages/Post";
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='post' element={<Post />} />
          <Route path='*' element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
