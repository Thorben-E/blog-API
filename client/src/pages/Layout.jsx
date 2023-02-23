import React from "react"
import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
    
    return (
        <>
            <nav className="h-[10vh] flex items-center justify-center">
                <h1 className="text-3xl">Thorben's Blog</h1>
            </nav>
            <Outlet />
    </>
  )
};

export default Layout;
