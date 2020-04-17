import React from 'react';
import { connect } from 'react-redux'
import { compose } from 'redux';

import UserIcon from '../UserIcon';

import './UserPanel.scss';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { unlogin } from '../../../redux/actions/user-actions';

const UserPanel = ({ email, fullName, unlogin }) => {
    return ( 
        <div className="user-panel">
            <div className="user-panel-upper">
                <UserIcon fullName={fullName} />
                <div className="user-panel-upper-info">
                    <span className="user-panel-upper-info-name">{ fullName }</span>
                    <span className="user-panel-upper-info-email">{ email }</span>
                    <Link className="user-panel-upper-info-profile-button" to="/profile">
                        Profile
                    </Link>
                </div>
            </div>
            <Button className="user-panel-edit-profile-button" type="transparent">Edit profile</Button>
            <Button className="user-panel-logout-button" type="transparent" onClick={() => unlogin()}>Logout</Button>
        </div>
     );
}

export default compose(
    connect(({ user: { data: { email, fullName }}}) => ({ email, fullName }), { unlogin })
)(UserPanel);