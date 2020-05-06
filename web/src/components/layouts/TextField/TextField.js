import React, { useState, useEffect } from 'react';

import ViewPassword from '../../../assets/icons/view-password.svg';
import ViewPasswordChecked from '../../../assets/icons/view-password-checked.svg';

import ModalLoading from '../ModalLoading/ModalLoading';

import _ from 'lodash';

import './TextField.scss';

const TextField = ({
    className,
    type = "big",
    icon,
    children,
    name,
    loading = false,
    multiline = false,
    autoCompleteOptions,
    autoCompleteOptionsWhenEmptyHeader = null,
    autoCompleteOptionsWhenEmpty = null,
    value = "", password, error, errorIfTouched, onChange = () => { }, onValueChange = () => { }, ...props }) => {
    const [touched, setTouched] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);

    const [autocompleteIndex, setAutocompleteIndex] = useState(-1);

    const [inFocus, setInFocus] = useState(false);

    const err = errorIfTouched && touched;


    useEffect(() => {
        setAutocompleteIndex(-1);
    }, [value])

    const onKeyDown = (e) => {
        switch (e.key) {
            case "ArrowDown": {
                e.preventDefault();
                if (autocompleteIndex === autoCompleteOptions?.length - 1 || autocompleteIndex === autoCompleteOptionsWhenEmpty?.length - 1) {
                    setAutocompleteIndex(0);
                    break;
                }
                setAutocompleteIndex(autocompleteIndex + 1);
                break;
            }
            case "ArrowUp": {
                if (autocompleteIndex === -1) break;
                e.preventDefault();
                setAutocompleteIndex(autocompleteIndex - 1);
                break;
            }
            case "Enter": {
                if (!autoCompleteOptions && !autoCompleteOptionsWhenEmpty) return;
                e.preventDefault();
                let _value;
                if (value === "") {
                    const el = autoCompleteOptionsWhenEmpty[autocompleteIndex];
                    if (!el) return;
                    const props = el.props;
                    _value = props.textValue;
                    if (props.onSelect) props.onSelect();
                }
                else {
                    const el = autoCompleteOptions[autocompleteIndex];
                    if (!el) return;
                    const props = el.props;
                    _value = props.textValue;
                    if (props.onSelect) props.onSelect();
                }
                onValueChange(_value);

                inputRef.current.value = _value;

                setAutocompleteIndex(-1);
                break;
            }
            default: break;
        }
    }

    const inputRef = React.createRef();
    const autoCompleteTruthOptions = (autoCompleteOptions ?? [])
        .filter(({ props: { textValue } }) => new RegExp(value).test(textValue) && value !== textValue);


    let inputComponent = null;

    if (multiline) {
        inputComponent = <textarea
            ref={inputRef}
            style={{ paddingLeft: `${icon ? 40 : 13}px` }}
            className="text-field-"
            error={(err || error) ? "true" : "false"}
            type={password && !viewPassword ? 'password' : 'text'}
            onBlur={() => setTouched(true)}
            value={value}
            name={name}
            onKeyDown={onKeyDown}
            onChange={(e) => { onValueChange(e.target.value); onChange(e); onValueChange(e.target.value); }}
            {...props} >

        </textarea>
    } else {
        inputComponent = <input
            ref={inputRef}
            style={{ paddingLeft: `${icon ? 40 : 13}px` }}
            className="text-field-"
            error={(err || error) ? "true" : "false"}
            type={password && !viewPassword ? 'password' : 'text'}
            onBlur={() => setTouched(true)}
            value={value}
            name={name}
            onKeyDown={onKeyDown}
            onChange={(e) => { onValueChange(e.target.value); onChange(e); onValueChange(e.target.value); }}
            {...props} />
    }

    return (
        <div className={`text-field ${className}`} type={type} onFocus={() => setInFocus(true)} onBlur={_.debounce(() => setInFocus(false), 100)} tabIndex="1">
            {icon &&
                <div className="text-field-icon">
                    {icon}
                </div>
            }
            {inputComponent}
            {password && <img
                className="text-field-view-password"
                alt="View password"
                src={!viewPassword ? ViewPassword : ViewPasswordChecked}
                onClick={() => setViewPassword(!viewPassword)} />}
            {autoCompleteTruthOptions.length !== 0 && inFocus && value !== "" &&
                <div className="text-field-auto-complete-container" tabIndex="1">
                    {
                        (() => {
                            return autoCompleteTruthOptions.map((e, i) => {
                                return React.cloneElement(e, {
                                    active: autocompleteIndex === i,
                                    compareValue: value
                                })
                            });
                        })()
                    }
                </div>
            }
            {autoCompleteOptionsWhenEmpty && autoCompleteOptionsWhenEmpty.length !== 0 && inFocus && value === "" &&
                <div className="text-field-auto-complete-container" tabIndex="1">
                    {autoCompleteOptionsWhenEmptyHeader}
                    {
                        autoCompleteOptionsWhenEmpty.map((e, i) => {
                            return React.cloneElement(e, {
                                active: autocompleteIndex === i
                            })
                        })
                    }
                </div>
            }
            {loading &&
                <div className="text-field-loading">
                    <ModalLoading darken={false} />
                </div>
            }
        </div >
    );
}

export default TextField;