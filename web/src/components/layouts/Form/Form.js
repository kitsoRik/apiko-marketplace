import React from 'react';

import './Form.scss';

const Form = ({ className = "", children, ...props }) => {
    return ( 
        <div className={`form ${className}`} { ...props }>
            { children }
        </div>
     );
}

export default Form;