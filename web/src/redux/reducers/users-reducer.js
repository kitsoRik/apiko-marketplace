import { LOAD_USER_PENDING, LOAD_USER_SUCCESS, LOAD_USER_FAILED, LOAD_USER_PRODUCTS_PENDING, LOAD_USER_PRODUCTS_SUCCESS, LOAD_USER_PRODUCTS_FAILED } from "../actions/users-actions"
import { LOADING, LOADED } from '../../constants';

const initState = {
    users: [],
    productsStore: {
        // userId - key
    }
}

const usersReducer = (state = initState, action) => {
    switch(action.type) {
        case LOAD_USER_PENDING: {
            const { id } = action;
            
            const users = state.users.concat([]);
            const user = users.find(u => +u.id === +id);
            
            if(user) {
                user.loadingStatus = LOADING;
            } else {
                users.push({
                    id,
                    loadingStatus: LOADING
                });
            }

            return {
                ...state,
                users
            }
        }
        case LOAD_USER_SUCCESS: {
            const { id, data: { user } } = action;

            const users = state.users.concat([]);
            const fUser = users.find(u => +u.id === +id);
            fUser.loadingStatus = LOADED;
            Object.assign(fUser, user);

            return {
                ...state,
                users
            }
        }
        case LOAD_USER_FAILED: {
            
            return {
                ...state
            }
        }

        case LOAD_USER_PRODUCTS_PENDING: {

            return {
                ...state
            }
        }

        case LOAD_USER_PRODUCTS_SUCCESS: {
            const { products, userId } = action.payload;

            return {
                ...state,
                productsStore: {
                    ...state.productsStore,
                    [userId]: {
                        products
                    }
                }
            }
        }

        case LOAD_USER_PRODUCTS_FAILED: {
            return {
                ...state
            }
        }
        default: return state;
    }
}

export default usersReducer;