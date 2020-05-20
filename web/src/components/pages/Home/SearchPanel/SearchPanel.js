import React from "react";

import "./SearchPanel.scss";
import Combobox from "../../../layouts/Combobox/Combobox";
import ComboboxOption from "../../../layouts/Combobox/ComboboxOption/ComboboxOption";
import TextField from "../../../layouts/TextField";
import Form from "../../../layouts/Form";
import CategoryIcon from "../../../icons/CategoryIcon/CategoryIcon";
import SortIcon from "../../../icons/SortIcon/SortIcon";
import useLocationQuery from "react-use-location-query";
import { productCategories } from "../../../../constants/categories";
import CrossIcon from "../../../icons/CrossIcon/CrossIcon";
import DateIcon from "../../../icons/DateIcon";
import TitleIcon from "../../../icons/TitleIcon";
import RateIcon from "../../../icons/RateIcon";

const SearchPanel = ({ changeProductsSearchQuery, searchProducts }) => {
	const { query, setQuery } = useLocationQuery(
		{},
		{ parseNumber: true, allowArray: true }
	);
	const { category, priceFrom, priceTo, sortField, sortOrder } = query;

	const onChangeSearchOptions = (changes, search = false) => {
		changeProductsSearchQuery(changes);
		setQuery(changes);

		if (search) searchProducts();
	};

	const setCategory = (category) =>
		onChangeSearchOptions({ category }, true);
	const setPriceFrom = (priceFrom) =>
		onChangeSearchOptions({
			priceFrom: priceFrom === "" ? -1 : +priceFrom,
		});
	const setPriceTo = (priceTo) =>
		onChangeSearchOptions({ priceTo: priceTo === "" ? -1 : +priceTo });
	const setSortField = (sortField) =>
		onChangeSearchOptions({ sortField }, true);
	const setSortOrder = (sortOrder) =>
		onChangeSearchOptions({ sortOrder }, true);

	const _priceFrom = priceFrom === -1 ? "" : priceFrom;
	const _priceTo = priceTo === -1 ? "" : priceTo;

	const clearQuery = () => {
		onChangeSearchOptions({
			category: "any",
			priceFrom: -1,
			priceTo: -1,
			sortField: "rate",
			sortOrder: "ASC",
		});
	};

	return (
		<Form className="home-page-search-panel">
			<Combobox
				className="home-page-search-panel-category"
				type="medium"
				value={category}
				onChange={setCategory}
			>
				{[
					<ComboboxOption icon={<CategoryIcon />} value="any">
						Choose category
					</ComboboxOption>,
				].concat(
					productCategories.map((c) => (
						<ComboboxOption
							key={c.key}
							icon={c.icon}
							value={c.key}
						>
							{c.value}
						</ComboboxOption>
					))
				)}
			</Combobox>
			<TextField
				className="home-page-search-panel-price-from"
				type="medium"
				placeholder="Price from (USD)"
				value={_priceFrom}
				onValueChange={setPriceFrom}
			/>
			<TextField
				className="home-page-search-panel-price-to"
				type="medium"
				placeholder="Price to (USD)"
				value={_priceTo}
				onValueChange={setPriceTo}
			/>
			<Combobox
				className="home-page-search-panel-sort-field"
				type="medium"
				value={sortField}
				onChange={setSortField}
			>
				<ComboboxOption icon={<DateIcon />} value="createdAt">
					Date
				</ComboboxOption>
				<ComboboxOption icon={<TitleIcon />} value="title">
					Title
				</ComboboxOption>
				<ComboboxOption icon={<RateIcon />} value="rate">
					Rate
				</ComboboxOption>
			</Combobox>
			<SortIcon
				style={{
					transform: `scaleY(${sortOrder === "DESC" ? 1 : -1})`,
				}}
				onClick={() =>
					setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")
				}
			/>
			<button
				className="home-page-search-panel-cross-button"
				onClick={clearQuery}
			>
				<CrossIcon />
			</button>
		</Form>
	);
};

export default SearchPanel;
