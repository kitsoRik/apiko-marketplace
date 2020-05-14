import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from '@apollo/link-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { HOST } from "../services/api/api";
import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
    uri: HOST + '/graphql',
    credentials: 'include'
});

const webSocketLink = new WebSocketLink({
    uri: 'ws://localhost:3501/subscriptions',
    options: {
        reconnect: true
    }
});

const link = split(({ query }) => {
    const definition = getMainDefinition(query);
    return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    );
}, webSocketLink, uploadLink);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
        typePolicies: {
            Product: {
                keyFields: ['id']
            },
            User: {
                keyFields: ['id']
            },
            Feedback: {
                keyFields: ['id']
            },
            Chat: {
                keyFields: ['id']
            },
            Message: {
                keyFields: ['id']
            }
        }
    }),
    credentials: 'include'
});


export default client;