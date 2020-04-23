import { asyncActionFactory, asyncActionFactoryWithGraphQLQuery } from "./factory";
import api from "../../services/api";

export const 
    LOAD_PRODUCTS_PENDING = "LOAD_PRODUCTS_PENDING",
    LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS",
    LOAD_PRODUCTS_FAILED = "LOAD_PRODUCTS_FAILED",

    CHANGE_SAVED_STATE_OF_PRODUCT_PENDING = "CHANGE_SAVED_STATE_OF_PRODUCT_PENDING",
    CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS = "CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS",
    CHANGE_SAVED_STATE_OF_PRODUCT_FAILED = "CHANGE_SAVED_STATE_OF_PRODUCT_FAILED";

const loadProductsPending = ({
    type: LOAD_PRODUCTS_PENDING
});

const loadProductsSuccess = (data) => ({
    type: LOAD_PRODUCTS_SUCCESS,
    data
});

const loadProductsFailed = (errors) => ({
    type: LOAD_PRODUCTS_FAILED
});

const productsQuery = (title, location, category, priceFrom, priceTo, page, limit) => `
query {
    products(
            title: "${title}", 
            location: "${location}", 
            category: "${category}", 
            priceFrom: ${priceFrom}, 
            priceTo: ${priceTo}, 
            page: ${page}, 
            limit: ${limit}
        ) {
      id
      title
      price
      iconName
      saved
    }
  }
`

export const loadProducts = asyncActionFactoryWithGraphQLQuery(
    ({ products: { searchQuery: { title, location, category, priceFrom, priceTo, page, limit }} }) => 
        api.graphql(productsQuery(title, location, category, priceFrom, priceTo, page, limit )),
    loadProductsPending,
    loadProductsSuccess,
    loadProductsFailed
);

const changeSavedStateOfProductQueryPending = (id) => ({
    type: CHANGE_SAVED_STATE_OF_PRODUCT_PENDING,
    id
});

const changeSavedStateOfProductQuerySuccess = (data, id, state) => ({
    type: CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS,
    data,
    id
});

const changeSavedStateOfProductQueryFailed = (errors) => ({
    type: CHANGE_SAVED_STATE_OF_PRODUCT_FAILED,
    errors
})

const changeSavedStateOfProductQuery = (id, state) => `mutation {
    changeSavedStateOfProduct(id: ${id}, state: ${state}) 
}`;

export const changeSavedStateOfProduct = asyncActionFactoryWithGraphQLQuery(
    (id, state) => api.graphql(changeSavedStateOfProductQuery(id, state)),
    changeSavedStateOfProductQueryPending,
    changeSavedStateOfProductQuerySuccess,
    changeSavedStateOfProductQueryFailed
)





        // graphql(saveQuery).then(({ data: { changeSavedStateOfProduct } }) => {
        //     setProducts(products.map(p => p.id === id ? ({ ...p, saved: changeSavedStateOfProduct }) : p));
        // });