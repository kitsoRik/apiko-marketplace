export const productsWithChangingSavedState = (
	products = [],
	changingSavedStateOfProductsIds = []
) =>
	products.map((p) => ({
		...p,
		changingSaveState:
			changingSavedStateOfProductsIds.indexOf(p.id) !== -1,
	}));
