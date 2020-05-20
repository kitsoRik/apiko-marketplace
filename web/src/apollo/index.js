import { ApolloClient, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/link-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { WSHOST, HOST } from "../services/api/api";
import { createUploadLink } from "apollo-upload-client";
import { ErrorLink } from "apollo-link-error";
import { notifyError } from "../components/other/Snackbar/Snackbar";

const uploadLink = createUploadLink({
	uri: HOST + "/graphql",
	credentials: "include",
});

const webSocketLink = new WebSocketLink({
	uri: `${WSHOST}/subscriptions`,
	options: {
		reconnect: true,

		connectionParams: {
			cookies: document.cookie,
		},
	},
});

const errorLink = new ErrorLink(({ networkError }) => {
	if (
		networkError &&
		networkError.message !== "argument str must be a string"
	) {
		notifyError("Network connection lost, reload page.", "qwe");
	}
});

export const socketReconnect = () => {
	webSocketLink.subscriptionClient.close();
	webSocketLink.subscriptionClient.tryReconnect();
};

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	webSocketLink,
	uploadLink
);

const client = new ApolloClient({
	link: errorLink.concat(link),
	cache: new InMemoryCache({
		typePolicies: {
			Product: {
				keyFields: ["id"],
			},
			User: {
				keyFields: ["id"],
			},
			Feedback: {
				keyFields: ["id"],
			},
			Chat: {
				keyFields: ["id"],
			},
			Message: {
				keyFields: ["id"],
			},
			Purchase: {
				keyFields: ["id"],
			},
		},
	}),
	credentials: "include",
});

export default client;
