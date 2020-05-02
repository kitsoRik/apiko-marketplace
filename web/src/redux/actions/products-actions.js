import { asyncActionFactoryWithGraphQLQuery } from "./factory";
import api from "../../services/api";

export const
    LOAD_PRODUCTS_PENDING = "LOAD_PRODUCTS_PENDING",
    LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS",
    LOAD_PRODUCTS_FAILED = "LOAD_PRODUCTS_FAILED",

    CHANGE_SAVED_STATE_OF_PRODUCT_PENDING = "CHANGE_SAVED_STATE_OF_PRODUCT_PENDING",
    CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS = "CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS",
    CHANGE_SAVED_STATE_OF_PRODUCT_FAILED = "CHANGE_SAVED_STATE_OF_PRODUCT_FAILED",

    CHANGE_PRODUCT_SEARCH_QUERY = "CHANGE_PRODUCT_SEARCH_QUERY",

    LOAD_SEARCH_PRODUCTS_HINT_PENDING = "LOAD_SEARCH_PRODUCTS_HINT_PENDING",
    LOAD_SEARCH_PRODUCTS_HINT_SUCCESS = "LOAD_SEARCH_PRODUCTS_HINT_SUCCESS",
    LOAD_SEARCH_PRODUCTS_HINT_FAILED = "LOAD_SEARCH_PRODUCTS_HINT_FAILED",

    LOAD_SEARCH_LOCATIONS_HINT_PENDING = "LOAD_SEARCH_LOCATIONS_HINT_PENDING",
    LOAD_SEARCH_LOCATIONS_HINT_SUCCESS = "LOAD_SEARCH_LOCATIONS_HINT_SUCCESS",
    LOAD_SEARCH_LOCATIONS_HINT_FAILED = "LOAD_SEARCH_LOCATIONS_HINT_FAILED",

    LOAD_SAVED_PRODUCTS_PENDING = "LOAD_SAVED_PRODUCTS_PENDING",
    LOAD_SAVED_PRODUCTS_SUCCESS = "LOAD_SAVED_PRODUCTS_SUCCESS",
    LOAD_SAVED_PRODUCTS_FAILED = "LOAD_SAVED_PRODUCTS_FAILED";

const loadProductsPending = ({
    type: LOAD_PRODUCTS_PENDING
});

const loadProductsSuccess = ({ products, productsCount }) => ({
    type: LOAD_PRODUCTS_SUCCESS,
    payload: {
        products,
        productsCount
    }
});

const loadProductsFailed = (errors) => ({
    type: LOAD_PRODUCTS_FAILED
});

const productsQuery = (title, location, locationId, category, priceFrom, priceTo, page, limit) => `
query {
    products(
            title: "${title}", 
            location: "${location}", 
            locationId: ${locationId}, 
            category: "${category}", 
            priceFrom: ${priceFrom === "" ? -1 : priceFrom}, 
            priceTo: ${priceTo === "" ? -1 : priceTo}, 
            page: ${page}, 
            limit: ${limit}
        ) {
      id
      title
      price
      imageName
      saved
    }
    productsCount(
      title: "${title}", 
      location: "${location}", 
      locationId: ${locationId}, 
      category: "${category}", 
      priceFrom: ${priceFrom === "" ? -1 : priceFrom}, 
      priceTo: ${priceTo === "" ? -1 : priceTo}, 
      page: ${page}, 
      limit: ${limit}
    )
  }
`

export const loadProducts = asyncActionFactoryWithGraphQLQuery(
    ({ products: { searchQuery: { title, location, locationId, category, priceFrom, priceTo, page, limit } } }) =>
        api.graphql(productsQuery(title, location, locationId, category, priceFrom, priceTo, page, limit)),
    loadProductsPending,
    loadProductsSuccess,
    loadProductsFailed
);

const changeSavedStateOfProductQueryPending = (id, savedState) => ({
    type: CHANGE_SAVED_STATE_OF_PRODUCT_PENDING,
    payload: {
        id, savedState
    }
});

const changeSavedStateOfProductQuerySuccess = (data, id, state) => ({
    type: CHANGE_SAVED_STATE_OF_PRODUCT_SUCCESS,
    data,
    id,
    state
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

export const changeProductSearchQuery = (changes) => ({
    type: CHANGE_PRODUCT_SEARCH_QUERY,
    payload: {
        ...changes
    }
});

export const searchProducts = loadProducts;

const loadSearchProductsHintPending = ({
    type: LOAD_SEARCH_PRODUCTS_HINT_PENDING
});

const loadSearchProductsHintSuccess = ({ products }) => ({
    type: LOAD_SEARCH_PRODUCTS_HINT_SUCCESS,
    payload: {
        productsHint: products
    }
});

const loadSearchProductsHintFailed = (errors) => ({
    type: LOAD_SEARCH_PRODUCTS_HINT_FAILED
});

const loadSearchProductsHintQuery = (titlePattern) =>
    `query {
        products(title: "${titlePattern}", limit: 6) {
        id
        title
        imageName
        }
    }
    `;

export const loadSearchProductsHint = asyncActionFactoryWithGraphQLQuery(
    ({ products: { searchQuery: { title } } }) => api.graphql(loadSearchProductsHintQuery(title)),
    loadSearchProductsHintPending,
    loadSearchProductsHintSuccess,
    loadSearchProductsHintFailed
);

const loadSearchLocationsHintPending = ({
    type: LOAD_SEARCH_LOCATIONS_HINT_PENDING
});

const loadSearchLocationsHintSuccess = ({ locations }) => ({
    type: LOAD_SEARCH_LOCATIONS_HINT_SUCCESS,
    payload: {
        locationsHint: locations
    }
});

const loadSearchLocationsHintFailed = (errors) => ({
    type: LOAD_SEARCH_LOCATIONS_HINT_FAILED
});

const loadSearchLocationsHintQuery = (cityPattern) =>
    `
query{
    locations (namePattern: "${cityPattern}", limit: 10) {
      id
      name
    }
  }
`

export const loadSearchLocationsHint = asyncActionFactoryWithGraphQLQuery(
    ({ products: { searchQuery: { location } } }) => api.graphql(loadSearchLocationsHintQuery(location)),
    loadSearchLocationsHintPending,
    loadSearchLocationsHintSuccess,
    loadSearchLocationsHintFailed
);

const loadSavedProductsPending = ({
    type: LOAD_SAVED_PRODUCTS_PENDING
});

const loadSavedProductsSuccess = ({ savedProducts, savedProductsCount }) => ({
    type: LOAD_SAVED_PRODUCTS_SUCCESS,
    payload: {
        savedProducts,
        savedProductsCount
    }
});

const loadSavedProductsFailed = (errors) => ({
    type: LOAD_SAVED_PRODUCTS_FAILED
});

const loadSavedProductsQuery = () =>
    `
query {
    savedProducts(page: 1, limit: 10) {
        id
        title
        price
        saved
        imageName
    }
    savedProductsCount
}
`;

export const loadSavedProducts = asyncActionFactoryWithGraphQLQuery(
    () => api.graphql(loadSavedProductsQuery()),
    loadSavedProductsPending,
    loadSavedProductsSuccess,
    loadSavedProductsFailed
);