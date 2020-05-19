import gql from "graphql-tag";

export const CURRENT_USER_QUERY = gql`
	query {
		currentUser {
			id
			fullName
			email
			phone
			location {
				id
				name
				longitude
				latitude
			}
			iconName
		}
	}
`;

export const CURRENT_USER_CART_QUERY = gql`
	query {
		currentUser {
			id
			cartProducts {
				product {
					id
					title
					imageName
					price
				}
				count
			}
		}
	}
`;

export const USER_QUERY = gql`
	query user($id: ID!) {
		user(id: $id) {
		id
			fullName
			email
			phone
			location {
				id
				name
				longitude
				latitude
			}
			iconName
	}
	}
`;

export const USER_PROFILE_DATA_QUERY = gql`
	query user($id: ID!) {
		user(id: $id) {
			id
			productsCount
			salesCount
			feedbacksCount
			positiveFeedbacksCount
		}
	}
`;
;