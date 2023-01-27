import React from "react"
import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
    
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand mx-2">Thorben's Blog</a>
                <div className="mx-2" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Home</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />
    </>
  )
};

export default Layout;
