import React, { useState } from 'react';

import "./ChatsList.scss";
import { useQuery } from '@apollo/react-hooks';
import { CHATS_QUERY } from '../../../../apollo/queries/chat-queries';
import ChatsListItem from './ChatsListItem/ChatsListItem';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectChatId } from '../../../../redux/actions/chats-actions';
import { useHistory } from 'react-router-dom';

const ChatsList = ({ selectedChatId }) => {

    const history = useHistory();

    const { data, loading } = useQuery(CHATS_QUERY);

    if (!data?.chats) return null;

    const { chats } = data;

    return (
        <div className="chats-list">
            {
                chats.map(c =>
                    <ChatsListItem
                        fullName={"QWE"}
                        lastMessage={c.messages[c.messages.length - 1]}
                        product={c.product}
                        selected={c.id === selectedChatId}
                        onSelect={() => history.push(`/chats/${c.id}`)}
                        key={c.id}
                    />
                )
            }
        </div>
    )
};

export default ChatsList;