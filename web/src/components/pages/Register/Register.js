import React, { useState } from 'react';
import Label from '../../layouts/Label/Label';
import TextField from '../../layouts/TextField/TextField';
import Button from '../../layouts/Button';
import { Link } from 'react-router-dom';

import './Register.scss';
import LoginUpperContainer from '../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainer';
import LoginUpperContainerTitle from '../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainerTitle/LoginUpperContainerTitle';
import LoginLowerContainer from '../../layouts/LoginForm/LoginLowerContainer/LoginLowerContainer';
import LoginForm from '../../layouts/LoginForm/LoginForm';
import { REGISTERING, REGISTERED, REGISTERED_ERROR } from '../../../constants/register';
import withLoginedLock from '../../hocs/withLoginedLock/withLoginedLock';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { register } from '../../../redux/actions/user-actions';

const Register = ({ history, registerStatus, registerError, register }) => {

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const allowSubmit = () =>
        !checkEmailValid(email)
        && !checkFullNameValid(fullName)
        && !checkPasswordValid(password)
        && !checkPasswordAgainValid(password, passwordAgain);

    let registerErrorValue = "";

    switch (registerError?.type) {
        case "EMAIL_IS_BUSY": registerErrorValue = "Email is busy"; break;
        default: break;
    }

    const registerForm = (
        <LoginForm loading={registerStatus === REGISTERING}>
            <LoginUpperContainer>
                <LoginUpperContainerTitle>Register</LoginUpperContainerTitle>
                {registerStatus === REGISTERED_ERROR && <Label error={true} value={registerErrorValue} />}
                <Label
                    className="register-page-form-field"
                    value="Email"
                    errorValueIfTouched={checkEmailValid(email)}>
                    <TextField
                        value={email}
                        placeholder={"Example@gmail.com"}
                        errorIfTouched={checkEmailValid(email)}
                        onChange={(e) => setEmail(e.target.value)} />
                </Label>
                <Label
                    className="register-page-form-field"
                    value="Full name"
                    errorValueIfTouched={checkFullNameValid(fullName)}>
                    <TextField
                        value={fullName}
                        errorIfTouched={checkFullNameValid(fullName)}
                        onChange={(e) => setFullName(e.target.value)} />
                </Label>
                <Label
                    className="register-page-form-field"
                    value="Password"
                    errorValueIfTouched={checkPasswordValid(password)}>
                    <TextField
                        value={password}
                        errorIfTouched={checkPasswordValid(password)}
                        password={true}
                        onChange={(e) => setPassword(e.target.value)} />
                </Label>
                <Label
                    className="register-page-form-field"
                    value="Password again"
                    errorValueIfTouched={checkPasswordAgainValid(password, passwordAgain)}>
                    <TextField
                        value={passwordAgain}
                        errorIfTouched={checkPasswordAgainValid(password, passwordAgain)}
                        password={true}
                        onChange={(e) => setPasswordAgain(e.target.value)} />
                </Label>

                <Button.Default
                    className="register-page-sumbit-button"
                    disabled={!allowSubmit()}
                    onClick={() => register(email, fullName, password)} value="Register" />
            </LoginUpperContainer>
            <LoginLowerContainer>
                I already have account,&nbsp;
                    <span className="register-page-link">
                    <Link to="/login">LOGIN IN</Link>
                </span>
            </LoginLowerContainer>
        </LoginForm>
    );

    const registeredForm = (
        <LoginForm>
            <LoginUpperContainer>
                <LoginUpperContainerTitle>Registered</LoginUpperContainerTitle>
                <Label className="register-page-registered-label">Please, check your email for verify link</Label>
                <Button.Default onClick={() => history.push("/profile")} value="Go to profile" />
            </LoginUpperContainer>
        </LoginForm>
    )

    return (
        <div className="register-page">
            {registerStatus !== REGISTERED && registerForm}
            {registerStatus === REGISTERED && registeredForm}
        </div>
    );
}

function checkEmailValid(email) {
    if (!email) return "Email is required";
    if (!/[a-zA-Z\d+]+@[a-zA-Z]+\.[a-zA-Z]{1,5}/.test(email))
        return "Email is not valid";
}

function checkFullNameValid(fullName) {
    if (typeof fullName !== 'string') throw new Error("It is not a string");

    if (fullName.length < 2) return "Length must be greater or equal two";

    return null;
}

function checkPasswordValid(pass) {
    if (typeof pass !== 'string') throw new Error("It is not a string");
    if (pass.length < 8) return "Length must be greater or equal eight"

    return null;
}

function checkPasswordAgainValid(pass, again) {
    return checkPasswordValid(pass) || pass !== again ? "Password not equal password again" : null;
}

export default compose(
    withLoginedLock(false),
    connect(({ user: { registerStatus, registerError } }) => ({ registerStatus, registerError }), { register })
)(Register);