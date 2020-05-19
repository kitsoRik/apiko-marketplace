import React from "react";

import "./ChatsListItem.scss";
import ProductIcon from "../../../../icons/ProductIcon";
import { useWindowSize } from "@react-hook/window-size";
import { connect } from "react-redux";
import moment from 'moment';

const ChatsListItem = ({
	chatId,
	unreadableChatsIds,
	fullName,
	lastMessage,
	product,
	selected,
	onSelect,
}) => {
	const lastMessageTime = parseLastMessageTime(lastMessage.createdAt);

	const [width] = useWindowSize();

	const isMinItem = width > 1024;
	const viewUnreadElipse =
		unreadableChatsIds?.findIndex((id) => id === chatId) !== -1;

	return (
		<div
			className={`chats-list-item ${
				selected ? "chats-list-item-selected" : ""
				}`}
			onClick={onSelect}
		>
			<div className="chats-list-item-user">
				<span className="chats-list-item-user-fullname">
					{fullName}
				</span>
				<div className="chats-list-item-user-last-message">
					<p className="chats-list-item-user-last-message-text">
						{lastMessage.text}
					</p>
				</div>
			</div>
			<div className="chats-list-item-divider"></div>
			<div className="chats-list-item-product">
				<div className="chats-list-item-product-image">
					<ProductIcon imageName={product.imageName} />
				</div>
				<span className="chats-list-item-product-title">
					{product.title}
				</span>
				<span className="chats-list-item-product-price">
					${product.price}
				</span>
			</div>

			{isMinItem && <div className="chats-list-item-divider"></div>}
			<div className="chats-list-item-time">
				<span className="chats-list-item-time-text">
					{lastMessageTime}
				</span>
			</div>
			{viewUnreadElipse && <div className="chats-list-item-elipse"></div>}
		</div>
	);
};

export default connect(({ chats: { selectedChatId, unreadableChatsIds } }) => ({
	selectedChatId,
	unreadableChatsIds,
}))(ChatsListItem);

const parseLastMessageTime = (str) => {
	const time = new Date(str);

	if (time > moment().subtract(1, "days"))
		return moment(time).format("hh:mm");

	if (time > moment().subtract(2, "days")) {
		return "Yesterday";
	}

	return moment(time).format("mm/dd");
};
