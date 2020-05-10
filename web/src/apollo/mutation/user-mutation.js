import gql from "graphql-tag";

export const CHANGE_CART_ITEM_COUNT = gql`
    mutation changeCartItemCount($productId: ID!, $count: Int!) {
        changeCartItemCount(productId: $productId, count: $count) 
    }
`;

export const ADD_PRODUCT_TO_CARD = gql`
    mutation addProductToCart($productId: ID!, $count: Int!) {
        addProductToCart(productId: $productId, count: $count)
    }
`;