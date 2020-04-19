import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { LOGINED } from '../../../constants/login';

const withLoginedLock = (WrapperComponent) => {
    class HOC extends Component {
        render() {
            const { history, loginStatus } = this.props;

            if(loginStatus === LOGINED) {
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