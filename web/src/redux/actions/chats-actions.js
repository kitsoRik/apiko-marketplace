export const
    SELECT_CHAT_ID = "SET_SELECTED_CHAT_ID";

export const selectChatId = (chatId) => ({
    type: SELECT_CHAT_ID,
    payload: {
        chatId
    }
});