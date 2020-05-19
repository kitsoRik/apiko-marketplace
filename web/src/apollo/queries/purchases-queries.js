import gql from "graphql-tag";

export const SHOPPER_PURCHASES_QUERY = gql`
	query shopperPurchases(
		$page: Int!
		$limit: Int!
		$viewOpened: Boolean!
		$viewPosted: Boolean!
		$viewCanceled: Boolean!
		$viewClosed: Boolean!
		$sortField: String!
		$sortOrder: SortOrder!
	) {
		shopperPurchases(
			page: $page
			limit: $limit
			viewOpened: $viewOpened
			viewPosted: $viewPosted
			viewCanceled: $viewCanceled
			viewClosed: $viewClosed
			sortField: $sortField
			sortOrder: $sortOrder
		) {
			id
			count
			seller {
				id
				fullName
			}
			shopper {
				id
				fullName
			}
			product {
				id
				title
				price
				imageName
			}
			statuses {
				status
				date
			}
		}
		shopperPurchasesCount(
			viewOpened: $viewOpened
			viewPosted: $viewPosted
			viewCanceled: $viewCanceled
			viewClosed: $viewClosed
		)
	}
`;

export const SELLER_PURCHASES_QUERY = gql`
	query sellerPurchases(
		$page: Int!
		$limit: Int!
		$viewOpened: Boolean!
		$viewPosted: Boolean!
		$viewCanceled: Boolean!
		$viewClosed: Boolean!
		$sortField: String!
		$sortOrder: SortOrder!
	) {
		sellerPurchases(
			page: $page
			limit: $limit
			viewOpened: $viewOpened
			viewPosted: $viewPosted
			viewCanceled: $viewCanceled
			viewClosed: $viewClosed
			sortField: $sortField
			sortOrder: $sortOrder
		) {
			id
			count
			seller {
				id
				fullName
			}
			shopper {
				id
				fullName
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
		sellerPurchasesCount(
			viewOpened: $viewOpened
			viewPosted: $viewPosted
			viewCanceled: $viewCanceled
			viewClosed: $viewClosed
		)
	}
`;

export const PURCHASE_ITEM_QUERY = gql`
	query purchase($id: ID!) {
		purchase(id: $id) {
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
