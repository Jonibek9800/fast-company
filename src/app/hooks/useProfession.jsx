import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionService from "../services/profession.service";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [professions, setProfession] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        toast(error);
        setError(null);
    }, [error]);
    useEffect(() => { getProfessionsList(); }, []);
    function errorCatcher(error) {
        const { message } = error.responce.data;
        // setError(message);
        console.log(message);
    };
    async function getProfessionsList() {
        try {
            const { content } = await professionService.get();
            setProfession(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    const getProfessions = (id) => {
        return professions.find(p => p._id === id);
    };
    return (
        <ProfessionContext.Provider value={{ isLoading, professions, getProfessions }}>
            {children}
        </ProfessionContext.Provider>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
};
