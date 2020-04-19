import React from 'react';

import Loading from "../../../assets/icons/loading.svg";

import './ModalLoading.scss';

const ModalLoading = ({ style, className }) => {
    console.log(style);
    return ( 
        <div className={`modal-loading ${className}`} style={style} onClick={e => e.preventDefault()}>
            <img src={Loading}/>
        </div> 
     );
}

export default ModalLoading;