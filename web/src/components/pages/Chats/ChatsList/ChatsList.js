import React, { useState, useEffect } from 'react';

import "./ChatsList.scss";
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { CHATS_QUERY, CHATS_LIST_QUERY } from '../../../../apollo/queries/chat-queries';
import ChatsListItem from './ChatsListItem/ChatsListItem';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { selectChatId } from '../../../../redux/actions/chats-actions';
import { useHistory } from 'react-router-dom';
import { CURRENT_USER_QUERY } from '../../../../apollo/queries/user-queries';
import { CHAT_CREATED_SUBSCRIPTION } from '../../../../apollo/subscriptions/chats-subscriptions';
import { addChatToChatsList, joinChatToChats } from '../../../../apollo/handlers/chats-handler';

const ChatsList = ({ selectedChatId }) => {

    const history = useHistory();

    const currentUserQuery = useQuery(CURRENT_USER_QUERY);
    const { data, loading, subscribeToMore } = useQuery(CHATS_LIST_QUERY);
    const client = useApolloClient();

    useEffect(() => {
        subscribeToMore({
            document: CHAT_CREATED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData: { data: { chatCreated } } }) => joinChatToChats(prev.chats, chatCreated)
        })
    }, []);


    const { chats } = data ?? { chats: [] };

    const user = currentUserQuery.data.currentUser
    return (
        <div className="chats-list">
            {
                chats.map(c =>
                    <ChatsListItem
                        chatId={c.id}
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