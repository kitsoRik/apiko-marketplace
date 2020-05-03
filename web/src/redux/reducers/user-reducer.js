import { NOT_LOGINED, LOGINING, LOGINED, UNLOGINED, UNLOGINING, UNLOGINED_ERROR } from '../../constants/login';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED, LOAD_DATA_PENDING, LOAD_DATA_SUCCESS, LOAD_DATA_FAILED, UNLOGIN_PENDING, UNLOGIN_FAILED, UNLOGIN_SUCCESS, REGISTER_PENDING, REGISTER_SUCCESS, REGISTER_FAILED, SAVE_USER_PENDING, SAVE_USER_SUCCESS, SAVE_USER_FAILED, CLEAR_SAVE, SAVE_USER_ICON_PENDING, SAVE_USER_ICON_SUCCESS, SAVE_USER_ICON_FAILED, SET_REGISTER_STATUS, SET_LOGIN_STATUS } from '../actions/user-actions';
import { NOT_LOADED, LOADING, LOADED, LOADED_ERROR, NOT_SAVED, SAVING, SAVED, SAVED_ERROR, UNLOADED } from '../../constants';
import { NOT_REGISTERED, REGISTERING, REGISTERED, REGISTERED_ERROR } from '../../constants/register';

const initState = {
    loginStatus: NOT_LOGINED,
    registerStatus: NOT_REGISTERED
}

const userReducer = (state = initState, action) => {
    switch (action.type) {

        case SET_REGISTER_STATUS: {
            return {
                ...state,
                registerStatus: action.payload.registerStatus
            }
        }

        case SET_LOGIN_STATUS: {
            return {
                ...state,
                registerStatus: action.payload.loginStatus
            }
        }

        default: return state;
    }
};

export default userReducer;