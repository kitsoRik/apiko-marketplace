import React from 'react';

import "./Tab.scss";

const Tab = ({ main, minor, active, activated }) => {
    
    return (
        <svg className="profile-tab" 
            active={active ? "true" : null} 
            onClick={activated} viewBox="0 0 160 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.65 73.4578V0.65H161.523V73.4578L89.7001 73.45L89.4618 73.45L89.28 73.6039L81.0648 80.5591L71.8935 73.5827L71.7191 73.45L71.4999 73.45L0.65 73.4578Z" 
                stroke="#EEEFF1" strokeWidth="2"/>
            <foreignObject className="profile-tab-container">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    <span className="profile-tab-container-main-text">{ main }</span>
                    <span className="profile-tab-container-minor-text">{ minor }</span>
                </div>
            </foreignObject>
        </svg>
    )
};

export default Tab;