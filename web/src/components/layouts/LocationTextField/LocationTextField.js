import React, { useState } from "react";

import "./LocationTextField.scss";
import TextField from "../../layouts/TextField";
import TextFieldAutocompleteOption from "../../layouts/TextField/TextFieldAutocompleteOption";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LocationIcon from "../../icons/LocationIcon";

const LocationTextField = ({
	onLocationIdChange = () => { },
	initialLocationName = "",
	locationId = -1,
	withIcon,
	...props
}) => {
	const [location, setLocation] = useState(initialLocationName);
	const [lastSelectedLocation, setLastSelectedLocation] = useState(
		initialLocationName
	);

	const { data, loading } = useQuery(LOCATION_QUERY, {
		variables: {
			locationPattern: location,
		},
		skip: lastSelectedLocation === location || location === "",
	});

	const onSelect = (id, name) => {
		setLastSelectedLocation(name);
		onLocationIdChange(id);
	};

	const onValueChange = (value) => {
		setLocation(value);
		if (value === "")
			onLocationIdChange(-1);
	};

	return (
		<TextField
			placeholder="Location (Ternopil, Kiev)"
			value={location}
			autoCompleteOptions={data?.locations?.map((l) => (
				<TextFieldAutocompleteOption
					onSelect={() => onSelect(l.id, l.name)}
					key={l.id}
					value={l.name}
					textValue={l.name}
				/>
			))}
			loading={loading}
			onValueChange={onValueChange}
			icon={withIcon && <LocationIcon />}
			{...props}
		/>
	);
};

const LOCATION_QUERY = gql`
	query location($locationPattern: String!) {
		locations(name: $locationPattern, limit: 10) {
			id
			name
		}
	}
`;

export default LocationTextField;
