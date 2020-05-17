import React from 'react';

import "./SalesContent.scss";
import Pagination from '../../../layouts/Pagination/Pagination';
import SaleCard from '../../../layouts/SaleCard/SaleCard';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const SalesContent = () => {

    const { data, loading } = useQuery(USER_SALES_CONTENT);

    return (
        <div className="sales-content">
            {!loading &&
                <div className="sales-content-container">
                    {data?.currentUser?.sales.map(s => <SaleCard key={s.id} {...s} />)}
                </div>
            }
            {loading &&
                <div className="sales-content-loading">
                    <ModalLoading darken={false} />
                </div>
            }
            <Pagination page={1} pages={5} />
        </div>
    )
};

export default (SalesContent);

const USER_SALES_CONTENT = gql`
query currentUser($page: Int, $limit: Int) {
    currentUser {
      sales(page: $page, limit: $limit) {
        id
        product {
            id
            title
        }
        date
      },
      salesCount
    }
  }`;