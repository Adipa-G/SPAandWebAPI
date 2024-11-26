import { Link } from 'react-router-dom';

export interface MenuProps {
    isAuth: boolean,
    logOff: Function
}

const Menu = (props: MenuProps) => {
    const logOff = () => {
        props.logOff();
    }

    if (props.isAuth) {
        return (<ul className="nav navbar-nav navbar-right">
            <li><a href="#/users">Users</a></li>
            <li><a href="#/systemLog">System Log</a></li>
            <li><a href="#/httpLog">Http Log</a></li>
            <li>
                <button className="logout-button" onClick={() => { logOff() }}>
                    Logout
                </button>
            </li>
        </ul>);
    }
    else {
        return (<ul className="nav navbar-nav navbar-right">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
        </ul>);
    }
}

export default Menu;