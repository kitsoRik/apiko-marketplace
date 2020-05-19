import React from "react";

const ChatInputMessageSendButton = ({ disabled, ...props }) => {
	return (
		<button {...props} disabled={disabled}>
			<svg
				width="23"
				height="22"
				viewBox="0 0 23 22"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M23 11L0.500001 21.3923L0.500002 0.607695L23 11Z"
					fill="#97A3B4"
				/>
			</svg>
		</button>
	);
};

export default ChatInputMessageSendButton;
