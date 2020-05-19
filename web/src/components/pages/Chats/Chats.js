import React from "react";

import "./Chats.scss";
import ChatsList from "./ChatsList";
import Chat from "./Chat";
import UnknownChat from "./UnknownChat/UnknownChat";
import withScreenSize from "../../hocs/withScreenSize/withScreenSize";
import { compose } from "redux";
import withLoginedLock from "../../hocs/withLoginedLock/withLoginedLock";
import useHidingFooter from "../../hooks/useHidingFooter";

const Chats = ({ match, screenSize }) => {
	const chatId = match.params.id;

	useHidingFooter();

	const visibleChatsList = screenSize.width > 640 || chatId === undefined;
	const visibleChats = chatId !== undefined;

	return (
		<div className="chats-page">
			{visibleChatsList && <ChatsList selectedChatId={chatId} />}
			{visibleChats && <Chat chatId={chatId} />}
			{!visibleChats && screenSize.width > 640 && <UnknownChat />}
		</div>
	);
};

export default compose(withLoginedLock(true), withScreenSize)(Chats);
