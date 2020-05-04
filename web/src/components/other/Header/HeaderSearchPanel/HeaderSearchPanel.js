import React, { useCallback } from 'react';

import "./HeaderSearchPanel.scss";
import TextField from '../../../layouts/TextField';
import LocationTextField from '../../LocationTextField';
import TextFieldAutocompleteOption from '../../../layouts/TextField/TextFieldAutocompleteOption';
import Button from '../../../layouts/Button';
import SearchIcon from '../../../icons/SearchIcon/SearchIcon';

import _ from 'lodash';
import api from '../../../../services/api';
import { useHistory } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { changeProductsSearchQuery, searchProducts, searchProductsHint } from '../../../../redux/actions/products-actions';
import { getLatestProductsTitleQuery, addProductsTitleQuery } from '../../../../services/localstorage/localstore';

const HeaderSearchPanel = ({ title, locationId, searchProductsHintQuery, searchProductsHint, changeProductsSearchQuery, searchProducts }) => {

    const { data, loading } = useQuery(SEARCH_PRODUCTS_QUERY, {
        variables: {
            title: searchProductsHintQuery.title,
            limit: 6
        },
        skip: searchProductsHintQuery.title === ""
    });

    const onSearch = () => {
        searchProducts();
        if (title !== "") {
            addProductsTitleQuery(title);
        }
    }

    const onSearchProductsHint = useCallback(_.debounce(() => searchProductsHint(), 700), []);

    const onTitleChange = (title) => {
        changeProductsSearchQuery({ title });
        onSearchProductsHint();
    }

    return (
        <div className="home-page-header-panel">
            <TextField
                value={title}
                loading={loading}
                autoCompleteOptions={
                    data?.products.map(product =>
                        <TextFieldAutocompleteOption
                            key={product.id}
                            Component={AutocompleteProduct}
                            textValue={product.title}
                            value={product} />)
                }
                autoCompleteOptionsWhenEmptyHeader={
                    <div className="home-page-header-panel-text-field-autocomplete-recent-products-header">
                        <span>Recent searches</span>
                        <Button.Transparent style={{ color: '#349A89' }} value="Clear All" onClick={() => alert(1)} />
                    </div>}
                autoCompleteOptionsWhenEmpty={
                    getLatestProductsTitleQuery().map(item => <TextFieldAutocompleteOption className="home-page-header-panel-text-field-autocomplete-recent-products-item" key={item} textValue={item} value={item} icon={<SearchIcon color="#CECECE" style={{ width: '17px', height: '18px' }} />} />)
                }
                onValueChange={onTitleChange}
                placeholder="Search products by name" icon={<SearchIcon style={{ width: '17px', height: '18px' }} />} />
            <LocationTextField onLocationIdChange={locationId => changeProductsSearchQuery({ locationId })} locationId={locationId} />
            <Button.Martinique style={{ textTransform: "uppercase" }} value="Search" onClick={onSearch} />
        </div>
    )
};

export default connect(
    (({ products: { searchQuery: { title, locationId }, searchProductsHintQuery } }) => ({ title, locationId, searchProductsHintQuery })),
    { changeProductsSearchQuery, searchProducts, searchProductsHint }
)(HeaderSearchPanel);

const AutocompleteProduct = ({ value, active }) => {

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

const SEARCH_PRODUCTS_QUERY = gql`
query productsHint($title: String, $limit: Int) {
    products(title: $title, limit: $limit) {
    id
    title
    imageName
    }
}`;