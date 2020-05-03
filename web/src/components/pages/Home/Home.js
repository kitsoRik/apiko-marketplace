import React, { useEffect, useState } from 'react';
import { setHeaderMinorPanel } from '../../other/Header/Header';

import './Home.scss';
import ProductCard from '../../layouts/ProductCard/ProductCard';

import _ from 'lodash';
import Pagination from '../../layouts/Pagination/Pagination';
import HomePageHeaderPanel from './HomePageHeaderPanel/HomePageHeaderPanel';
import SearchPanel from './SearchPanel';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { PRODUCTS_QUERY } from '../../../apollo/queries/products-queries';
import { useSelector, connect } from 'react-redux';
import { changeProductsSearchQuery, searchProducts } from '../../../redux/actions/products-actions';

const Home = ({ category, priceFrom, priceTo, page, limit, reactionSearchQuery, changeProductsSearchQuery, searchProducts }) => {

    const { data, loading } = useQuery(PRODUCTS_QUERY, { variables: { ...reactionSearchQuery } });

    return (
        <div className="home-page">
            <SearchPanel {...{
                category,
                setCategory: category => changeProductsSearchQuery({ category }),
                priceFrom: priceFrom === -1 ? "" : priceFrom,
                setPriceFrom: (priceFrom) => changeProductsSearchQuery({ priceFrom: priceFrom === "" ? -1 : +priceFrom }),
                priceTo: priceTo === -1 ? "" : priceTo,
                setPriceTo: (priceTo) => changeProductsSearchQuery({ priceTo: priceTo === "" ? -1 : +priceTo }),
            }} />
            <div className="home-page-products-container">
                {!loading && data?.products.map(product =>
                    <ProductCard key={product.id} product={product} />)}
                {loading && <ModalLoading darken={false} style={{ gridColumn: '1 / span 4', position: "static" }} />}
                {!loading && data?.products?.length === 0 && <span>Products is empty</span>}
            </div>
            <Pagination onChangePage={page => { changeProductsSearchQuery({ page }); searchProducts(); }} page={page} pages={data ? Math.ceil(data.productsCount / limit) : 1} />
        </div>
    );
}

export default connect(
    (({ products: { searchQuery: { category, priceFrom, priceTo, page, limit }, reactionSearchQuery } }) => ({ category, priceFrom, priceTo, reactionSearchQuery, page, limit })),
    { changeProductsSearchQuery, searchProducts }
)(Home);