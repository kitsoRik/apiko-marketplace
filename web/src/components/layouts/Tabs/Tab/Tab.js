import React from 'react';

import "./Tab.scss";

const Tab = ({ active, children, ...props }) => {
    return (
        <button className="tab" active={active ? "" : null} {...props}>
            {children}
        </button>
    )
};

export default Tab;