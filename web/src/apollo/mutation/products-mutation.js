import gql from "graphql-tag";

export const CHANGE_SAVED_STATE_MUTATION = gql`
    mutation changeProductState($id: ID!, $state: Boolean!) {
        changeSavedStateOfProduct(id: $id, state: $state)
    }
`;