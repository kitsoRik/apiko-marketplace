const { LOAD_PRODUCTS_PENDING, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILED, CHANGE_SAVED_STATE_OF_PRODUCT_FAILED, CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS, CHANGE_SAVED_STATE_OF_PRODUCT_PENDING } = require("../actions/products-actions");

const initState = {
    products: [],
    searchQuery: {
        title: "",
        location: "",
        category: "",
        page: 1,
        limit: 12,
        priceFrom: -1,
        priceTo: -1
    },
    changingSavedStateOfProductsIds: []
}

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS_PENDING: {

            return {
                ...state
            }
        }
        case LOAD_PRODUCTS_SUCCESS: {
            const { products } = action.data;

            return {
                ...state,
                products
            }
        }
        case LOAD_PRODUCTS_FAILED: {

            return {
                ...state
            }
        }

        case CHANGE_SAVED_STATE_OF_PRODUCT_PENDING: {
            const { id } = action;
            const { changingSavedStateOfProductsIds } = state;

            return {
                ...state,
                changingSavedStateOfProductsIds: changingSavedStateOfProductsIds.concat([id])
            }
        }

        case CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS: {
            const { id, data: { changeSavedStateOfProduct } } = action;
            const { products, changingSavedStateOfProductsIds } = state;

            return {
                ...state,
                products: products.map(p => +p.id === +id ? ({ ...p, saved: changeSavedStateOfProduct }) : p),
                changingSavedStateOfProductsIds: changingSavedStateOfProductsIds.filter(i => i !== id)
            }
        }

        case CHANGE_SAVED_STATE_OF_PRODUCT_FAILED: {
            return {
                ...state
            }
        }

        default: return state;
    }
}

export default productsReducer;