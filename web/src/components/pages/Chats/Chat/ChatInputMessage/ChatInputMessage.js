import React, { useState } from "react";

import "./ChatInputMessage.scss";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { CHATS_LIST_QUERY } from "../../../../../apollo/queries/chat-queries";
import ChatInputMessageSmileButton from "./ChatInputMessageSmileButton";
import ChatInputMessageLinkButton from "./ChatInputMessageLinkButton";
import ChatInputMessageSendButton from "./ChatInputMessageSendButton";
import ModalLoading from "../../../../layouts/ModalLoading/ModalLoading";

const ChatInputMessage = ({ chatId, loading }) => {
	const [text, setText] = useState("");

	const [sendMessage, sendMessageMutationOption] = useMutation(
		SEND_MESSAGE_MUTATION,
		{
			variables: { chatId, text },
		}
	);

	const { client } = sendMessageMutationOption;

	const onSendMessage = async () => {
		const result = await sendMessage({
			variables: { chatId, text },
		});

		setText("");
		const { chats } = client.readQuery({
			query: CHATS_LIST_QUERY,
		});
		const newChats = JSON.parse(JSON.stringify(chats));
		newChats.find((c) => c.id === chatId).messages = [
			result.data.sendMessage,
		];

		client.writeQuery({
			query: CHATS_LIST_QUERY,
			data: {
				chats: newChats,
			},
		});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		onSendMessage();
	};

	const onClickSmileButton = (e) => {
		e.preventDefault();
	};

	const onClickLinkButton = (e) => {
		e.preventDefault();
	};

	return (
		<form className="chats-page-chat-input-message" onSubmit={onSubmit}>
			<input
				className="chats-page-chat-input-message-field"
				placeholder="Type your message here..."
				disabled={loading || sendMessageMutationOption.loading}
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<div className="chats-page-chat-input-message-buttons">
				<div className="chats-page-chat-input-message-loading">
					{sendMessageMutationOption.loading && (
						<ModalLoading darken={false} />
					)}
				</div>
				<ChatInputMessageSendButton
					className="chats-page-chat-input-message-buttons-send"
					disabled={text === ""}
					type="submit"
					onClick={onSubmit}
				/>
				<ChatInputMessageSmileButton
					className="chats-page-chat-input-message-buttons-smile"
					onClick={onClickSmileButton}
				/>
				<ChatInputMessageLinkButton
					className="chats-page-chat-input-message-buttons-smile"
					onClick={onClickLinkButton}
				/>
			</div>
		</form>
	);
};

export default ChatInputMessage;

const SEND_MESSAGE_MUTATION = gql`
	mutation sendMessage($chatId: ID!, $text: String!) {
		sendMessage(chatId: $chatId, text: $text) {
			id
			writter {
				id
			}
			text
			createdAt
			__typename
		}
	}
`;
