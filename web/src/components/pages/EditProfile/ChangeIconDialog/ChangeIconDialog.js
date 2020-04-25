import React, { useState } from 'react';

import "./ChangeIconDialog.scss";
import * as Dialog from '../../../layouts/Dialog';
import InputImage from '../../../layouts/Input/InputImage/InputImage';
import Button from '../../../layouts/Button';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { saveUserIcon } from '../../../../redux/actions/user-actions';

const ChangeIconDialog = ({ open, setOpen, saveUserIcon }) => {
    
    const [image, setImage] = useState(null);

    const onSave = () => {
        const data = new FormData()
        data.append('icon', image);
        
        saveUserIcon(data);
    }

    return (
        <Dialog.default 
            open={open} 
            onClose={() => setOpen(false)}
            className="edit-profile-page-form-change-icon-dialog">
            <Dialog.Title value="Title" />
            <div className="edit-profile-page-form-change-icon-dialog-container">
                <InputImage setFile={setImage}/>
            </div>
            <Button.Default value="Save" onClick={onSave} />
        </Dialog.default>
    )
};

export default compose(
    connect(null, { saveUserIcon })
)(ChangeIconDialog);