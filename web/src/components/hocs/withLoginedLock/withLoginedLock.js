import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { LOGINED, NOT_LOGINED, LOGINING } from '../../../constants/login';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';

import "./withLoginedLock.scss";
import { notifyError } from '../../other/Snackbar/Snackbar';

const withLoginedLock = (needLogin = true) => (WrapperComponent) => {
    const HOC = (props) => {
            const { history, loginStatus } = props;

            const [needCheck, setNeedCheck] = useState(false);
            const [errored, setErrored] = useState(false);

            useEffect(() => {
                if(loginStatus === LOGINING) setNeedCheck(true);
            }, [ ]);

            useEffect(() => {
                if(errored) {
                    notifyError("Access has blocked by login policy");
                }
            }, [ errored ]);

            const wrapper = (
                <div className="with-logined-lock" loading={loginStatus === LOGINING ? "true" : null}>
                    { loginStatus !== LOGINING && <WrapperComponent {...props}/> }
                    { needCheck && <ModalLoading /> }
                </div>
            )

            if(loginStatus === LOGINING) {
                return wrapper;
            }

            if((!needLogin && loginStatus === LOGINED) 
                || (needLogin && loginStatus === NOT_LOGINED)) {
                    if(!errored) 
                        setErrored(true);
                    history.push("/");
                    return null;
            }

            return wrapper;
    }

    return compose(
        connect(({ user: { loginStatus }}) => ({ loginStatus }))
    )(HOC);
}

export default withLoginedLock;