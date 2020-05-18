import React, { useState } from 'react';

import './Header.scss';
import { Link, useHistory } from 'react-router-dom';
import ApikoLogo from '../ApikoLogo/ApikoLogo';
import PostboxIcon from '../../icons/PostboxIcon/PostboxIcon';
import { NOT_LOGINED, LOGINED, LOGINING, UNLOGINING } from '../../../constants/login';
import UserPanel from './UserPanel/UserPanel';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import HeartIcon from '../../icons/HeartIcon';
import Button from '../../layouts/Button';
import UserIcon from '../../icons/UserIcon';
import { useQuery, useSubscription, useApolloClient } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../apollo/queries/user-queries';
import HeaderSearchPanel from './HeaderSearchPanel/';
import withScreenSize from '../../hocs/withScreenSize/withScreenSize';
import DesktopHeader from './DesktopHeader/DesktopHeader';
import MobileHeader from './MobileHeader/MobileHeader';
import { MESSAGE_SENT_ANY_SUBSCRIPTION } from '../../../apollo/subscriptions/chats-subscriptions';
import { useDispatch } from 'react-redux';
import { unreadChat } from '../../../redux/actions/chats-actions';
import { CHAT_MESSAGES_QUERY } from '../../../apollo/queries/chat-queries';


const Header = ({ screenSize }) => {

    const dispatch = useDispatch();

    const history = useHistory();
    const darkMode = !['/login', '/register'].find((p) => p === history.location.pathname);

    const client = useApolloClient();
    const { data, loading, error } = useSubscription(MESSAGE_SENT_ANY_SUBSCRIPTION, {
        onSubscriptionData: ({ subscriptionData: { data } }) => {
            dispatch(unreadChat(data.messageSentAny.chat.id))
            console.log(data.messageSentAny.chat.id);
            try {
                const d = client.readQuery({
                    query: CHAT_MESSAGES_QUERY,
                    variables: { id: data.messageSentAny.chat.id, page: 1, limit: 30 }
                })

                client.writeQuery({
                    query: CHAT_MESSAGES_QUERY,
                    variables: { id: data.messageSentAny.chat.id, page: 1, limit: 30 },
                    data: {
                        ...d,
                        chat: {
                            ...d.chat,
                            messages: [
                                data.messageSentAny,
                                ...d.chat.messages
                            ]
                        }
                    }
                })
            } catch (e) {
                console.log(e);
            }
        }
    })
    return (
        <div className="header-wrapper" dark-mode={darkMode ? "true" : null}>
            {screenSize.width > 480 && <DesktopHeader />}
            {screenSize.width <= 480 && <MobileHeader />}
        </div>
    );
}

export default withScreenSize(Header);