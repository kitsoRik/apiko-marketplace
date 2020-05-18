import React, { useEffect, useState } from 'react';

import "./ChatsListItem.scss";
import api from '../../../../../services/api';
import ProductIcon from '../../../../icons/ProductIcon';
import withScreenSize from '../../../../hocs/withScreenSize/withScreenSize';
import { useSubscription, useQuery, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { CHATS_LIST_QUERY } from '../../../../../apollo/queries/chat-queries';
import { MESSAGE_SENT_SUBSCRIPTION } from '../../../../../apollo/subscriptions/chats-subscriptions';
import { addMessageToChat } from '../../../../../apollo/handlers/chats-handler';
import { useWindowSize } from '@react-hook/window-size'
import { connect } from 'react-redux';

const ChatsListItem = ({ chatId, selectedChatId, unreadableChatsIds, fullName, lastMessage, product, selected, onSelect }) => {
    const [_lastMessage, _setLastMessage] = useState(lastMessage);
    const lastMessageTime = parseLastMessageTime(_lastMessage.createdAt);

    const [width] = useWindowSize();

    const isMinItem = width > 1024;
    const viewUnreadElipse = unreadableChatsIds?.findIndex(id => id === chatId) !== -1;


    const { data, loading, subscribeToMore } = useQuery(CHATS_LIST_QUERY);

    const { } = useSubscription(MESSAGE_SENT_SUBSCRIPTION, {
        variables: { chatId },
        onSubscriptionComplete: (a, b, c) => {
            console.log(a, b, c);
        },
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            _setLastMessage(data.messageSent)
        }
    })
    useEffect(() => {
        // subscribeToMore({
        //     document: MESSAGE_SENT_SUBSCRIPTION,
        //     variables: { chatId },
        //     updateQuery: (prev, { subscriptionData: { data: { messageSent } } }) => {
        //         addMessageToChat(chatId, messageSent);
        //     }
        // })
    }, []);

    return (
        <div className={`chats-list-item ${selected ? "chats-list-item-selected" : ""}`}
            onClick={onSelect}>
            <div className="chats-list-item-user">
                <span className="chats-list-item-user-fullname">{fullName}</span>
                <div className="chats-list-item-user-last-message">
                    <p className="chats-list-item-user-last-message-text">{_lastMessage.text}</p>
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
            {viewUnreadElipse && <div className="chats-list-item-elipse"></div>}
        </div >
    )
};

export default connect(({ chats: { selectedChatId, unreadableChatsIds } }) => ({ selectedChatId, unreadableChatsIds }))(ChatsListItem);

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