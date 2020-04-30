import React, { useState } from 'react';

import './Login.scss';
import TextField from '../../layouts/TextField';
import Label from '../../layouts/Label';
import Button from '../../layouts/Button';
import { Link } from 'react-router-dom';
import LoginForm from '../../layouts/LoginForm';
import LoginUpperContainer from '../../layouts/LoginForm/LoginUpperContainer';
import LoginLowerContainer from '../../layouts/LoginForm/LoginLowerContainer';
import LoginUpperContainerTitle from '../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainerTitle';

import { checkValidEmail } from '../../../services/checkers/checkers';
import { LOGINING } from '../../../constants/login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/user-actions';
import withLoginedLock from '../../hocs/withLoginedLock';

const Login = ({ history, login, loginStatus }) => {
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const _login = () => login(email, password)
        .then(() => history.push("/"))
        .catch((error) => setError(textFromError(error)));

    const allowSubmit = () => {
        return checkValidEmail(email) && password;
    }

    return (
        <div className="login-page">
            <LoginForm loading={loginStatus === LOGINING}>
                <LoginUpperContainer>
                    <LoginUpperContainerTitle>Login</LoginUpperContainerTitle>
                    {error && <Label error={true} value={error} />}
                    <Label
                        className="login-page-form-field"
                        value="Email"
                        errorValueIfTouched={!checkValidEmail(email) ? "Email is not valid" : null}>
                        <TextField
                            value={email}
                            errorIfTouched={!checkValidEmail(email)}
                            placeholder={"Example@gmail.com"}
                            onChange={value => setEmail(value)} />
                    </Label>
                    <Label
                        className="login-page-form-field"
                        value="Password"
                        errorValueIfTouched={!password ? "Password is required" : null}>
                        <TextField
                            value={password}
                            password={true}
                            errorIfTouched={!password}
                            onChange={value => setPassword(value)} />
                    </Label>
                    <Link
                        className="login-page-forgot-label"
                        to="/forgot-password"
                    >Don't remeber password?</Link>
                    <Button.Default disabled={!allowSubmit()} onClick={_login} value="Continue" />
                </LoginUpperContainer>
                <LoginLowerContainer>
                    I have no account,&nbsp;
                    <span className="login-page-link">
                        <Link to="/register">REGISTER NOW</Link>
                    </span>
                </LoginLowerContainer>
            </LoginForm>
        </div>
    );
}

const textFromError = ({ type }) => {
    switch (type) {
        case "EMAIL_IS_REQUIRED": return "Email is required";
        case "PASSWORD_IS_REQUIRED": return "Password is required";
        case "EMAIL_IS_NOT_VALID": return "Email is not valid";
        case "UNKNOWN_DATA": return "Unknown data";
        default: return "Unknown error";
    }
}

export default compose(
    connect(({ user: { loginStatus } }) => ({ loginStatus }), { login }),
    withLoginedLock(false)
)(Login);