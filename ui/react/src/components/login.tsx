import { useState, useMemo } from "react";

import { CallbackResult } from "../services/serviceModels";
import { AuthService } from "../services/authService";

import ErrorMessage from "./shared/errorMessage";

export interface LoginProps {
    loginComplete: Function
}

const Login = (props: LoginProps) => {
    const authService = useMemo(() => new AuthService(), []);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = () => {
        if (!userName || !password) {
            setErrorMessage('Please enter a username and password');
            return;
        }

        setErrorMessage('');

        authService.authenticate(userName, password, (result: CallbackResult) => {
            if (result.success) {
                props.loginComplete();
            } else {
                setErrorMessage('Invalid credentials. Please try again.');
            }
        });
    }

    return (
        <form name="loginForm">
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <fieldset>
                        <legend className="h2">Login</legend>
                        <div className="form-group" >
                            <label>User Name</label>
                            <input type="text"
                                id="loginUserName"
                                name="loginUserName"
                                data-testid="loginUserName"
                                className="form-control"
                                placeholder="Username"
                                onChange={(e) => setUserName(e.currentTarget.value)} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password"
                                id="loginPassword"
                                name="loginPassword"
                                data-testid="loginPassword"
                                className="form-control"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.currentTarget.value)} />
                        </div>
                    </fieldset>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <ErrorMessage errorMessage={errorMessage} />
                    <div className="form-group">
                        <button type="button"
                            data-testid="login-button"
                            className="btn btn-md btn-info btn-block"
                            onClick={() => login()}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Login;