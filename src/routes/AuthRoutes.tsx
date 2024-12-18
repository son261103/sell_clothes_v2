import { Routes, Route, Navigate } from 'react-router-dom';
import {LoginPage} from "../pages/auth/LoginPage.tsx";
import {RegisterPage} from "../pages/auth/RegisterPage.tsx";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/*<Route path="/forgot-password" element={<ForgotPasswordPage />} />*/}
            {/*<Route path="/reset-password" element={<ResetPasswordPage />} />*/}
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
};

export default AuthRoutes;