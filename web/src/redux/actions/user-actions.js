export const
    SET_REGISTER_STATUS = "SET_REGISTER_STATUS",
    SET_LOGIN_STATUS = "SET_LOGIN_STATUS";

export const setRegisterStatus = (registerStatus) => ({
    type: SET_REGISTER_STATUS,
    payload: {
        registerStatus
    }
});

export const setLoginStatus = (loginStatus) => ({
    type: SET_LOGIN_STATUS,
    payload: {
        loginStatus
    }
});