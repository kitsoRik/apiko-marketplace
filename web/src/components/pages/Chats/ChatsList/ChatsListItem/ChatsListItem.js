import React from 'react';

import "./ChatsListItem.scss";
import api from '../../../../../services/api';

const ChatsListItem = ({ fullName, lastMessage, product, selected, onSelect }) => {
    return (
        <div className={`chats-list-item ${selected ? "chats-list-item-selected" : ""}`}
            onClick={onSelect}
        >
            <div className="chats-list-item-user">
                <span className="chats-list-item-user-fullname">{fullName}</span>
                <div className="chats-list-item-user-last-message">
                    <span className="chats-list-item-user-last-message-text">{lastMessage.text}</span>
                </div>
            </div>
            <div className="chats-list-item-divider"></div>
            <div className="chats-list-item-product">
                <div className="chats-list-item-product-image">
                    <img src={`${api.productsImageBaseUrl}/${product.imageName}`} alt={product.title} />
                </div>
                <span className="chats-list-item-product-title">{product.title}</span>
                <span className="chats-list-item-product-price">${product.price}</span>
            </div>
            <div className="chats-list-item-divider"></div>
            <div className="chats-list-item-time">
                <span className="chats-list-item-time-text">05:05</span>
            </div>
        </div>
    )
};

export default ChatsListItem;