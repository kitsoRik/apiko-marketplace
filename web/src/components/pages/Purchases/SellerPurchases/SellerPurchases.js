import React, { useState, useEffect } from 'react';

import "./SellerPurchases.scss";
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import Pagination from '../../../layouts/Pagination/Pagination';
import SellerPurchasesItem from '../SellerPurchases/SellerPurchasesItem/SellerPurchasesItem';
import { SELLER_PURCHASES_QUERY } from '../../../../apollo/queries/purchases-queries';
import { PURCHASE_CREATED } from '../../../../apollo/subscriptions/purchases-subscriptions';
import FilterPanel from '../FilterPanel/FilterPanel';
import useLocationQuery from 'react-use-location-query';
import { notifyInfo } from '../../../other/Snackbar/Snackbar';


const SellerPurchases = () => {
    const { query: { viewOpened, viewPosted, viewCanceled, viewClosed, sortField, sortOrder, limit, page }, setQuery } = useLocationQuery({
        viewOpened: true, viewPosted: true, viewClosed: true, viewCanceled: true, sortField: "created", sortOrder: "DESC", limit: 10, page: 1
    }, { parseBoolean: true, parseNumber: true });
    const { data, loading, subscribeToMore } = useQuery(SELLER_PURCHASES_QUERY, {
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

    useEffect(() => {
        return subscribeToMore({
            document: PURCHASE_CREATED,
            variables: { page: 1, limit },
            updateQuery: (prev, { subscriptionData: { data: { purchaseCreated } }, variables }) => {
                notifyInfo("New purchase, please refresh page.")
            }
        })
    }, []);

    return (
        <div className="purchases-page-seller-purchases">
            <FilterPanel
            />
            <div className="purchases-page-seller-purchases-container">
                {
                    data?.sellerPurchases?.map(p => <SellerPurchasesItem {...p} />)
                }
            </div>
            <Pagination page={page} pages={Math.ceil(data?.sellerPurchasesCount / limit)} onChangePage={page => setQuery({ page })} />
        </div>
    )
};

export default SellerPurchases;