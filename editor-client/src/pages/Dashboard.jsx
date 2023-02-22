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
        return <Postpreview key={i} title={post.title} user={post.user} img={post.img} date={post.date} postid={post._id} />
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
    <main className="container flex min-h-[90vh] justify-center">
      {!loggedIn && <>
        <form onSubmit={(e) => onFormSubmit(e)} className="flex flex-col gap-2 border p-5 rounded h-fit mt-[20vh]">
          <label htmlFor="username" className="">Username</label>
          <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} id="username" className="border border-black rounded px-2 py-1" required />
          <label htmlFor="password" className="">Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" className="border border-black rounded px-2 py-1" required />
          <button type="submit" className='bg-zinc-700 hover:bg-zinc-800 rounded text-white p-1'>Login</button>
        </form>
      </>}
      {loggedIn && <section className="flex flex-col gap-2 mt-2">
      <h1 className="text-xl text-center">Welcome back editor!</h1>
        {posts}
      </section>}
    </main>
  )
};

export default Dashboard;
