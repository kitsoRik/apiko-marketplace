import gql from "graphql-tag";

export const USER_LEAVED_SUBSCRIPTION = gql`
    subscription {
        userLeaved
    }
`;