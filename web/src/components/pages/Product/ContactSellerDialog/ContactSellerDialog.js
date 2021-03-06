import React, { useState } from "react";

import "./ContactSellerDialog.scss";
import ModalDialog from "../../../layouts/ModalDialog/ModalDialog";
import Label from "../../../layouts/Label";
import TextField from "../../../layouts/TextField";
import UserIcon from "../../../icons/UserIcon";
import Button from "../../../layouts/Button";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
	CHATS_LIST_QUERY,
	CHATS_QUERY,
} from "../../../../apollo/queries/chat-queries";
import Chat from "../../Chats/Chat";
import { useHistory } from "react-router-dom";
import { CREATE_CHAT_MUTATION } from "../../../../apollo/mutation/chats-mutation";
import useLocationQuery from "react-use-location-query";

const ContactSellerDialog = ({
	userId,
	productId,
	productTitle,
	fullName,
	location,
	iconName,
}) => {
	const { query, setQuery } = useLocationQuery(
		{},
		{ parseBoolean: true, hideFalseValues: true }
	);

	const history = useHistory();

	const [initialMessage, setInitialMessage] = useState("");

	const [createChat, { client }] = useMutation(CREATE_CHAT_MUTATION);

	const { data } = useQuery(CHATS_LIST_QUERY);

	if (!data) return null;

	const { chats } = data;
	if (!chats) return null;
	const chat = chats.find((c) => c.product.id === productId);

	const onSubmit = async () => {
		const chat = await createChat({
			variables: { productId, initialMessage },
		});

		try {
			const data = client.readQuery({ query: CHATS_QUERY });
			client.writeQuery({
				query: CHATS_QUERY,
				data: {
					...data,
					chats: [...data.chats, chat.data.createChat],
				},
			});
		} catch (e) { }

		history.push(`/chats/${chat.data.createChat.id}`);
	};
	const onClosed = () => {
		setQuery({ chat: false });
	};

	if (!query.chat) return null;
	if (!chat) {
		return (
			<ModalDialog
				className="contact-selleer-dialog"
				opened={!!query.chat}
				onClosed={onClosed}
			>
				<h5 className="contact-selleer-dialog-title">
					Contact seller
				</h5>
				<h1>Subject: {productTitle}</h1>

				<div className="contact-selleer-dialog-user">
					<UserIcon
						userId={userId}
						src={iconName}
						fullName={fullName}
						className="contact-selleer-dialog-user-icon"
					/>
					<div className="contact-selleer-dialog-user-name">
						<span>{fullName}</span>
					</div>
					<div className="contact-selleer-dialog-user-location">
						<span>{location}</span>
					</div>
				</div>
				<Label
					className="contact-selleer-dialog-message"
					value="Message"
				>
					<TextField
						className="contact-selleer-dialog-message-text-field"
						multiline
						placeholder="For example: Hey, i want to buy your product."
						value={initialMessage}
						onValueChange={setInitialMessage}
					/>
				</Label>
				<Button.Default
					className="contact-selleer-dialog-submit"
					value="Submit"
					onClick={onSubmit}
				/>
			</ModalDialog>
		);
	}
	return (
		<ModalDialog
			className="contact-selleer-dialog"
			style={{ padding: 0 }}
			opened={!!query.chat}
			onClosed={onClosed}
		>
			<Chat className="contact-selleer-dialog-chat" chatId={chat.id} />
		</ModalDialog>
	);
};

export default ContactSellerDialog;
