import React, { useState } from 'react';

import './Login.scss';
import TextField from '../../layouts/TextField/TextField';
import Label from '../../layouts/Label/Label';
import Button from '../../layouts/Button/Button';
import { Link } from 'react-router-dom';
import LoginForm from '../../layouts/LoginForm/LoginForm';
import LoginUpperContainer from '../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainer';
import LoginLowerContainer from '../../layouts/LoginForm/LoginLowerContainer/LoginLowerContainer';
import LoginUpperContainerTitle from '../../layouts/LoginForm/LoginUpperContainer/LoginUpperContainerTitle/LoginUpperContainerTitle';

import api from '../../../services/api';
import { checkValidEmail } from '../../../services/checkers/checkers';
import { NOT_LOGINED, LOGINING, LOGINED_ERROR, LOGINED } from '../../../constants/login';

const Login = (props) => {

    const [loginStatus, setLoginStatus] = useState(NOT_LOGINED)
    const [error, setError] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        setLoginStatus(LOGINING);
        api.login(email, password)
            .then(({ success, result, error }) => {
                if(success) {
                    setLoginStatus(LOGINED);
                } else {
                    setLoginStatus(LOGINED_ERROR);
                    switch(error.type) {
                        case "EMAIL_IS_REQUIRED": setError("Email is required"); break;
                        case "PASSWORD_IS_REQUIRED": setError("Password is required"); break;
                        case "EMAIL_IS_NOT_VALID": setError("Email is not valid"); break;
                        default: setError("Unknown error"); break;
                    }
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
                    <Label 
                        className="login-page-form-field" 
                        value="Login"
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
                    <Button disabled={!allowSubmit()} onClick={() => login()}>
                        Continue
                    </Button>
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

export default Login;