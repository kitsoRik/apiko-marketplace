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

    const sendRestoreLink = () => {
        setRestoreStatus(RESTORING);
        api.restoreRequest(email)
        .then(({ success, result, error }) => {
            if(success) {
                setRestoreStatus(RESTORED);
            } else {
                setRestoreStatus(RESTORED_ERROR);

                switch(error.type) {
                    case "EMAIL_IS_REQUIRED": {
                        setError("Email cannot be empty");
                        break;
                    }
                    case "EMAIL_IS_NOT_VALID": {
                        setError("Email is not valid");
                        break;
                    }
                    default: {
                        setError("Unknown error");
                        break;
                    }
                }
            }
        });
    }
    
    return ( 
        <div className="forgot-password-page">
            <LoginForm loading={restoreStatus === RESTORING}>
                <LoginUpperContainer>
                    <LoginUpperContainerTitle>Restore Password</LoginUpperContainerTitle>
                    { restoreStatus === RESTORED &&
                        <Label className="forgot-password-page-sended">
                            If {email} is exists, message with restore link will have sent
                        </Label>}
                    { restoreStatus !== RESTORED && 
                        <Label 
                            className="login-page__container-upper-form-field" 
                            value="Email"
                            error={error}>
                            <TextField 
                                value={email} 
                                placeholder={"Example@gmail.com"}
                                error={error}
                                onChange={(e) => setEmail(e.target.value)} />
                        </Label>}
                    { restoreStatus !== RESTORED && 
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

export default withLoginedLock(false)(ForgotPassword);