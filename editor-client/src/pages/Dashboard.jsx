import React from "react"
import { useState, useEffect  } from "react";

const Dashboard = ({ loggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/authTest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => console.log(data))
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
      whatup
    </div>
  )
};

export default Dashboard;
