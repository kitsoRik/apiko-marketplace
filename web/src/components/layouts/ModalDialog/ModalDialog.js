import React from 'react';

import "./ModalDialog.scss";
import Form from '../Form';

const ModalDialog = ({ className, opened, onClosed, children, ...props }) => {
    return (
        <div style={{ display: opened ? "flex" : "none", }}
            className={`modal-dialog`}
            onClick={onClosed}
            {...props}>
            <Form className={`modal-dialog-form ${className ?? ""}`} onClick={e => e.stopPropagation()}>
                {children}
                <button className="modal-dialog-form-close-button" onClick={onClosed}>X</button>
            </Form>
        </div>
    )
};

export default ModalDialog;