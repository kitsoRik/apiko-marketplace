import React from 'react';
import LoginUpperContainer from './LoginUpperContainer/LoginUpperContainer';
import LoginLowerContainer from './LoginLowerContainer/LoginLowerContainer';

import "./LoginForm.scss";
import ModalLoading from '../ModalLoading/ModalLoading';

const LoginForm = ({ className, loading, children, ...props }) => {
    const ch = Array.isArray(children) ? children : [children];

    const upper = ch.find(c => c && c.type === LoginUpperContainer);
    const lower = ch.find(c => c && c.type === LoginLowerContainer);

    return (
        <form
            className={`login-container ${className}`}
            style={{ gridTemplateRows: `${upper ? 'auto' : ''} ${lower ? '75px' : ''}` }}
            {...props}
        >
            {upper}
            {lower}
            {loading && <ModalLoading />}
        </form>
    );
}

export default LoginForm;