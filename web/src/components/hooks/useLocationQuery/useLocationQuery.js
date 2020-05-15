import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QueryString from 'qs';


const useLocationQuery = () => {
    const history = useHistory();
    const location = useLocation();

    const { search } = location;

    const query = QueryString.parse((search ?? "").substring(1));

    const setQuery = (changes) => {
        const queryStr = QueryString.stringify({ ...query, ...changes });
        history.push(`${history.location.pathname}?${queryStr}`)
    }

    return {
        query,
        setQuery,
    }
};

export default useLocationQuery;