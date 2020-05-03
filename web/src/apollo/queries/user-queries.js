import { gql } from "apollo-boost";


export const CURRENT_USER_QUERY = gql`
    query {
        currentUser {
            id
            fullName
            email
            iconName
        }
    }
`;