import React from "react"

const Login = (props) => {
  return (
    <form action="/api/login" method="POST">
      <label className="form-label" htmlFor="username">Username</label>
      <input className="form-control" type="text" name="username" id="username" />
      <label className="form-label" htmlFor="Password">Password</label>
      <input className="form-control" type="password" name="password" id="password" />
    </form>
  )
};

export default Login;
