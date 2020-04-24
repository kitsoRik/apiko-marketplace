import React, { useState, useEffect } from 'react';

import "./EditProfile.scss";
import Form from '../../layouts/Form';
import UserIcon from '../../layouts/UserIcon';
import Label from '../../layouts/Label';
import TextField from '../../layouts/TextField';
import Button from '../../layouts/Button';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import withLoginedLock from '../../hocs/withLoginedLock';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { saveUser } from '../../../redux/actions/user-actions';
import { SAVING, SAVED } from '../../../constants';
import { notifyInfo } from '../../layouts/Snackbar/Snackbar';

const EditProfile = ({ data, savingState, saveUser }) => {

    const [fullName, setFullName] = useState(data.fullName);
    const [phone, setPhone] = useState("+38");

    useEffect(() => {
        if(savingState === SAVED) {
            notifyInfo("Saved!");
        }
    }, [ savingState ]);

    return (
        <div className="edit-profile-page">
            <Form className="edit-profile-page-form">
                <h2 className="edit-profile-page-form-title">Edit profile</h2>
                <div className="edit-profile-page-form-icon">
                    <UserIcon />
                    <Button.Outlined type="outlined" value="Upgrade Photo" />
                </div>
                <Label className="edit-profile-page-form-full-name" value="Full name">
                    <TextField value={fullName} onChange={(e) => setFullName(e.target.value)}/>
                </Label>
                <Label className="edit-profile-page-form-phone" value="Phone number">
                    <TextField value={phone} onChange={e => setPhone(e.target.value)}/>
                </Label>
                <Button.Default className="edit-profile-page-form-save" onClick={() => saveUser(fullName, phone)} value="Save" />
                { savingState === SAVING && <ModalLoading style={{ top: 0, left: 0 }}/> }
            </Form>
        </div>
    )
};

export default compose(
    withLoginedLock(),
    connect(({ user: { savingState, data }}) => ({ data, savingState }), { saveUser })
)(EditProfile);