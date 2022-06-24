import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";
const NavBar = () => {
    const { currentUser } = useAuth();
    console.log(currentUser);
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/Main">Main</Link>
                    </li>
                    {currentUser && <li className="nav-item">
                        <Link className="nav-link" to="/Users">Users</Link>
                    </li>}
                </ul>
                <div className="d-flex">
                    {currentUser ? <NavProfile /> : <Link className="nav-link" to="/Login">Login</Link>}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
