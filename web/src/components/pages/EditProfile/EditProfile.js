import React, { useState, useEffect } from 'react';

import "./EditProfile.scss";
import Form from '../../layouts/Form';
import UserIcon from '../../icons/UserIcon';
import Label from '../../layouts/Label';
import LocationTextField from '../../other/LocationTextField';
import TextField from '../../layouts/TextField';
import Button from '../../layouts/Button';
import ModalLoading from '../../layouts/ModalLoading/ModalLoading';
import withLoginedLock from '../../hocs/withLoginedLock';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { CURRENT_USER_QUERY } from '../../../apollo/queries/user-queries';
import { Formik } from 'formik';

const EditProfile = () => {

    const apolloClient = useApolloClient();
    const { data, loading } = useQuery(CURRENT_USER_QUERY);
    const [saveUser, saveUserMutation] = useMutation(SAVE_MUTATION);

    const [imageData, setImageData] = useState(null);
    const [image, setImage] = useState(null);


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

    const initialValues = {
        email: data.currentUser.email,
        fullName: data.currentUser.fullName,
        phone: data.currentUser.phone,
        locationId: data.currentUser.location?.id ?? -1
    }

    const validate = ({ fullName, phone, locationId }) => {
        const errors = {};
        if (!/\+\d{12}$/.test(phone)) errors.phone = "Bad phone";
        return errors;
    }

    const onSubmit = async (values, { setSubmitting }) => {
        const { data } = await saveUser({
            variables: {
                ...values, icon: imageData
            }
        })

        apolloClient.writeQuery({
            query: CURRENT_USER_QUERY,
            data: {
                currentUser: data.saveUser
            }
        });
    }
    return (
        <div className="edit-profile-page">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
                {
                    ({
                        values,
                        errors,
                        touched,
                        setFieldValue,
                        setFieldTouched,
                        handleSubmit,

                    }) => (
                            <Form className="edit-profile-page-form" onSubmit={handleSubmit} asForm={true}>
                                <h2 className="edit-profile-page-form-title">Edit profile</h2>
                                <div className="edit-profile-page-form-icon">
                                    <UserIcon fullName={data?.currentUser?.fullName} src={image} local={!!imageData} />
                                    <Button.Outlined
                                        type="outlined"
                                        value="Upgrade Photo"
                                        onClick={() => inputImageRef.current.click()} />
                                    <input type="file" ref={inputImageRef} style={{ display: "none" }} onChange={onImageChange} />
                                </div>
                                <div className="edit-profile-page-form-fields">
                                    <Label className="edit-profile-page-form-fields-full-email" value="Email">
                                        <TextField value={values.email} disabled={true} onValueChange={value => setFieldValue("email", value)} />
                                    </Label>
                                    <Label className="edit-profile-page-form-fields-full-name" value="Full name">
                                        <TextField value={values.fullName} onValueChange={value => setFieldValue("fullName", value)} />
                                    </Label>
                                    <Label className="edit-profile-page-form-fields-phone" value="Phone number">
                                        <TextField
                                            value={values.phone}
                                            onValueChange={value => setFieldValue("phone", value)}
                                            onBlur={() => setFieldTouched("phone", true)} />
                                    </Label>
                                    <Label className="edit-profile-page-form-fields-location" value="Location">
                                        <LocationTextField locationId={values.locationId} initialLocationName={data.currentUser.location?.name} onLocationIdChange={value => setFieldValue("locationId", value)} />
                                    </Label>
                                </div>
                                {console.log(values, initialValues, values == initialValues)}
                                <Button.Default
                                    className="edit-profile-page-form-save"
                                    type="submit"
                                    value="Save"
                                    disabled={Object.keys(errors).length !== 0 || Object.keys(touched).length === 0 || JSON.stringify(values) === JSON.stringify(initialValues)}
                                />
                                {(loading || saveUserMutation.loading) && <ModalLoading style={{ top: 0, left: 0 }} />}
                            </Form>
                        )
                }
            </Formik>
        </div>
    )
};

export default withLoginedLock()(EditProfile);

const SAVE_MUTATION = gql`
    mutation saveUser($fullName: String!, $phone: String!, $locationId: ID! $icon: Upload) {
        saveUser(fullName: $fullName, locationId: $locationId phone: $phone, icon: $icon) {
            id
            fullName,
            iconName,
            email,
            location {
                id
                name
                latitude
                longitude
            }
        }
    }
`;