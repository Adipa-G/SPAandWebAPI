import { useState, useEffect, useMemo } from "react";

import { CallbackResult } from "../services/serviceModels";
import { AuthService } from "../services/authService";

import ErrorMessage from "./shared/errorMessage";
import SuccessMessage from "./shared/successMessage";


export interface SignupProps {
    signupComplete: Function
}

const SignUp = (props: SignupProps) => {
    const authService = useMemo(() => new AuthService(), []);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const register = () => {
        if (!userName || !password) {
            setErrorMessage('Please enter a username and password');
            return;
        }

        if (userName.length < 3) {
            setErrorMessage('Username should be at least 3 characters long');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password should be at least 6 characters long');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords should match.');
            return;
        }

        authService.signup(userName, password, (result: CallbackResult) => {
            if (result.success) {
                setErrorMessage('');
                setSuccessMessage('Registration successful!');
                props.signupComplete();
            } else {
                setErrorMessage('error while registering :' + (result.error ? result.error : ''));
                setSuccessMessage('');
            }
        });
    }

    return (
        <form name="registrationForm">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <fieldset>
                        <legend className="h2">Register</legend>
                        <div className="form-group">
                            <label>User Name</label>
                            <input type="text"
                                id="registrationUserName"
                                data-testid="registrationUserName"
                                name="registrationUserName"
                                className="form-control"
                                placeholder="Username"
                                onChange={(e) => setUserName(e.currentTarget.value)} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                id="registrationPassword"
                                data-testid="registrationPassword"
                                name="registrationPassword"
                                className="form-control"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.currentTarget.value)} />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password"
                                id="registrationConfirmPassword"
                                data-testid="registrationConfirmPassword"
                                name="registrationConfirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.currentTarget.value)} />
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <ErrorMessage errorMessage={errorMessage} />

                    <SuccessMessage successMessage={successMessage} />

                    <div className="form-group">
                        <button type="button"
                            data-testid="register-button"
                            className="btn btn-md btn-info btn-block"
                            disabled={successMessage !== ''}
                            onClick={() => { register() }}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default SignUp;