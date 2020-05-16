import React, { useState } from 'react';

import './Home.scss';
import ProductCard from '../../layouts/ProductCard/ProductCard';

import Pagination from '../../layouts/Pagination/Pagination';
import SearchPanel from './SearchPanel';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { PRODUCTS_QUERY } from '../../../apollo/queries/products-queries';
import { connect } from 'react-redux';
import { changeProductsSearchQuery, searchProducts } from '../../../redux/actions/products-actions';
import ProductsViewer from '../../other/ProductsViewer/ProductsViewer';

const Home = ({
    category,
    priceFrom,
    priceTo,
    sortField,
    sortOrder,
    page,
    limit,
    reactionSearchQuery,
    changeProductsSearchQuery,
    searchProducts,
}) => {

    const [joinedPages, setJoinsPages] = useState([page]);

    const client = useApolloClient();
    const { data, loading } = useQuery(PRODUCTS_QUERY, { variables: { ...reactionSearchQuery } });

    const onLoadMore = () => {
        const nextPage = page + 1;
        changeProductsSearchQuery({ page: nextPage });
        setJoinsPages([...joinedPages, nextPage]);
        searchProducts();
    }

    const onChangePage = (page) => {
        changeProductsSearchQuery({ page });
        setJoinsPages([page]);
        searchProducts();
    }

    let products = [];

    try {
        for (let i = 0; i < joinedPages.length; i++) {
            const data = client.readQuery({
                query: PRODUCTS_QUERY,
                variables: {
                    ...reactionSearchQuery,
                    page: joinedPages[i]
                }
            });

            if (!data) continue;
            products = products.concat(data.products);
        }
    } catch (e) {

    }

    const changeProductsSearchQueryWithSearch = (changes) => {
        changeProductsSearchQuery(changes);
        searchProducts();
    }

    const pages = data ? Math.ceil(data.productsCount / limit) : 1;
    return (
        <div className="home-page">
            <SearchPanel {...{
                category,
                setCategory: category => changeProductsSearchQueryWithSearch({ category }),
                priceFrom: priceFrom === -1 ? "" : priceFrom,
                setPriceFrom: (priceFrom) => changeProductsSearchQuery({ priceFrom: priceFrom === "" ? -1 : +priceFrom }),
                priceTo: priceTo === -1 ? "" : priceTo,
                setPriceTo: (priceTo) => changeProductsSearchQuery({ priceTo: priceTo === "" ? -1 : +priceTo }),
                sortField,
                setSortField: sortField => changeProductsSearchQueryWithSearch({ sortField }),
                sortOrder,
                setSortOrder: sortOrder => changeProductsSearchQueryWithSearch({ sortOrder })
            }} />
            <ProductsViewer
                products={products}
                loading={loading}
                visibleLoad={page !== pages}
                onLoadMore={onLoadMore} />
            <Pagination onChangePage={onChangePage} page={page} pages={pages} />
        </div>
    );
}

export default connect(
    (({ products: { searchQuery: { category, priceFrom, priceTo, page, limit, sortField, sortOrder }, reactionSearchQuery } }) => ({ category, priceFrom, priceTo, sortField, sortOrder, reactionSearchQuery, page, limit })),
    { changeProductsSearchQuery, searchProducts, }
)(Home);