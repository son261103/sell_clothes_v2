// src/pages/client/Home.tsx
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="container-fluid p-0">
            {/* Hero Section */}
            <section className="bg-primary text-white py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold mb-4">Welcome to Our Platform</h1>
                            <p className="lead mb-4">
                                Discover amazing features and grow your business with our comprehensive solutions.
                            </p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                                <button
                                    onClick={() => navigate('/auth/login')}
                                    className="btn btn-light btn-lg px-4 me-md-2"
                                >
                                    Sign In Now
                                </button>
                                <button
                                    onClick={() => navigate('/auth/register')}
                                    className="btn btn-outline-light btn-lg px-4"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src="/assets/images/hero-image.png"
                                alt="Hero"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5">Our Features</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-graph-up text-primary display-4 mb-3"></i>
                                    <h5 className="card-title">Analytics</h5>
                                    <p className="card-text">
                                        Comprehensive analytics and reporting tools to track your progress.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-shield-check text-primary display-4 mb-3"></i>
                                    <h5 className="card-title">Security</h5>
                                    <p className="card-text">
                                        Advanced security features to protect your data and privacy.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-people text-primary display-4 mb-3"></i>
                                    <h5 className="card-title">Collaboration</h5>
                                    <p className="card-text">
                                        Powerful tools for team collaboration and communication.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-light py-5">
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <h2 className="mb-4">Ready to Get Started?</h2>
                            <p className="lead mb-4">
                                Join thousands of satisfied users who are already benefiting from our platform.
                            </p>
                            <button
                                onClick={() => navigate('/auth/register')}
                                className="btn btn-primary btn-lg"
                            >
                                Create Free Account
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="text-center mb-5">What Our Users Say</h2>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                    </div>
                                    <p className="card-text">
                                        "Great platform with amazing features. Highly recommended!"
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="/assets/images/avatar1.jpg"
                                            alt="User"
                                            className="rounded-circle me-3"
                                            style={{ width: '48px', height: '48px' }}
                                        />
                                        <div>
                                            <h6 className="mb-0">John Doe</h6>
                                            <small className="text-muted">CEO, Company Inc</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                    </div>
                                    <p className="card-text">
                                        "The analytics features are incredibly useful for our business."
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="/assets/images/avatar2.jpg"
                                            alt="User"
                                            className="rounded-circle me-3"
                                            style={{ width: '48px', height: '48px' }}
                                        />
                                        <div>
                                            <h6 className="mb-0">Jane Smith</h6>
                                            <small className="text-muted">Marketing Director</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                        <i className="bi bi-star-fill text-warning"></i>
                                    </div>
                                    <p className="card-text">
                                        "Excellent support team and reliable platform. Just what we needed!"
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="/assets/images/avatar3.jpg"
                                            alt="User"
                                            className="rounded-circle me-3"
                                            style={{ width: '48px', height: '48px' }}
                                        />
                                        <div>
                                            <h6 className="mb-0">Mike Johnson</h6>
                                            <small className="text-muted">Project Manager</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h5>About Us</h5>
                            <p className="mb-0">
                                We provide innovative solutions for businesses to grow and succeed.
                            </p>
                        </div>
                        <div className="col-md-6 text-md-end">
                            <h5>Contact</h5>
                            <p className="mb-0">
                                Email: info@example.com<br />
                                Phone: (123) 456-7890
                            </p>
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="text-center">
                        <p className="mb-0">© 2024 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;