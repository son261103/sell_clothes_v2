import { Link, Outlet } from 'react-router-dom';

const ClientLayout = () => {
    return (
        <div className="wrapper min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="text-xl font-bold">
                            Logo
                        </Link>

                        {/* Login Button */}
                        <Link
                            to="/auth/login"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
};

export default ClientLayout;