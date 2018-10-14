import * as React from "react";
import * as ReactDOM from "react-dom";

export interface ErrorMessageProps { errorMessage: string }

export class ErrorMessage extends React.Component<ErrorMessageProps, any> {
    render() {
        if (this.props.errorMessage) {
            return <div className="alert alert-danger">
                {this.props.errorMessage }
            </div>;
        }
        return null;
    }
}