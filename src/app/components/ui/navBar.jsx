import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Main">Main</Link>
                    </li>
                    {isLoggedIn && <li className="nav-item">
                        <Link className="nav-link" to="/Users">Users</Link>
                    </li>}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? <NavProfile /> : <Link className="nav-link" to="/Login">Login</Link>}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
