import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import QueryString from 'qs';


const withQuery = (WrapperComponent) => (props) => {

    const history = useHistory();
    const location = useLocation();

    const { search } = location;

    const query = QueryString.parse((search ?? "").substring(1));

    const changeQuery = (changes) => {
        const queryStr = QueryString.stringify({ ...query, ...changes });
        history.push(`${history.location.pathname}?${queryStr}`)
    }

    return <WrapperComponent {...props} query={query} changeQuery={changeQuery} />
};

export default withQuery;