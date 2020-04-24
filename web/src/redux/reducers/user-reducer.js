import { NOT_LOGINED, LOGINING, LOGINED, LOGINED_ERROR, UNLOGINED, UNLOGINING, UNLOGINED_ERROR } from '../../constants/login';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILED, LOAD_DATA_PENDING, LOAD_DATA_SUCCESS, LOAD_DATA_FAILED, UNLOGIN_PENDING, UNLOGIN_FAILED, UNLOGIN_SUCCESS, REGISTER_PENDING, REGISTER_SUCCESS, REGISTER_FAILED, SAVE_USER_PENDING, SAVE_USER_SUCCESS, SAVE_USER_FAILED } from '../actions/user-actions';
import { NOT_LOADED, LOADING, LOADED, LOADED_ERROR, NOT_SAVED, SAVING, SAVED, SAVED_ERROR } from '../../constants';
import { NOT_REGISTERED, REGISTERING, REGISTERED, REGISTERED_ERROR } from '../../constants/register';

const initState = {
    data: {

    },
    loadingDataError: null,
    loadingDataState: NOT_LOADED,
    loginStatus: LOGINING,
    registerStatus: NOT_REGISTERED,
    registerError: null,

    savingState: NOT_SAVED
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case REGISTER_PENDING: {
            return {
                ...state,
                registerStatus: REGISTERING,
                registerError: null
            }
        }

        case REGISTER_SUCCESS: {
            const data = action.result;
            return {
                ...state,
                registerStatus: REGISTERED,
                data,
                loadingDataState: LOADED,
                loginStatus: LOGINED
            }
        }

        case REGISTER_FAILED: {
            const { error } = action;
            return {
                ...state,
                registerStatus: REGISTERED_ERROR,
                registerError: error
            }
        }
        case LOGIN_PENDING: {
            return {
                ...state,
                loginStatus: LOGINING
            }
        }

        case LOGIN_SUCCESS: {
            const data = action.result;
            return {
                ...state,
                loginStatus: LOGINED,
                loadingDataState: LOADED,
                data
            }
        }

        case LOGIN_FAILED: {
            return {
                ...state,
                loginStatus: NOT_LOGINED
            }
        }
        case UNLOGIN_PENDING: {
            return {
                ...state,
                loginStatus: UNLOGINING
            }
        }

        case UNLOGIN_SUCCESS: {
            return {
                ...state,
                loginStatus: UNLOGINED
            }
        }

        case UNLOGIN_FAILED: {
            return {
                ...state,
                loginStatus: UNLOGINED_ERROR
            }
        }

        case LOAD_DATA_PENDING: {
            return {
                ...state,
                loadingDataError: null,
                loadingDataState: LOADING,
                loginStatus: LOGINING
            }
        }

        case LOAD_DATA_SUCCESS: {
            const user = action.result;

            return {
                ...state,
                data: {
                    ...user
                },
                loadingDataError: null,
                loadingDataState: LOADED,
                loginStatus: LOGINED
            }
        }

        case LOAD_DATA_FAILED: {
            const error = action.error;

            return {
                ...state,
                loadingDataError: error,
                loadingDataState: LOADED_ERROR,
                loginStatus: NOT_LOGINED
            }
        }

        case SAVE_USER_PENDING: {
        
            return {
                ...state,
                savingState: SAVING
            }
        }
        
        case SAVE_USER_SUCCESS: {
        
            const { user: { fullName } } = action.payload;

            return {
                ...state,
                savingState: SAVED,
                data: {
                    ...state.data,
                    fullName
                }
            }
        }
        
        case SAVE_USER_FAILED: {
            return {
                ...state,
                savingState: SAVED_ERROR
            }
        }

        default: return state;
    }
};

export default userReducer;