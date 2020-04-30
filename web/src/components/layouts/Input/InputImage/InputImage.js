import React, { useState, useEffect } from 'react';

import "./InputImage.scss";

const InputImage = ({
    className,
    onlyView = false,
    multiple = false,
    file = null,
    setFile = () => { },
    setFiles = () => { },
    onClear = () => { },
    ...props }) => {

    const [isDrag, setIsDrag] = useState(false);
    const [image, setImage] = useState(null);


    useEffect(() => {
        if (!file) return;

        let reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
        }

        reader.readAsDataURL(file);
    }, [file]);

    const onChange = (e) => {

        const files = e.target.files;

        if (!files[0]) return;

        if (multiple) {
            setFiles([...files]);
        } else {
            setFile(files[0]);
        }
    }

    const onClick = (e) => {
        if (onlyView) e.preventDefault();
        else if (ref) ref.current.click();
    }

    const ref = React.createRef();

    return (
        <div
            className={`input-image ${className ?? ""}`}
            onClick={onClick}
            is-drag={isDrag ? "true" : null}
            has-file={!!file ? "true" : "false"}
            {...props}
        >
            {!!file && <button className="input-image-clear-button" onClick={onClear}></button>}
            <input
                ref={ref}
                type="file"
                multiple={multiple}
                onChange={onChange}
                onClick={(e) => e.stopPropagation()}
                onDragEnter={() => setIsDrag(true)}
                onDragLeave={() => setIsDrag(false)}
            />
            {image && <div className="input-image-container">
                <img src={image} alt="Unknown" />
            </div>}
        </div>
    )
};

export default InputImage;