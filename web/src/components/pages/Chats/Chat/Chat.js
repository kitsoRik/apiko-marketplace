import React, { useEffect } from 'react';

import "./Chat.scss";
import ChatHeader from './ChatHeader/ChatHeader';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { CHAT_QUERY } from '../../../../apollo/queries/chat-queries';
import ChatMessages from './ChatMessages/ChatMessages';
import ChatInputMessage from './ChatInputMessage/ChatInputMessage';
import { connect } from 'react-redux';
import { setViewingChat } from '../../../../redux/actions/chats-actions';
import gql from 'graphql-tag';

const Chat = ({ setViewingChat, chatId, className }) => {
    const client = useApolloClient();

    let chat = client.readFragment({
        fragment: gql`
            fragment chat on Chat {
                id
                product {
                  id
                  title
                  price
                  imageName
                }
                seller {
                  id
                  fullName
                  iconName
                }
                shopper  {
                  id
                  fullName
                  iconName
                }
            }
        `,
        id: chatId,
    });
    const { data } = useQuery(CHAT_QUERY, {
        variables: { id: chatId },
        skip: !!chat
    });

    useEffect(() => {
        if (!chatId) return;
        setViewingChat(chatId);

        return () => {
            setViewingChat(null);
        }
    }, [chatId]);

    if (!chat) chat = data?.chat;

    const loading = !chat;
    const { product, seller, shopper } = chat ?? {};

    return (
        <div className={`chats-page-chat ${className ?? ""}`}>
            <ChatHeader product={loading ? null : product} user={loading ? null : seller} loading={loading} />
            <ChatMessages chatId={chatId} isChatLoading={loading} />
            <ChatInputMessage chatId={chatId} loading={loading} />
        </div>
    )
};

export default connect(null, { setViewingChat })(Chat);