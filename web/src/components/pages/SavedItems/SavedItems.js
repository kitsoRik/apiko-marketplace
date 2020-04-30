import React, { useEffect } from 'react';

import "./SavedItems.scss";
import Form from '../../layouts/Form';
import ProductCard from '../../layouts/ProductCard/ProductCard';
import { compose } from 'redux';
import { loadSavedProducts } from '../../../redux/actions/products-actions';
import { connect } from 'react-redux';

const SavedItems = ({ loadSavedProducts, savedProducts }) => {

    useEffect(() => {
        loadSavedProducts();
    }, []);
    return (
        <div className="saved-items-page">
            <Form className="saved-items-page-form">
                <h1 className="saved-items-page-form-title"> Saved items (34)</h1>
                <div className="saved-items-page-form-products-container">
                    {savedProducts.map(product =>
                        <ProductCard key={product.id} {...product} />)}
                </div>
            </Form>
        </div>
    )
};

export default compose(
    connect(({ products: { savedProducts } }) => ({ savedProducts }), { loadSavedProducts })
)(SavedItems);