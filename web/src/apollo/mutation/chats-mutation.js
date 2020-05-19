import gql from "graphql-tag";

export const CREATE_CHAT_MUTATION = gql`
	mutation createChat($productId: ID!, $initialMessage: String!) {
		createChat(productId: $productId, initialMessage: $initialMessage) {
			id
			product {
				id
				title
				price
				imageName
			}
			seller {
				id
				fullName
				iconName
			}
			shopper {
				id
				fullName
				iconName
			}
			messages {
				id
				text
			}
		}
	}
`;
