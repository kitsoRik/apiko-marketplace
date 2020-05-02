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


const ForgotPassword = (props) => {

    const [restoreStatus, setRestoreStatus] = useState(NOT_RESTORED);

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const sendRestoreLink = async () => {
        setRestoreStatus(RESTORING);
        const { success, error } = await api.restoreRequest(email)

        if (success) {
            setRestoreStatus(RESTORED);
        } else {
            setRestoreStatus(RESTORED_ERROR);
            setError(textFromError(error));
        }
    }

    return (
        <div className="forgot-password-page">
            <LoginForm loading={restoreStatus === RESTORING}>
                <LoginUpperContainer>
                    <LoginUpperContainerTitle>Restore Password</LoginUpperContainerTitle>
                    {restoreStatus === RESTORED &&
                        <Label className="forgot-password-page-sended">
                            If {email} is exists, message with restore link will have sent
                        </Label>}
                    {restoreStatus !== RESTORED &&
                        <Label
                            className="login-page__container-upper-form-field"
                            value="Email"
                            error={error}>
                            <TextField
                                value={email}
                                placeholder={"Example@gmail.com"}
                                error={error}
                                onValueChange={(e) => setEmail(e.target.value)} />
                        </Label>}
                    {restoreStatus !== RESTORED &&
                        <Button.Default
                            disabled={!checkValidEmail(email)}
                            className="forgot-password-page-sumbit-button"
                            onClick={sendRestoreLink}>
                            Continue
                        </Button.Default>}
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