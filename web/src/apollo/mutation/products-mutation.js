import gql from "graphql-tag";

export const CHANGE_SAVED_STATE_MUTATION = gql`
    mutation changeProductState($id: ID!, $state: Boolean!) {
        changeSavedStateOfProduct(id: $id, state: $state)
    }
`;

export const ADD_FEEDBACK_MTUTATIOn = gql`
    mutation addFeedback($productId: ID!, $rate: Float!, $text: String!) {
        addFeedback(productId: $productId, rate: $rate, text: $text) {
            id
        }
    }
`;

export const PURCHASE_MUTATION = gql`
    mutation purchase($purchases: [SinglePurchaseInput!]!) {
        purchase(purchases: $purchases) 
    }
`;