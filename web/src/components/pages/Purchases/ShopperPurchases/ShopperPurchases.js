import React from "react";

import "./ShopperPurchases.scss";
import { useQuery } from "@apollo/react-hooks";
import { SHOPPER_PURCHASES_QUERY } from "../../../../apollo/queries/purchases-queries";
import ShopperPurchasesItem from "./ShopperPurchasesItem/ShopperPurchasesItem";
import Pagination from "../../../layouts/Pagination/Pagination";
import FilterPanel from "../FilterPanel/FilterPanel";
import useLocationQuery from "react-use-location-query";

const ShopperPurchases = () => {
	const {
		query: {
			viewOpened,
			viewPosted,
			viewCanceled,
			viewClosed,
			sortField,
			sortOrder,
			page,
			limit,
		},
		setQuery,
	} = useLocationQuery(
		{
			page: 1,
			limit: 10,
			viewOpened: true,
			viewPosted: true,
			viewCanceled: true,
			viewClosed: true,
			sortField: "created",
			sortOrder: "DESC",
		},
		{
			parseBoolean: true,
			parseNumber: true,
		}
	);
	const { data } = useQuery(SHOPPER_PURCHASES_QUERY, {
		variables: {
			page,
			limit,
			viewOpened,
			viewPosted,
			viewCanceled,
			viewClosed,
			sortField,
			sortOrder,
		},
	});

	return (
		<div className="purchases-page-shopper-purchases">
			<FilterPanel />
			<div className="purchases-page-shopper-purchases-container">
				{data?.shopperPurchases?.map((p) => (
					<ShopperPurchasesItem {...p} />
				))}
			</div>
			<Pagination
				page={page}
				pages={Math.ceil(data?.shopperPurchasesCount / limit)}
				onChangePage={(page) => setQuery({ page })}
			/>
		</div>
	);
};

export default ShopperPurchases;
