import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { LOGINED, NOT_LOGINED, LOGINING } from '../../../constants/login';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';

const withLoginedLock = (needLogin = true) => (WrapperComponent) => {
    class HOC extends Component {
        render() {
            const { history, loginStatus } = this.props;
            if(loginStatus === LOGINING) {
                return <div style={{width: '100%', height: '100%'}}><ModalLoading /></div>
            }

            if(!needLogin && loginStatus === LOGINED) {
                history.push("/");
                return null;
            }

            if(needLogin && loginStatus === NOT_LOGINED) {
                history.push("/");
                return null;
            }

            return <WrapperComponent {...this.props}/>
        }
    }
    return compose(
        connect(({ user: { loginStatus }}) => ({ loginStatus }))
    )(HOC);
}

export default withLoginedLock;