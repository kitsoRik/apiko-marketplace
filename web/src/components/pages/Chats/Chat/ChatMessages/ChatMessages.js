import React, { useState } from 'react';

import "./ChatMessages.scss";
import { useQuery } from '@apollo/react-hooks';
import { CHAT_MESSAGES_QUERY } from '../../../../../apollo/queries/chat-queries';
import ChatMessagesItem from './ChatMessagesItem/ChatMessagesItem';
import { CURRENT_USER_QUERY } from '../../../../../apollo/queries/user-queries';

const ChatMessages = ({ chatId }) => {


    const { data, loading, error } = useQuery(CHAT_MESSAGES_QUERY, {
        variables: { id: chatId }
    });

    const user = useQuery(CURRENT_USER_QUERY);

    if (!data?.chat) return null;

    const { chat: { messages } } = data;
    return (
        <div className="chats-page-chat-messages">
            {
                messages.map(m => <ChatMessagesItem
                    key={m.id}
                    text={m.text}
                    fromMe={m.owner.id === user.data.currentUser.id}
                    createdAt={m.createdAt} />)
            }
        </div>
    )
};

export default ChatMessages;