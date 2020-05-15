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
        price
        imageName
      }
      statuses {
        status
        date
      }
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
        price
      }
      statuses {
        status
        date
      }
    },
    sellerPurchasesCount
  }
`;

export const PURCHASE_ITEM_QUERY = gql`
  query purchase($id: ID!) {
    purchase(id: $id) {
      id
      seller {
        id
        fullName
        iconName
      }
      shopper {
        id
        fullName
        iconName
      }
      product {
        id
        title
        imageName
        price
      }
      statuses {
        status
        date
      }
    }
  }
`;