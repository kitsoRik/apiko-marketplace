import gql from "graphql-tag";

export const CHAT_FRAGMENT = gql`
fragment chat on Chat {
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
    shopper {
        id
        fullName
        iconName
    }
}
`;