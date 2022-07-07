import { createSlice, createAction } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageServise from "../services/localStoreg.service";
import userService from "../services/user.service";
import generateAuthError from "../utils/generateAuthError";
import randomInt from "../utils/getRandomInt";
import history from "../utils/history";

const initialState = localStorageServise.getAccessToken()
? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageServise.getUserId() },
    isLoggedIn: true,
    dataloaded: false
} : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataloaded: false
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataloaded = true;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFaild: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataloaded = false;
        },
        updateUser: (state, action) => {
            const newArray = [...state.entities];
            const indexUser = newArray.findIndex((user) => user._id === action.payload._id);
            newArray[indexUser] = action.payload;
            state.entities = [...newArray];
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceved,
    usersRequestFiled,
    authRequestSuccess,
    authRequestFaild,
    userCreated,
    userLoggedOut,
    updateUser
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequest = createAction("user/userCreateRequest");
const createUserFaild = createAction("user/createUserFaild");

const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateRequest());
    try {
        const { content } = await userService.create(payload);
        dispatch(userCreated(content));
        history.push(`/Users`);
    } catch (error) {
        dispatch(createUserFaild(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageServise.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/Main");
};

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
        localStorageServise.setTokens(data);
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFaild(errorMessage));
        } else {
            dispatch(authRequestFaild(error.message));
        }
    }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested);
    try {
        const data = await authService.register({ email, password });
        localStorageServise.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(createUser({
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
        }));
    } catch (error) {
        dispatch(authRequestFaild(error.message));
    }
};

export const loadUsersList = () => async (dispatch) => {
        dispatch(usersRequested());
        try {
            const { content } = await userService.get();
            dispatch(usersReceved(content));
        } catch (error) {
            dispatch(usersRequestFiled(error.message));
        }
};

export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
    ? state.users.entities.find(user => user._id === state.users.auth.userId)
    : null;
};
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId);
    }
};

export const updateUserData = (payload) => async (dispatch) => {
    try {
        const { content } = await userService.update(payload);
        dispatch(updateUser(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataloaded;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
