import React, { useState } from 'react';

import "./ContactSellerDialog.scss";
import ModalDialog from '../../../layouts/ModalDialog/ModalDialog';
import Form from '../../../layouts/Form';
import Label from '../../../layouts/Label';
import TextField from '../../../layouts/TextField';
import UserIcon from '../../../icons/UserIcon';
import Button from '../../../layouts/Button';

const ContactSellerDialog = ({ opened, setOpened, productTitle, fullName, location, iconName }) => {

    return (
        <ModalDialog className="contact-selleer-dialog" opened={opened} onClosed={() => setOpened(false)}>
            <h5 className="contact-selleer-dialog-title">Contact seller</h5>
            <h1>Subject: {productTitle}</h1>

            <div className="contact-selleer-dialog-user">
                <UserIcon src={iconName} fullName={fullName} className="contact-selleer-dialog-user-icon" />
                <div className="contact-selleer-dialog-user-name">
                    <span>{fullName}</span>
                </div>
                <div className="contact-selleer-dialog-user-location">
                    <span>{location}</span>
                </div>
            </div>
            <Label className="contact-selleer-dialog-message" value="Message">
                <TextField className="contact-selleer-dialog-message-text-field" multiline placeholder="For example: Hey, i want to buy your product." />
            </Label>
            <Button.Default className="contact-selleer-dialog-submit" value="Submit" />
        </ModalDialog>
    )
};

export default ContactSellerDialog;