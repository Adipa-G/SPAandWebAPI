export interface JumbotronProps {
    isAuth: boolean,
}

const Jumbotron = (props: JumbotronProps) => {
    return (!props.isAuth ? <div className="py-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container">
            <div className="page-header text-center">
                <h1>React/WebAPI Seed</h1>
            </div>
            <p>A seed app for react using WebAPI. OpenIddict used for Auth. EF used as the ORM</p>
        </div>
    </div> : null);
};

export default Jumbotron;