import axios from "axios";
import localStorageServise from "./localStoreg.service";

const httpAuth = axios.create();

const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post(registerUrl, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post(loginUrl, {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refreshToken: async () => {
        const { data } = await httpAuth.post("token", {
            grant_type: "refresh_token",
            refresh_token: localStorageServise.getRefreshToken()
        });
        return data;
    }
};

export default authService;
