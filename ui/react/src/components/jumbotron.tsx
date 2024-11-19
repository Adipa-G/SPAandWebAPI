export interface JumbotronProps {
    isAuth: boolean,
}

const Jumbotron = (props: JumbotronProps) => {
    return (props.isAuth ? <div className="jumbotron">
        <div className="container">
            <div className="page-header text-center">
                <h1>React/WebAPI Seed</h1>
            </div>
            <p>A seed app for react using WebAPI. IdentityServer used for Auth. NHibernate used as the ORM</p>
        </div>
    </div> : null);
};

export default Jumbotron;