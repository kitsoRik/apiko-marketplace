import { SELECT_CHAT_ID } from "../actions/chats-actions";

const initState = {
    selectedChatId: null
};

const chatsReducer = (state = initState, action) => {
    switch (action.type) {

        case SELECT_CHAT_ID: {
            return {
                ...state,
                selectedChatId: action.payload.chatId
            }
        }

        default: return state;
    }
}

export default chatsReducer;