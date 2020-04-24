import React, { useEffect, useState } from 'react';

import "./ProductsContent.scss";
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadUserProducts } from '../../../../redux/actions/users-actions';
import { LOADING } from '../../../../constants';
import ProductCard from '../../../layouts/ProductCard';
import Pagination from '../../../layouts/Pagination/Pagination';
import ModalLoading from '../../../layouts/ModalLoading/ModalLoading';

const ProductsContent = ({ userId, productsStore, loadUserProducts }) => {
    
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadUserProducts(userId);
    }, [ ]);

    if(!productsStore[userId]) {
        return <span>WAIT</span>
    }

    const { products, loadingStatus } = productsStore[userId];

    return (
        <div className="products-content">
            { loadingStatus !== LOADING && 
                <div className="products-content-container">
                    { products.map(p => <ProductCard key={p.id} {...p}/>) }
                </div>
            }
            { loadingStatus === LOADING && 
                <div className="products-content-loading">
                    <ModalLoading darken={false} />
                </div> 
            }
            <Pagination onChangePage={setPage} page={page}/>
        </div>
    )
};

export default compose(
    connect(({ users: { productsStore }}) => ({ productsStore }), { loadUserProducts })
)(ProductsContent);