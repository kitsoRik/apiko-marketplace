import React from "react";

import "./FilterPanel.scss";
import Checkbox from "../../../layouts/Checkbox/Checkbox";
import Combobox from "../../../layouts/Combobox/Combobox";
import ComboboxOption from "../../../layouts/Combobox/ComboboxOption/ComboboxOption";
import Form from "../../../layouts/Form";
import SortIcon from "../../../icons/SortIcon/SortIcon";
import useLocationQuery from "react-use-location-query";
import DateIcon from "../../../icons/DateIcon";
import CountIcon from "../../../icons/CountIcon/CountIcon";
import TotalPriceIcon from "../../../icons/TotalPriceIcon/TotalPriceIcon";
import PriceItemIcon from "../../../icons/PriceItemIcon/PriceItemIcon";

const FilterPanel = () => {
	const {
		query: {
			viewOpened,
			viewPosted,
			viewCanceled,
			viewClosed,
			sortField,
			sortOrder,
		},
		setQuery,
	} = useLocationQuery({}, { parseBoolean: true });

	const setViewOpened = (viewOpened) => setQuery({ viewOpened });
	const setViewPosted = (viewPosted) => setQuery({ viewPosted });
	const setViewCanceled = (viewCanceled) => setQuery({ viewCanceled });
	const setViewClosed = (viewClosed) => setQuery({ viewClosed });
	const setSortField = (sortField) => setQuery({ sortField });
	const setSortOrder = (sortOrder) => setQuery({ sortOrder });

	return (
		<Form className="purchases-page-filter-panel">
			<Checkbox
				checked={viewOpened}
				value="Opened"
				onValueChange={setViewOpened}
			/>
			<Checkbox
				checked={viewPosted}
				value="Posted"
				onValueChange={setViewPosted}
			/>
			<Checkbox
				checked={viewCanceled}
				value="Canceled"
				onValueChange={setViewCanceled}
			/>
			<Checkbox
				checked={viewClosed}
				value="Closed"
				onValueChange={setViewClosed}
			/>
			<Combobox
				className="purchases-page-filter-panel-sort-field"
				value={sortField}
				onChange={setSortField}
			>
				<ComboboxOption icon={<DateIcon />} value="created">
					Created
				</ComboboxOption>
				<ComboboxOption icon={<DateIcon />} value="changed">
					Changed
				</ComboboxOption>
				<ComboboxOption icon={<CountIcon />} value="count">
					Count
				</ComboboxOption>
				<ComboboxOption icon={<PriceItemIcon />} value="price">
					Item price
				</ComboboxOption>
				<ComboboxOption icon={<TotalPriceIcon />} value="total">
					Total price
				</ComboboxOption>
			</Combobox>
			<SortIcon
				className="purchases-page-filter-panel-sort"
				order={sortOrder}
				onClick={() =>
					setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")
				}
			/>
		</Form>
	);
};

export default FilterPanel;
