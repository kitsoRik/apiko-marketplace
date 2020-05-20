const graphqlHTTP = require("express-graphql");
const {
	ApolloServer,
	gql,
	GraphQLUpload,
	PubSub,
} = require("apollo-server-express");
const { getSessionBySesid } = require("../db/models/session");
const { getUserById } = require("../db/models/user");
const { makeExecutableSchema } = require("graphql-tools");
const { graphqlUploadExpress } = require("graphql-upload");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const cookie = require("cookie");

const server = new ApolloServer({
	typeDefs: require("./typeDefs"),
	resolvers: require("./resolvers"),
	uploads: false,
	subscriptions: {
		path: "/subscriptions",
		onConnect: async (connectionParams, webSocket, { request }) => {
			const { sesid } = cookie.parse(request.headers.cookie);
			const session = await getSessionBySesid(sesid);

			let user = null;
			if (session) user = await getUserById(session.userId);
			return {
				user,
			};
		},
		onDisconnect: async (webSocket, context) => {},
	},
	validationRules: [require("graphql-depth-limit")(5)],
	context: async ({ req, res, connection }) => {
		if (connection) {
			return connection.context;
		}
		const { sesid } = (req ? req : { cookies: {} }).cookies;

		const session = await getSessionBySesid(sesid);

		let user = null;
		if (session) user = await getUserById(session.userId);
		return {
			req,
			user,
			res,
		};
	},
});

module.exports = (app, http, corsOptions) => {
	app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));
	server.applyMiddleware({ app, cors: corsOptions, path: "/graphql" });
	server.installSubscriptionHandlers(http);
};
