import React from 'react';

import './LoginLowerContainer.scss';

const LoginLowerContainer = ({ children }) => {
    return ( 
        <div className="login-lower-container">
            { children }
        </div>
     );
}

export default LoginLowerContainer;