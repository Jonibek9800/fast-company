import React from "react";
import Qualities from "./qualitie";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (<>
        {qualities.map((quality) => (
            <Qualities {...quality} key={quality._id}/>
        ))}</>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
