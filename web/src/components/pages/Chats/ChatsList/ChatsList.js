import React, { useState } from 'react';

import "./ChatsList.scss";
import { useQuery } from '@apollo/react-hooks';
import { CHATS_QUERY } from '../../../../apollo/queries/chat-queries';
import ChatsListItem from './ChatsListItem/ChatsListItem';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectChatId } from '../../../../redux/actions/chats-actions';
import { useHistory } from 'react-router-dom';
import { CURRENT_USER_QUERY } from '../../../../apollo/queries/user-queries';

const ChatsList = ({ selectedChatId }) => {

    const history = useHistory();

    const currentUserQuery = useQuery(CURRENT_USER_QUERY);
    const { data, loading } = useQuery(CHATS_QUERY);

    if (!data?.chats) return null;

    const { chats } = data;

    const user = currentUserQuery.data.currentUser
    return (
        <div className="chats-list">
            {
                chats.map(c =>
                    <ChatsListItem
                        fullName={(user.id === c.shopper.id ? c.seller : c.shopper).fullName}
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