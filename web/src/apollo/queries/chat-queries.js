import gql from "graphql-tag";

export const CHATS_QUERY = gql`
	query {
		chats {
			id
			shopper {
				id
				fullName
				iconName
			}
			seller {
				id
				fullName
				iconName
			}
			product {
				id
				title
				price
				imageName
			}
			messages {
				id
				text
				createdAt
			}
		}
	}
`;

export const CHAT_QUERY = gql`
	query getChat($id: ID!) {
		chat(id: $id) {
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
		}
	}
`;

export const CHAT_MESSAGES_QUERY = gql`
	query chatMessages($id: ID!, $page: Int = 1, $limit: Int = 10) {
		chat(id: $id) {
			id
			messages(page: $page, limit: $limit) {
				id
				writter {
					id
				}
				text
				createdAt
			}
			messagesCount
		}
	}
`;

export const CHATS_LIST_QUERY = gql`
	query {
		chats {
			id
			shopper {
				id
				fullName
				iconName
			}
			seller {
				id
				fullName
				iconName
			}
			product {
				id
				title
				price
				imageName
			}
			messages(page: 1, limit: 1) {
				id
				text
				createdAt
			}
		}
	}
`;
