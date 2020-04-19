import React from 'react';

import './Form.scss';

const Form = ({ className = "", children }) => {
    return ( 
        <div className={`form ${className}`}>
            { children }
        </div>
     );
}

export default Form;