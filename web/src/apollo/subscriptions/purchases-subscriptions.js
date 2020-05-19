import gql from "graphql-tag";

export const PURCHASE_STATUS_CHANGED = gql`
	subscription onPurchaseStatusChanged {
		purchaseStatusChanged {
			id
			statuses {
				status
				date
			}
		}
	}
`;

export const PURCHASE_CREATED = gql`
	subscription onPurchaseCreated {
		purchaseCreated {
			id
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
			product {
				id
				title
				imageName
				price
			}
			statuses {
				status
				date
			}
		}
	}
`;
