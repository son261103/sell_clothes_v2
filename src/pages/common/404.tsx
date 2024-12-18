import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row min-vh-100 align-items-center justify-content-center">
                <div className="col-md-8 text-center">
                    <div className="error-template">
                        <h1 className="display-1">404</h1>
                        <h2 className="display-4">Oops! Page Not Found</h2>
                        <div className="error-details my-4">
                            Sorry, the page you requested was not found.
                        </div>
                        <div className="error-actions">
                            <button
                                className="btn btn-primary btn-lg me-3"
                                onClick={() => navigate('/')}
                            >
                                <i className="bi bi-house-door me-2"></i>
                                Back to Home
                            </button>
                            <button
                                className="btn btn-secondary btn-lg"
                                onClick={() => navigate(-1)}
                            >
                                <i className="bi bi-arrow-left me-2"></i>
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
