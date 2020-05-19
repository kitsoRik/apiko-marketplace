import React, { useState, useCallback, useEffect } from "react";

import "./ChatMessages.scss";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { CHAT_MESSAGES_QUERY } from "../../../../../apollo/queries/chat-queries";
import ChatMessagesItem from "./ChatMessagesItem/ChatMessagesItem";
import { CURRENT_USER_QUERY } from "../../../../../apollo/queries/user-queries";
import ModalLoading from "../../../../layouts/ModalLoading/ModalLoading";
import {
	List,
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	InfiniteLoader,
} from "react-virtualized";
import { clamp } from "lodash";
import useLocationQuery from "react-use-location-query";

const useCustomScroll = () => {
	let timeouts = [];
	let nextStep = 0;

	const dispatchScrollEvent = (e) => {
		const reactVirtualizedItem = document.querySelector(
			".ReactVirtualized__Grid.ReactVirtualized__List"
		);
		const scrollTop = reactVirtualizedItem.scrollTop;

		if (timeouts !== []) {
			timeouts.forEach((t) => clearTimeout(t));
			timeouts = [];
		}
		const deltaY = e.deltaY;

		nextStep = clamp(
			nextStep - deltaY,
			0,
			reactVirtualizedItem.scrollHeight -
			reactVirtualizedItem.clientHeight
		);
		e.preventDefault();

		const sub = nextStep - scrollTop;
		for (let i = 0; i < 1; i += 0.1) {
			const timer = setTimeout(() => {
				const koef = 1 - i * i;
				reactVirtualizedItem.scrollTo(0, nextStep - sub * koef);
				reactVirtualizedItem.dispatchEvent(new CustomEvent("scroll"));
				timeouts = timeouts.filter((t) => t !== timer);
			}, 20);

			timeouts.push(timer);
		}
	};

	const preventScroll = () => {
		const reactVirtualizedItem = document.querySelector(
			".ReactVirtualized__Grid.ReactVirtualized__List"
		);
		if (!reactVirtualizedItem) return;

		reactVirtualizedItem.removeEventListener("wheel", dispatchScrollEvent);
		reactVirtualizedItem.addEventListener("wheel", dispatchScrollEvent);
	};

	return preventScroll;
};

const ChatMessages = ({ chatId, isChatLoading }) => {
	const preventScroll = useCustomScroll();

	const {
		query: { page, limit },
		setQuery,
	} = useLocationQuery({ page: 1, limit: 30 }, { parseNumber: true });

	const [ref, setRef] = useState(null);
	const [lastChatId, setLastChatId] = useState(-1);

	const cache = useCallback(
		() =>
			new CellMeasurerCache({
				fixedWidth: true,
				defaultHeight: 100,
			})
	)();

	useEffect(() => { }, []);

	useEffect(() => {
		setQuery({ page: 1 });
		setLastChatId(chatId);
	}, [chatId]);

	useEffect(() => {
		if (ref) {
			preventScroll();
		}
	}, [ref]);

	const { data, loading } = useQuery(CHAT_MESSAGES_QUERY, {
		variables: {
			id: chatId,
			page,
			limit,
		},
		skip: isChatLoading || chatId != lastChatId,
	});

	const client = useApolloClient();
	const user = useQuery(CURRENT_USER_QUERY);
	const {
		chat: { messagesCount },
	} = data ?? { chat: { messagesCount: 0 } };

	let messages = [];

	try {
		for (let i = 1; i <= page; i++) {
			const c = client.readQuery({
				query: CHAT_MESSAGES_QUERY,
				variables: { id: chatId, page: i, limit },
			});
			messages = [...messages, ...c.chat.messages];
		}
	} catch (e) { }

	if (loading && messages.length === 0)
		return (
			<div className="chats-page-chat-messages" style={{ paddingTop: 0 }}>
				<ModalLoading style={{ position: "static" }} />
			</div>
		);

	return (
		<div className="chats-page-chat-messages">
			<InfiniteLoader
				rowCount={messagesCount}
				loadMoreRows={(s) => setQuery({ page: page + 1 })}
				isRowLoaded={({ index }) => {
					return loading || index < messages.length;
				}}
			>
				{({ onRowsRendered, registerChild }) => (
					<AutoSizer>
						{({ width, height }) => (
							<List
								ref={(r) => {
									setRef(r);
									registerChild(r);
								}}
								deferredMeasurementCache={cache}
								onRowsRendered={onRowsRendered}
								width={width}
								height={height}
								rowHeight={cache.rowHeight}
								rowCount={messages.length}
								style={{ paddingBottom: "45px" }}
								rowRenderer={renderMessage(
									messages,
									cache,
									user
								)}
							/>
						)}
					</AutoSizer>
				)}
			</InfiniteLoader>
		</div>
	);
};

const renderMessage = (messages, cache, user) => ({
	index,
	key,
	parent,
	style,
}) => {
	const m = messages[index];
	return (
		<CellMeasurer
			cache={cache}
			index={index}
			key={key}
			columnIndex={0}
			rowIndex={index}
			parent={parent}
		>
			<div
				className="chats-page-chat-messages-item-wrapper"
				style={style}
			>
				<ChatMessagesItem
					onWheel={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					key={m.id}
					text={m.text}
					fromMe={m.writter.id === user.data.currentUser.id}
					createdAt={m.createdAt}
				/>
			</div>
		</CellMeasurer>
	);
};
export default ChatMessages;

/* */
