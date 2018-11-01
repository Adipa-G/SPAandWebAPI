import * as JQuery from "jquery";
import * as React from "react";
import { Redirect } from 'react-router-dom';

import { AuthService } from "../services/authService";

import { ErrorMessage } from "./shared/errorMessage";

export interface LoginProps { loginComplete: Function }
export interface LoginState { errorMessage: string, userName : string, password : string }

export class Login extends React.Component<LoginProps, LoginState> {
    authService: AuthService;

    constructor(props: any) {
        super(props);
        this.authService = new AuthService();

        this.state = {
            errorMessage: null,
            userName: '',
            password: ''
        };
    }

    setUserName = (event:any): void => {
        let userName: string = event.target.value as string;
        this.setState((prevState: LoginState) => {
            let newState: LoginState = jQuery.extend(true, {}, prevState) as LoginState;
            newState.userName = userName;
            return newState;
        });
    }

    setPassword = (event:any): void => {
        let password: string = event.target.value as string;
        this.setState((prevState: LoginState) => {
            let newState: LoginState = jQuery.extend(true, {}, prevState) as LoginState;
            newState.password = password;
            return newState;
        });
    }

    login = () => {
        if (!this.state.userName || !this.state.password) {
            this.setState({
                errorMessage: 'Please enter a username and password'
            });
            return;
        }

        this.authService.authenticate(this.state.userName, this.state.password, (result: any) => {
            if (result.success) {
                this.props.loginComplete();
            } else {
                this.setState({
                    errorMessage: 'Invalid credentials. Please try again.'
                });
            }
        });
    }

    render() {
        return (
            <form role="form" name="loginForm">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <fieldset>
                            <legend className="h2">Login</legend>
                            <div className="form-group" >
                                <label>User Name</label>
                                <input type="text"
                                    id="loginUserName"
                                    name="loginUserName"
                                    className="form-control"
                                    placeholder="Username"
                                    onChange={(event:any) => this.setUserName(event)}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"
                                    id="loginPassword"
                                    name="loginPassword"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(event:any) => this.setPassword(event)}/>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <ErrorMessage errorMessage={this.state.errorMessage} />
                        <div className="form-group">
                            <button type="button"
                                className="btn btn-md btn-info btn-block"
                                onClick={() => this.login()}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}