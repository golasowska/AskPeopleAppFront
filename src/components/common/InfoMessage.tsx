import React, {ReactNode} from "react";

import './InfoMessage.scss';
import {Link} from "react-router-dom";

interface Props {
    to?: boolean;
    children: string | JSX.Element | JSX.Element[] | ReactNode;
}

export const InfoMessage = ({children, to }: Props ) => {
    return <div className="info__wrapper">
        <h2 className="header__info">
            {children}
            {to && <Link className='btn' to='/'>Go back to the Home Page</Link>}
        </h2>
    </div>
};