import './Header.scss';
import {NavLink} from "react-router-dom";
import {ThemeContext} from "../../contexts/theme.context";
import React, {useContext} from "react";
import {Switch} from "../common/Switch";

export const Header = () => {
    const {setTheme} = useContext(ThemeContext);

    const switchTheme = () => {
        setTheme((prev: string) => prev === 'light' ? 'dark' : 'light');
    }

    return <header>
        <Switch switchState={switchTheme} />
        <NavLink to="/"
                 className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
            Home
        </NavLink>
        <NavLink to="/questions/add"
                 className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
            Ask
        </NavLink>
    </header>
}