import React, { useState } from 'react';

import "./FilterPanel.scss";
import Checkbox from '../../../layouts/Checkbox/Checkbox';
import Combobox from '../../../layouts/Combobox/Combobox';
import ComboboxOption from '../../../layouts/Combobox/ComboboxOption/ComboboxOption';
import Form from '../../../layouts/Form';
import SortIcon from '../../../icons/SortIcon/SortIcon';

const FilterPanel = ({
    viewOpened,
    setViewOpened,
    viewPosted,
    setViewPosted,
    viewCanceled,
    setViewCanceled,
    viewClosed,
    setViewClosed,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder
}) => {

    return (
        <Form className="purchases-page-filtering-panel">
            <Checkbox checked={viewOpened} value="Opened" onValueChange={setViewOpened} />
            <Checkbox checked={viewPosted} value="Posted" onValueChange={setViewPosted} />
            <Checkbox checked={viewCanceled} value="Canceled" onValueChange={setViewCanceled} />
            <Checkbox checked={viewClosed} value="Closed" onValueChange={setViewClosed} />
            <Combobox value={sortField} onChange={setSortField} >
                <ComboboxOption value="created">Created</ComboboxOption>
                <ComboboxOption value="changed">Changed</ComboboxOption>
                <ComboboxOption value="count">Count</ComboboxOption>
                <ComboboxOption value="price">Item price</ComboboxOption>
                <ComboboxOption value="total">Total price</ComboboxOption>
            </Combobox>
            <SortIcon
                className="purchases-page-filtering-panel-sort"
                order={sortOrder}
                onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")} />
        </Form>
    )
};

export default FilterPanel;