import * as React from "react";

export interface JumbotronProps { isAuth: boolean }

export class Jumbotron extends React.Component<JumbotronProps, any> {
    render() {
        if (!this.props.isAuth) {
            return <div className="jumbotron">
                <div className="container">
                    <div className="page-header text-center">
                        <h1>React/WebAPI Seed</h1>
                    </div>
                    <p>A seed app for react using WebAPI. IdentityServer used for Auth. NHibernate used as the ORM</p>
                </div>
            </div>;
        }
        return null;
    }
}