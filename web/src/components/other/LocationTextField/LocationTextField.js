import React, { useState } from 'react';

import "./LocationTextField.scss";
import TextField from '../../layouts/TextField';
import TextFieldAutocompleteOption from '../../layouts/TextField/TextFieldAutocompleteOption';
import api from '../../../services/api';
import _ from 'lodash';

const LocationTextField = ({ onValueChange, ...props }) => {

    const [location, setLocation] = useState("");
    const [locationsHint, setLocationHint] = useState([]);
    const [locationsHintLoading, setLocationHintLoading] = useState(false);

    const _onChange = _.debounce((value) => {
        console.log(value);
        if (!value) return;
        console.log(value);
        setLocation(value);
        setLocationHintLoading(true);
        api.graphql(locationQuery(value))
            .then(({ data: { locations } }) => {
                setLocationHintLoading(false);
                setLocationHint(locations);
            });
    }, 400);

    const onSelect = (id) => {
        onValueChange(id);
    }

    return (
        <TextField
            placeholder="Location" value={location}
            autoCompleteOptions={locationsHint.map(l => <TextFieldAutocompleteOption onSelect={() => onSelect(l.id)} key={l.id} value={l.name} textValue={l.name} />)}
            loading={locationsHintLoading}
            onValueChange={_onChange}
            onChange={() => { }}
            {...props}
        />
    )
};

const locationQuery = (locationPattern) =>
    `query{
        locations (namePattern: "${locationPattern}", limit: 10) {
          id
          name
        }
      }
`;

export default LocationTextField;