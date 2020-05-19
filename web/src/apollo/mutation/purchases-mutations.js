import gql from "graphql-tag";

export const CHANGE_PURCHASE_STATUS = gql`
	mutation changePurchaseStatus($purchaseId: ID!, $status: PurchaseStatus!) {
		changePurchaseStatus(purchaseId: $purchaseId, status: $status) {
			id
		}
	}
`;
