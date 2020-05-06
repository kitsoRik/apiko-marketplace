import React from 'react';

import "./ChatsList.scss";
import { useQuery } from '@apollo/react-hooks';
import { CHATS_QUERY } from '../../../../apollo/queries/chat-queries';

const ChatsList = () => {

    const { data, loading } = useQuery(CHATS_QUERY);
    console.log(data);

    if (!data?.chats) return null;

    const { chats } = data;
    return (
        <div>
            <ul>
                {
                    chats.map(c => <li>{c.id}</li>)
                }
            </ul>
        </div>
    )
};

export default ChatsList;