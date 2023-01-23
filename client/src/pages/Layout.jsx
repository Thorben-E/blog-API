import React from "react"
import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
        <nav className="navbar navbar-light bg-light">
            <ul className="navbar-nav navbar-brand">
                <li className="nav-item">
                    <Link className="nav-link" to='/'><h1>Blog</h1></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link> 
                </li>
            </ul>
        </nav>

        <Outlet />
    </>
  )
};

export default Layout;
