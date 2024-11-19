import * as jQuery from "jquery";
import * as React from "react";
import { Navigate, Route } from 'react-router';
import { HashRouter, Routes } from 'react-router-dom';

import { AuthService } from "../services/authService";

import { Menu } from "./menu";
import Jumbotron from "./jumbotron";
import { Welcome } from "./welcome";

import { Login } from "./login";
import { SignUp } from "./signup";

import { Users } from "./users";
import { SystemLogs } from "./systemLogs";
import HttpLogs from "./httpLogs";

export interface LayoutProps { }
export interface LayoutState { registrationComplete: boolean }

export class Layout extends React.Component<LayoutProps, LayoutState> {
    authService: AuthService;

    constructor(props: any) {
        super(props);
        this.authService = new AuthService();

        this.state = { registrationComplete: false };
    }

    logOff = () => {
        this.authService.logOff();
        this.setState((prevState: LayoutState) => {
            let newState: LayoutState = jQuery.extend(true, {}, prevState) as LayoutState;
            newState.registrationComplete = false;
            return newState;
        });
    }

    logInComplete = () => {
        this.setState((prevState: LayoutState) => {
            let newState: LayoutState = jQuery.extend(true, {}, prevState) as LayoutState;
            newState.registrationComplete = false;
            return newState;
        });
    }

    signUpComplete = () => {
        setTimeout(() => {
            this.setState((prevState: LayoutState) => {
                let newState: LayoutState = jQuery.extend(true, {}, prevState) as LayoutState;
                newState.registrationComplete = true;
                return newState;
            });
        }, 2000);
    }

    render() {
        let auth = this.authService.getAuth();
        let isAuth = auth.isAuth;
        //TODO let userName = auth.userName;
        let userName = "User_1234";
        let regComplete = this.state.registrationComplete;

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
                            <Menu isAuth={isAuth} logOff={() => this.logOff()} />
                        </div>
                    </div>
                    <Jumbotron isAuth={isAuth} />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={
                                isAuth ?
                                    <Navigate to="/users" /> :
                                    <Login loginComplete={() => this.logInComplete()} />
                            } />
                            <Route path="/login" element={
                                isAuth ?
                                    <Navigate to="/users" /> :
                                    <Login loginComplete={() => this.logInComplete()} />
                            } />
                            <Route path="/signup" element={
                                isAuth ?
                                    <Navigate to="/users" /> :
                                    regComplete ?
                                        <Login loginComplete={() => this.logInComplete()} /> :
                                        <SignUp signupComplete={() => this.signUpComplete()} />
                            } />
                            <Route path="/users" element={
                                !isAuth ?
                                    <Navigate to="/login" /> :
                                    <Users />
                            } />
                            <Route path="/systemLog" element={
                                !isAuth ?
                                    <Navigate to="/login" /> :
                                    <SystemLogs />
                            } />
                            <Route path="/httpLog" element={
                                !isAuth ?
                                    <Navigate to="/login" /> :
                                    <HttpLogs />
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
}