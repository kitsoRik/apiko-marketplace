import React from 'react';

import "./Product.scss";

const Product = ({ match }) => {

    const { id } = match.params;;

    return (
        <div>
            PRODUCT ID {id}
        </div>
    )
};

export default Product;