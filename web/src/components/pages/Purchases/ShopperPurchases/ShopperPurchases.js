import React, { useState, useEffect } from 'react';

import "./ShopperPurchases.scss";
import { useQuery } from '@apollo/react-hooks';
import { SHOPPER_PURCHASES_QUERY } from '../../../../apollo/queries/purchases-queries';
import ShopperPurchasesItem from './ShopperPurchasesItem/ShopperPurchasesItem';
import Pagination from '../../../layouts/Pagination/Pagination';
import { PURCHASE_CREATED } from '../../../../apollo/subscriptions/purchases-subscriptions';
import FilterPanel from '../FilterPanel/FilterPanel';
import useLocationQuery from 'react-use-location-query';

const SHOPPER_PURACHSES_LIMIT_PAGE = 10;

const ShopperPurchases = () => {
    const { query: { viewOpened, viewPosted, viewCanceled, viewClosed, sortField, sortOrder, limit }, setQuery } = useLocationQuery({
        viewOpened: true, viewPosted: true, viewClosed: true, viewCanceled: true, sortField: "created", sortOrder: "ASC", limit: 10
    }, { parseBoolean: true, parseNumber: true });
    const [page, setPage] = useState(1);
    const { data, loading } = useQuery(SHOPPER_PURCHASES_QUERY, {
        variables: {
            page,
            limit: limit,
            viewOpened,
            viewPosted,
            viewCanceled,
            viewClosed,
            sortField,
            sortOrder
        }
    });

    return (
        <div className="purchases-page-shopper-purchases">
            <FilterPanel />
            <div className="purchases-page-shopper-purchases-container">
                {
                    data?.shopperPurchases?.map(p => <ShopperPurchasesItem {...p} />)
                }
            </div>
            <Pagination page={page} pages={Math.ceil(data?.shopperPurchasesCount / SHOPPER_PURACHSES_LIMIT_PAGE)} onChangePage={setPage} />
        </div>
    )
};

export default ShopperPurchases;