import React from "react"
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";

const Layout = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate()
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
        navigate('/')
        localStorage.clear()
        setLoggedIn(false)
    }

    return (
        <>
            <nav className="">
                <a className="">Thorben's Blog</a>
                {loggedIn && <>
                <div className="" id="navbarNav">
                    <ul className="">
                        <li className="">
                            <Link className="" to='/'>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="" to='/new-post'>New post</Link>
                        </li>
                        <li className="">
                            <button className="" onClick={onLogoutClick}>Log out</button>
                        </li>
                    </ul>
                </div></>}
            </nav>
            <Outlet />
    </>
  )
};

export default Layout;
