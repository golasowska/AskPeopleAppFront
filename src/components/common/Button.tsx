import React from "react";

import './Button.scss';
import {Link} from "react-router-dom";

interface Props {
    text: string;
    type?:  "button" | "submit" | "reset" | undefined;
    to?: string;
}

export const Button = ({text, type, to}: Props ) => {
    return to ? <Link className='btn' to={to} >{text}</Link> : <button className='btn' type={type}>{text}</button>
};