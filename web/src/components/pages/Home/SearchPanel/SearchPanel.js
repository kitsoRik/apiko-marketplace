import React from 'react';

import "./SearchPanel.scss";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { changeProductSearchQuery, searchProducts } from '../../../../redux/actions/products-actions';
import Combobox from '../../../layouts/Combobox/Combobox';
import ComboboxOption from '../../../layouts/Combobox/ComboboxOption/ComboboxOption';
import TextField from '../../../layouts/TextField';
import Form from '../../../layouts/Form';
import Icon from '../../../layouts/Icon';
import CategoryIcon from '../../../icons/CategoryIcon/CategoryIcon';

const SearchPanel = ({ searchQuery: { category, priceFrom, priceTo }, changeProductSearchQuery }) => {
    return (
        <Form className="home-page-search-panel">
            <Combobox type="medium" value={category} onChange={category => changeProductSearchQuery({ category })}>
                <ComboboxOption icon={<CategoryIcon />} value="any">Choose category</ComboboxOption>
                <ComboboxOption value="mebels">Mebels</ComboboxOption>
                <ComboboxOption value="technology">Technology</ComboboxOption>
            </Combobox>
            <TextField type="medium" placeholder="Price from (USD)" value={priceFrom} onValueChange={priceFrom => changeProductSearchQuery({ priceFrom })} />
            <TextField type="medium" placeholder="Price to (USD)" value={priceTo} onValueChange={priceTo => changeProductSearchQuery({ priceTo })} />
        </Form>
    )
};

const mapStateToProps = ({ products: { searchQuery } }) => ({ searchQuery });

export default compose(
    connect(mapStateToProps, { searchProducts, changeProductSearchQuery })
)(SearchPanel);