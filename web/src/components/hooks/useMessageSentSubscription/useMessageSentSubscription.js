import { unreadChat } from "../../../redux/actions/chats-actions";
import { MESSAGE_SENT_ANY_SUBSCRIPTION } from "../../../apollo/subscriptions/chats-subscriptions";
import { CHAT_MESSAGES_QUERY, CHATS_LIST_QUERY } from "../../../apollo/queries/chat-queries";
import {
    useSubscription,
    useApolloClient,
} from "@apollo/react-hooks";
import { useDispatch } from "react-redux";

const useMessageSentSubscription = () => {
    const dispatch = useDispatch();

    const client = useApolloClient();
    useSubscription(
        MESSAGE_SENT_ANY_SUBSCRIPTION,
        {
            onSubscriptionData: ({ subscriptionData: { data: { messageSentAny } } }) => {
                dispatch(unreadChat(messageSentAny.chat.id));
                try {
                    const d = client.readQuery({
                        query: CHAT_MESSAGES_QUERY,
                        variables: {
                            id: messageSentAny.chat.id,
                            page: 1,
                            limit: 30,
                        },
                    });

                    client.writeQuery({
                        query: CHAT_MESSAGES_QUERY,
                        variables: {
                            id: messageSentAny.chat.id,
                            page: 1,
                            limit: 30,
                        },
                        data: {
                            ...d,
                            chat: {
                                ...d.chat,
                                messages: [
                                    messageSentAny,
                                    ...d.chat.messages,
                                ],
                            },
                        },
                    });
                } catch (e) {
                }

                try {
                    const d = client.readQuery({
                        query: CHATS_LIST_QUERY,
                    });

                    client.writeQuery({
                        query: CHATS_LIST_QUERY,
                        data: {
                            ...d,
                            chats: [
                                { ...d.chats.find(c => c.id === messageSentAny.chat.id), messages: [messageSentAny] },
                                ...d.chats.filter(c => c.id !== messageSentAny.chat.id),
                            ]
                        }
                    })
                } catch (e) {
                }
            },
        }
    );
};

export default useMessageSentSubscription;