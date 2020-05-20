import React, { useState, useEffect } from "react";

import "./ChatMessagesItem.scss";
import ChatMessageItemEdge from "./ChatMessageItemEdge";
import moment from "moment";

const ChatMessagesItem = ({
	style,
	text,
	fromMe = false,
	createdAt,
	...props
}) => {
	const [time, setTime] = useState(parseTime(createdAt));

	useEffect(() => {
		const intervar = setInterval(() => {
			setTime(parseTime(createdAt));
		}, 1000);
		return () => clearInterval(intervar);
	}, []); // eslint-disable-line

	return (
		<div
			className="chats-page-chat-messages-item"
			fromme={fromMe ? "" : null}
			style={style}
			{...props}
		>
			<div className="chats-page-chat-messages-item-bg">
				<span>{text}</span>
			</div>
			<span className="chats-page-chat-messages-item-time">
				{time}
			</span>
			<ChatMessageItemEdge
				className="chats-page-chat-messages-item-edge"
				color={fromMe ? "white" : "#349a89"}
			/>
		</div>
	);
};

export default ChatMessagesItem;

const parseTime = (str) => {
	const time = new Date(+str);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const now = new Date();

	if (time > today) {
		const sub = (now.getTime() - time.getTime()) / 1000;

		const secs = Math.floor(sub % 60);
		const minutes = Math.floor((sub / 60) % 60);
		const hours = Math.floor(sub / 3600);

		if (hours >= 1) {
			if (hours === 1) return `1 hour ago`;
			return `${hours} hours ago`;
		} else if (minutes >= 1) {
			if (minutes === 1) return `1 minute ago`;
			return `${minutes} minutes ago`;
		} else if (secs >= 1) {
			if (secs === 1) return `1 second ago`;
			return `${secs} seconds ago`;
		} else {
			return "just now";
		}
	}

	return moment(time).calendar();
};
