import Axios from 'axios';

const base = "http://localhost:3500";

const axios = Axios.create({
    baseURL: `${base}/api`, //`https://apiko-marketplace-api-2019.herokuapp.com`;
    withCredentials: true
});

export const userIconBaseUrl = `${base}/static/icons/users/`;
export const productsImageBaseUrl = `${base}/static/photos/products/`;

const put = (path, params) =>
    axios.put(path, params)
        .then(({ data }) => data)
        .catch(console.log);

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

export const addProduct = (title, locationId, description, photos, price) => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("locationId", locationId);
    formData.append("description", description);
    formData.append("price", price);
    for (let i = 0; i < photos.length; i++)
        formData.append("photos", photos[i]);

    return put("/products/add", formData);
}