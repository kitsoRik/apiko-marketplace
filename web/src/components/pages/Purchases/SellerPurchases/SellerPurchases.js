import React, { useState, useEffect } from 'react';

import "./SellerPurchases.scss";
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import Pagination from '../../../layouts/Pagination/Pagination';
import SellerPurchasesItem from '../SellerPurchases/SellerPurchasesItem/SellerPurchasesItem';
import { SELLER_PURCHASES_QUERY } from '../../../../apollo/queries/purchases-queries';
import { PURCHASE_CREATED } from '../../../../apollo/subscriptions/purchases-subscriptions';
import FilterPanel from '../FilterPanel/FilterPanel';
import useLocationQuery from '../../../hooks/useLocationQuery/useLocationQuery';

const SELLER_PURACHSES_LIMIT_PAGE = 10;

const SellerPurchases = () => {

    const { query: { viewOpened, viewPosted, viewCanceled, viewClosed, sortField, sortOrder }, setQuery } = useLocationQuery({
        viewOpened: true, viewPosted: true, viewClosed: true, viewCanceled: true, sortField: "created", sortOrder: "ASC"
    }, { parseBooleanValues: true });

    const [page, setPage] = useState(1);
    const client = useApolloClient();
    const { data, loading, subscribeToMore, refetch } = useQuery(SELLER_PURCHASES_QUERY, {
        variables: {
            page,
            limit: SELLER_PURACHSES_LIMIT_PAGE,
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
            variables: { page: 1, SELLER_PURACHSES_LIMIT_PAGE },
            updateQuery: (prev, { subscriptionData: { data: { purchaseCreated } }, variables }) => {
                const data = client.readQuery({
                    query: SELLER_PURCHASES_QUERY,
                    variables: { page: 1, limit: SELLER_PURACHSES_LIMIT_PAGE }
                });
                client.writeQuery({
                    query: SELLER_PURCHASES_QUERY,
                    variables: { page: 1, limit: SELLER_PURACHSES_LIMIT_PAGE },
                    data: {
                        ...data,
                        sellerPurchases: [
                            purchaseCreated,
                            ...data.sellerPurchases.filter((p, i) => i < SELLER_PURACHSES_LIMIT_PAGE - 1),
                        ],
                        sellerPurchasesCount: data.sellerPurchasesCount + 1
                    }
                });
            }
        })
    }, []);

    return (
        <div className="purchases-page-seller-purchases">
            <FilterPanel {...{
                viewOpened,
                setViewOpened: viewOpened => setQuery({ viewOpened }),
                viewPosted,
                setViewPosted: viewPosted => setQuery({ viewPosted }),
                viewCanceled,
                setViewCanceled: viewCanceled => setQuery({ viewCanceled }),
                viewClosed,
                setViewClosed: viewClosed => setQuery({ viewClosed }),
                sortField,
                setSortField: sortField => setQuery({ sortField }),
                sortOrder,
                setSortOrder: sortOrder => setQuery({ sortOrder }),
            }}
            />
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