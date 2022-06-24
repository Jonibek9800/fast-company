import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";
import Spiner from "../common/Spiner";

const Profession = ({ id }) => {
    const { isLoading, getProfessions } = useProfession();
    const prof = getProfessions(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return <Spiner />;
    }
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
