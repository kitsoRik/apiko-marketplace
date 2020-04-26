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
    LOAD_USER_FEEDBACKS_FAILED = "LOAD_USER_FEEDBACKS_FAILED",

    LOAD_USER_SALES_PENDING = "LOAD_USER_SALES_PENDING",
    LOAD_USER_SALES_SUCCESS = "LOAD_USER_SALES_SUCCESS",
    LOAD_USER_SALES_FAILED = "LOAD_USER_SALES_FAILED";

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
         iconName
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

const loadUserFeedbacksSuccess = ({ user: { feedbacks, feedbacksCount } }, userId, page) => ({
    type: LOAD_USER_FEEDBACKS_SUCCESS,
    payload: {
        userId,
        feedbacks,
        feedbacksCount
    }
});

const loadUserFeedbacksFailed = (errors) => ({
    type: LOAD_USER_FEEDBACKS_FAILED
});

const loadUserFeedbacksQuery = (id, page, limit) =>
    `query {
    user(id: ${id}) {
      feedbacks(page: ${page}, limit: ${limit}) {
        id
        text
      },
      feedbacksCount
    }
  }
`;

const mapStateToFeedbacksSearchSettings = (userId, { users: { feedbacksStore: { [userId]: { searchSettings: { page, limit } } } } }) =>
    [page, limit];

export const loadUserFeedbacks = asyncActionFactoryWithGraphQLQuery(
    (userId, page, state) => graphql(loadUserFeedbacksQuery(userId, ...mapStateToFeedbacksSearchSettings(userId, state))),
    loadUserFeedbacksPending,
    loadUserFeedbacksSuccess,
    loadUserFeedbacksFailed
);

const loadUserProductsPending = (userId, page) => ({
    type: LOAD_USER_PRODUCTS_PENDING,
    payload: {
        userId,
        page
    }
});

const loadUserProductsSuccess = ({ user: { products, productsCount } }, userId, page) => ({
    type: LOAD_USER_PRODUCTS_SUCCESS,
    payload: {
        userId,
        products,
        productsCount
    }
});

const loadUserProductsFailed = (errors) => ({
    type: LOAD_USER_PRODUCTS_FAILED
});

const loadUserProductsQuery = (id, page, limit) =>
    `query {
    user(id: ${id}) {
     products(page: ${page}, limit: ${limit}) {
        id
        title
        price
        iconName
        saved
     },
     productsCount
   }
 }
`
const mapStateToProductsSearchSettings = (userId, { users: { productsStore: { [userId]: { searchSettings: { page, limit } } } } }) =>
    [page, limit];

export const loadUserProducts = asyncActionFactoryWithGraphQLQuery(
    (userId, page, state) => graphql(loadUserProductsQuery(userId, ...mapStateToProductsSearchSettings(userId, state))),
    loadUserProductsPending,
    loadUserProductsSuccess,
    loadUserProductsFailed
);

const loadUserSalesPending = (userId, page) => ({
    type: LOAD_USER_SALES_PENDING,
    payload: {
        userId,
        page
    }
});

const loadUserSalesSuccess = ({ user: { sales, salesCount } }, userId, page) => ({
    type: LOAD_USER_SALES_SUCCESS,
    payload: {
        sales,
        userId,
        salesCount
    }
});

const loadUserSalesFailed = (errors) => ({
    type: LOAD_USER_SALES_FAILED
});

const loadUserSalesQuery = (id, page, limit) =>
    `query {
    user(id: ${id}) {
      sales(page: ${page}, limit: ${limit}) {
        id
        product {
            id
            title
        }
        date
      },
      salesCount
    }
  }
`

const mapStateToSalesSearchSettings = (userId, { users: { salesStore: { [userId]: { searchSettings: { page, limit } } } } }) =>
    [page, limit];

export const loadUserSales = asyncActionFactoryWithGraphQLQuery(
    (userId, page, state) => graphql(loadUserSalesQuery(userId, ...mapStateToSalesSearchSettings(userId, state))),
    loadUserSalesPending,
    loadUserSalesSuccess,
    loadUserSalesFailed
);