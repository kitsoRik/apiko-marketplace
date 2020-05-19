import {
	CHANGE_PRODUCTS_SEARCH_QUERY,
	SEARCH_PRODUCTS,
	SEARCH_PRODUCTS_HINT,
} from "../actions/products-actions";

const initState = {
	searchQuery: {
		title: "",
		locationId: -1,
		category: "any",
		sortField: "rate",
		sortOrder: "ASC",
		priceFrom: -1,
		priceTo: -1,
		page: 1,
		limit: 12,
	},
	reactionSearchQuery: {
		title: "",
		locationId: -1,
		category: "any",
		sortField: "rate",
		sortOrder: "ASC",
		priceFrom: -1,
		priceTo: -1,
		page: 1,
		limit: 12,
	},
	searchProductsHintQuery: {
		title: "",
	},
};

const productsReducer = (state = initState, action) => {
	switch (action.type) {
		case CHANGE_PRODUCTS_SEARCH_QUERY: {
			return {
				...state,
				searchQuery: {
					...state.searchQuery,
					...action.payload.changes,
				},
			};
		}

		case SEARCH_PRODUCTS: {
			return {
				...state,
				reactionSearchQuery: action.payload.searchQuery,
			};
		}

		case SEARCH_PRODUCTS_HINT: {
			return {
				...state,
				searchProductsHintQuery: {
					...state.searchProductsHintQuery,
					title: action.payload.title,
				},
			};
		}

		default:
			return state;
	}
};

export default productsReducer;
