import { LOAD_USER_PENDING, LOAD_USER_SUCCESS, LOAD_USER_FAILED, LOAD_USER_PRODUCTS_PENDING, LOAD_USER_PRODUCTS_SUCCESS, LOAD_USER_PRODUCTS_FAILED, LOAD_USER_FEEDBACKS_PENDING, LOAD_USER_FEEDBACKS_SUCCESS, LOAD_USER_FEEDBACKS_FAILED } from "../actions/users-actions"
import { LOADING, LOADED } from '../../constants';

const initState = {
    users: [],
    productsStore: {
        // userId - key
    },
    feedbacksStore: {
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
            const { userId } = action.payload;

            return {
                ...state,
                productsStore: {
                    ...state.productsStore,
                    [userId]: {
                        loadingStatus: LOADING
                    }
                }
            }
        }

        case LOAD_USER_PRODUCTS_SUCCESS: {
            const { products, userId } = action.payload;

            return {
                ...state,
                productsStore: {
                    ...state.productsStore,
                    [userId]: {
                        loadingStatus: LOADED,
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

        case LOAD_USER_FEEDBACKS_PENDING: {
            const { userId, page } = action.payload;

            return {
                ...state,
                feedbacksStore: {
                    ...state.feedbacksStore,
                    [userId]: {
                        ...state.feedbacksStore[userId],
                        feedbacks: [],
                        pages: {
                            [page]: []
                        }
                    }
                }
            }
        }
        
        case LOAD_USER_FEEDBACKS_SUCCESS: {
            const { feedbacks, userId, page } = action.payload;

            const newFeedbacksIds = feedbacks.map(({ id }) => id);
            const oldFeedbacks = state.feedbacksStore[userId].feedbacks.filter(({ id }) => !!newFeedbacksIds.find(+id));

            return {
                ...state,
                feedbacksStore: {
                    ...state.feedbacksStore,
                    [userId]: {
                        loadingStatus: LOADED,
                        feedbacks: oldFeedbacks.concat(feedbacks),
                        pages: {
                            ...state.feedbacksStore[userId].pages,
                            [page]: feedbacks.map(({ id }) => id)
                        }
                    }
                }
            }
        }
        
        case LOAD_USER_FEEDBACKS_FAILED: {
            return {
                ...state
            }
        }

        
        default: return state;
    }
}

export default usersReducer;
