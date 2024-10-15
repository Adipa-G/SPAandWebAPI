import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';

export interface MenuProps { isAuth: boolean, logOff: Function }
export interface MenuState { }

export class Menu extends React.Component<MenuProps, MenuState> {

    logOff = () => {
        this.props.logOff();
    }

    render() {
        if (this.props.isAuth) {
            return <ul className="nav navbar-nav navbar-right">
                <li><a href="#/users">Users</a></li>
                <li><a href="#/systemLog">System Log</a></li>
                <li><a href="#/httpLog">Http Log</a></li>
                <li>
                    <a href=""
                        onClick={() => { this.logOff() }}>
                        Logout
                    </a>
                </li>
            </ul>;
        } else {
            return <ul className="nav navbar-nav navbar-right">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
            </ul>;
        }
    }
}