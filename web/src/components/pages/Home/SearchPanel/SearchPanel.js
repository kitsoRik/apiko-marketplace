import React from 'react';

import "./SearchPanel.scss";
import Combobox from '../../../layouts/Combobox/Combobox';
import ComboboxOption from '../../../layouts/Combobox/ComboboxOption/ComboboxOption';
import TextField from '../../../layouts/TextField';
import Form from '../../../layouts/Form';
import CategoryIcon from '../../../icons/CategoryIcon/CategoryIcon';
import SortIcon from '../../../icons/SortIcon/SortIcon';
import useLocationQuery from 'react-use-location-query';
import CrossIcon from '../../../icons/CrossIcon/CrossIcon';

const SearchPanel = ({ changeProductsSearchQuery, searchProducts }) => {
    const { query, setQuery } = useLocationQuery({}, { parseNumber: true, allowArray: true });
    const { category, priceFrom, priceTo, sortField, sortOrder } = query;

    const onChangeSearchOptions = (changes, search = false) => {
        changeProductsSearchQuery(changes);
        setQuery(changes);

        if (search) searchProducts();
    }

    const setCategory = category => onChangeSearchOptions({ category }, true);
    const setPriceFrom = (priceFrom) => onChangeSearchOptions({ priceFrom: priceFrom === "" ? -1 : +priceFrom });
    const setPriceTo = (priceTo) => onChangeSearchOptions({ priceTo: priceTo === "" ? -1 : +priceTo });
    const setSortField = sortField => onChangeSearchOptions({ sortField }, true);
    const setSortOrder = sortOrder => onChangeSearchOptions({ sortOrder }, true);

    const _priceFrom = priceFrom === -1 ? "" : priceFrom;
    const _priceTo = priceTo === -1 ? "" : priceTo;

    const clearQuery = () => {
        onChangeSearchOptions({
            category: "any",
            priceFrom: -1,
            priceTo: -1,
            sortField: "rate",
            sortOrder: "ASC"
        })
    }

    return (
        <Form className="home-page-search-panel">
            <Combobox type="medium" value={category} onChange={setCategory} >
                <ComboboxOption icon={<CategoryIcon />} value="any">Choose category</ComboboxOption>
                <ComboboxOption value="mebels">Mebels</ComboboxOption>
                <ComboboxOption value="technology">Technology</ComboboxOption>
            </Combobox>
            <TextField type="medium" placeholder="Price from (USD)" value={_priceFrom} onValueChange={setPriceFrom} />
            <TextField type="medium" placeholder="Price to (USD)" value={_priceTo} onValueChange={setPriceTo} />
            <Combobox type="medium" value={sortField} onChange={setSortField}>
                <ComboboxOption value="createdAt">Date</ComboboxOption>
                <ComboboxOption value="title">Title</ComboboxOption>
                <ComboboxOption value="rate">Rate</ComboboxOption>
            </Combobox>
            <SortIcon
                style={{ transform: `scaleY(${sortOrder === "DESC" ? 1 : -1})` }}
                onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
            />
            <button className="home-page-search-panel-cross-button" onClick={clearQuery}>
                <CrossIcon />
            </button>
        </Form>
    )
};

export default SearchPanel;