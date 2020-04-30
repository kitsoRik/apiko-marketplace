import React from 'react';

import Black from '../../../assets/icons/black.png';
import "./ProductCard.scss";
import ModalLoading from '../ModalLoading/ModalLoading';
import HeartIcon from '../../icons/HeartIcon';
import api from '../../../services/api';

const ProductCard = ({ className, id, title, price, imageName, changingSaveState, saved = false, onSavedChange = () => { }, ...props }) => {
    return (
        <div className={`product-card ${className ?? ""}`} {...props}>
            <div className="product-card-icon">
                {imageName && <img src={`${api.productsImageBaseUrl}${imageName}`} alt="Product icon" />}
            </div>
            <div className="product-card-info">
                <span className="product-card-info-name">{title}</span>
                <span className="product-card-info-price">{price}</span>
            </div>
            <div className="product-card-like">
                <HeartIcon filed={saved} onClick={() => onSavedChange(!saved)} />
                {changingSaveState && <ModalLoading style={{ padding: "6px" }} />}
            </div>
        </div>
    );
}

export default ProductCard;