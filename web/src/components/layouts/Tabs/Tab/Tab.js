import React from 'react';

import "./Tab.scss";

const Tab = ({ active, ...props }) => {
    return (
        <button className="tab" active={active ? "" : null} {...props}>
            1
        </button>
    )
};

export default Tab;