import React from 'react';

import "./ChatHeader.scss";
import UserIcon from '../../../../icons/UserIcon';
import ProductIcon from '../../../../icons/ProductIcon';
import api from '../../../../../services/api';
import TREdgeArrow from '../../../../icons/TREdgeArrow';
import { useHistory } from 'react-router-dom';

const ChatHeader = ({ user, product }) => {
    const history = useHistory();

    return (
        <div className="chats-page-chat-header">
            <div className="chats-page-chat-header-user">
                <UserIcon src={user.iconName} fullName={user.fullName} />
                <span className="chats-page-chat-header-user-fullname">{user.fullName}</span>
            </div>
            <div className="chats-page-chat-header-product">
                <div className="chats-page-chat-header-product-image">
                    <ProductIcon imageName={product.imageName} />
                </div>
                <div className="chats-page-chat-header-product-info">
                    <span className="chats-page-chat-header-product-info-title">{product.title}</span>
                    <span className="chats-page-chat-header-product-info-price">${product.price}</span>
                </div>
                <button className="chats-page-chat-header-product-view-button"
                    onClick={() => history.push(`/products/${product.id}`)}>
                    <TREdgeArrow />
                </button>
            </div>
        </div >
    )
};

export default ChatHeader;