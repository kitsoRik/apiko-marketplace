import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';

import UserIcon from '../../../icons/UserIcon';

import './UserPanel.scss';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../../layouts/Button';
import { unlogin } from '../../../../redux/actions/user-actions';

const UserPanel = ({ email, fullName, unlogin, iconName, ...props }) => {

    const history = useHistory();

    return (
        <div className="user-panel" {...props}>
            <div className="user-panel-upper">
                <UserIcon fullName={fullName} src={iconName} />
                <div className="user-panel-upper-info">
                    <span className="user-panel-upper-info-name">{fullName}</span>
                    <span className="user-panel-upper-info-email">{email}</span>
                    <Link className="user-panel-upper-info-profile-button" to="/profile">
                        Profile
                    </Link>
                </div>
            </div>
            <Button.Transparent
                className="user-panel-edit-profile-button"
                onClick={() => history.push("/edit-profile")} value="Edit profile" />
            <Button.Transparent
                className="user-panel-logout-button"
                onClick={() => unlogin()} value="Logout" />
        </div>
    );
}

export default compose(
    connect(({ user: { data: { email, fullName, iconName } } }) => ({ email, fullName, iconName }), { unlogin })
)(UserPanel);