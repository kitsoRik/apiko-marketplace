import React, { useState } from 'react';

import "./Combobox.scss";
import ComboboxOption from './ComboboxOption/ComboboxOption';

const Combobox = ({ value, children = [], onChange, ...props }) => {

    const [dropable, setDropable] = useState(false);


    const onClick = (e) => {
        setDropable(!dropable);
    }

    const onClickOption = (value) => {
        if (onChange)
            onChange(value);
        setDropable(false);
    }

    let optionsElements = [];

    children.forEach(c => {
        if (c.type === ComboboxOption) optionsElements.push(c);
    });

    let select = null;

    optionsElements = React.Children.map(optionsElements, c => {
        if (c.props.value === value) {
            select = React.cloneElement(c, { ...c.props, onClick: onClick });
        }
        return React.cloneElement(c, { ...c.props, onClick: () => onClickOption(c.props.value) })
    });


    return (
        <div tabIndex={0} className="combobox" onBlur={() => setDropable(false)} {...props}>
            {select}
            {dropable && <div className="combobox-options">
                {
                    optionsElements
                }
            </div>
            }
        </div>
    );
}

export default Combobox;