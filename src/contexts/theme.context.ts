import {createContext} from "react";

export const ThemeContext = createContext({
    theme: 'light',
    setTheme: (s: (prev: string) => string) => {},
})