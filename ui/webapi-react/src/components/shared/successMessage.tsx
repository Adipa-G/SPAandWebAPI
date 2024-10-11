export interface SuccessMessageProps { successMessage: string }

const SuccessMessage = (props: SuccessMessageProps) => {
    if (props.successMessage) {
        return (<div className="alert alert-success">
            {props.successMessage}
        </div>);
    }
    return null;
};

export default SuccessMessage;
