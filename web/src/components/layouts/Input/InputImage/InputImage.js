import React, { useState } from 'react';

import "./InputImage.scss";

const InputImage = ({ className, setFile, ...props}) => {

    const [isDrag, setIsDrag] = useState(false);
    const [image, setImage] = useState(null);

    const onChange = (e) => {
        let reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
        }
        
        setFile(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
    }

    const onClick = (e) => {
        ref.current.click();
    }

    const ref = React.createRef();

    return (
        <div 
            className={`input-image ${className}`}
            onClick={onClick}
            isDrag={isDrag ? "true" : null}
            >
            <input 
                ref={ref} 
                type="file" 
                onChange={onChange}
                onDragEnter={() => setIsDrag(true)}
                onDragLeave={() => setIsDrag(false)}
                />
            <div className="input-image-container">
                <img src={image}/>
            </div>
        </div>
    )
};

export default InputImage;