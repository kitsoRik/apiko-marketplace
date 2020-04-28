import React, { useState } from 'react';

import ViewPassword from '../../../assets/icons/view-password.svg';
import ViewPasswordChecked from '../../../assets/icons/view-password-checked.svg';

import './TextField.scss';

const TextField = ({ className, type = "big", icon, children, value, password, error, errorIfTouched, ...props }) => {

    const [touched, setTouched] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

    const err = errorIfTouched && touched;

    return (
        <div className={`text-field ${className}`} type={type}>
            {icon &&
                <div className="text-field-icon">
                    {icon}
                </div>
            }
            <input
                style={{ paddingLeft: `${icon ? 40 : 13}px` }}
                className="text-field-"
                error={(err || error) ? "true" : "false"}
                type={password && !viewPassword ? 'password' : 'text'}
                onBlur={() => setTouched(true)}
                value={value}
                {...props} />
            {password && <img
                className="text-field-view-password"
                alt="View password"
                src={!viewPassword ? ViewPassword : ViewPasswordChecked}
                onClick={() => setViewPassword(!viewPassword)} />}
        </div>
    );
}

export default TextField;