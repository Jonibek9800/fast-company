import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const LinkUsername = ({ id, name }) => {
    return <>
        <Link to={`Users/${id}`}>{name}</Link>
    </>;
};
LinkUsername.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string
};

export default LinkUsername;
