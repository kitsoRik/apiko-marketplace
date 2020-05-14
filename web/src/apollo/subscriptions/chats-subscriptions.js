import gql from "graphql-tag";

export const CHAT_CREATED_SUBSCRIPTION = gql`
subscription onChatCreated {
    chatCreated {
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
        messages(page: 1, limit: 1) {
            id
            text
            createdAt
        }
    }
}
`;

export const MESSAGE_SENT_SUBSCRIPTION = gql`
subscription onMessageSent($chatId: ID!) {
    messageSent(chatId: $chatId) {
        id
        writter {
        id
        }
        text
        createdAt
    }
}`