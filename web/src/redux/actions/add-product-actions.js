import { graphql } from "graphql";

export const
    ADD_PRODUCT_PENDING = "ADD_PRODUCT_PENDING",
    ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS",
    ADD_PRODUCT_FAILED = "ADD_PRODUCT_FAILED";

const addProductPending = ({
    type: ADD_PRODUCT_PENDING
});

const addProductSuccess = (data) => ({
    type: ADD_PRODUCT_SUCCESS,
    data
});

const addProductFailed = (errors) => ({
    type: ADD_PRODUCT_FAILED
});

export const addProduct = asyncActionFactoryWithGraphQLQuery(
    (title, location, description, photos, price) => graphql(),
    addProductPending,
    addProductSuccess,
    addProductFailed
);