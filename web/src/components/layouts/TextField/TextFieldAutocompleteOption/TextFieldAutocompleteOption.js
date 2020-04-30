import React, { useEffect } from 'react';

import "./TextFieldAutocompleteOption.scss";

const TextFieldAutocompleteOption = ({ className, value, textValue, active, icon, compareValue = "", Component = null, onSelect = () => { }, ...props }) => {


    if (Component) return <Component value={value} active={active} compareValue={compareValue} {...props} />

    const values = new RegExp(`(.*)(${compareValue})(.*)`).exec(value);

    return (
        <div
            className={`text-field-autocomplete-option ${className ?? ""}`}
            active={active ? "true" : null}
            onClick={onSelect}>
            {icon &&
                <div className="text-field-autocomplete-option-icon">
                    {icon}
                </div>
            }
            <div className="text-field-autocomplete-option-text">
                <span>{values[1]}</span>
                <b>{values[2]}</b>
                <span>{values[3]}</span>
            </div>
        </div>
    )
};

export default TextFieldAutocompleteOption;