import gql from "graphql-tag";

export const FEEDBACK_ADDED = gql`
	subscription onFeedbackAdded($productId: ID!) {
		feedbackAdded(productId: $productId) {
			id
			user {
				id
				fullName
				iconName
			}
			rate
			text
		}
	}
`;
