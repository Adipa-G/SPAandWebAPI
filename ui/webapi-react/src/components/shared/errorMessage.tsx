export interface ErrorMessageProps { errorMessage: string }

const ErrorMessage = (props: ErrorMessageProps) => {
    if (props.errorMessage) {
        return (<div className="alert alert-danger">
            {props.errorMessage}
        </div>);
    }
    return null;
};

export default ErrorMessage;