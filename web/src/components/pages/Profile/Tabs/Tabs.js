import React from 'react';

import "./Tabs.scss";
import Tab from './Tab/Tab';

const Tabs = ({ tabIndex, setTabIndex }) => {

    const tabsInfo = [
        { main: "88%", minor: "Positive feedback" },
        { main: "123", minor: "sales" },
        { main: "12", minor: "Active listings" }
    ]

    return (
        <div className="profile-tabs">
            {
                tabsInfo.map(({ main, minor }, index) => 
                    <Tab 
                        main={main} 
                        minor={minor} 
                        active={tabIndex === index} 
                        activated={() => setTabIndex(index)}/>)
            }
        </div>
    )
};

export default Tabs;