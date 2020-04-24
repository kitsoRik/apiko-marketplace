import api from "../../services/api";
import { asyncActionFactoryWithGraphQLQuery } from "./factory";
import { graphql } from "../../services/api/api";

export const
    LOAD_USER_PENDING = "LOAD_USER_PENDING",
    LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS",
    LOAD_USER_FAILED = "LOAD_USER_FAILED",

    LOAD_USER_PRODUCTS_PENDING = "LOAD_USER_PRODUCTS_PENDING",
    LOAD_USER_PRODUCTS_SUCCESS = "LOAD_USER_PRODUCTS_SUCCESS",
    LOAD_USER_PRODUCTS_FAILED = "LOAD_USER_PRODUCTS_FAILED",

    LOAD_USER_FEEDBACKS_PENDING = "LOAD_USER_FEEDBACKS_PENDING",
    LOAD_USER_FEEDBACKS_SUCCESS = "LOAD_USER_FEEDBACKS_SUCCESS",
    LOAD_USER_FEEDBACKS_FAILED = "LOAD_USER_FEEDBACKS_FAILED";

const loadUserPending = (id) => ({
    type: LOAD_USER_PENDING,
    id
});

const loadUserSuccess = (data, id) => ({
    type: LOAD_USER_SUCCESS,
    data,
    id
});

const loadUserFailed = (errors) => ({
    type: LOAD_USER_FAILED
});

const loadUserQuery = (id) => 
    `
    query {
        user(id: ${id}) {
            id
         fullName
       }
     }
     `

export const loadUser = asyncActionFactoryWithGraphQLQuery(
    (id) => api.graphql(loadUserQuery(id)),
    loadUserPending,
    loadUserSuccess,
    loadUserFailed
);

// const loadUserSalesPending = ({
//     type: LOAD_USER_SALES_PENDING
// });

// const loadUserSalesSuccess = (data) => ({
//     type: LOAD_USER_SALES_SUCCESS,
//     data
// });

// const loadUserSalesFailed = (errors) => ({
//     type: LOAD_USER_SALES_FAILED
// });

// const loadUserSalesQuery = ;

// export const loadUserSales = asyncActionFactoryWithGraphQLQuery(
//     (id) => graphql(query),
//     loadUserSalesPending,
//     loadUserSalesSuccess,
//     loadUserSalesFailed
// );

const loadUserFeedbacksPending = (userId, page) => ({
    type: LOAD_USER_FEEDBACKS_PENDING,
    payload: {
        userId,
        page
    }
});

const loadUserFeedbacksSuccess = ({ user: { feedbacks }}, userId, page) => ({
    type: LOAD_USER_FEEDBACKS_SUCCESS,
    payload: {
        userId,
        feedbacks
    }
});

const loadUserFeedbacksFailed = (errors) => ({
    type: LOAD_USER_FEEDBACKS_FAILED
});

const loadUserFeedbacksQuery = (id) => 
`query {
    user(id: ${id}) {
      feedbacks {
        id
        text
      }
    }
  }
`;

export const loadUserFeedbacks = asyncActionFactoryWithGraphQLQuery(
    (id) => graphql(loadUserFeedbacksQuery(id)),
    loadUserFeedbacksPending,
    loadUserFeedbacksSuccess,
    loadUserFeedbacksFailed
);

const loadUserProductsPending = (userId) => ({
    type: LOAD_USER_PRODUCTS_PENDING,
    payload: {
        userId
    }
});

const loadUserProductsSuccess = ({ user: { products }}, userId) => ({
    type: LOAD_USER_PRODUCTS_SUCCESS,
    payload: {
        userId,
        products
    }
});

const loadUserProductsFailed = (errors) => ({
    type: LOAD_USER_PRODUCTS_FAILED
});

const loadUserProductsQuery = (id) => 
`query {
    user(id: ${id}) {
     products {
        id
        title
        price
        iconName
        saved
     }
   }
 }
`

export const loadUserProducts = asyncActionFactoryWithGraphQLQuery(
    (id) => graphql(loadUserProductsQuery(id)),
    loadUserProductsPending,
    loadUserProductsSuccess,
    loadUserProductsFailed
);