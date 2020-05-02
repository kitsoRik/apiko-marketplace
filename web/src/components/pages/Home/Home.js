import React, { useEffect } from 'react';
import { setHeaderMinorPanel } from '../../other/Header/Header';

import './Home.scss';
import ProductCard from '../../layouts/ProductCard/ProductCard';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { loadProducts, changeSavedStateOfProduct, searchProducts, changeProductSearchQuery } from '../../../redux/actions/products-actions';
import { productsWithChangingSavedState } from '../../../redux/mappers/products-mappers';
import { notifyWarning } from '../../other/Snackbar/Snackbar';
import { LOADED, LOADING } from '../../../constants';

import _ from 'lodash';
import Pagination from '../../layouts/Pagination/Pagination';
import HomePageHeaderPanel from './HomePageHeaderPanel/HomePageHeaderPanel';
import SearchPanel from './SearchPanel';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';

const Home = ({ loadingDataState, products, loadProducts, searchQuery: { page, pages }, searchProducts, changeSavedStateOfProduct, homeProductsLoadingState, changeProductSearchQuery }) => {

    useEffect(() => {
        if (products.length === 0)
            loadProducts();

        setHeaderMinorPanel(<HomePageHeaderPanel />);
        return () => {
            setHeaderMinorPanel();
        }
    }, []);

    const changeSavedState = (id, state) => {
        if (loadingDataState === LOADED) {
            changeSavedStateOfProduct(id, state);
        } else {
            notifyWarning("Please, login before saving product.")
        }
    }
    return (
        <div className="home-page">
            <SearchPanel />
            <div className="home-page-products-container">
                {homeProductsLoadingState !== LOADING && products.map(product =>
                    <ProductCard key={product.id} {...product}
                        onSavedChange={(state) => changeSavedState(product.id, state)} />)}
                {homeProductsLoadingState === LOADING && <ModalLoading darken={false} style={{ gridColumn: '1 / span 4', position: "static" }} />}
                {homeProductsLoadingState === LOADED && products.length === 0 && <span>Products is empty</span>}
            </div>
            <Pagination onChangePage={p => { changeProductSearchQuery({ page: p }); searchProducts() }} page={page} pages={pages} />
        </div>
    );
}

const mapStateToProps = ({ user: { loadingDataState },
    products: { products, homeProductsIds, changingSavedStateOfProductsIds, homeProductsLoadingState, searchQuery }
}) => ({
    loadingDataState,
    homeProductsLoadingState,
    searchQuery,
    products: productsWithChangingSavedState(products.filter(p => homeProductsIds.indexOf(p.id) !== -1), changingSavedStateOfProductsIds)
});

export default compose(
    connect(mapStateToProps, { loadProducts, changeSavedStateOfProduct, searchProducts, changeProductSearchQuery })
)(Home);