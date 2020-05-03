const graphqlHTTP = require('express-graphql');
const { ApolloServer, gql, GraphQLUpload, } = require('apollo-server-express');
const { getSessionBySesid } = require('../db/models/session');
const { getUserById } = require('../db/models/user');
const { makeExecutableSchema } = require("graphql-tools");

const { graphqlUploadExpress } = require("graphql-upload");

const schema = makeExecutableSchema({
    typeDefs: require("./typeDefs"),
    resolvers: require("./resolvers")
})

const server = new ApolloServer({
    typeDefs: require("./typeDefs"),
    resolvers: require("./resolvers"),
    schema,
    uploads: false,
    context: async ({ req, res }) => {

        const { sesid } = req.cookies;

        const session = await getSessionBySesid(sesid);

        let user = null;
        if (session) user = await getUserById(session.userId);

        return {
            req, user, res
        }
    }
});



module.exports = (app, corsOptions) => {
    app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
    server.applyMiddleware({ app, cors: corsOptions, path: "/graphql", });;
}