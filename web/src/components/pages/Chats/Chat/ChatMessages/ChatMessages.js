import React, { useState, useCallback, useEffect } from 'react';

import "./ChatMessages.scss";
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { CHAT_MESSAGES_QUERY } from '../../../../../apollo/queries/chat-queries';
import ChatMessagesItem from './ChatMessagesItem/ChatMessagesItem';
import { CURRENT_USER_QUERY } from '../../../../../apollo/queries/user-queries';
import ModalLoading from '../../../../layouts/ModalLoading/ModalLoading';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader } from 'react-virtualized';
import gql from 'graphql-tag';
import { MESSAGE_SENT_SUBSCRIPTION } from '../../../../../apollo/subscriptions/chats-subscriptions';

const ChatMessages = ({ chatId, isChatLoading }) => {

    const [page, setPage] = useState(1);
    const [lastChatId, setLastChatId] = useState(-1);

    const cache = useCallback(() => new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    }))();

    useEffect(() => {
        setPage(1);
        setLastChatId(chatId);
    }, [chatId]);

    const { data, error, loading, subscribeToMore } = useQuery(CHAT_MESSAGES_QUERY, {
        variables: {
            id: chatId,
            page,
            limit: 30
        },
        skip: isChatLoading || chatId != lastChatId,
    });

    useEffect(() => {
        subscribeToMore({
            document: MESSAGE_SENT_SUBSCRIPTION,
            variables: { chatId, page: 1, limit: 30 },
            updateQuery: (prev, { subscriptionData: { data: { messageSent } } }) => {
                return {
                    chat: {
                        ...prev.chat,
                        messages: [
                            ...prev.chat.messages,
                            messageSent,
                        ]
                    }
                }
            }
        })
    }, [chatId]);

    const client = useApolloClient();
    const user = useQuery(CURRENT_USER_QUERY);
    const { chat: { messagesCount } } = data ?? { chat: { messagesCount: 0 } };

    let messages = [];

    try {
        for (let i = 1; i <= page; i++) {
            const c = client.readQuery({
                query: CHAT_MESSAGES_QUERY,
                variables: { id: chatId, page: i, limit: 30 }
            });
            messages = [...messages, ...c.chat.messages];
        }
    } catch (e) {

    }

    if (loading && messages.length === 0)
        return (
            <div className="chats-page-chat-messages" style={{ paddingTop: 0 }}>
                <ModalLoading style={{ position: 'static' }} />
            </div>
        )

    return (
        <div className="chats-page-chat-messages">
            <InfiniteLoader
                rowCount={messagesCount}
                loadMoreRows={s => setPage(page + 1)}
                isRowLoaded={({ index }) => { return loading || index < messages.length; }}>
                {
                    ({ onRowsRendered, registerChild }) => <AutoSizer>
                        {
                            ({ width, height }) =>
                                <List
                                    ref={registerChild}
                                    deferredMeasurementCache={cache}
                                    onRowsRendered={onRowsRendered}
                                    width={width}
                                    height={height}
                                    rowHeight={cache.rowHeight}
                                    rowCount={messages.length}
                                    overscanRowCount={3}
                                    style={{ paddingTop: '45px' }}
                                    rowRenderer={renderMessage(messages, cache, user)} />
                        }
                    </AutoSizer>

                }
            </InfiniteLoader>
        </div >
    )
};

const renderMessage = (messages, cache, user) => ({ index, key, parent, style }) => {
    const m = messages[index]
    return (
        <CellMeasurer
            cache={cache}
            index={index}
            key={key}
            columnIndex={0}
            rowIndex={index}
            parent={parent}>
            <div className="chats-page-chat-messages-item-wrapper" style={style}>
                <ChatMessagesItem
                    key={m.id}
                    text={m.text}
                    fromMe={m.writter.id === user.data.currentUser.id}
                    createdAt={m.createdAt} />
            </div>
        </CellMeasurer>
    );
}
export default ChatMessages;