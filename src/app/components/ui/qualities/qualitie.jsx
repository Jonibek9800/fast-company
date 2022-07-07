import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ quality }) => {
    return (
        <span className={`badge bg-${quality.color} m-1`} key={quality._id}>
            {quality.name}
        </span >
    );
};
Qualities.propTypes = {
    quality: PropTypes.object
};

export default Qualities;
