import { NOT_LOADED, LOADING, LOADED_ERROR, LOADED } from "../../constants";

const { LOAD_PRODUCTS_PENDING, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILED, CHANGE_SAVED_STATE_OF_PRODUCT_FAILED, CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS, CHANGE_SAVED_STATE_OF_PRODUCT_PENDING, CHANGE_PRODUCT_TITLE_PATTERN, CHANGE_PRODUCT_SEARCH_QUERY, LOAD_SEARCH_PRODUCTS_HINT_PENDING, LOAD_SEARCH_PRODUCTS_HINT_SUCCESS, LOAD_SEARCH_PRODUCTS_HINT_FAILED, LOAD_SEARCH_LOCATIONS_HINT_PENDING, LOAD_SEARCH_LOCATIONS_HINT_SUCCESS, LOAD_SEARCH_LOCATIONS_HINT_FAILED, LOAD_SAVED_PRODUCTS_PENDING, LOAD_SAVED_PRODUCTS_SUCCESS, LOAD_SAVED_PRODUCTS_FAILED } = require("../actions/products-actions");

const initState = {
    products: [],

    homeProductsIds: [],
    homeProductsLoadingState: NOT_LOADED,

    searchQuery: {
        title: "",
        locationId: -1,
        location: "",
        category: "any",
        page: 1,
        limit: 12,
        pages: 1,
        priceFrom: "",
        priceTo: ""
    },
    responseQuery: {
        locationsHint: [],
        locationsHintLoadingState: NOT_LOADED,
        productsHint: [],
        productsHintLoadingState: NOT_LOADED
    },
    //changingSavedStateOfProductsIds: [],

    savedProductsIds: [],
    savedProductsCount: 0,
    savedProductsLoadingState: NOT_LOADED
}

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS_PENDING: {

            return {
                ...state,
                homeProductsLoadingState: LOADING
            }
        }
        case LOAD_PRODUCTS_SUCCESS: {
            const { products, productsCount } = action.payload;

            const homeProductsIds = products.map(({ id }) => id);

            return {
                ...state,
                products: state.products.filter(p => homeProductsIds.indexOf(p.id) === -1).concat(products),
                homeProductsIds,
                homeProductsLoadingState: LOADED,
                searchQuery: {
                    ...state.searchQuery,
                    pages: Math.ceil(productsCount / state.searchQuery.limit)
                }
            }
        }
        case LOAD_PRODUCTS_FAILED: {

            return {
                ...state,
                homeProductsLoadingState: LOADED_ERROR
            }
        }

        case CHANGE_SAVED_STATE_OF_PRODUCT_PENDING: {
            const { id, savedState } = action.payload;
            const { products, savedProductsCount } = state;
            return {
                ...state,
                products: products.map(p => +p.id === +id ? ({ ...p, saved: savedState }) : p),
                savedProductsCount: savedState ? savedProductsCount + 1 : savedProductsCount - 1
                //changingSavedStateOfProductsIds: changingSavedStateOfProductsIds.concat([id])
            }
        }

        case CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS: {
            const { id, data: { changeSavedStateOfProduct } } = action;
            const { products, changingSavedStateOfProductsIds } = state;

            return {
                ...state,
                //products: state.products.map(p => +p.id === +id ? ({ ...p, saved: changeSavedStateOfProduct }) : p),
                //changingSavedStateOfProductsIds: changingSavedStateOfProductsIds.filter(i => i !== id)
            }
        }

        case CHANGE_SAVED_STATE_OF_PRODUCT_FAILED: {
            return {
                ...state
            }
        }

        case CHANGE_PRODUCT_SEARCH_QUERY: {
            let temp = {};
            if (action.payload.location === "") {
                temp.locationId = -1;
            }

            return {
                ...state,
                searchQuery: {
                    ...state.searchQuery,
                    ...action.payload,
                    ...temp
                }
            }
        }

        case LOAD_SEARCH_PRODUCTS_HINT_PENDING: {

            return {
                ...state,
                responseQuery: {
                    ...state.responseQuery,
                    productsHintLoadingState: LOADING
                }
            }
        }

        case LOAD_SEARCH_PRODUCTS_HINT_SUCCESS: {
            const { productsHint } = action.payload;

            return {
                ...state,
                responseQuery: {
                    ...state.responseQuery,
                    productsHintLoadingState: LOADED,
                    productsHint
                }
            }
        }

        case LOAD_SEARCH_PRODUCTS_HINT_FAILED: {
            return {
                ...state,
                responseQuery: {
                    ...state.responseQuery,
                    productsHintLoadingState: LOADED_ERROR
                }
            }
        }

        case LOAD_SEARCH_LOCATIONS_HINT_PENDING: {

            return {
                ...state,
                responseQuery: {
                    ...state.responseQuery,
                    locationsHintLoadingState: LOADING
                }
            }
        }

        case LOAD_SEARCH_LOCATIONS_HINT_SUCCESS: {
            const { locationsHint } = action.payload;

            return {
                ...state,
                responseQuery: {
                    ...state.responseQuery,
                    locationsHintLoadingState: LOADED,
                    locationsHint
                }
            }
        }

        case LOAD_SEARCH_LOCATIONS_HINT_FAILED: {
            return {
                ...state
            }
        }

        case LOAD_SAVED_PRODUCTS_PENDING: {

            return {
                ...state,
                savedProductsLoadingState: LOADING
            }
        }

        case LOAD_SAVED_PRODUCTS_SUCCESS: {
            const { savedProducts, savedProductsCount } = action.payload;

            const savedProductsIds = savedProducts.map(({ id }) => id);

            return {
                ...state,
                products: state.products.filter(p => savedProductsIds.indexOf(p.id) === -1).concat(savedProducts),
                savedProductsIds,
                savedProductsCount,
                savedProductsLoadingState: LOADED
            }
        }

        case LOAD_SAVED_PRODUCTS_FAILED: {
            return {
                ...state,
                savedProductsLoadingState: LOADED_ERROR
            }
        }

        default: return state;
    }
}

export default productsReducer;