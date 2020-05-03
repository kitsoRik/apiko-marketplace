import React, { useState } from 'react';

import "./Profile.scss";
import Panel from '../../layouts/Panel/Panel';
import UserInformation from './UserInformation/UserInformation';
import Tabs from './Tabs/Tabs';
import FeedbacksContent from './FeedbacksContent/FeedbacksContent';
import ProductsContent from './ProductsContent/ProductsContent';
import SalesContent from './SalesContent/SalesContent';
import withLoginedLock from '../../hocs/withLoginedLock';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const Profile = () => {

	const [tabIndex, setTabIndex] = useState(1);

	const { data, loading } = useQuery(LOAD_USER_QUERY)

	return (
		<div className="profile-page">
			<Panel className="profile-page-panel">
				{!loading && <UserInformation user={data.currentUser} />}
				<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
				{!loading && <div className="profile-page-main-content">
					{tabIndex === 0 && <FeedbacksContent userId={data.id} />}
					{tabIndex === 1 && <SalesContent userId={data.id} />}
					{tabIndex === 2 && <ProductsContent userId={data.id} />}
				</div>}
			</Panel>
		</div>
	)
};

export default withLoginedLock(true)(Profile);

const LOAD_USER_QUERY = gql`
query {
	currentUser {
		id
	 fullName
	 iconName
   }
 }`;