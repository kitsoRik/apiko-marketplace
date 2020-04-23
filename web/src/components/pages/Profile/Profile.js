import React, { useState, useEffect } from 'react';

import "./Profile.scss";
import Panel from '../../layouts/Panel/Panel';
import ProductCard from '../../layouts/ProductCard';
import UserInformation from './UserInformation/UserInformation';
import Tabs from './Tabs/Tabs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadUser, loadUserProducts } from '../../../redux/actions/users-actions';

const Profile = ({ loadUser, loadUserProducts, users, productsStore }) => {

	const user = users.find(u => +u.id === 3);

	const [tabIndex, setTabIndex] = useState(0);
	
	const products = productsStore[3]?.products;

	useEffect(() => {
		loadUser(3);
	}, [ ]);

	useEffect(() => {
		if(tabIndex === 2) {
			loadUserProducts(3);
		}
	}, [ tabIndex ]);

	return (
		<div className="profile-page">
			<Panel className="profile-page-panel">
				<UserInformation user={{ fullName: "Pidburachynskyi Rostyslav", location: "Ternopil, Ukraine" }}/>
				<Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
				<div className="profile-page-main-content">
					{ tabIndex === 1 && 
						<div className="profile-page-main-content-products">
							{
								user.products.map(p => <span></span>)
							}
						</div>
					}
					{ tabIndex === 2 && 
						<div className="profile-page-main-content-products">
							{
								products?.map(p => <ProductCard key={p.id} { ...p } />)
							}
						</div>
					}
				</div>
			</Panel>
		</div>
	)
};

export default compose(
	connect(({ users: { users, productsStore }}) => ({ users, productsStore }), { loadUser, loadUserProducts })
)(Profile);