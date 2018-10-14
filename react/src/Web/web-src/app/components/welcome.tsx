import * as React from "react";

export interface WelcomeProps { userName: string }

export class Welcome extends React.Component<WelcomeProps, any> {
    render() {
        if (this.props.userName) {
            return <span className="navbar-brand">
                Welcome {this.props.userName}
            </span>;
        } else {
            return <span className="navbar-brand"></span>;
        }
    }
}