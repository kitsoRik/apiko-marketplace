import React from 'react';
import SnackbarNotification from './SnackbarNotification';

export const info = () => <SnackbarNotification type="info" value="My info!"/>
export const warning = () => <SnackbarNotification type="warning" value="My warning!"/>
export const error = () => <SnackbarNotification type="error" value="My error!"/>

export default { title: "SnackbarNotification" };