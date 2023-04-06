import React from "react";

import './Switch.scss';

interface Props {
    switchState: any;
}

export const Switch = (props: Props) => {
    return <label className="switch">
        <input type="checkbox" onChange={props.switchState} />
        <span></span>
    </label>
}