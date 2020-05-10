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
        price
        imageName
      }
      messages {
          id
          text
          createdAt
      }
    }
  }
`;

export const CHAT_QUERY = gql`
query getChat($id: ID!){
    chat(id: $id) {
      id
      product {
        id
        title
        price
        imageName
      }
      seller {
        id
        fullName
        iconName
      }
      shopper  {
        id
        fullName
        iconName
      }
      messages {
        id
        text
        writter {
          id
        }
      }
    }
  }

`;

export const CHAT_MESSAGES_QUERY = gql`
query chatMessages($id: ID!){
    chat(id: $id) {
        id
      messages {
        id
        writter {
          id
        }
        text
        createdAt
      }
    }
  }
`;

export const CHATS_LIST_QUERY = gql`
  query  {
    chats {
      id
      product {
        id
      }
    }
  }
`;