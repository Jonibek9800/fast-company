import React from "react";
import Qualities from "./qualitie";
import PropTypes from "prop-types";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ id }) => {
    const { isLoading, getQualities } = useQuality();
    const qual = id.map(qual => getQualities(qual));
    if (!isLoading) {
        return <Qualities quality={qual} />;
    } else {
        return "loadding...";
    }
};
QualitiesList.propTypes = {
    id: PropTypes.array
};

export default QualitiesList;
