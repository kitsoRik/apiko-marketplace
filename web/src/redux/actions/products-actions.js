export const
    CHANGE_PRODUCTS_SEARCH_QUERY = "CHANGE_PRODUCTS_SEARCH_QUERY",
    SEARCH_PRODUCTS = "SEARCH_PRODUCTS";

export const changeProductsSearchQuery = (changes) => ({
    type: CHANGE_PRODUCTS_SEARCH_QUERY,
    payload: {
        changes
    }
});

export const searchProducts = () => (dispatch, getState) => {
    const { products: { searchQuery } } = getState();
    dispatch({
        type: SEARCH_PRODUCTS,
        payload: {
            searchQuery
        }
    });
}