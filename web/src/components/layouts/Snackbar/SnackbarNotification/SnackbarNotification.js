import React from 'react';

import "./SnackbarNotification.scss";

const SnackbarNotification = ({ type="info", value }) => {
    return ( 
        <div className="snackbar-notification" type={type}>
            <span>{ value }</span>
        </div>
     );
}

export default SnackbarNotification;