import React from 'react';

import "./SearchPanel.scss";
import Combobox from '../../../layouts/Combobox/Combobox';
import ComboboxOption from '../../../layouts/Combobox/ComboboxOption/ComboboxOption';
import TextField from '../../../layouts/TextField';
import Form from '../../../layouts/Form';
import CategoryIcon from '../../../icons/CategoryIcon/CategoryIcon';
import SortIcon from '../../../icons/SortIcon/SortIcon';

const SearchPanel = ({
    category,
    setCategory,
    priceFrom,
    setPriceFrom,
    priceTo,
    setPriceTo,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder
}) => {
    return (
        <Form className="home-page-search-panel">
            <Combobox type="medium" value={category} onChange={setCategory} >
                <ComboboxOption icon={<CategoryIcon />} value="any">Choose category</ComboboxOption>
                <ComboboxOption value="mebels">Mebels</ComboboxOption>
                <ComboboxOption value="technology">Technology</ComboboxOption>
            </Combobox>
            <TextField type="medium" placeholder="Price from (USD)" value={priceFrom} onValueChange={setPriceFrom} />
            <TextField type="medium" placeholder="Price to (USD)" value={priceTo} onValueChange={setPriceTo} />
            <Combobox type="medium" value={sortField} onChange={setSortField}>
                <ComboboxOption value="createdAt">Date</ComboboxOption>
                <ComboboxOption value="title">Title</ComboboxOption>
                <ComboboxOption value="rate">Rate</ComboboxOption>
            </Combobox>
            <SortIcon
                style={{ transform: `scaleY(${sortOrder === "DESC" ? 1 : -1})` }}
                onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
            />
        </Form>
    )
};

export default SearchPanel;