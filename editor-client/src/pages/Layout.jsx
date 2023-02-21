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

    return (<>
        <nav className="min-h-[10vh] flex px-5 items-center justify-center">
            {!loggedIn && <h1 className="">Thorben's Blog</h1>}
            {loggedIn && <>
                <ul className="flex flex-row gap-3">
                    <li className="border p-2 rounded">
                        <Link className="" to='/'>Dashboard</Link>
                    </li>
                    <li className="border p-2 rounded">
                        <Link className="" to='/new-post'>New post</Link>
                    </li>
                    <li className="border p-2 rounded bg-red-500 text-white">
                        <button className="" onClick={onLogoutClick}>Log out</button>
                    </li>
                </ul>
            </>}
        </nav>
        <Outlet />
    </>
  )
};

export default Layout;
