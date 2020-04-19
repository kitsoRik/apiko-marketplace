import React from 'react';
import Combobox from './Combobox';
import ComboboxOption from './ComboboxOption/ComboboxOption';

export const medium = () => 
<Combobox type="medium">
    <ComboboxOption value="1">1</ComboboxOption>
    <ComboboxOption value="2">2</ComboboxOption>
</Combobox>

export default { title: "Combobox" }