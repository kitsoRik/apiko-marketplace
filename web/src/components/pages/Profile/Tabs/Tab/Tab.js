import React from 'react';

import "./Tab.scss";

const Tab = ({ main, minor, active, activated }) => {
    return (
        <div className="profile-tab" active={active ? "true" : null} onClick={activated}>
            <span className="profile-tab-main-text">{ main }</span>
            <span className="profile-tab-minor-text">{ minor }</span>
        </div>
    )
};

export default Tab;