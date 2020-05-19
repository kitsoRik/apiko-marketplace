import client from "../.";
import { CHATS_LIST_QUERY } from "../queries/chat-queries";

export const joinChatToChats = (chats, newChat) => {
	return {
		chats: [newChat, ...chats],
	};
};

export const addMessageToChat = (chatId, message) => {
	try {
		const chatsList = client.readQuery({
			query: CHATS_LIST_QUERY,
		});

		const newChatsList = JSON.parse(JSON.stringify(chatsList.chats));

		newChatsList.find((c) => c.id === chatId).messages = [message];

		client.writeQuery({
			query: CHATS_LIST_QUERY,
			data: {
				chats: newChatsList,
			},
		});
	} catch (e) {}
};
