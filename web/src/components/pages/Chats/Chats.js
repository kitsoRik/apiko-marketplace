import React from 'react';

import "./Chats.scss";
import ChatsList from './ChatsList';
import Chat from './Chat';
import { connect } from 'react-redux';

const Chats = ({ match }) => {
    const chatId = match.params.id;

    return (
        <div className="chats-page">
            <ChatsList selectedChatId={chatId} />
            <Chat chatId={chatId} />
        </div>
    )
};

export default connect(
    ({ chats: { selectedChatId } }) => ({ selectedChatId })
)(Chats);;

