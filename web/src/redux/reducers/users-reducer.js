import { LOAD_USER_PENDING, LOAD_USER_SUCCESS, LOAD_USER_FAILED, LOAD_USER_PRODUCTS_PENDING, LOAD_USER_PRODUCTS_SUCCESS, LOAD_USER_PRODUCTS_FAILED, LOAD_USER_FEEDBACKS_PENDING, LOAD_USER_FEEDBACKS_SUCCESS, LOAD_USER_FEEDBACKS_FAILED, LOAD_USER_SALES_PENDING, LOAD_USER_SALES_SUCCESS, LOAD_USER_SALES_FAILED } from "../actions/users-actions"
import { LOADING, LOADED } from '../../constants';

const initState = {
    users: [],
    productsStore: { },
    feedbacksStore: { },
    salesStore: { }
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
            const { userId, page } = action.payload;

            return {
                ...state,
                productsStore: {
                    ...state.productsStore,
                    [userId]: {
                        ...state.productsStore[userId],
                        loadingStatus: LOADING,
                        products: [],
                        searchSettings: {
                            page: page,
                            limit: 10
                        }
                    }
                }
            }
        }

        case LOAD_USER_PRODUCTS_SUCCESS: {
            const { products, productsCount, userId } = action.payload;
            
            const newproductsIds = products.map(({ id }) => id);
            const oldproducts = state.productsStore[userId].products.filter(({ id }) => !!newproductsIds.find(+id));
            
            return {
                ...state,
                productsStore: {
                    ...state.productsStore,
                    [userId]: {
                        ...state.productsStore[userId],
                        loadingStatus: LOADED,
                        products: oldproducts.concat(products),
                        searchSettings: {
                            ...state.productsStore[userId].searchSettings,
                            pages: Math.ceil(productsCount / state.productsStore[userId].searchSettings.limit),
                        }
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
                        loadingStatus: LOADING,
                        feedbacks: [],
                        searchSettings: {
                            page: page,
                            limit: 10
                        }
                    }
                }
            }
        }
        
        case LOAD_USER_FEEDBACKS_SUCCESS: {
            const { feedbacks, feedbacksCount, userId } = action.payload;

            return {
                ...state,
                feedbacksStore: {
                    ...state.feedbacksStore,
                    [userId]: {
                        ...state.feedbacksStore[userId],
                        loadingStatus: LOADED,
                        feedbacks,
                        searchSettings: {
                            ...state.feedbacksStore[userId].searchSettings,
                            pages:  Math.ceil(feedbacksCount / state.feedbacksStore[userId].searchSettings.limit)
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

        case LOAD_USER_SALES_PENDING: {
            const { userId, page } = action.payload;

            return {
                ...state,
                salesStore: {
                    ...state.salesStore,
                    [userId]: {
                        ...state.salesStore[userId],
                        loadingStatus: LOADING,
                        sales: [],
                        searchSettings: {
                            page: page,
                            limit: 10
                        }
                    }
                }
            }
        }
        
        case LOAD_USER_SALES_SUCCESS: {
            const { sales, salesCount, userId } = action.payload;

            return {
                ...state,
                salesStore: {
                    ...state.salesStore,
                    [userId]: {
                        ...state.salesStore[userId],
                        loadingStatus: LOADED,
                        sales,
                        searchSettings: {
                            ...state.salesStore[userId].searchSettings,
                            pages:  Math.ceil(salesCount / state.salesStore[userId].searchSettings.limit)
                        }
                    }
                }
            }
        }
        
        case LOAD_USER_SALES_FAILED: {
            return {
                ...state
            }
        }

        
        default: return state;
    }
}

export default usersReducer;
