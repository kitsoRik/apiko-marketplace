import React from "react";

import "./Profile.scss";
import Panel from "../../layouts/Panel/Panel";
import UserInformation from "./UserInformation/UserInformation";
import Tabs from "./Tabs/Tabs";
import FeedbacksContent from "./FeedbacksContent/FeedbacksContent";
import ProductsContent from "./ProductsContent/ProductsContent";
import SalesContent from "./SalesContent/SalesContent";
import withLoginedLock from "../../hocs/withLoginedLock";
import { useQuery } from "@apollo/react-hooks";
import { USER_PROFILE_DATA_QUERY, USER_QUERY } from "../../../apollo/queries/user-queries";
import useLocationQuery from "react-use-location-query";
import useCurrentUser from "../../hooks/useCurrentUser/useCurrentUser";
import useHeaderSearchPanel from "../../hooks/useHeaderSearchPanel/useHeaderSearchPanel";

const Profile = ({ match: { params: { id } } }) => {
	useHeaderSearchPanel();

	const {
		query: { tabIndex },
		setQuery,
	} = useLocationQuery({ tabIndex: 1 }, {
		parseNumber: true,
		parseBoolean: true,
		hideFalseValues: true
	});
	const { currentUser } = useCurrentUser();
	const { data, error, loading } = useQuery(USER_QUERY, {
		variables: {
			id,
		},
		skip: !id,
	});



	const userProfileDataQuery = useQuery(USER_PROFILE_DATA_QUERY, {
		variables: {
			id: !id ? currentUser.id : id,
		},
		skip: !currentUser?.id && !id
	});
	return (
		<div className="profile-page">
			<Panel className="profile-page-panel">
				{!loading && <UserInformation user={!id ? currentUser : data.user} />}
				<Tabs
					data={userProfileDataQuery.data}
					loading={userProfileDataQuery.loading}
					tabIndex={tabIndex}
					setTabIndex={(tabIndex) => setQuery({ tabIndex })}
				/>
				{!loading && (
					<div className="profile-page-main-content">
						{tabIndex === 0 && !!userProfileDataQuery.data?.user?.productsCount && (
							<FeedbacksContent userId={!id ? currentUser.id : id} />
						)}
						{false && <SalesContent userId={currentUser.id} />}
						{tabIndex === 2 && !!userProfileDataQuery.data?.user?.productsCount && <ProductsContent userId={!id ? currentUser.id : id} />}
					</div>
				)}
			</Panel>
		</div>
	);
};

export default withLoginedLock(true)(Profile);
