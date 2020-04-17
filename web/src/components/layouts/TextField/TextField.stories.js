import React from 'react';
import TextField from '.';

export default { title: "TextField" };

export const withPlaceholder = () => <TextField placeholder="My custom placholder"/>
export const withValue = () => <TextField value="My custom value"/>
export const password = () => <TextField password={true} />