import './Header.scss';
import {Link, NavLink} from "react-router-dom";

export const Header = () => {
    return <header>
        <NavLink to="/"
                 className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
            Home
        </NavLink>
        <NavLink to="/questions/add"
                 className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}>
            Ask
        </NavLink>
        <Link to='/'>Answer</Link>
    </header>
}