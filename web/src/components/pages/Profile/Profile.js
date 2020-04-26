import React, { useState, useEffect } from 'react';

import "./Profile.scss";
import Panel from '../../layouts/Panel/Panel';
import UserInformation from './UserInformation/UserInformation';
import Tabs from './Tabs/Tabs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadUser } from '../../../redux/actions/users-actions';
import FeedbacksContent from './FeedbacksContent/FeedbacksContent';
import ProductsContent from './ProductsContent/ProductsContent';
import SalesContent from './SalesContent/SalesContent';
import withLoginedLock from '../../hocs/withLoginedLock';

const Profile = ({ loadUser, data, users }) => {
	const id = data.id;
	const user = users.find(u => +u.id === id);

	const [tabIndex, setTabIndex] = useState(1);

	useEffect(() => {
		loadUser(id);
	}, []);

	return (
		<div className="profile-page">
			<Panel className="profile-page-panel">
				{user && <UserInformation user={user} />}
				<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
				<div className="profile-page-main-content">
					{tabIndex === 0 && <FeedbacksContent userId={id} />}
					{tabIndex === 1 && <SalesContent userId={id} />}
					{tabIndex === 2 && <ProductsContent userId={id} />}
				</div>
			</Panel>
		</div>
	)
};

export default compose(
	connect(({ user: { data }, users: { users } }) => ({ data, users }), { loadUser }),
	withLoginedLock(true)
)(Profile);