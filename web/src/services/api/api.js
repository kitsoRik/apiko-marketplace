import Axios from 'axios';

export const HOST = "http://localhost:3500";

const axios = Axios.create({
    baseURL: `${HOST}/api`,
    withCredentials: true
});

export const userIconBaseUrl = `${HOST}/static/icons/users/`;
export const productsImageBaseUrl = `${HOST}/static/photos/products/`;

const post = (path, params = {}) =>
    new Promise((r) => setTimeout(() => r(), 1000))
        .then(() => axios.post(path, params))
        .then(({ data }) => data)
        .catch(console.log);

export const restoreRequest = (email) =>
    post("/auth/restoreRequest", { email });

export const checkRestoreKey = (key) =>
    post("/auth/checkRestoreKey", { key });

export const restorePassword = (password, leaveDevices) =>
    post("/auth/restorePassword", { password, leaveDevices });