import React, { useState, useEffect } from 'react';

const _globalVariables = {};

const useGlobalVariable = (fieldName = '', defaultValue = '') => {

    const [state, setState] = useState(defaultValue);

    useEffect(() => {
        _globalVariables[fieldName] = state;
    }, [state]);

    if (_globalVariables[fieldName] === undefined)
        _globalVariables[fieldName] = defaultValue;

    return [state, setState];
};

export default useGlobalVariable;