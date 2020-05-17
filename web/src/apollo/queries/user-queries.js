import gql from "graphql-tag";


export const CURRENT_USER_QUERY = gql`
    query {
        currentUser {
            id
            fullName
            email
            phone
            location {
                id
                name
                longitude
                latitude
            }
            iconName
        }
    }
`;

export const CURRENT_USER_CART_QUERY = gql`
    query {
        currentUser {
            id
            cartProducts {
                product {
                    id
                    title
                    imageName
                    price
                }
                count
            }
        }
    }
`;