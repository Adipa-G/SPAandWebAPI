﻿import * as React from "react";

export interface SuccessMessageProps { successMessage: string }

export class SuccessMessage extends React.Component<SuccessMessageProps, any> {
    render() {
        if (this.props.successMessage) {
            return <div className="alert alert-success">
                {this.props.successMessage}
            </div>;
        }
        return null;
    }
}