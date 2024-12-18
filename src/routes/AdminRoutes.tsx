import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboardPage from "../pages/admin/AdminDashboardPage.tsx";
import AdminProductPage from "../pages/admin/AdminProductPage.tsx";
import AdminCategoryPage from "../pages/admin/AdminCategoryPage.tsx";
import AdminOrderPage from "../pages/admin/AdminOrderPage.tsx";
import AdminUserPage from "../pages/admin/AdminUserPage.tsx";
import AdminPaymentMethodPage from "../pages/admin/AdminPaymentMethodPage.tsx";


const AdminRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Route cho trang Admin Dashboard */}
            <Route
                path="/dashboard"
                element={
                    <AdminLayout>
                        <AdminDashboardPage />
                    </AdminLayout>
                }
            />

            {/* Route cho trang Admin Category */}
            <Route
                path="/categories/*"
                element={
                    <AdminLayout>
                        <AdminCategoryPage />
                    </AdminLayout>
                }
            />

            {/* Route cho trang Admin Product */}
            <Route
                path="/products/*"
                element={
                    <AdminLayout>
                        <AdminProductPage />
                    </AdminLayout>
                }
            />


            {/* Route cho trang Admin Orders */}
            <Route
                path="/orders/*"
                element={
                    <AdminLayout>
                        <AdminOrderPage />
                    </AdminLayout>
                }
            />

            {/*{Route cho trang Admin Payment Method}*/}
            <Route
                path="/methods/payment*"
                element={
                    <AdminLayout>
                        <AdminPaymentMethodPage />
                    </AdminLayout>
                }
            />


            {/* Route cho trang Admin Users */}
            <Route
                path="/users/*"
                element={
                    <AdminLayout>
                        <AdminUserPage />
                    </AdminLayout>
                }
            />
        </Routes>
    );
};

export default AdminRoutes;
