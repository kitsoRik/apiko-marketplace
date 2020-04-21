import React from 'react';

import Black from '../../../assets/icons/black.png';
import "./ProductCard.scss";
import Icon from '../Icon';
import ModalLoading from '../ModalLoading/ModalLoading';

const ProductCard = ({ id, title, price, iconName, changingSaveState, saved = false, onSavedChange = () => {}, ...props}) => {
    return ( 
        <div className="product-card" {...props}>
            <div className="product-card-icon">
                <img src={Black}/>
            </div>
            <div className="product-card-info">
                <span className="product-card-info-name">{ title }</span>
                <span className="product-card-info-price">{ price }</span>
            </div>
            <div className="product-card-like">
                <Icon onClick={() => onSavedChange(!saved)}> 
                <svg version="1.1" id="Шар_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 512 512">
                    <style type="text/css">
                    </style>
                    <g>
                        <path d="M256,468.8c-7.9,0-15.3-3-20.8-8.4L55.6,284.3c-27.2-26.7-42.2-62.2-42.2-100c0-37.8,15-73.3,42.2-100
                            c27.2-26.7,63.5-41.4,102.2-41.4c33.9,0,66.9,11.7,92.7,32.9l5.4,4.4l5.4-4.4c25.8-21.2,58.8-32.9,92.7-32.9
                            c38.7,0,75,14.7,102.2,41.4c27.2,26.7,42.2,62.2,42.2,100c0,37.8-15,73.3-42.2,100L276.8,460.4C271.2,465.8,263.8,468.8,256,468.8z" 
                            fill={saved ? "#349A89" : "none"}/>
                        <path d="M354.1,51.3c36.4,0,70.6,13.9,96.3,39c25.6,25.1,39.7,58.5,39.7,94s-14.1,68.9-39.7,94L270.8,454.3c-3.9,3.9-9.2,6-14.9,6
                            c-5.6,0-10.9-2.1-14.9-6L61.6,278.2c-25.6-25.1-39.7-58.5-39.7-94c0-35.5,14.1-68.9,39.7-94c25.6-25.2,59.8-39,96.3-39
                            c32,0,63,11,87.3,31l10.8,8.9l10.8-8.9C291.1,62.3,322.1,51.3,354.1,51.3 M354.1,34.3c-34.9,0-69.8,11.6-98.1,34.9
                            c-28.3-23.2-63.2-34.8-98.1-34.8c-39.2,0-78.3,14.6-108.2,43.9c-28.9,28.3-44.8,66-44.8,106.1S20.8,262,49.7,290.4l179.5,176.1
                            c7.4,7.3,17.1,10.9,26.8,10.9s19.4-3.6,26.8-10.9l179.5-176.1c28.9-28.3,44.8-66,44.8-106.1c0-40.1-15.9-77.8-44.8-106.1
                            C432.4,48.9,393.2,34.3,354.1,34.3L354.1,34.3z"
                            fill={saved ? "none" : "#B7B7B7"}/>
                    </g>
                    </svg>

                </Icon>
                { changingSaveState && <ModalLoading style={{top: `-7px`, maxHeight: "70%"}} /> }
            </div>
        </div>
     );
}

export default ProductCard;