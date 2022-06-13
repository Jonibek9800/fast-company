import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStoreg.service";

const httpIdenty = axios.create();
const IdentyContext = React.createContext();
export const useIdenty = () => {
    return useContext(IdentyContext);
};

const IdentyProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);
    async function signIn({ email, password }) {
        // const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`; // Не рабтает почемуто у меня env
        try {
            const { data } = await httpIdenty.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({ _id: data.localId, email });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            console.log(error);
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObjekt = { email: "Неверный email попробуйте еще раз" };
                    throw errorObjekt;
                }
                if (message === "INVALID_PASSWORD") {
                    const errorObjekt = { password: "Неверный пароль попробуйте еще раз" };
                    throw errorObjekt;
                }
            }
        }
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    };
    useEffect(() => {
        toast(error);
        setError(null);
    }, [error]);
    async function createUser(data) {
        try {
            const { content } = userService.create(data);
            setUser(content);
        } catch (error) {

        }
    }
    return (
        <IdentyContext.Provider value={{ signIn, currentUser }}>
            {children}
        </IdentyContext.Provider>
    );
};
IdentyProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
};

export default IdentyProvider;
