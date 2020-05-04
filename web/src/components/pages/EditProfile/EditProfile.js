import React, { useState, useEffect } from 'react';

import "./EditProfile.scss";
import Form from '../../layouts/Form';
import UserIcon from '../../icons/UserIcon';
import Label from '../../layouts/Label';
import TextField from '../../layouts/TextField';
import Button from '../../layouts/Button';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import withLoginedLock from '../../hocs/withLoginedLock';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { CURRENT_USER_QUERY } from '../../../apollo/queries/user-queries';

const EditProfile = () => {

    const apolloClient = useApolloClient();
    const { data, loading } = useQuery(CURRENT_USER_QUERY);
    const [saveUser, saveUserMutation] = useMutation(SAVE_MUTATION);

    const [imageData, setImageData] = useState(null);
    const [image, setImage] = useState(null);

    const [fullName, setFullName] = useState(data?.currentUser?.fullName);
    const [phone, setPhone] = useState("+38");


    useEffect(() => {
        setImage(data?.currentUser?.iconName);
        setImageData(null);
    }, [data]);

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
        saveUser({
            variables: {
                fullName, phone, icon: imageData
            }
        }).then(({ data }) => {
            apolloClient.writeQuery({
                query: CURRENT_USER_QUERY,
                data: {
                    currentUser: data.saveUser
                }
            })
        });

        // if (!!imageData) {
        //     const data = new FormData()
        //     data.append('icon', imageData);

        //     saveUserIcon(data);
        // }
    }

    return (
        <div className="edit-profile-page">
            <Form className="edit-profile-page-form">
                <h2 className="edit-profile-page-form-title">Edit profile</h2>
                <div className="edit-profile-page-form-icon">
                    <UserIcon fullName={data?.currentUser?.fullName} src={image} local={!!imageData} />
                    <Button.Outlined
                        type="outlined"
                        value="Upgrade Photo"
                        onClick={() => inputImageRef.current.click()} />
                    <input type="file" ref={inputImageRef} style={{ display: "none" }} onChange={onImageChange} />
                </div>
                <Label className="edit-profile-page-form-full-name" value="Full name">
                    <TextField value={fullName} onValueChange={value => setFullName(value)} />
                </Label>
                <Label className="edit-profile-page-form-phone" value="Phone number">
                    <TextField value={phone} onValueChange={value => setPhone(value)} />
                </Label>
                <Button.Default className="edit-profile-page-form-save" onClick={save} value="Save" />
                {(loading || saveUserMutation.loading) && <ModalLoading style={{ top: 0, left: 0 }} />}
            </Form>
        </div>
    )
};

export default withLoginedLock()(EditProfile);

const SAVE_MUTATION = gql`
    mutation saveUser($fullName: String!, $phone: String!, $icon: Upload) {
        saveUser(fullName: $fullName, phone: $phone, icon: $icon) {
            id
            fullName,
            iconName,
            email
        }
    }
`;