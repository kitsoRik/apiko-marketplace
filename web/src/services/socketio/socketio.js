// import socketIOClient from "socket.io-client";
// import { HOST } from "../api/api";
// import client from "../../apollo";
// import { CHAT_MESSAGES_QUERY, CHATS_LIST_QUERY, CHATS_QUERY } from "../../apollo/queries/chat-queries";
// import store from '../../redux/store';
// import { unreadChat } from "../../redux/actions/chats-actions";

// const socket = socketIOClient(HOST);

// socket.on('NEW_MESSAGE', (chatId, message) => {
//     try {
//         client.query({ query: CHATS_QUERY, fetchPolicy: 'network-only', variables: { id: chatId } }).then(console.log);
//         const { chat } = client.readQuery({
//             query: CHAT_MESSAGES_QUERY,
//             variables: { id: chatId, page: 1, limit: 30 }
//         });

//         const { id, messages } = chat;
//         client.writeQuery({
//             query: CHAT_MESSAGES_QUERY,
//             variables: { id: chatId, page: 1, limit: 30 },
//             data: {
//                 chat: {
//                     ...chat,
//                     messages: [
//                         message,
//                         ...messages
//                     ]
//                 }
//             }
//         });

//     } catch (e) {
//     }


//     try {
//         const { chats } = client.readQuery({
//             query: CHATS_LIST_QUERY,
//         });
//         const newChats = JSON.parse(JSON.stringify(chats));
//         newChats.find(c => c.id === chatId).messages = [message];

//         client.writeQuery({
//             query: CHATS_LIST_QUERY,
//             data: {
//                 chats: newChats
//             }
//         })
//     } catch (e) {

//     }

//     store.dispatch(unreadChat(chatId));
// });