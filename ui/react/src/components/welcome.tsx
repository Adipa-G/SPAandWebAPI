export interface WelcomeProps {
    userName: string
}

const Welcome = (props: WelcomeProps) => {
    return (props.userName ? <span className="navbar-brand">
        Welcome {props.userName}
    </span> : <span className="navbar-brand"></span>);
};

export default Welcome;