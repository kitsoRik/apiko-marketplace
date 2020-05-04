import React from 'react';

import UserIcon from '../../../icons/UserIcon';

import './UserPanel.scss';
import { Link, useHistory } from 'react-router-dom';
import Button from '../../../layouts/Button';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../../apollo/queries/user-queries';
import { gql } from 'apollo-boost';

const UserPanel = ({ ...props }) => {

    const history = useHistory();

    const { data } = useQuery(CURRENT_USER_QUERY);

    const apolloClient = useApolloClient();
    const [unlogin] = useMutation(UNLOGIN_MUTATION);

    const onUnlogin = () => unlogin()
        .then(() => {
            apolloClient.writeQuery({
                query: CURRENT_USER_QUERY,
                data: { currentUser: null }
            })
        });

    if (!data) return null;

    const { fullName, email, iconName } = data.currentUser;

    return (
        <div className="user-panel" {...props} tabIndex="0">
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
                onClick={onUnlogin} value="Logout" />
        </div>
    );
}

export default (UserPanel);

const UNLOGIN_MUTATION = gql`
    mutation {
        unlogin
    }
`;