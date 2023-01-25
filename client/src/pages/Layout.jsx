import React from "react"
import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
    const openNav = () => {
        const x = document.getElementById('navbarNav')
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    } 
    
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand">yourBlog</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" onClick={openNav}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/login'>Login</Link> 
                        </li>
                    </ul>
                </div>
            </nav>

            <Outlet />
    </>
  )
};

export default Layout;
