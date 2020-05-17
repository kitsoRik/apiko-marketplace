import React, { useEffect, useState } from 'react';

import "./ProductsContent.scss";
import ProductCard from '../../../layouts/ProductCard';
import Pagination from '../../../layouts/Pagination/Pagination';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import useLocationQuery from 'react-use-location-query';

const ProductsContent = () => {

    const { query: { page, limit }, setQuery } = useLocationQuery({ page: 1, limit: 12 }, { parseNumber: true });

    const { data, loading, refetch } = useQuery(USER_PRODUCTS_CONTENT, {
        variables: { page, limit }
    });

    useEffect(() => {
        refetch({ page, limit })
    }, [page]);// eslint-disable-line

    return (
        <div className="products-content">
            {!loading &&
                <div className="products-content-container">
                    {data?.currentUser?.products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            }
            {loading &&
                <div className="products-content-loading">
                    <ModalLoading darken={false} />
                </div>
            }
            <Pagination
                page={page}
                pages={data ? Math.ceil(data.currentUser.productsCount / limit) : 1}
                onChangePage={page => setQuery({ page })}
            />
        </div>
    )
};

export default (ProductsContent);


const USER_PRODUCTS_CONTENT = gql`
query currentUser($page: Int!, $limit: Int!) {
    currentUser {
        id
     products(page: $page, limit: $limit) {
        id
        title
        price
        imageName
        saved
     },
     productsCount
   }
 }`;