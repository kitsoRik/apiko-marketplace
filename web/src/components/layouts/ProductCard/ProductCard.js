import React from 'react';

import Black from '../../../assets/icons/black.png';
import "./ProductCard.scss";
import Icon from '../Icon';
import ModalLoading from '../ModalLoading/ModalLoading';
import HeartIcon from '../../icons/HeartIcon';

const ProductCard = ({ className, id, title, price, iconName, changingSaveState, saved = false, onSavedChange = () => { }, ...props }) => {
    return (
        <div className={`product-card ${className ?? ""}`} {...props}>
            <div className="product-card-icon">
                <img src={Black} />
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