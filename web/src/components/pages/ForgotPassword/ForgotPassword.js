import React, { useState } from 'react';
import Label from '../../layouts/Label/Label';
import TextField from '../../layouts/TextField/TextField';
import Button from '../../layouts/Button';

import './ForgotPassword.scss';
import LoginUpperContainer from '../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainer';
import LoginUpperContainerTitle from '../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainerTitle/LoginUpperContainerTitle';
import LoginForm from '../../layouts/LoginForm/LoginForm';
import api from '../../../services/api';
import { checkValidEmail } from '../../../services/checkers/checkers';
import { NOT_RESTORED, RESTORED, RESTORED_ERROR, RESTORING } from '../../../constants/restore';
import withLoginedLock from '../../hocs/withLoginedLock';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';


const ForgotPassword = (props) => {

    const [restoreStatus, setRestoreStatus] = useState(NOT_RESTORED);

    const [email, setEmail] = useState("");

    const [requrestToRestorePassword, { data, loading, error }] = useMutation(RESTORE_PASSWORD_REQUEST_MUTATION, {
        variables: { email }
    });

    return (
        <div className="forgot-password-page">
            <LoginForm loading={loading} onSubmit={(e) => e.preventDefault()}>
                <LoginUpperContainer>
                    <LoginUpperContainerTitle>Restore Password</LoginUpperContainerTitle>
                    {data?.restorePasswordRequest &&
                        <Label className="forgot-password-page-sended">
                            If {email} is exists, message with restore link will have sent
                        </Label>}
                    {!data?.restorePasswordRequest &&
                        <Label
                            className="login-page__container-upper-form-field"
                            value="Email"
                            error={error}>
                            <TextField
                                value={email}
                                placeholder={"Example@gmail.com"}
                                error={error}
                                onValueChange={setEmail} />
                        </Label>}
                    {!data?.restorePasswordRequest &&
                        <Button.Default
                            className="forgot-password-page-sumbit-button"
                            onClick={requrestToRestorePassword}
                            value="Continue"
                        />}
                </LoginUpperContainer>
            </LoginForm>
        </div>
    );
}

const textFromError = ({ type }) => {
    switch (type) {
        case "EMAIL_IS_REQUIRED": return "Email cannot be empty";
        case "EMAIL_IS_NOT_VALID": return "Email is not valid";
        default: return "Unknown error";
    }
}

export default withLoginedLock(false)(ForgotPassword);

const RESTORE_PASSWORD_REQUEST_MUTATION = gql`
    mutation restorePassword($email: String!) {
        restorePasswordRequest(email: $email)
    }
`;