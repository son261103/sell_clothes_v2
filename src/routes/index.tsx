import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PrivateRoute from './PrivateRoute';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';
import ClientRoutes from './ClientRoutes';
import NotFound from '../pages/common/404';
import useBackendStatus from '../hooks/useBackendStatus';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AppRoutes = () => {
    const isConnected = useBackendStatus();
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isConnected === null || showLoading) {
        return <LoadingSpinner />;
    }

    if (!isConnected) {
        return (
            <Routes>
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        );
    }

    return (
        <Routes>
            {/* Auth routes */}
            <Route path="/auth/*" element={<AuthRoutes />} />

            {/* Admin routes */}
            <Route
                path="/admin/*"
                element={
                    <PrivateRoute requiredRoles={['ADMIN', 'SUPER_ADMIN']}>
                        <AdminRoutes />
                    </PrivateRoute>
                }
            />

            {/* Client routes */}
            <Route path="/*" element={<ClientRoutes />} />

            {/* 404 Page */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
};

export default AppRoutes;