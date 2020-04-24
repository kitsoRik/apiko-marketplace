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

import api from '../../../services/api';
import { checkValidEmail } from '../../../services/checkers/checkers';
import { NOT_LOGINED, LOGINING, LOGINED_ERROR, LOGINED } from '../../../constants/login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../../redux/actions/user-actions';
import withLoginedLock from '../../hocs/withLoginedLock';

const Login = ({ history, login, loginStatus }) => {
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const _login = () => {
        login(email, password)
            .then(result => {
                history.push("/");
            })
            .catch(({ type }) => {
                switch(type) {
                    case "EMAIL_IS_REQUIRED": setError("Email is required"); break;
                    case "PASSWORD_IS_REQUIRED": setError("Password is required"); break;
                    case "EMAIL_IS_NOT_VALID": setError("Email is not valid"); break;
                    case "UNKNOWN_DATA": setError("Unknown data"); break;
                    default: setError("Unknown error"); break;
                }
            });
    }

    const allowSubmit = () => {
        return checkValidEmail(email) && password;
    }

    return ( 
        <div className="login-page">
            <LoginForm loading={loginStatus === LOGINING}>
                <LoginUpperContainer>
                    <LoginUpperContainerTitle>Login</LoginUpperContainerTitle>
                    { error && <Label error={true} value={error}/> }
                    <Label 
                        className="login-page-form-field" 
                        value="Email"
                        errorValueIfTouched={!checkValidEmail(email) ? "Email is not valid" : null}>
                        <TextField 
                            value={email} 
                            errorIfTouched={!checkValidEmail(email)}
                            placeholder={"Example@gmail.com"}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Label>
                    <Label 
                        className="login-page-form-field" 
                        value="Password"
                        errorValueIfTouched={!password ? "Password is required" : null}>
                        <TextField 
                            value={password} 
                            password={true}
                            errorIfTouched={!password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Label>
                    <Link 
                        className="login-page-forgot-label" 
                        to="/forgot-password"
                        >Don't remeber password?</Link>
                    <Button.Default disabled={!allowSubmit()} onClick={_login} value="Continue"/>
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

export default compose(
    connect(({ user: { loginStatus }}) => ({ loginStatus }), { login }),
    withLoginedLock(false)
)(Login);