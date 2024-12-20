import React, { useState, FormEvent, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {jwtDecode} from 'jwt-decode';
import '../../styles/auth/login.css';

interface LoginFormState {
    username: string;
    password: string;
}

interface LocationState {
    message?: string;
    from?: Location;
}

interface TokenPayload {
    roles: string[];
    username: string;
    fullName?: string;
    email?: string;
    exp: number;
}

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, clearError } = useAuth();
    const state = location.state as LocationState;

    const [formData, setFormData] = useState<LoginFormState>({
        username: '',
        password: ''
    });

    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>(state?.message || '');

    const handleRedirect = (token: string) => {
        try {
            const decodedToken = jwtDecode<TokenPayload>(token);
            const roles = decodedToken.roles || [];

            let redirectPath = '/';

            if (roles.includes('ROLE_SUPER_ADMIN') || roles.includes('ROLE_ADMIN')) {
                redirectPath = '/admin/dashboard';
            } else if (roles.includes('ROLE_USER')) {
                if (state?.from?.pathname && !state.from.pathname.startsWith('/auth')) {
                    redirectPath = state.from.pathname;
                } else {
                    redirectPath = '/';
                }
            }

            setTimeout(() => {
                navigate(redirectPath, { replace: true });
            }, 500);
        } catch (error) {
            console.error('Error during redirect:', error);
            handleAuthError();
        }
    };

    const handleAuthError = () => {
        clearError();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenType');
        setError('Lỗi xác thực. Vui lòng đăng nhập lại.');
        setIsLoading(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (error) {
            setError('');
            clearError();
        }
        if (successMessage) {
            setSuccessMessage('');
        }
    };

    const validateForm = (): boolean => {
        if (!formData.username.trim()) {
            setError('Vui lòng nhập tên đăng nhập');
            return false;
        }
        if (!formData.password) {
            setError('Vui lòng nhập mật khẩu');
            return false;
        }
        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage('');
        setError('');
        clearError();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await login({
                username: formData.username.trim(),
                password: formData.password
            });

            if (response.token) {
                localStorage.setItem('accessToken', response.token);
                localStorage.setItem('refreshToken', response.refreshToken);
                localStorage.setItem('tokenType', response.tokenType);

                setSuccessMessage('Đăng nhập thành công!');
                handleRedirect(response.token);
            } else {
                throw new Error('Không nhận được token từ server');
            }
        } catch (err) {
            console.error('Login error:', err);
            handleLoginError(err);
        }
    };

    const handleLoginError = (err: unknown) => {
        setIsLoading(false);
        if (err instanceof Error) {
            const errorMsg = err.message.toLowerCase();
            if (errorMsg.includes('invalid') ||
                errorMsg.includes('incorrect') ||
                errorMsg.includes('không hợp lệ') ||
                errorMsg.includes('unauthorized')) {
                setError('Tên đăng nhập hoặc mật khẩu không đúng');
            } else if (errorMsg.includes('network') ||
                errorMsg.includes('timeout') ||
                errorMsg.includes('connection')) {
                setError('Lỗi kết nối. Vui lòng kiểm tra lại mạng');
            } else {
                setError(err.message);
            }
        } else {
            setError('Đăng nhập thất bại. Vui lòng thử lại sau.');
        }
    };

    useEffect(() => {
        return () => {
            setSuccessMessage('');
            setError('');
            setError('');
            clearError();
        };
    }, [clearError]);

    return (
        <Card className="login-card shadow-sm">
            <Card.Body className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Đăng Nhập</h2>
                </div>

                {successMessage && (
                    <Alert variant="success" dismissible onClose={() => setSuccessMessage('')} className="mb-3">
                        {successMessage}
                    </Alert>
                )}

                {error && (
                    <Alert variant="danger" dismissible onClose={() => setError('')} className="mb-3">
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Tên đăng nhập <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            isInvalid={!!error && !formData.username}
                            placeholder="Nhập tên đăng nhập"
                            disabled={isLoading}
                            required
                            autoComplete="username"
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>
                            Mật khẩu <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            isInvalid={!!error && !formData.password}
                            placeholder="Nhập mật khẩu"
                            disabled={isLoading}
                            required
                            autoComplete="current-password"
                        />
                    </Form.Group>

                    <Button style={{ backgroundColor: 'var(--primary-color)' }} type="submit" className="w-100 mb-3" disabled={isLoading}>
                        {isLoading ? 'Đang xử lý...' : 'Đăng Nhập'}
                    </Button>

                    <div className="text-center">
                        <p className="mb-2">
                            Chưa có tài khoản?{' '}
                            <Link to="/auth/register" className="text-decoration-none">
                                Đăng ký ngay
                            </Link>
                        </p>
                        <Link to="/auth/forgot-password" className="text-decoration-none">
                            Quên mật khẩu?
                        </Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};
