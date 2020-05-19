import { unreadChat } from "../../../redux/actions/chats-actions";
import { CHAT_CREATED_SUBSCRIPTION } from "../../../apollo/subscriptions/chats-subscriptions";
import { CHATS_LIST_QUERY } from "../../../apollo/queries/chat-queries";
import {
    useSubscription,
    useApolloClient,
} from "@apollo/react-hooks";
import { useDispatch } from "react-redux";

const useChatCreatedSubscription = () => {
    const dispatch = useDispatch();

    const client = useApolloClient();
    useSubscription(
        CHAT_CREATED_SUBSCRIPTION,
        {
            onSubscriptionData: ({ subscriptionData: { data } }) => {
                dispatch(unreadChat(data.chatCreated.id));
                try {
                    const d = client.readQuery({
                        query: CHATS_LIST_QUERY,
                    });

                    client.writeQuery({
                        query: CHATS_LIST_QUERY,
                        data: {
                            ...d,
                            chats: [
                                data.chatCreated,
                                ...d.chats
                            ]
                        }
                    })
                } catch (e) {
                    console.log(e);
                }
            },
        }
    );
};

export default useChatCreatedSubscription;