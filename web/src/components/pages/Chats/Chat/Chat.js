import React, { useEffect } from 'react';

import "./Chat.scss";
import ChatHeader from './ChatHeader/ChatHeader';
import { useQuery } from '@apollo/react-hooks';
import { CHAT_QUERY } from '../../../../apollo/queries/chat-queries';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInputMessage from './ChatInputMessage/ChatInputMessage';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { setViewingChat } from '../../../../redux/actions/chats-actions';

const Chat = ({ setViewingChat, chatId, className }) => {
    const { data, loading } = useQuery(CHAT_QUERY, {
        variables: { id: chatId }
    });
    useEffect(() => {
        if (!chatId) return;
        setViewingChat(chatId);

        return () => {
            setViewingChat(null);
        }
    }, [chatId]);

    const { chat: { product, seller, shopper } } = data ?? { chat: {} };

    return (
        <div className={`chats-page-chat ${className ?? ""}`}>
            <ChatHeader product={loading ? null : product} user={loading ? null : seller} loading={loading} />
            <ChatMessages chatId={chatId} loading={loading} />
            <ChatInputMessage chatId={chatId} loading={loading} />
        </div>
    )
};

export default connect(null, { setViewingChat })(Chat);