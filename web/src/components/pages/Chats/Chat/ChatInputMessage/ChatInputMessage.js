import React, { useState } from 'react';

import "./ChatInputMessage.scss";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { CHAT_MESSAGES_QUERY } from '../../../../../apollo/queries/chat-queries';
import ChatInputMessageSmileButton from './ChatInputMessageSmileButton';
import ChatInputMessageLinkButton from './ChatInputMessageLinkButton';
import ChatInputMessageSendButton from './ChatInputMessageSendButton';

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

    const onSubmit = (e) => {
        e.preventDefault();

        onSendMessage();

        setText("");
    }

    const onClickSmileButton = e => {
        e.preventDefault();
    }

    const onClickLinkButton = e => {
        e.preventDefault();
    }

    return (
        <form className="chats-page-chat-input-message" onSubmit={onSubmit}>
            <input className="chats-page-chat-input-message-field"
                placeholder="Type your message here..."
                value={text} onChange={e => setText(e.target.value)} />
            <div className="chats-page-chat-input-message-buttons">
                <ChatInputMessageSendButton
                    className="chats-page-chat-input-message-buttons-send"
                    disabled={text === ""}
                    type="submit"
                    onClick={onSubmit} />
                <ChatInputMessageSmileButton
                    className="chats-page-chat-input-message-buttons-smile"
                    onClick={onClickSmileButton} />
                <ChatInputMessageLinkButton
                    className="chats-page-chat-input-message-buttons-smile"
                    onClick={onClickLinkButton} />
            </div>
        </form>
    )
};

export default ChatInputMessage;

const SEND_MESSAGE_MUTATION = gql`
mutation sendMessage($chatId: ID!, $text: String!) {
    sendMessage(chatId: $chatId, text: $text) {
        id
        writter {
            id
        }
        text
        createdAt
        __typename
    }
  }
`;