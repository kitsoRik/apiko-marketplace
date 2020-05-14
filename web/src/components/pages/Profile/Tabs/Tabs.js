import React, { useEffect, useState } from 'react';

import "./Tabs.scss";
import Tab from './Tab/Tab';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const Tabs = ({ tabIndex, setTabIndex }) => {

    const [productsCount, setProductsCount] = useState(0);
    const [salesCount] = useState(0);
    const [feedbacksCount] = useState(0);

    const { data, loading } = useQuery(USER_PRODUCTS_COUNT_QUERY);

    useEffect(() => {
        if (!data) return;
        setProductsCount(data.currentUser.productsCount);
    }, [data]);

    const tabsInfo = [
        { main: Math.floor(data?.currentUser?.positiveFeedbacksCount / data?.currentUser?.feedbacksCount * 100) + "%", minor: "Positive feedbacks", loading },
        { main: salesCount, minor: "sales", loading, },
        { main: productsCount, minor: "Active listings", loading }
    ]

    return (
        <div className="profile-tabs">
            {
                tabsInfo.map(({ main, minor, loading }, index) =>
                    <Tab
                        key={index}
                        main={main}
                        minor={minor}
                        loading={loading}
                        active={tabIndex === index}
                        activated={() => setTabIndex(index)} />)
            }
        </div>
    )
};

export default Tabs;

const USER_PRODUCTS_COUNT_QUERY = gql`
    query {
        currentUser {
            id
            productsCount
            salesCount
            feedbacksCount
            positiveFeedbacksCount
        }
    }
`;