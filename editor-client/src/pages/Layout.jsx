import React from "react"
import { Link, Outlet } from "react-router-dom";

const Layout = ({ loggedIn, setLoggedIn }) => {
    const onNavClick = () => {
        let x = document.getElementById("navbarNav");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    }

    const onLogoutClick = () => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/logout`, {
            method: 'POST',
            credentials: "include"
        }).then(response => response.json())
          .then(data => console.log(data)) 
        setLoggedIn(false)
    }

    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand mx-2">Thorben's Blog</a>
                {loggedIn && <><button className="navbar-toggler mx-2" onClick={onNavClick} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="mx-2 collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to='/'>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/new-post'>New post</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={onLogoutClick}>Log out</button>
                        </li>
                    </ul>
                </div></>}
                
            </nav>
            
            <Outlet />
    </>
  )
};

export default Layout;
