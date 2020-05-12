import React, { useEffect } from 'react';

import "./Chats.scss";
import ChatsList from './ChatsList';
import Chat from './Chat';
import { connect } from 'react-redux';
import UnknownChat from './UnknownChat/UnknownChat';
import { setViewingChat } from '../../../redux/actions/chats-actions';
import withScreenSize from '../../hocs/withScreenSize/withScreenSize';
import { compose } from 'redux';
import withLoginedLock from '../../hocs/withLoginedLock/withLoginedLock';

const Chats = ({ match, screenSize }) => {
    const chatId = match.params.id;

    const visibleChatsList = screenSize.width > 640 || chatId === undefined;
    const visibleChats = chatId !== undefined;

    return (
        <div className="chats-page">
            {visibleChatsList && <ChatsList selectedChatId={chatId} />}
            {visibleChats && <Chat chatId={chatId} />}
            {!visibleChats && screenSize.width > 640 && <UnknownChat />}
        </div>
    )
};

export default compose(
    withLoginedLock(true),
    withScreenSize
)(Chats)

