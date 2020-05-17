
export const addProductsTitleQuery = (title) => localStorage.setItem("PRODUCTS_TITLE_QUERY", JSON.stringify(getLatestProductsTitleQuery().reverse().filter(i => i !== title).concat([title])));
export const getLatestProductsTitleQuery = () => JSON.parse(localStorage.getItem("PRODUCTS_TITLE_QUERY"))?.reverse().filter((c, i) => i < 8) ?? [];
