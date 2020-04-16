import React, { useState } from 'react';

import ViewPassword from '../../../assets/icons/view-password.svg';
import ViewPasswordChecked from '../../../assets/icons/view-password-checked.svg';

import './TextField.scss';

const TextField = ({ className, children, password, error, errorIfTouched, ...props }) => {

    const [touched, setTouched] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    
    const err = errorIfTouched && touched;

    return ( 
        <div className={`text-field ${className}`}>
            <input 
                className="text-field-" 
                error={(err || error) ? "true" : "false"}
                type={password && !viewPassword? 'password' : 'text'}
                onBlur={() => setTouched(true)}
                { ...props } />
                { password && <img 
                    className="text-field-view-password" 
                    src={!viewPassword ? ViewPassword : ViewPasswordChecked}
                    onClick={() => setViewPassword(!viewPassword)}/> }
        </div>
     );
}

export default TextField;