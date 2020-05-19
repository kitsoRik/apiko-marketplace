import React from "react";

import "./Purchases.scss";
import ShopperPurchases from "./ShopperPurchases";
import SellerPurchases from "./SellerPurchases/";
import Tabs from "../../layouts/Tabs";
import Tab from "../../layouts/Tabs/Tab/Tab";
import withLoginedLock from "../../hocs/withLoginedLock/withLoginedLock";
import { useSubscription } from "@apollo/react-hooks";
import { PURCHASE_STATUS_CHANGED } from "../../../apollo/subscriptions/purchases-subscriptions";
import useLocationQuery from "react-use-location-query";

const parseSideTabIndex = (side) => {
	switch (side) {
		case "shopper":
			return 0;
		case "seller":
			return 1;
		default:
			return -1;
	}
};

const parseTabIndexToSide = (tabIndex) => {
	switch (tabIndex) {
		case 0:
			return "shopper";
		case 1:
			return "seller";
		default:
			return undefined;
	}
};

const Purchases = () => {
	const {
		query: { side },
		setQuery,
	} = useLocationQuery({ side: "shopper" }, { pas: true });
	useSubscription(PURCHASE_STATUS_CHANGED);

	const onChangeTabIndex = (index) => {
		setQuery({ side: parseTabIndexToSide(index) });
	};
	return (
		<div className="purchases-page">
			<div className="purchases-page-tabs">
				<Tabs
					tabIndex={parseSideTabIndex(side)}
					onChangeTabIndex={onChangeTabIndex}
				>
					<Tab>As shopper</Tab>
					<Tab>As seller</Tab>
				</Tabs>
			</div>
			<div className="purchases-page-content">
				{side === "shopper" && <ShopperPurchases />}
				{side === "seller" && <SellerPurchases />}
			</div>
		</div>
	);
};

export default withLoginedLock(true)(Purchases);
