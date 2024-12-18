import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../hooks/useAuth';

interface TokenPayload {
    roles: string[];
    username: string;
    exp: number;
    fullName?: string;
    email?: string;
}

interface PrivateRouteProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRoles = [] }) => {
    const location = useLocation();
    const { logout } = useAuth();
    const [isValidating, setIsValidating] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const validateAccess = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');

                if (!accessToken) {
                    throw new Error('No token found');
                }

                // Decode and validate token
                const decodedToken = jwtDecode<TokenPayload>(accessToken);

                // Check token expiration
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    throw new Error('Token expired');
                }

                // Format and validate roles
                const userRoles = decodedToken.roles || [];
                const formattedUserRoles = userRoles.map(role =>
                    role.startsWith('ROLE_') ? role : `ROLE_${role}`
                );

                // If no specific roles are required, just check for valid token
                if (requiredRoles.length === 0) {
                    setIsAuthorized(true);
                    setIsValidating(false);
                    return;
                }

                // Check if user has any of the required roles
                const formattedRequiredRoles = requiredRoles.map(role =>
                    role.startsWith('ROLE_') ? role : `ROLE_${role}`
                );

                const hasRequiredRole = formattedRequiredRoles.some(role =>
                    formattedUserRoles.includes(role)
                );

                if (!hasRequiredRole) {
                    throw new Error('Insufficient permissions');
                }

                setIsAuthorized(true);
            } catch (error) {
                console.error('Access validation error:', error);

                // Clean up tokens and auth state
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('tokenType');

                // Logout user if there's an authentication error
                await logout();

                setIsAuthorized(false);
            } finally {
                setIsValidating(false);
            }
        };

        validateAccess();
    }, [logout, requiredRoles, location.pathname]);

    // Show loading state while validating
    if (isValidating) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    // Redirect to login if not authorized
    if (!isAuthorized) {
        // Save the attempted path for redirect after login
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // Show forbidden page if user doesn't have required roles
    if (requiredRoles.length > 0 && !isAuthorized) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Access Denied</h4>
                    <p>Bạn không có quyền truy cập vào trang này.</p>
                    <hr />
                    <p className="mb-0">
                        Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
                    </p>
                </div>
            </div>
        );
    }

    // Render protected content if authorized
    return <>{children}</>;
};

export default PrivateRoute;