import { Link } from 'react-router';

export interface MenuProps {
    isAuth: boolean,
    logOff: Function
}

const Menu = (props: MenuProps) => {
    const logOff = () => {
        props.logOff();
    }

    if (props.isAuth) {
        return (<ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#/users">Users</a></li>
            <li className="nav-item"><a className="nav-link" href="#/systemLog">System Log</a></li>
            <li className="nav-item"><a className="nav-link" href="#/httpLog">Http Log</a></li>
            <li className="nav-item">
                <button className="logout-button" onClick={() => { logOff() }}>
                    Logout
                </button>
            </li>
        </ul>);
    }
    else {
        return (<ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/signup">Sign up</Link></li>
        </ul>);
    }
}

export default Menu;