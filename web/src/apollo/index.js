import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HOST } from "../services/api/api";
import { createUploadLink } from "apollo-upload-client";


const client = new ApolloClient({
    link: createUploadLink({

        uri: HOST + '/graphql',
        credentials: 'include'
    }),
    cache: new InMemoryCache({
        dataIdFromObject: o => {
            return o.id;
        }
    }),
    credentials: 'include'
});

export default client;