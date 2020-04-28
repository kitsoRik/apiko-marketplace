import React, { useEffect } from 'react';

import "./SalesContent.scss";
import Pagination from '../../../layouts/Pagination/Pagination';
import SaleCard from '../../../layouts/SaleCard/SaleCard';
import { loadUserSales } from '../../../../redux/actions/users-actions';
import { LOADING } from '../../../../constants';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';
import { compose } from 'redux';
import { connect } from 'react-redux';

const SalesContent = ({ userId, salesStore, loadUserSales }) => {

    const userSalesStore = salesStore[userId];

    useEffect(() => {
        if (!userSalesStore) loadUserSales(userId, 1);
    }, []);

    if (!userId || !userSalesStore) return null;

    const { sales, loadingStatus, searchSettings: { page, pages } } = userSalesStore;

    return (
        <div className="sales-content">
            {loadingStatus !== LOADING &&
                <div className="sales-content-container">
                    {sales.map(s => <SaleCard key={s.id} {...s} />)}
                </div>
            }
            {loadingStatus === LOADING &&
                <div className="sales-content-loading">
                    <ModalLoading darken={false} />
                </div>
            }
            <Pagination onChangePage={(p) => loadUserSales(userId, p)} page={page} pages={pages} />
        </div>
    )
};

export default compose(
    connect(({ users: { salesStore } }) => ({ salesStore }), { loadUserSales })
)(SalesContent);