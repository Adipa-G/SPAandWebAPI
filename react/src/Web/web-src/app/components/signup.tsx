import * as React from "react";

import { AuthService } from "../services/authService";

import { ErrorMessage } from "./shared/errorMessage";
import { SuccessMessage } from "./shared/successMessage";

export interface SignupProps { signupComplete: Function }
export interface SignupState {
    errorMessage: string,
    successMessage: string,
    userName: string,
    password: string,
    confirmPassword: string
}

export class SignUp extends React.Component<SignupProps, SignupState> {
    authService: AuthService;

    constructor(props: SignupProps) {
        super(props);
        this.authService = new AuthService();

        this.state = {
            userName: '',
            password: '',
            confirmPassword: '',
            errorMessage: null,
            successMessage: null
        };
    }

    setUserName = (event: any): void => {
        let userName: string = event.target.value as string;
        this.setState((prevState: SignupState) => {
            let newState: SignupState = jQuery.extend(true, {}, prevState) as SignupState;
            newState.userName = userName;
            return newState;
        });
    }

    setPassword = (event: any): void => {
        let password: string = event.target.value as string;
        this.setState((prevState: SignupState) => {
            let newState: SignupState = jQuery.extend(true, {}, prevState) as SignupState;
            newState.password = password;
            return newState;
        });
    }

    setConfirmPassword = (event: any): void => {
        let confirmPassword: string = event.target.value as string;
        this.setState((prevState: SignupState) => {
            let newState: SignupState = jQuery.extend(true, {}, prevState) as SignupState;
            newState.confirmPassword = confirmPassword;
            return newState;
        });
    }

    register = () => {
        if (!this.state.userName || !this.state.password) {
            this.setState({
                errorMessage: 'Please enter a username and password',
                successMessage: null
            });
            return;
        }

        if (this.state.userName.length < 3) {
            this.setState({
                errorMessage: 'Username should be at least 3 characters long',
                successMessage: null
            });
            return;
        }

        if (this.state.password.length < 6) {
            this.setState({
                errorMessage: 'Password should be at least 6 characters long',
                successMessage: null
            });
            return;
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errorMessage: 'Passwords should match.',
                successMessage: null
            });
            return;
        }

        this.authService.signup(this.state.userName, this.state.password, (result: any) => {
            if (result.success) {
                this.setState({ errorMessage: null, successMessage: "Registration successful!" });
                this.props.signupComplete();
            } else {
                this.setState({ errorMessage: "error while registering " + (result.data ? result.data : ''), successMessage: null });
            }
        });
    }

    render() {
        return (
            <form role="form" name="registrationForm">
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <fieldset>
                            <legend className="h2">Register</legend>
                            <div className="form-group">
                                <label>User Name</label>
                                <input type="text"
                                    id="registrationUserName"
                                    name="registrationUserName"
                                    className="form-control"
                                    placeholder="Username"
                                    onChange={(event: any) => this.setUserName(event)} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"
                                    id="registrationPassword"
                                    name="registrationPassword"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(event: any) => this.setPassword(event)} />
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password"
                                    id="registrationConfirmPassword"
                                    name="registrationConfirmPassword"
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    onChange={(event: any) => this.setConfirmPassword(event)} />
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-md-offset-4">
                        <ErrorMessage errorMessage={this.state.errorMessage} />

                        <SuccessMessage successMessage={this.state.successMessage} />

                        <div className="form-group">
                            <button type="button"
                                className="btn btn-md btn-info btn-block"
                                disabled={this.state.successMessage != null}
                                onClick={() => { this.register() }}>
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}