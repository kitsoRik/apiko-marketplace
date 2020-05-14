import React, { useEffect, useState } from 'react';

import "./ProductsContent.scss";
import ProductCard from '../../../layouts/ProductCard';
import Pagination from '../../../layouts/Pagination/Pagination';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const ProductsContent = () => {

    const [page, setPage] = useState(1);
    const [limit] = useState(12);

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
            <Pagination onChangePage={setPage} page={page} pages={data ? Math.ceil(data.currentUser.productsCount / limit) : 1} />
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