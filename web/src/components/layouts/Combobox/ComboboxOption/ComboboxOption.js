import React from 'react';

import './ComboboxOption.scss';

const ComboboxOption = ({ value, icon, children, ...props }) => {
    return (
        <div className="combobox-option" {...props}>
            {icon && <div className="combobox-option-icon">
                {icon}
            </div>}
            <div>
                {children}
            </div>
        </div>
    );
}

export default ComboboxOption;