import api from '../../services/api';
import { asyncActionFactory } from './factory';

export const
    LOGIN_PENDING = "LOGIN_PENDING",
    LOGIN_SUCCESS = "LOGIN_SUCCESS",
    LOGIN_FAILED = "LOGIN_FAILED",

    REGISTER_PENDING = "REGISTER_PENDING",
    REGISTER_SUCCESS = "REGISTER_SUCCESS",
    REGISTER_FAILED = "REGISTER_FAILED",

    UNLOGIN_PENDING = "UNLOGIN_PENDING",
    UNLOGIN_SUCCESS = "UNLOGIN_SUCCESS",
    UNLOGIN_FAILED = "UNLOGIN_FAILED",

    LOAD_DATA_PENDING = "LOAD_DATA_PENDING",
    LOAD_DATA_SUCCESS = "LOAD_DATA_SUCCESS",
    LOAD_DATA_FAILED = "LOAD_DATA_FAILED";

const loadDataPending = ({
    type: LOAD_DATA_PENDING
});

const loadDataSuccess = (result) => ({
    type: LOAD_DATA_SUCCESS,
    result
});

const loadDataFailed = (error) => ({
    type: LOAD_DATA_FAILED,
    error
});

export const loadData = asyncActionFactory(
    api.loadData,
    loadDataPending,
    loadDataSuccess,
    loadDataFailed
);

const registerPending = ({
    type: REGISTER_PENDING
});

const registerSuccess = (result) => ({
    type: REGISTER_SUCCESS,
    result
});

const registerFailed = (error) => ({
    type: REGISTER_FAILED,
    error
});

export const register = asyncActionFactory(
    api.register,
    registerPending,
    registerSuccess,
    registerFailed
)

const loginPending = ({
    type: LOGIN_PENDING
});

const loginSuccess = (result) => ({
    type: LOGIN_SUCCESS,
    result
});

const loginFailed = (error) => ({
    type: LOGIN_FAILED,
    error
});

export const login = asyncActionFactory(
    api.login,
    loginPending,
    loginSuccess,
    loginFailed
)

const unloginPending = ({
    type: UNLOGIN_PENDING
});

const unloginSuccess = (result) => ({
    type: UNLOGIN_SUCCESS,
    result
});

const unloginFailed = (error) => ({
    type: UNLOGIN_FAILED,
    error
});

export const unlogin = asyncActionFactory(
    api.unlogin,
    unloginPending,
    unloginSuccess,
    unloginFailed
)
