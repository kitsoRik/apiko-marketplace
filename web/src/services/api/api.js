import Axios from 'axios';

Axios.defaults.baseURL = "http://localhost:3500/api"; //`https://apiko-marketplace-api-2019.herokuapp.com`;
Axios.defaults.withCredentials = true;
Axios.defaults.crossDomain = true;


const get = (path, params = {}) =>
    Axios.get(`${path}`);
    
const post = (path, params = {}) =>
    new Promise((r) => setTimeout(() => r(), 1000))
        .then(() => Axios.post(`${path}`, params))
        .then(({ data }) => data)
        .catch(console.log);

export const thisHost = "http://localhost:3000";

export const register = (email, fullName, password) => 
    post("/auth/register", { email, fullName, password });

export const login = (email, password) => 
    post("/auth/login", { email, password });

export const restoreRequest = (email) => 
    post("/auth/restoreRequest", { email });

export const restorePassword = (password, leaveDevices) =>
    post("/auth/restorePassword", { password, leaveDevices });