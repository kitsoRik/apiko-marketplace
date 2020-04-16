import React from 'react';
import LoginUpperContainer from './LoginUpperContainer/LoginUpperContainer';
import LoginLowerContainer from './LoginLowerContainer/LoginLowerContainer';

import Loading from "../../../assets/icons/loading.svg";

import "./LoginForm.scss";

const LoginForm = ({ loading, children }) => {
    const ch = Array.isArray(children) ? children : [children];

    const upper = ch.find(c => c && c.type === LoginUpperContainer );
    const lower = ch.find(c => c && c.type === LoginLowerContainer );

    return ( 
        <div 
            className="login-container"
            style={{ gridTemplateRows: `${upper ? 'auto' : ''} ${lower ? '75px' : ''}`}}>
            { upper }
            { lower }
            { loading && 
                <div className="login-container-loading">
                    <img src={Loading}/>
                </div> }
        </div>
     );
}

export default LoginForm;