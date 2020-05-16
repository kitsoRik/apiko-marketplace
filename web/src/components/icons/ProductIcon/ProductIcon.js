import React from 'react';

import "./ProductIcon.scss";
import api from '../../../services/api';
import ImageNoAvaiableIcon from '../ImageNoAvaliableIcon/ImageNoAvalaibleIcon';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';

const ProductIcon = ({ imageName, loading, }) => {

    if (loading)
        return (
            <div className="product-icon">
                <ModalLoading darken={false} />
            </div>
        );
    if (imageName) {
        return <img src={`${api.productsImageBaseUrl}${imageName}`} alt="Product icon" />;
    }
    return <ImageNoAvaiableIcon style={{ height: "80%", width: '100%' }} />;
};

export default ProductIcon;