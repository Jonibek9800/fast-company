import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
    const { isLoading, getProfessions } = useProfession();
    const prof = getProfessions(id);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "ladding...";
    }
};
Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
