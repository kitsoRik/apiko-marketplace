import React from 'react';

import Loading from "../../../assets/icons/loading.svg";

import './ModalLoading.scss';

const ModalLoading = ({ style, darken = true, className, ...props }) => {
    return ( 
        <div 
            className={`modal-loading ${className}`} 
            style={style} 
            darken={darken ? "true" : null}
            onClick={e => e.preventDefault()}
            { ...props }>
            <img src={Loading}/>
        </div> 
     );
}

export default ModalLoading;