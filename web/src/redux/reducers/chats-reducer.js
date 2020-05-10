import { SELECT_CHAT_ID, UNREAD_CHAT, SET_VIEWING_CHAT } from "../actions/chats-actions";

const initState = {
    selectedChatId: null,
    unreadableChatsIds: [],
    viewingChatId: null
};

const chatsReducer = (state = initState, action) => {
    switch (action.type) {

        case SELECT_CHAT_ID: {
            return {
                ...state,
                selectedChatId: action.payload.chatId
            }
        }

        case UNREAD_CHAT: {
            const { chatId } = action.payload;
            if (chatId === state.viewingChatId) return state;
            return {
                ...state,
                unreadableChatsIds: state.unreadableChatsIds.concat([chatId])
            }
        }

        case SET_VIEWING_CHAT: {
            const { chatId } = action.payload;
            return {
                ...state,
                unreadableChatsIds: state.unreadableChatsIds.filter(c => c !== chatId),
                viewingChatId: chatId
            }
        }

        default: return state;
    }
}

export default chatsReducer;