import React, { useState } from 'react';

import "./SalesContent.scss";
import Pagination from '../../../layouts/Pagination/Pagination';
import SaleCard from '../../../layouts/SaleCard/SaleCard';

const SalesContent = ({ userId }) => {

    const [page, setPage] = useState(1);

    const sales = [
        {
            id: 0,
            user: {
                id: 3,
                fullName: "Rostyslav"
            },
            product: {
                id: 0,
                title: "My custom product"
            },
            date: new Date(2019, 7, 22),
        },
        {
            id: 0,
            user: {
                id: 3,
                fullName: "Rostyslav"
            },
            product: {
                id: 0,
                title: "My custom product"
            },
            date: new Date(2019, 7, 22),
        }
    ]

    return (
        <div className="profile-sales-content">
            <div className="profile-sales-content-container">
                { sales.map(sale => <SaleCard key={sale.id} { ...sale } />) }
            </div>
            <Pagination page={page} onChangePage={setPage}/>
        </div>
    )
};

export default SalesContent;