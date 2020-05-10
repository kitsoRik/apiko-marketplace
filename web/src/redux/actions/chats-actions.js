export const
    SELECT_CHAT_ID = "SET_SELECTED_CHAT_ID",
    UNREAD_CHAT = "UNREAD_CHAT",

    SET_VIEWING_CHAT = "SET_VIEWING_CHAT";

export const selectChatId = (chatId) => ({
    type: SELECT_CHAT_ID,
    payload: {
        chatId
    }
});


export const unreadChat = (chatId) => ({
    type: UNREAD_CHAT,
    payload: {
        chatId
    }
});

export const setViewingChat = (chatId) => ({
    type: SET_VIEWING_CHAT,
    payload: {
        chatId
    }
})