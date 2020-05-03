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
import { Formik } from 'formik';
import { gql, defaultDataIdFromObject } from 'apollo-boost';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CURRENT_USER_QUERY } from '../../../apollo/queries/user-queries';

const Register = ({ history }) => {

    const apolloClient = useApolloClient();
    const [register, { data, loading }] = useMutation(REGISTER_MUTATION);

    const onSubmit = ({ email, fullName, password }, { setSubmitting, setErrors }) => {
        setSubmitting(true);
        register({
            variables: { email, fullName, password },
        })
            .then((d) => {
                console.log(d.data);
                apolloClient.writeQuery({
                    query: CURRENT_USER_QUERY,
                    data: {
                        currentUser: d.data.register
                    }
                })
            })
            .catch(({ type }) => {
                switch (type) {
                    case "EMAIL_IS_BUSY": setSubmitting(false); setErrors({ email: "Email is busy" }); break;
                    default: break;
                }
            });
    }

    const initialValues = { email: "", password: "", passwordAgain: "", fullName: "" };
    const validate = ({ email, password, passwordAgain, fullName }) => {
        const errors = {};

        if (!email) errors.email = "Email is required"
        else if (!/[a-zA-Z\d+]+@[a-zA-Z]+\.[a-zA-Z]{1,5}/.test(email)) errors.email = "Email is not valid";

        if (password.length < 8) errors.password = "Length must be greater or equal eight";
        if (passwordAgain.length < 8) errors.passwordAgain = "Length must be greater or equal eight"
        else if (passwordAgain !== password) errors.passwordAgain = "Passwords is not equal";

        if (fullName.length < 2) errors.fullName = "Length must be greater or equal two";


        return errors;
    }

    const registerForm = (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
        >
            {
                ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                        <LoginForm loading={isSubmitting} onSubmit={handleSubmit}>
                            <LoginUpperContainer>
                                <LoginUpperContainerTitle>Register</LoginUpperContainerTitle>
                                <Label
                                    className="register-page-form-field"
                                    value="Email"
                                    error={!!touched.email && errors.email}>
                                    <TextField
                                        value={values.email}
                                        placeholder={"Example@gmail.com"}
                                        name="email"
                                        error={!!touched.email && !!errors.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </Label>
                                <Label
                                    className="register-page-form-field"
                                    value="Full name"
                                    error={!!touched.fullName && errors.fullName}>
                                    <TextField
                                        value={values.fullName}
                                        error={!!touched.fullName && !!errors.fullName}
                                        name="fullName"
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </Label>
                                <Label
                                    className="register-page-form-field"
                                    value="Password"
                                    error={!!touched.password && errors.password}>
                                    <TextField
                                        value={values.password}
                                        error={!!touched.password && !!errors.password}
                                        name="password"
                                        password={true}
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </Label>
                                <Label
                                    className="register-page-form-field"
                                    value="Password again"
                                    error={!!touched.passwordAgain && errors.passwordAgain}>
                                    <TextField
                                        value={values.passwordAgain}
                                        error={!!touched.passwordAgain && !!errors.passwordAgain}
                                        password={true}
                                        name="passwordAgain"
                                        onChange={handleChange}
                                        onBlur={handleBlur} />
                                </Label>
                                <Button.Default
                                    className="register-page-sumbit-button"
                                    disabled={Object.keys(errors).length !== 0 || Object.keys(touched).length === 0}
                                    type="submit"
                                    onClick={handleSubmit} value="Register" />
                            </LoginUpperContainer>
                            <LoginLowerContainer>
                                I already have account,&nbsp;
                    <span className="register-page-link">
                                    <Link to="/login">LOGIN IN</Link>
                                </span>
                            </LoginLowerContainer>
                        </LoginForm>
                    )
            }
        </Formik>
    );

    // const registerForm = (
    //     <LoginForm loading={registerStatus === REGISTERING}>
    //         <LoginUpperContainer>
    //             <LoginUpperContainerTitle>Register</LoginUpperContainerTitle>
    //             {registerStatus === REGISTERED_ERROR && <Label error={true} value={registerErrorValue} />}
    //             <Label
    //                 className="register-page-form-field"
    //                 value="Email"
    //                 errorValueIfTouched={checkEmailValid(email)}>
    //                 <TextField
    //                     value={email}
    //                     placeholder={"Example@gmail.com"}
    //                     errorIfTouched={checkEmailValid(email)}
    //                     onChange={(e) => setEmail(e.target.value)} />
    //             </Label>
    //             <Label
    //                 className="register-page-form-field"
    //                 value="Full name"
    //                 errorValueIfTouched={checkFullNameValid(fullName)}>
    //                 <TextField
    //                     value={fullName}
    //                     errorIfTouched={checkFullNameValid(fullName)}
    //                     onChange={(e) => setFullName(e.target.value)} />
    //             </Label>
    //             <Label
    //                 className="register-page-form-field"
    //                 value="Password"
    //                 errorValueIfTouched={checkPasswordValid(password)}>
    //                 <TextField
    //                     value={password}
    //                     errorIfTouched={checkPasswordValid(password)}
    //                     password={true}
    //                     onChange={(e) => setPassword(e.target.value)} />
    //             </Label>
    //             <Label
    //                 className="register-page-form-field"
    //                 value="Password again"
    //                 errorValueIfTouched={checkPasswordAgainValid(password, passwordAgain)}>
    //                 <TextField
    //                     value={passwordAgain}
    //                     errorIfTouched={checkPasswordAgainValid(password, passwordAgain)}
    //                     password={true}
    //                     onChange={(e) => setPasswordAgain(e.target.value)} />
    //             </Label>

    //             <Button.Default
    //                 className="register-page-sumbit-button"
    //                 disabled={!allowSubmit()}
    //                 onClick={() => register(email, fullName, password)} value="Register" />
    //         </LoginUpperContainer>
    //         <LoginLowerContainer>
    //             I already have account,&nbsp;
    //                 <span className="register-page-link">
    //                 <Link to="/login">LOGIN IN</Link>
    //             </span>
    //         </LoginLowerContainer>
    //     </LoginForm>
    // );

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
            {!data?.register && registerForm}
            {data?.register && registeredForm}
        </div>
    );
}

export default withLoginedLock(false)(Register);

const REGISTER_MUTATION = gql`
    mutation register($fullName: String!, $email: String!, $password: String!) {
        register(fullName: $fullName, email: $email, password: $password) {
            id
            fullName
            email
            iconName
        }
    }
`;