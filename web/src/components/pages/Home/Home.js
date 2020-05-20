import React, { useState, useEffect, useRef } from "react";

import "./Home.scss";

import Pagination from "../../layouts/Pagination/Pagination";
import SearchPanel from "./SearchPanel";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import { PRODUCTS_QUERY } from "../../../apollo/queries/products-queries";
import { connect } from "react-redux";
import {
	changeProductsSearchQuery,
	searchProducts,
} from "../../../redux/actions/products-actions";
import ProductsViewer from "../../other/ProductsViewer/ProductsViewer";
import useLocationQuery from "react-use-location-query";
import useHeaderSearchPanel from "../../hooks/useHeaderSearchPanel/useHeaderSearchPanel";

const Home = ({
	searchQuery,
	reactionSearchQuery,
	changeProductsSearchQuery,
	searchProducts,
}) => {
	const [justUpdate, setJustUpdate] = useState(0);
	const firstRun = useRef(true);
	const client = useApolloClient();

	useHeaderSearchPanel();

	const {
		query: {
			title,
			locationId,
			category,
			priceFrom,
			priceTo,
			sortField,
			sortOrder,
			page,
			limit,
			joinedPages,
		},
		setQuery,
	} = useLocationQuery(
		{
			...reactionSearchQuery,
			joinedPages: [reactionSearchQuery.page],
		},
		{
			parseNumber: true,
		}
	);

	const variables = {
		title,
		locationId,
		category,
		priceFrom,
		priceTo,
		sortField,
		sortOrder,
		page,
		limit,
	};
	const { data, loading } = useQuery(PRODUCTS_QUERY, { variables });

	useEffect(() => {
		if (firstRun.current) {
			firstRun.current = false;
			changeProductsSearchQuery({
				title: title,
				locationId: locationId,
			});
			return;
		}
		setQuery({
			title: reactionSearchQuery.title,
			locationId: reactionSearchQuery.locationId,
		});
	}, [reactionSearchQuery.title, reactionSearchQuery.locationId]); // eslint-disable-line

	let products = [];

	for (let i = 0; i < joinedPages.length; i++) {
		let data;
		try {
			data = client.readQuery({
				query: PRODUCTS_QUERY,
				variables: {
					...variables,
					page: joinedPages[i],
				},
			});
		} catch (e) {
			if (!loading) {
				client
					.query({
						query: PRODUCTS_QUERY,
						variables: {
							...variables,
							page: joinedPages[i],
						},
					})
					.then(() => setJustUpdate(justUpdate + 1));
			}
		}
		if (!data) continue;
		products = products.concat(data.products);
	}

	const pages = data ? Math.ceil(data.productsCount / limit) : 1;

	const onChangeSearchOptions = (changes, search = false) => {
		changeProductsSearchQuery(changes);
		setQuery(changes);

		if (search) searchProducts();
	};

	const onLoadMore = () => {
		const nextPage = page + 1;
		const nextJoinedPages = Array.isArray(joinedPages)
			? joinedPages
			: [joinedPages];
		onChangeSearchOptions(
			{
				page: nextPage,
				joinedPages: [...nextJoinedPages, nextPage],
			},
			true
		);
	};

	if (products.length === 0) {
		products = data?.products ?? [];
		if (products.length === 0) {
			if (page * limit > data?.productsCount + limit) {
				onChangeSearchOptions({ page: pages });
			}
		}
	}

	return (
		<div className="home-page">
			<SearchPanel
				changeProductsSearchQuery={changeProductsSearchQuery}
				searchProducts={searchProducts}
			/>
			<ProductsViewer
				products={products}
				loading={loading}
				visibleLoad={page < pages}
				onLoadMore={onLoadMore}
			/>
			<Pagination
				page={page}
				pages={pages}
				onChangePage={(page) =>
					onChangeSearchOptions(
						{ page, joinedPages: [page] },
						true
					)
				}
			/>
		</div>
	);
};

export default connect(
	({ products: { searchQuery, reactionSearchQuery } }) => ({
		reactionSearchQuery,
		searchQuery,
	}),
	{ changeProductsSearchQuery, searchProducts }
)(Home);
