import gql from "graphql-tag";

export const SHOPPER_PURCHASES_QUERY = gql`
query shopperPurchases($page: Int!, $limit: Int!){
    shopperPurchases(page: $page, limit: $limit) {
      id
      seller {
        id
        fullName
      }
      shopper {
        id
        fullName
      }
      product {
        id
        title
        imageName
      }
      date 
    },
    shopperPurchasesCount
  }
`;

export const SELLER_PURCHASES_QUERY = gql`
query sellerPurchases($page: Int!, $limit: Int!){
    sellerPurchases(page: $page, limit: $limit) {
      id
      seller {
        id
        fullName
      }
      shopper {
        id
        fullName
      }
      product {
        id
        title
        imageName
      }
      date 
    },
    sellerPurchasesCount
  }
`;