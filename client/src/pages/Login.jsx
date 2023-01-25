import React from "react"

const Login = (props) => {
  return (
    <form action={`${import.meta.env.VITE_SERVER_URL}/api/login`} method="POST">
      <label className="form-label" htmlFor="username">Username</label>
      <input className="form-control" type="text" name="username" id="username" />
      <label className="form-label" htmlFor="Password">Password</label>
      <input className="form-control" type="password" name="password" id="password" />
      <button type="submit" className="btn btn-primary mt-3">Login</button>
    </form>
  )
};

export default Login;
