import React from "react"
import { useState, useEffect  } from "react";
import Postpreview from './Postpreview'

const Dashboard = ({ loggedIn }) => {
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
      .then(data => console.log(data))
  }

  return (
    <div className="container">
      {!loggedIn && <><h1 className=''></h1>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" required />
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" required />
        <button type="submit" className='btn btn-primary mt-2'>Login</button>
      </form></>}
      {posts}
    </div>
  )
};

export default Dashboard;
