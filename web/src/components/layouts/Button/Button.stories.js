import React from 'react';
import Button from '.';

export default { title: 'Button' };

export const Default = () => (
    <div>
        <Button onClick={() => alert("CLICKED")}>Just button</Button>
        <Button onClick={() => alert("CLICKED")} disabled={true}>Disabled</Button>
    </div>
);

export const transparent = () => (
    <div>
        <Button onClick={() => alert("CLICKED")} type="transparent">Just button</Button>
        <Button onClick={() => alert("CLICKED")} disabled={true} type="transparent">Disabled</Button>
    </div>
);

export const martinique = () => (
    <div>
        <Button onClick={() => alert("CLICKED")} type="martinique">Just button</Button>
        <Button onClick={() => alert("CLICKED")} disabled={true} type="martinique">Disabled</Button>
    </div>
);