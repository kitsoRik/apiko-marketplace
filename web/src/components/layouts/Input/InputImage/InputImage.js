import React, { useState } from 'react';

import "./InputImage.scss";

const InputImage = ({ className, setFile, ...props }) => {

    const [isDrag, setIsDrag] = useState(false);
    const [image, setImage] = useState(null);

    const onChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        let reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
        }

        setFile(file);
        reader.readAsDataURL(file);
    }

    const onClick = (e) => {
        //ref.current.click();
    }

    const ref = React.createRef();

    return (
        <div
            className={`input-image ${className ?? ""}`}
            onClick={onClick}
            isDrag={isDrag ? "true" : null}
            {...props}
        >
            <input
                ref={ref}
                type="file"
                onChange={onChange}
                onDragEnter={() => setIsDrag(true)}
                onDragLeave={() => setIsDrag(false)}
            />
            <div className="input-image-container">
                <img src={image} alt="Unknown" />
            </div>
        </div>
    )
};

export default InputImage;