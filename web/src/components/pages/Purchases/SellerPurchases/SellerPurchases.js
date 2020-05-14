import React, { useState } from 'react';

import "./SellerPurchases.scss";
import { useQuery } from '@apollo/react-hooks';
import Pagination from '../../../layouts/Pagination/Pagination';
import SellerPurchasesItem from '../SellerPurchases/SellerPurchasesItem/SellerPurchasesItem';
import { SELLER_PURCHASES_QUERY } from '../../../../apollo/queries/purchases-queries';

const SELLER_PURACHSES_LIMIT_PAGE = 10;

const SellerPurchases = () => {

    const [page, setPage] = useState(1);
    const { data, loading } = useQuery(SELLER_PURCHASES_QUERY, {
        variables: {
            page, limit: SELLER_PURACHSES_LIMIT_PAGE
        }
    });

    return (
        <div className="purchases-page-seller-purchases">
            <div className="purchases-page-seller-purchases-container">
                {
                    data?.sellerPurchases?.map(p => <SellerPurchasesItem {...p} />)
                }
            </div>
            <Pagination page={page} pages={Math.ceil(data?.sellerPurchasesCount / SELLER_PURACHSES_LIMIT_PAGE)} onChangePage={setPage} />
        </div>
    )
};

export default SellerPurchases;