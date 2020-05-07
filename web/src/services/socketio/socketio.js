import socketIOClient from "socket.io-client";
import { HOST } from "../api/api";
import client from "../../apollo";
import { CHAT_MESSAGES_QUERY } from "../../apollo/queries/chat-queries";

const socket = socketIOClient(HOST);

// socket.connect();

socket.on('NEW_MESSAGE', (chatId, message) => {
    try {
        const { chat } = client.readQuery({
            query: CHAT_MESSAGES_QUERY,
            variables: { id: chatId }
        });

        const { messages } = chat;
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
        console.log(e);
    }
});

export const sh = () => {

}