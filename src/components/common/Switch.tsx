import React, {ChangeEventHandler} from "react";

import './Switch.scss';

interface Props {
    switchState: ChangeEventHandler<HTMLInputElement>;
}

export const Switch = (props: Props) => {
    return <label className="switch">
        <input type="checkbox" onChange={props.switchState} />
        <span></span>
    </label>
}