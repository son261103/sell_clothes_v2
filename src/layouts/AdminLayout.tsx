import React from 'react';
import Sidebar from '../components/admin/common/Sidebar';
import Header from '../components/admin/common/Header';
import Footer from '../components/admin/common/Footer';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 p-0 ">
                    <Sidebar />
                </div>

                <div className="col-md-10 p-0">
                    <div className="d-flex flex-column min-vh-100">
                        {/* Header */}
                        <div className="w-full">
                            <Header />
                        </div>

                        {/* Main content area */}
                        <main className="flex-grow-1 p-4">
                            {children}
                        </main>

                        {/* Footer */}
                        <div className="w-full mt-auto">
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;