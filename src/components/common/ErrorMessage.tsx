import React, {ReactNode} from "react";

import './InfoMessage.scss';

interface Props {
    children: string | JSX.Element | JSX.Element[] | ReactNode;
}

export const ErrorMessage = ({children}: Props ) => {
    return <span className="error">{children}</span>
};