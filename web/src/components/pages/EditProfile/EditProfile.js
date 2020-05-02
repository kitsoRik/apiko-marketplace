import React, { useState, useEffect } from 'react';

import "./EditProfile.scss";
import Form from '../../layouts/Form';
import UserIcon from '../../icons/UserIcon';
import Label from '../../layouts/Label';
import TextField from '../../layouts/TextField';
import Button from '../../layouts/Button';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import withLoginedLock from '../../hocs/withLoginedLock';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { saveUser, clearSave } from '../../../redux/actions/user-actions';
import { SAVING, SAVED } from '../../../constants';
import { notifyInfo } from '../../other/Snackbar/Snackbar';
import { saveUserIcon } from '../../../services/api/api';

const EditProfile = ({ data, savingState, saveUser, clearSave }) => {

    const [imageData, setImageData] = useState(null);
    const [image, setImage] = useState(data.iconName);

    const [fullName, setFullName] = useState(data.fullName);
    const [phone, setPhone] = useState("+38");

    useEffect(() => () => clearSave(), []);

    useEffect(() => {
        if (savingState === SAVED) {
            notifyInfo("Saved!");
        }
    }, [savingState]);

    const inputImageRef = React.createRef();

    const onImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        let reader = new FileReader();

        reader.onload = (event) => {
            setImage(event.target.result);
        }

        setImageData(file);
        reader.readAsDataURL(file);
    }

    const save = () => {
        saveUser(fullName, phone);

        if (!!imageData) {
            const data = new FormData()
            data.append('icon', imageData);

            saveUserIcon(data);
        }
    }

    return (
        <div className="edit-profile-page">
            <Form className="edit-profile-page-form">
                <h2 className="edit-profile-page-form-title">Edit profile</h2>
                <div className="edit-profile-page-form-icon">
                    <UserIcon fullName={data.fullName} src={image} local={!!imageData} />
                    <Button.Outlined
                        type="outlined"
                        value="Upgrade Photo"
                        onClick={() => inputImageRef.current.click()} />
                    <input type="file" ref={inputImageRef} style={{ display: "none" }} onValueChange={onImageChange} />
                </div>
                <Label className="edit-profile-page-form-full-name" value="Full name">
                    <TextField value={fullName} onValueChange={value => setFullName(value)} />
                </Label>
                <Label className="edit-profile-page-form-phone" value="Phone number">
                    <TextField value={phone} onValueChange={value => setPhone(value)} />
                </Label>
                <Button.Default className="edit-profile-page-form-save" onClick={save} value="Save" />
                {savingState === SAVING && <ModalLoading style={{ top: 0, left: 0 }} />}
            </Form>
        </div>
    )
};

export default compose(
    withLoginedLock(),
    connect(({ user: { savingState, data } }) => ({ data, savingState }), { saveUser, clearSave, saveUserIcon })
)(EditProfile);