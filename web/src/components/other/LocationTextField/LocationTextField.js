import React, { useState, useEffect } from 'react';

import "./LocationTextField.scss";
import TextField from '../../layouts/TextField';
import TextFieldAutocompleteOption from '../../layouts/TextField/TextFieldAutocompleteOption';
import api from '../../../services/api';
import _ from 'lodash';
import Icon from '../../layouts/Icon';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const LocationTextField = ({ onLocationIdChange = () => { }, locationId = -1, ...props }) => {

    const [location, setLocation] = useState("");
    const [lastSelectedLocation, setLastSelectedLocation] = useState("");

    const { data, loading } = useQuery(LOCATION_QUERY, {
        variables: {
            locationPattern: location
        },
        skip: lastSelectedLocation === location
    });

    // const _onChange = _.debounce((value) => {
    //     console.log(value);
    //     if (!value) return;
    //     console.log(value);
    //     setLocation(value);
    //     setLocationHintLoading(true);
    //     api.graphql(locationQuery(value))
    //         .then(({ data: { locations } }) => {
    //             setLocationHintLoading(false);
    //             setLocationHint(locations);
    //         });
    // }, 400);

    const onSelect = (id, name) => {
        setLastSelectedLocation(name);
        onLocationIdChange(id);
    }

    const onValueChange = value => {
        setLocation(value);
    }

    return (
        <TextField
            placeholder="Location" value={location}
            autoCompleteOptions={data?.locations?.map(l => <TextFieldAutocompleteOption onSelect={() => onSelect(l.id, l.name)} key={l.id} value={l.name} textValue={l.name} />)}
            loading={loading}
            onValueChange={onValueChange}
            icon={
                <Icon>
                    <svg width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.22222 0C2.91694 0 0 2.80662 0 5.77778C0 11.7808 5.9422 18.3683 5.77778 18.7778C6.27255 18.7295 6.38357 18.7778 7.22222 18.7778C6.62727 18.7706 6.73016 18.7295 7.22222 18.7778C7.06051 18.3604 13 11.6634 13 5.77778C13 2.80662 10.0831 0 7.22222 0ZM7.22222 8.66667C5.30418 8.66667 4.33333 7.69815 4.33333 7.22222C4.33333 5.30426 5.30418 4.33333 7.22222 4.33333C7.69582 4.33333 8.66667 5.30426 8.66667 7.22222C8.66667 7.69815 7.69582 8.66667 7.22222 8.66667Z" fill="#5C5C5C" />
                    </svg>
                </Icon>
            }
            {...props}
        />
    )
};

const LOCATION_QUERY = gql`
query location($locationPattern: String!) {
        locations (name: $locationPattern, limit: 10) {
          id
          name
        }
      }
`;

export default LocationTextField;