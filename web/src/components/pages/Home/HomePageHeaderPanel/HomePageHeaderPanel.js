import React, { useState } from 'react';

import "./HomePageHeaderPanel.scss";
import TextField from '../../../layouts/TextField';
import TextFieldAutocompleteOption from '../../../layouts/TextField/TextFieldAutocompleteOption';
import Button from '../../../layouts/Button';
import Icon from '../../../layouts/Icon';
import SearchIcon from '../../../icons/SearchIcon/SearchIcon';
import { compose } from 'redux';
import { searchProducts, changeProductSearchQuery, loadSearchProductsHint, loadSearchLocationsHint } from '../../../../redux/actions/products-actions';
import { productsWithChangingSavedState } from '../../../../redux/mappers/products-mappers';
import { connect } from 'react-redux';

import _ from 'lodash';
import { LOADING } from '../../../../constants';
import api from '../../../../services/api';
import { useHistory } from 'react-router-dom';

const loadHintsWithDebounce = _.debounce((load) => {
    load();
}, 400);

const HomePageHeaderPanel = ({
    searchQuery,
    searchProducts,
    changeProductSearchQuery,
    loadSearchProductsHint,
    loadSearchLocationsHint,
    responseQuery: {
        productsHint,
        productsHintLoadingState,
        locationsHint,
        locationsHintLoadingState
    } }) => {

    const search = () => {
        searchProducts();
    }

    const onChangeTitleField = (title) => {
        changeProductSearchQuery({ title });
        loadHintsWithDebounce(loadSearchProductsHint);
    };

    const onChangeLocationField = (location) => {
        changeProductSearchQuery({ location });
        loadHintsWithDebounce(loadSearchLocationsHint);
    }
    return (
        <div className="home-page-header-panel">
            <TextField
                value={searchQuery.title}
                loading={productsHintLoadingState === LOADING}
                autoCompleteOptions={
                    productsHint.map(product =>
                        <TextFieldAutocompleteOption key={product.id} Component={AutocompleteProduct} textValue={product.title} value={product} />)
                }
                autoCompleteOptionsWhenEmptyHeader={
                    <div className="home-page-header-panel-text-field-autocomplete-recent-products-header">
                        <span>Recent searches</span>
                        <Button.Transparent style={{ color: '#349A89' }} value="Clear All" onClick={() => alert(1)} />
                    </div>}
                autoCompleteOptionsWhenEmpty={
                    ["aaa", "bbb"].map(item => <TextFieldAutocompleteOption className="home-page-header-panel-text-field-autocomplete-recent-products-item" key={item} textValue={item} value={item} icon={<SearchIcon color="#CECECE" style={{ width: '17px', height: '18px' }} />} />)
                }
                onChange={onChangeTitleField}
                placeholder="Search products by name" icon={<SearchIcon style={{ width: '17px', height: '18px' }} />} />
            <TextField placeholder="Location" value={searchQuery.location} icon={
                <Icon>
                    <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.22222 0C2.91694 0 0 2.80662 0 5.77778C0 11.7808 5.9422 18.3683 5.77778 18.7778C6.27255 18.7295 6.38357 18.7778 7.22222 18.7778C6.62727 18.7706 6.73016 18.7295 7.22222 18.7778C7.06051 18.3604 13 11.6634 13 5.77778C13 2.80662 10.0831 0 7.22222 0ZM7.22222 8.66667C5.30418 8.66667 4.33333 7.69815 4.33333 7.22222C4.33333 5.30426 5.30418 4.33333 7.22222 4.33333C7.69582 4.33333 8.66667 5.30426 8.66667 7.22222C8.66667 7.69815 7.69582 8.66667 7.22222 8.66667Z" fill="#5C5C5C" />
                    </svg>
                </Icon>
            } autoCompleteOptions={locationsHint.map(l => <TextFieldAutocompleteOption onSelect={() => changeProductSearchQuery({ locationId: l.id })} key={l.id} value={l.name} textValue={l.name} />)}
                onChange={onChangeLocationField}
                loading={locationsHintLoadingState === LOADING}
            />
            <Button.Martinique style={{ textTransform: "uppercase" }} value="Search" onClick={search} />
        </div>
    )
};

const mapStateToProps = ({ user: { loadingDataState },
    products: {
        products,
        changingSavedStateOfProductsIds,
        productsLoadingState,
        searchQuery,
        responseQuery, }
}) => ({
    loadingDataState,
    productsLoadingState,
    searchQuery,
    responseQuery,
    products: productsWithChangingSavedState(products, changingSavedStateOfProductsIds)
});

export default compose(
    connect(mapStateToProps, { searchProducts, changeProductSearchQuery, loadSearchProductsHint, loadSearchLocationsHint })
)(HomePageHeaderPanel);

const AutocompleteProduct = ({ value, active, compareValue }) => {

    const history = useHistory();

    const { id, title, imageName, price } = value;

    return (
        <div
            className="home-page-header-panel-text-field-autocomplete-products"
            active={active ? "true" : null}
            onClick={() => history.push(`/products/${id}`)}
        >
            <div className="home-page-header-panel-text-field-autocomplete-products-icon">
                <img src={`${api.productsImageBaseUrl}${imageName}`} alt="Product" />
            </div>
            <span>{title}</span>
            <span>${price}</span>
        </div>
    )
}