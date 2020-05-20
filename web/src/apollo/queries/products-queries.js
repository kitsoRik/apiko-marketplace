import gql from "graphql-tag";

export const PRODUCTS_QUERY = gql`
	query productsQuery(
		$title: String!
		$locationId: ID
		$category: String!
		$sortField: String!
		$sortOrder: SortOrder!
		$priceFrom: Float!
		$priceTo: Float!
		$page: Int
		$limit: Int
	) {
		products(
			title: $title
			location: ""
			locationId: $locationId
			category: $category
			sortField: $sortField
			sortOrder: $sortOrder
			priceFrom: $priceFrom
			priceTo: $priceTo
			page: $page
			limit: $limit
		) {
			id
			title
			price
			saved
			imageName
		}
		productsCount(
			title: $title
			location: ""
			locationId: $locationId
			category: $category
			priceFrom: $priceFrom
			priceTo: $priceTo
		)
	}
`;

export const SAVED_PRODUCTS_QUERY = gql`
	query {
		savedProducts(page: 1, limit: 10) {
			id
			title
			price
			saved
			imageName
			createdAt
		}
		savedProductsCount
	}
`;

export const PRODUCT_QUERY = gql`
	query getProduct($id: ID!) {
		product(id: $id) {
			id
			title
			price
			description
			imageName
			photosNames
			createdAt
			saved
			owner {
				id
				fullName
				iconName
				location {
					id
					name
				}
			}
			location {
				id
				name
				latitude
				longitude
			}
		}
	}
`;

export const PRODUCT_FEEDBACKS_QUERY = gql`
	query getProductFeedbacks($productId: ID!, $page: Int!, $limit: Int!) {
		product(id: $productId) {
			id
			feedbacks(page: $page, limit: $limit) {
				id
				user {
					id
					fullName
					iconName
				}
				rate
				text
			}
			feedbacksCount
		}
	}
`;
