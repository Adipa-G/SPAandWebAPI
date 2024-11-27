import { useState, useMemo, useEffect } from "react";
import { Navigate, Route } from 'react-router';
import { HashRouter, Routes } from 'react-router-dom';

import { AuthService } from "../services/authService";

import Menu from "./menu";
import Jumbotron from "./jumbotron";
import Welcome from "./welcome";

import Login from "./login";
import SignUp from "./signup";

import Users from "./users";
import SystemLogs from "./systemLogs";
import HttpLogs from "./httpLogs";

const Layout = () => {
    const authService = useMemo(() => new AuthService(), []);
    const [registrationComplete, setRegistrationComplete] = useState(false);
    const [loginComplete, setLoginComplete] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [userName, setUserName] = useState('');

    const logOff = () => {
        setTimeout(() => {
            authService.logOff();
            setLoginComplete(false);
            setRegistrationComplete(false);
        }, 2000);
    };

    const logInComplete = () => {
        setTimeout(() => {
            setLoginComplete(true);
            setRegistrationComplete(false);
        }, 2000);
    };

    const signUpComplete = () => {
        setTimeout(() => {
            setLoginComplete(false);
            setRegistrationComplete(true);
        }, 2000);
    }

    useEffect(() => {
        let auth = authService.getAuth();
        setIsAuth(auth.isAuth);
        setUserName(auth.userName);
    }, [registrationComplete, loginComplete])

    return (
        <HashRouter>
            <div>
                <div className="navbar navbar-inverse" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navCollapseMenu" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Welcome userName={userName} />
                        </div>
                        <Menu isAuth={isAuth} logOff={() => logOff()} />
                    </div>
                </div>
                <Jumbotron isAuth={isAuth} />
                <div className="container">
                    <Routes>
                        <Route path="/" element={
                            isAuth ?
                                <Navigate to="/users" /> :
                                <Login loginComplete={() => logInComplete()} />
                        } />
                        <Route path="/login" element={
                            isAuth ?
                                <Navigate to="/users" /> :
                                <Login loginComplete={() => logInComplete()} />
                        } />
                        <Route path="/signup" element={
                            isAuth ?
                                <Navigate to="/users" /> :
                                registrationComplete ?
                                    <Login loginComplete={() => logInComplete()} /> :
                                    <SignUp signupComplete={() => signUpComplete()} />
                        } />
                        <Route path="/users" element={
                            !isAuth ?
                                <Navigate to="/login" /> :
                                <Users defaultPageSize={100} />
                        } />
                        <Route path="/systemLog" element={
                            !isAuth ?
                                <Navigate to="/login" /> :
                                <SystemLogs defaultPageSize={100} />
                        } />
                        <Route path="/httpLog" element={
                            !isAuth ?
                                <Navigate to="/login" /> :
                                <HttpLogs defaultPageSize={100} />
                        } />
                    </Routes>

                    <div style={{ display: 'none' }}>
                        <div className="loading">
                            <div className="screen-overlay"></div>
                            <div className="center-screen">
                                <span><i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>Loading....</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div id="footer">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <p className="text-muted">&copy;Copyright Company 2015</p>
                                </div>
                                <div className="col-md-6">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HashRouter>
    );
}

export default Layout;