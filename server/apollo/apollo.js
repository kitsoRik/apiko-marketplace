const graphqlHTTP = require('express-graphql');
const { ApolloServer, gql, GraphQLUpload, PubSub } = require('apollo-server-express');
const { getSessionBySesid } = require('../db/models/session');
const { getUserById } = require('../db/models/user');
const { makeExecutableSchema } = require("graphql-tools");
const { graphqlUploadExpress } = require("graphql-upload");
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');


const server = new ApolloServer({
    typeDefs: require("./typeDefs"),
    resolvers: require("./resolvers"),
    uploads: false,
    subscriptions: {
        path: "/subscriptions",
        onConnect: async (connectionParams, webSocket, context) => {
        },
        onDisconnect: async (webSocket, context) => {
        }
    },
    validationRules: [
        require("graphql-depth-limit")(5)
    ],
    context: async ({ req, res }) => {

        const { sesid } = (req ? req : { cookies: {} }).cookies;

        const session = await getSessionBySesid(sesid);

        let user = null;
        if (session) user = await getUserById(session.userId);

        return {
            req, user, res
        }
    },
});



module.exports = (app, corsOptions) => {
    app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
    server.applyMiddleware({ app, cors: corsOptions, path: "/graphql", });
    const s = createServer(app).listen(3501);
    server.installSubscriptionHandlers(s);
}