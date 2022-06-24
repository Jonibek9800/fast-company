import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageServise, { setTokens } from "../services/localStoreg.service";
import Spiner from "../components/common/Spiner";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create();
const AuthContext = React.createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
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
    function logOut() {
        localStorageServise.removeAuthData();
        setUser(null);
        history.push("/");
    }
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest,
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`
            });
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(error);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObjekt = { email: "Пользователь с таким Email уже существует" };
                    throw errorObjekt;
                }
            }
        }
    };
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    };
    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (localStorageServise.getAccessToken()) {
            getUserData();
        } else {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
            console.log(content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    async function updateUser(id, content) {
        try {
            await userService.update(id, content);
        } catch (error) {
            errorCatcher(error);
        }
    }
    return (
        <AuthContext.Provider value={{ signIn, signUp, logOut, currentUser, updateUser }}>
            {!isLoading ? children : <Spiner />}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.arrayOf(PropTypes.node),
        PropTypes.node])
};

export default AuthProvider;
