import React, { useEffect } from 'react';

import "./Chats.scss";
import ChatsList from './ChatsList';
import Chat from './Chat';
import { connect } from 'react-redux';
import UnknownChat from './UnknownChat/UnknownChat';
import { setViewingChat } from '../../../redux/actions/chats-actions';

const Chats = ({ match }) => {
    const chatId = match.params.id;

    return (
        <div className="chats-page">
            <ChatsList selectedChatId={chatId} />
            {chatId !== undefined && <Chat chatId={chatId} />}
            {chatId === undefined && <UnknownChat />}
        </div>
    )
};

export default Chats;

