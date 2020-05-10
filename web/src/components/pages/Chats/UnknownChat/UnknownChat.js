import React from 'react';

import "./UnknownChat.scss";

const UnknownChat = ({ reason = "Select chat" }) => {
    return (
        <div className="unknown-chat">
            <span className="unknown-chat-label">
                {reason}
            </span>
        </div>
    )
};

export default UnknownChat;