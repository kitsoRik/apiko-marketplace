import React from "react";

import "./ChatsList.scss";
import { useQuery } from "@apollo/react-hooks";
import { CHATS_LIST_QUERY } from "../../../../apollo/queries/chat-queries";
import ChatsListItem from "./ChatsListItem/ChatsListItem";
import { useHistory } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser/useCurrentUser";

const ChatsList = ({ selectedChatId }) => {
	const history = useHistory();

	const { data } = useQuery(CHATS_LIST_QUERY);

	const { chats } = data ?? { chats: [] };

	const { currentUser } = useCurrentUser();

	return (
		<div className="chats-list">
			{chats.map((c) => (
				<ChatsListItem
					chatId={c.id}
					fullName={
						(currentUser.id === c.shopper.id
							? c.seller
							: c.shopper
						).fullName
					}
					lastMessage={c.messages[c.messages.length - 1]}
					product={c.product}
					selected={c.id === selectedChatId}
					onSelect={() => history.push(`/chats/${c.id}`)}
					key={c.id}
				/>
			))}
		</div>
	);
};

export default ChatsList;
