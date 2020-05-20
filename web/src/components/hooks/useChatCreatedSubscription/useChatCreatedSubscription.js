import { unreadChat } from "../../../redux/actions/chats-actions";
import { CHAT_CREATED_SUBSCRIPTION } from "../../../apollo/subscriptions/chats-subscriptions";
import { CHATS_LIST_QUERY } from "../../../apollo/queries/chat-queries";
import { useApolloClient } from "@apollo/react-hooks";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import useCurrentUser from "../useCurrentUser/useCurrentUser";

const useChatCreatedSubscription = () => {
	const dispatch = useDispatch();

	const client = useApolloClient();
	const { currentUser } = useCurrentUser();

	useEffect(() => {
		const observer = client.subscribe({
			query: CHAT_CREATED_SUBSCRIPTION,
		});
		const subscription = observer.subscribe(
			({ data: { chatCreated } }) => {
				dispatch(unreadChat(chatCreated.id));
				try {
					const d = client.readQuery({
						query: CHATS_LIST_QUERY,
					});

					client.writeQuery({
						query: CHATS_LIST_QUERY,
						data: {
							...d,
							chats: [chatCreated, ...d.chats],
						},
					});
				} catch (e) {}
			}
		);
		return () => subscription.unsubscribe();
	}, [currentUser]); // eslint-disable-line
};

export default useChatCreatedSubscription;
