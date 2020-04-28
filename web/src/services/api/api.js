import Axios from 'axios';

const axios = Axios.create({
    baseURL: "http://5.45.118.116:3500/api", //`https://apiko-marketplace-api-2019.herokuapp.com`;
    withCredentials: true
});

const put = (path, params) => axios.put(path, params);

const post = (path, params = {}) =>
    new Promise((r) => setTimeout(() => r(), 1000))
        .then(() => axios.post(path, params))
        .then(({ data }) => data)
        .catch(console.log);

export const graphql = (query) =>
    post("/graphql", { query });


export const register = (email, fullName, password) =>
    post("/auth/register", { email, fullName, password });

export const login = (email, password) =>
    post("/auth/login", { email, password });

export const unlogin = () =>
    post("/auth/unlogin");

export const loadData = () =>
    post("/auth/data");

export const restoreRequest = (email) =>
    post("/auth/restoreRequest", { email });

export const checkRestoreKey = (key) =>
    post("/auth/checkRestoreKey", { key });

export const restorePassword = (password, leaveDevices) =>
    post("/auth/restorePassword", { password, leaveDevices });


export const saveUserIcon = (formData) =>
    put("/user/icon", formData)
        .then(({ data }) => data);