import React from "react"
import { useState, useEffect  } from "react";
import Postpreview from './Postpreview'

const Dashboard = ({ loggedIn, setLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data.map((post, i) => {
        return <Postpreview key={i} title={post.title} user={post.user} date={post.date} postid={post._id} />
      })))
  }, [])

  const onFormSubmit = async (e) => {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ username, password })
    }).then(response => response.json())
      .then(data => {
        if (typeof data === 'object') {
          localStorage.setItem('token', data[0])
          setLoggedIn(true)
        }
    })
  }

  return (
    <main className="">
      {!loggedIn && <>
      <p>Please log in to create, edit and delete your blog data</p>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <label htmlFor="username" className="">Username</label>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} id="username" className="" required />
        <label htmlFor="password" className="">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" className="" required />
        <button type="submit" className=''>Login</button>
      </form></>}
      {loggedIn && <section className="">
        {posts}
      </section>}
    </main>
  )
};

export default Dashboard;
