import React, { useState } from 'react';

import "./ChatInputMessage.scss";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { CHAT_MESSAGES_QUERY } from '../../../../../apollo/queries/chat-queries';
import ChatInputMessageSmileButton from './ChatInputMessageSmileButton';
import ChatInputMessageLinkButton from './ChatInputMessageLinkButton';

const ChatInputMessage = ({ chatId }) => {

    const [text, setText] = useState("");

    const [sendMessage, { client }] = useMutation(SEND_MESSAGE_MUTATION, {
        variables: { chatId, text },
    });

    const onSendMessage = async () => {
        const result = await sendMessage({
            variables: { chatId, text }
        });

        const data = client.readQuery({
            query: CHAT_MESSAGES_QUERY,
            variables: {
                id: chatId
            }
        });
        client.writeQuery({
            query: CHAT_MESSAGES_QUERY,
            variables: { id: chatId },
            data: {
                ...data,
                chat: {
                    ...data.chat,
                    messages: [
                        ...data.chat.messages,
                        { ...result.data.sendMessage }
                    ]
                }
            }
        })
    }

    return (
        <div className="chats-page-chat-input-message">
            <input className="chats-page-chat-input-message-field"
                placeholder="Type your message here..."
                value={text} onChange={e => setText(e.target.value)} />
            <div className="chats-page-chat-input-message-buttons">
                <ChatInputMessageSmileButton className="chats-page-chat-input-message-buttons-smile"
                    onClick={onSendMessage} />
                <ChatInputMessageLinkButton className="chats-page-chat-input-message-buttons-smile"
                    onClick={onSendMessage} />
            </div>
        </div>
    )
};

export default ChatInputMessage;

const SEND_MESSAGE_MUTATION = gql`
mutation sendMessage($chatId: ID!, $text: String!) {
    sendMessage(chatId: $chatId, text: $text) {
        id
        owner {
            id
        }
        text
        createdAt
        __typename
    }
  }
`;