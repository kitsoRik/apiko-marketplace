import React from 'react';
import TextField from '.';
import TextFieldAutocompleteOption from './TextFieldAutocompleteOption/TextFieldAutocompleteOption';

export default { title: "TextField" };

export const withPlaceholder = () => <TextField placeholder="My custom placholder" />
export const withValue = () => <TextField value="My custom value" />
export const password = () => <TextField password={true} />
export const withLoading = () => <TextField loading={true} />

export const withAutocmoplete = () => <TextField placeholder="123" autoCompleteOptions={[
    <TextFieldAutocompleteOption value={"Ternopll"} />,
    <TextFieldAutocompleteOption value={"Kyev"} />
]} />