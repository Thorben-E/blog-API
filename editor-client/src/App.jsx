import { useState } from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const onFormSubmit = async () => {
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then(response => {
      console.log(response)
    })
  }

  return (
    <div className="container">
      <h1 className=''>yourBlog</h1>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username" className="form-label">Username</label>
        <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} id="username" className="form-control" required />
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" required />
        <button type="submit" className='btn btn-primary mt-2'>Login</button>
      </form>
    </div>
  )
}

export default App
