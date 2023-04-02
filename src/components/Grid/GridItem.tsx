import './GridItem.scss';
import {createRef, useEffect, useState} from "react";

interface Props {
    children: string | JSX.Element,
}

export const GridItem = ({ children}: Props) => {
    return <div className="grid__item">{children}</div>
}