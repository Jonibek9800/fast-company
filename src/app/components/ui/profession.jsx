import React from "react";
import PropTypes from "prop-types";
import Spiner from "../common/Spiner";
import { useSelector } from "react-redux";
import { getProfessionsById, getProfessionsLoadingStatus } from "../../store/professions";

const Profession = ({ id }) => {
    const professionLoading = useSelector(getProfessionsLoadingStatus());
    const profession = useSelector(getProfessionsById(id));
    if (!professionLoading) {
        return <p>{profession.name}</p>;
    } else {
        return <Spiner />;
    }
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
