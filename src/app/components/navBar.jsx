import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link className="nav-link" to="/Main">Main</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/Users">Users</Link>
            </li>
        </ul>
    );
};

export default NavBar;
