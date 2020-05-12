import React from 'react';

import "./ChatsListItem.scss";
import api from '../../../../../services/api';
import ProductIcon from '../../../../icons/ProductIcon';
import withScreenSize from '../../../../hocs/withScreenSize/withScreenSize';

const ChatsListItem = ({ screenSize, fullName, lastMessage, product, selected, onSelect }) => {
    const lastMessageTime = parseLastMessageTime(lastMessage.createdAt);

    const isMinItem = screenSize.width > 1024;

    return (
        <div className={`chats-list-item ${selected ? "chats-list-item-selected" : ""}`}
            onClick={onSelect}>
            <div className="chats-list-item-user">
                <span className="chats-list-item-user-fullname">{fullName}</span>
                <div className="chats-list-item-user-last-message">
                    <p className="chats-list-item-user-last-message-text">{lastMessage.text}</p>
                </div>
            </div>
            <div className="chats-list-item-divider"></div>
            <div className="chats-list-item-product">
                <div className="chats-list-item-product-image">
                    <ProductIcon imageName={product.imageName} />
                </div>
                <span className="chats-list-item-product-title">{product.title}</span>
                <span className="chats-list-item-product-price">${product.price}</span>
            </div >

            {isMinItem && <div className="chats-list-item-divider"></div>}
            <div className="chats-list-item-time">
                <span className="chats-list-item-time-text">{lastMessageTime}</span>
            </div>
        </div >
    )
};

export default withScreenSize(ChatsListItem);

const parseLastMessageTime = (str) => {
    let temp = new Date();

    const time = new Date(str);

    temp.setDate(new Date().getDate() - 1);
    const yesterday = temp;
    if (time > yesterday) {
        let minutes = time.getMinutes();
        if (minutes < 10) minutes = "0" + minutes;


        let hours = time.getHours();
        if (hours < 10) hours = "0" + hours;

        return `${hours}:${minutes}`;
    }

    temp.setDate(new Date().getDate() - 2);
    const beforeYeasterday = temp;
    if (time > beforeYeasterday) {
        return "Yesterday";
    }

    const day = time.getDay();
    const month = time.getMonth();

    return `${day}/${month}`;
}