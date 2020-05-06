import React from 'react';

import "./ProductsViewer.scss";
import ProductCard from '../../layouts/ProductCard/ProductCard';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';

const ProductsViewer = ({ products, loading }) => {
    return (
        <div className="products-viewer">
            {!loading && products?.map(product =>
                <ProductCard key={product.id} product={product} />)}
            {loading && <ModalLoading darken={false} style={{ gridColumn: '1 / span 4', position: "static" }} />}
            {!loading && products?.length === 0 && <span>Products is empty</span>}
        </div>
    )
};

export default ProductsViewer;