import socketIOClient from "socket.io-client";
import { HOST } from "../api/api";
import client from "../../apollo";
import { CHAT_MESSAGES_QUERY } from "../../apollo/queries/chat-queries";
import store from '../../redux/store';
import { unreadChat } from "../../redux/actions/chats-actions";

const socket = socketIOClient(HOST);

socket.on('NEW_MESSAGE', (chatId, message) => {
    try {
        const { chat } = client.readQuery({
            query: CHAT_MESSAGES_QUERY,
            variables: { id: chatId }
        });

        const { id, messages } = chat;
        client.writeQuery({
            query: CHAT_MESSAGES_QUERY,
            variables: { id: chatId },
            data: {
                chat: {
                    ...chat,
                    messages: [
                        ...messages,
                        message
                    ]
                }
            }
        });
    } catch (e) {
    }
    store.dispatch(unreadChat(chatId));
});