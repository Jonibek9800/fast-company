import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    // console.log(qualities);
    useEffect(() => { getQualytyList(); }, []);
    async function getQualytyList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };
    function getQualities(id) {
        return qualities.find(quality => quality._id === id);
    }
    function errorCatcher(error) {
        const { message } = error.response.data;
        // setError(message);
        console.log(message);
    };
    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQualities }}>
            {children}
        </QualityContext.Provider>
    );
};
QualityProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
};
