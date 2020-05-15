import React from 'react';

import "./ProductsViewer.scss";
import ProductCard from '../../layouts/ProductCard/ProductCard';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import ArrowByCircleIcon from '../../icons/ArrowByCircleIcon/ArrowByCircleIcon';

const ProductsViewer = ({ visibleLoad, onLoadMore, products, loading }) => {
    return (
        <div className="products-viewer">
            {products?.map(product =>
                <ProductCard key={product.id} product={product} />)}
            {visibleLoad &&
                <div className="products-viewer-load product-card" onClick={onLoadMore}>
                    <ArrowByCircleIcon />
                </div>}
            {loading && <ModalLoading darken={false} style={{ gridColumn: '1 / span 4', position: "static" }} />}
            {!loading && products?.length === 0 && <span>Products is empty</span>}
        </div >
    )
};

export default ProductsViewer;