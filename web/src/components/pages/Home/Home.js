import React from 'react';

import './Home.scss';
import ProductCard from '../../layouts/ProductCard/ProductCard';

import Pagination from '../../layouts/Pagination/Pagination';
import SearchPanel from './SearchPanel';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import { useQuery } from '@apollo/react-hooks';
import { PRODUCTS_QUERY } from '../../../apollo/queries/products-queries';
import { connect } from 'react-redux';
import { changeProductsSearchQuery, searchProducts } from '../../../redux/actions/products-actions';
import ProductsViewer from '../../other/ProductsViewer/ProductsViewer';

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
            <ProductsViewer products={data?.products} loading={loading} />
            <Pagination onChangePage={page => { changeProductsSearchQuery({ page }); searchProducts(); }} page={page} pages={data ? Math.ceil(data.productsCount / limit) : 1} />
        </div>
    );
}

export default connect(
    (({ products: { searchQuery: { category, priceFrom, priceTo, page, limit }, reactionSearchQuery } }) => ({ category, priceFrom, priceTo, reactionSearchQuery, page, limit })),
    { changeProductsSearchQuery, searchProducts }
)(Home);