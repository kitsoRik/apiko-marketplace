import React, { useEffect } from 'react';

import "./SavedItems.scss";
import Form from '../../layouts/Form';
import ProductCard from '../../layouts/ProductCard/ProductCard';
import { compose } from 'redux';
import { loadSavedProducts, changeSavedStateOfProduct } from '../../../redux/actions/products-actions';
import { connect } from 'react-redux';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import { LOADING } from '../../../constants';

const SavedItems = ({ loadSavedProducts, savedProducts, savedProductsCount, savedProductsLoadingState, changeSavedStateOfProduct }) => {

    useEffect(() => {
        loadSavedProducts();
    }, []);

    const bracketsContent = savedProductsLoadingState === LOADING ? <ModalLoading darken={false} className="saved-items-page-form-title-loading" /> : savedProductsCount;

    return (
        <div className="saved-items-page">
            <Form className="saved-items-page-form">
                <h1 className="saved-items-page-form-title"> Saved items ({bracketsContent})</h1>
                <div className="saved-items-page-form-products-container">
                    {savedProducts.map(product =>
                        <ProductCard key={product.id} onSavedChange={state => changeSavedStateOfProduct(product.id, state)} {...product} />)}
                    {/* {savedProductsLoadingState === LOADING && <ModalLoading darken={false} className="saved-items-page-form-products-container-loading" />} */}
                </div>
            </Form>
        </div>
    )
};

export default compose(
    connect(({ products: { products, savedProductsIds, savedProductsCount, savedProductsLoadingState } }) => ({
        savedProducts: products.filter(p => savedProductsIds.indexOf(p.id) !== -1),
        savedProductsCount,
        savedProductsLoadingState
    }), { loadSavedProducts, changeSavedStateOfProduct })
)(SavedItems);