import './Header.scss';
import {Link} from "react-router-dom";

export const Header = () => {
    return <header>
        <Link to='/'>Home</Link>
        <Link to='/questions/add'>Ask</Link>
        <Link to='/'>Answer</Link>
    </header>
}