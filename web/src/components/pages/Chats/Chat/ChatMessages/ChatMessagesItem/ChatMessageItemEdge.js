import React from "react";

const ChatMessageItemEdge = ({ className, color }) => {
	return (
		<svg
			className={className}
			width="11"
			height="12"
			viewBox="0 0 11 12"
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M10.5 0.5H2L10.5 10V0.5Z" stroke={color} />
		</svg>
	);
};

export default ChatMessageItemEdge;
