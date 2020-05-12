import React, { useState, useCallback, useEffect } from 'react';

import "./ChatMessages.scss";
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { CHAT_MESSAGES_QUERY } from '../../../../../apollo/queries/chat-queries';
import ChatMessagesItem from './ChatMessagesItem/ChatMessagesItem';
import { CURRENT_USER_QUERY } from '../../../../../apollo/queries/user-queries';
import ModalLoading from '../../../../layouts/ModalLoading/ModalLoading';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache, InfiniteLoader } from 'react-virtualized';

const ChatMessages = ({ chatId, loading }) => {

    const [page, setPage] = useState(1);

    const cache = useCallback(() => new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 100
    }))();

    const { data, error } = useQuery(CHAT_MESSAGES_QUERY, {
        variables: {
            id: chatId,
            page,
            limit: 10
        },
        skip: loading
    });

    const client = useApolloClient();
    const user = useQuery(CURRENT_USER_QUERY);

    const { chat: { messages, messagesCount } } = data ?? { chat: { messages: [], messagesCount: 0 } };

    let msgs = [];

    try {
        for (let i = 1; i <= page; i++) {
            const c = client.readQuery({
                query: CHAT_MESSAGES_QUERY,
                variables: { id: chatId, page: i, limit: 10 }
            });
            console.log(c);
            msgs = [...msgs, ...c.chat.messages];
        }
    } catch (e) {
        console.log(e);
    }
    console.log(msgs);
    const ref = React.createRef();

    useEffect(() => {
        // console.log(ref.current);
        // if (ref.current) ref.current.scrollToIndex(messages.length - 1);
    }, [messages]);

    if (loading)
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
                isRowLoaded={({ index }) => { return messages.length > index; }}
            >
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
                                    rowRenderer={({ index, key, parent, style }) => {
                                        const m = messages.sort((a, b) => a.id < b.id)[index]
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
                                    } />
                        }
                    </AutoSizer>

                }
            </InfiniteLoader>
        </div >
    )
};

export default ChatMessages;