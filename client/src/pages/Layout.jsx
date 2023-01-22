import React from "react"
import { Link, Outlet } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <form className="login-form" action="http://localhost:5000/api/login" method="POST">
                        <input type="text" name="username" id="username" placeholder="username" />
                        <input type="password" name="password" id="password" placeholder="password" />
                        <button type="submit">login</button>
                    </form>
                </li>
            </ul>
        </nav>

        <Outlet />
    </>
  )
};

export default Layout;
