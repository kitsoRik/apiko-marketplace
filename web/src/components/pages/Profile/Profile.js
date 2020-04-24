import React, { useState, useEffect } from 'react';

import "./Profile.scss";
import Panel from '../../layouts/Panel/Panel';
import ProductCard from '../../layouts/ProductCard';
import UserInformation from './UserInformation/UserInformation';
import Tabs from './Tabs/Tabs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadUser } from '../../../redux/actions/users-actions';
import FeedbacksContent from './FeedbacksContent/FeedbacksContent';
import ProductsContent from './ProductsContent/ProductsContent';
import SalesContent from './SalesContent/SalesContent';

const Profile = ({ loadUser, users }) => {

	const user = users.find(u => +u.id === 3);

	const [tabIndex, setTabIndex] = useState(1);
	
	useEffect(() => {
		loadUser(3);
	}, [ ]);

	return (
		<div className="profile-page">
			<Panel className="profile-page-panel">
				<UserInformation user={{ fullName: "Pidburachynskyi Rostyslav", location: "Ternopil, Ukraine" }}/>
				<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
				<div className="profile-page-main-content">
					{ tabIndex === 0 && <FeedbacksContent userId={3} /> }
					{ tabIndex === 1 && <SalesContent userId={3} />}
					{ tabIndex === 2 && <ProductsContent userId={3} /> }
				</div>
			</Panel>
		</div>
	)
};

export default compose(
	connect(({ users: { users }}) => ({ users }), { loadUser })
)(Profile);