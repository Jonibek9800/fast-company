import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// import UserPage from "./userPage";
const UsersList = ({ name, id }) => {
    return <>
        <Link to={`Users/${id}`}>{name}</Link>
    </>;
};
UsersList.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    users: PropTypes.array
};

export default UsersList;
