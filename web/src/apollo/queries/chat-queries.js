import gql from "graphql-tag";

export const CHATS_QUERY = gql`
query {
    chats {
      id
      shopper {
        id
        fullName
        iconName
      }
      seller {
        id
        fullName
        iconName
      }
      product {
        id
        title
        imageName
      }
      product {
        id
      }
    }
  }
`;