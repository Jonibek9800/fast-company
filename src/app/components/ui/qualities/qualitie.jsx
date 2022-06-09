import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ quality }) => {
    console.log(quality);
    return (
        quality.map(qual => {
            return (
                <span className={`badge bg-${qual.color} m-1`} key={qual._id}>
                    {qual.name}
                </span >
            );
        })
    );
};
Qualities.propTypes = {
    quality: PropTypes.array
};

export default Qualities;
