import React from 'react';

import "./Chat.scss";
import ChatHeader from './ChatHeader/ChatHeader';
import { useQuery } from '@apollo/react-hooks';
import { CHAT_QUERY } from '../../../../apollo/queries/chat-queries';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInputMessage from './ChatInputMessage/ChatInputMessage';
import { useHistory, useLocation } from 'react-router-dom';

const Chat = ({ chatId }) => {
    const { data, loading } = useQuery(CHAT_QUERY, {
        variables: { id: chatId }
    })

    if (!data?.chat) return null;

    const { chat: { product, seller, shopper } } = data;

    return (
        <div className="chats-page-chat">
            <ChatHeader product={product} user={seller} />
            <ChatMessages chatId={chatId} />
            <ChatInputMessage chatId={chatId} />
        </div>
    )
};

export default Chat;