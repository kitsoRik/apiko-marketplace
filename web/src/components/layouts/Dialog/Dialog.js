import React from 'react';

import "./Dialog.scss";
import Form from '../Form';
import DialogTitle from './DialogTitle';

const Dialog = ({ onClose, open = true, children, className, ...props}) => {

    const title = children.find(c => c.type === DialogTitle);

    const other = children.filter(c => c.type !== DialogTitle);

    return (
        <div 
            className={`dialog ${className ?? ""}`} 
            onClick={onClose}
            style={{visibility: open ? "visible" : "hidden"}}
            { ...props } >
            <Form onClick={e => e.stopPropagation()}>
                { title }
                { other }
            </Form>
        </div>
    )
};

export default Dialog;