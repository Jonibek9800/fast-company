import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ _id, name, color }) => {
    return (
        <span className={`badge bg-${color} m-1`} key={_id}>
            {name}
        </span>
    );
};
Qualities.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Qualities;
