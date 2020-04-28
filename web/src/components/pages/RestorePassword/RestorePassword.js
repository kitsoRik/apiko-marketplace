import React, { useState, useEffect } from 'react';
import qs from 'qs';

import './RestorePassword.scss';
import { NOT_LOADED, LOADING, LOADED, LOADED_ERROR } from '../../../constants';
import api from '../../../services/api';
import NewPasswordPanel from './NewPasswordPanel';
import ErrorKeyPanel from './ErrorKeyPanel/ErrorKeyPanel';
import withLoginedLock from '../../hocs/withLoginedLock';

const RestorePassword = ({ history: { location: { search = "?" } } }) => {
    const key = qs.parse(search.slice(1));

    const [keyLoadingStatus, setKeyLoadingStatus] = useState(NOT_LOADED)
    const [error, setError] = useState(null);

    useEffect(() => {
        setKeyLoadingStatus(LOADING);
        api.checkRestoreKey(key)
            .then(({ success, error }) => {
                if (success) {
                    setKeyLoadingStatus(LOADED);
                } else {
                    setKeyLoadingStatus(LOADED_ERROR);
                    switch (error.type) {
                        case "UNKNOWN_KEY": setError("Unknown key"); break;
                        default: setError("Unknown error"); break;
                    }
                }
            });
    }, []);

    return (
        <div className="restore-password-page">
            {keyLoadingStatus === LOADED && <NewPasswordPanel />}
            {keyLoadingStatus === LOADING && <span>Checking key...</span>}
            {keyLoadingStatus === LOADED_ERROR && <ErrorKeyPanel error={error} />}
        </div>
    )
}

export default withLoginedLock(false)(RestorePassword);