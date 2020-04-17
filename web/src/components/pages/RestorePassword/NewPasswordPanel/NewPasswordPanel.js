import React, { useState } from 'react';

import LoginForm from '../../../layouts/LoginForm/LoginForm';
import './NewPasswordPanel.scss';
import LoginUpperContainer from '../../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainer';
import LoginUpperContainerTitle from '../../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainerTitle/LoginUpperContainerTitle';
import TextField from '../../../layouts/TextField/TextField';
import Label from '../../../layouts/Label/Label';
import Button from '../../../layouts/Button/Button';
import { NOT_RESTORED, RESTORED, RESTORED_ERROR, RESTORING } from '../../../../constants/restore';
import api from '../../../../services/api';
import Checkbox from '../../../layouts/Checkbox/Checkbox';

const NewPasswordPanel = (props) => {

    const [restoreStatus, setRestoreStatus] = useState(NOT_RESTORED);
    const [error, setError] = useState(null);

    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [leaveDevices, setLeaveDevices] = useState(true);

    const allowSubmit = 
        !checkPasswordValid(password) &&
        !checkPasswordAgainValid(password, passwordAgain)

    const restorePassword = () => {
        setRestoreStatus(RESTORING);
        api.restorePassword(password, leaveDevices)
            .then(({ success, error }) => {
                if(success) {
                    setRestoreStatus(RESTORED);
                } else {
                    setRestoreStatus(RESTORED_ERROR);

                    switch(error.type) {
                        case "PASSWORD_IS_REQUIRED": setError("Password is required"); break;
                        case "PASSWORD_MIN_LENGTH": setError("Password length must be 8 or greater"); break;
                        default: setError("Unknown error"); break;
                    }
                }
            });
    }

    const unrestoredPanel = (<LoginForm loading={restoreStatus === RESTORING}>
                                <LoginUpperContainer>
                                    <LoginUpperContainerTitle className="new-password-panel-title">
                                        Restore password
                                    </LoginUpperContainerTitle>
                                    { error && <Label error="true" value={error} /> }
                                    <Label 
                                        value="New password"
                                        errorValueIfTouched={checkPasswordValid(password)}>
                                        <TextField 
                                            value={password} 
                                            password="true"
                                            errorIfTouched={checkPasswordValid(password)}
                                            onChange={(e) => setPassword(e.target.value)} />
                                    </Label>
                                    <Label 
                                        className="new-password-panel-again-label" 
                                        value="New password again"
                                        errorValueIfTouched={checkPasswordAgainValid(password, passwordAgain)}>
                                        <TextField 
                                            value={passwordAgain} 
                                            password="true"
                                            errorIfTouched={checkPasswordAgainValid(password, passwordAgain)}
                                            onChange={(e) => setPasswordAgain(e.target.value)} />
                                    </Label>
                                    <Checkbox 
                                        className="new-password-panel-leave-devices-checkbox"
                                        checked={leaveDevices} 
                                        onChange={(e) => setLeaveDevices(e.target.checked)}
                                        value="Go out in all devices" />
                                    <Button 
                                        disabled={!allowSubmit}
                                        onClick={restorePassword}
                                    >Continue</Button>
                                </LoginUpperContainer>
                            </LoginForm>);
        const restoredPanel = (
            <LoginForm>
                <LoginUpperContainer>
                    <LoginUpperContainerTitle>
                        Password has restored
                    </LoginUpperContainerTitle>
                    <Label>Hey, your password has restored</Label>
                </LoginUpperContainer>
            </LoginForm>
        )

    return ( 
        <div className="new-password-panel">
            { restoreStatus !== RESTORED && unrestoredPanel }
            { restoreStatus === RESTORED && restoredPanel }
        </div>
     );
}

function checkPasswordValid(pass) {
    if(typeof pass !== 'string') throw new Error("It is not a string");
    if(pass.length < 8) return "Length must be greater or equal eight"

    return null;
}

function checkPasswordAgainValid(pass, again) {
    return checkPasswordValid(pass) || pass !== again ? "Password not equal password again" : null;
}
export default NewPasswordPanel;