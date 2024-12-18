import React, { useState, FormEvent, useEffect } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { RegisterRequest } from '../../types/auth.types';
import '../../styles/auth/register.css';

interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    phone: string;
}

interface FormErrors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    fullName?: string;
    phone?: string;
    general?: string;
}

export const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { register, clearError } = useAuth();

    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phone: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        setErrors({});
        clearError();
        return () => {
            clearError();
        };
    }, [location, clearError]);

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Vui lòng nhập tên đăng nhập';
        } else if (formData.username.trim().length < 3) {
            newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = 'Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
            newErrors.email = 'Vui lòng nhập địa chỉ email hợp lệ';
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Vui lòng nhập họ và tên';
        } else if (formData.fullName.trim().length < 2) {
            newErrors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
        }

        if (!formData.password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        if (formData.phone && !/^(0|\+84)[0-9]{9}$/.test(formData.phone.replace(/\s+/g, ''))) {
            newErrors.phone = 'Vui lòng nhập số điện thoại hợp lệ (VD: 0912345678 hoặc +84912345678)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof FormErrors] || errors.general) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
                general: undefined
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearError();
        setIsSuccess(false);
        setErrors({});

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            // Tạo object RegisterRequest phù hợp với type
            const registerData: RegisterRequest = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: formData.password,
                fullName: formData.fullName.trim(),
                phone: formData.phone.trim() || '' // Luôn trả về string, không có undefined
            };

            const response = await register(registerData);

            if (response) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/auth/login', {
                        state: {
                            message: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập.'
                        },
                        replace: true
                    });
                }, 1500);
            }
        } catch (error) {
            setIsSuccess(false);
            console.error('Registration error:', error);

            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || '';

                if (errorMessage.toLowerCase().includes('tên đăng nhập đã tồn tại')) {
                    setErrors({
                        username: 'Tên đăng nhập đã được sử dụng, vui lòng chọn tên khác'
                    });
                    return;
                }

                if (errorMessage.toLowerCase().includes('email đã tồn tại')) {
                    setErrors({
                        email: 'Email đã được sử dụng, vui lòng sử dụng email khác'
                    });
                    return;
                }

                setErrors({
                    general: errorMessage || 'Đã có lỗi xảy ra khi đăng ký. Vui lòng thử lại.'
                });
            } else {
                setErrors({
                    general: 'Không thể kết nối đến máy chủ. Vui lòng thử lại sau.'
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="shadow-sm register-card">
            <Card.Body className="p-5 register-card-body">
                <h2 className="text-center mb-4 register-header">Đăng Ký Tài Khoản</h2>

                {isSuccess && (
                    <Alert variant="success" className="mb-3 register-success-alert">
                        Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...
                    </Alert>
                )}

                {errors.general && (
                    <Alert
                        variant="danger"
                        className="mb-3 register-error-alert"
                        dismissible
                        onClose={() => setErrors(prev => ({...prev, general: undefined}))}
                    >
                        {errors.general}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate className="register-form">
                    <Form.Group className="mb-3 register-form-group">
                        <Form.Label className="register-label">
                            Tên đăng nhập <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            isInvalid={!!errors.username}
                            placeholder="Nhập tên đăng nhập"
                            disabled={isLoading}
                            required
                            autoComplete="username"
                            className="register-input"
                        />
                        <Form.Control.Feedback type="invalid" className="register-feedback">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 register-form-group">
                        <Form.Label className="register-label">
                            Địa chỉ email <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            isInvalid={!!errors.email}
                            placeholder="Nhập địa chỉ email"
                            disabled={isLoading}
                            required
                            autoComplete="email"
                            className="register-input"
                        />
                        <Form.Control.Feedback type="invalid" className="register-feedback">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 register-form-group">
                        <Form.Label className="register-label">
                            Họ và tên <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.fullName}
                            placeholder="Nhập họ và tên"
                            disabled={isLoading}
                            required
                            autoComplete="name"
                            className="register-input"
                        />
                        <Form.Control.Feedback type="invalid" className="register-feedback">
                            {errors.fullName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 register-form-group">
                        <Form.Label className="register-label">Số điện thoại <span
                            className="text-danger">*</span></Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            isInvalid={!!errors.phone}
                            placeholder="Nhập số điện thoại"
                            disabled={isLoading}
                            autoComplete="tel"
                            className="register-input"
                        />
                        <Form.Control.Feedback type="invalid" className="register-feedback">
                            {errors.phone}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 register-form-group">
                        <Form.Label className="register-label">
                            Mật khẩu <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            isInvalid={!!errors.password}
                            placeholder="Nhập mật khẩu"
                            disabled={isLoading}
                            required
                            autoComplete="new-password"
                            className="register-input"
                        />
                        <Form.Control.Feedback type="invalid" className="register-feedback">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3 register-form-group">
                        <Form.Label className="register-label">
                            Xác nhận mật khẩu <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            isInvalid={!!errors.confirmPassword}
                            placeholder="Nhập lại mật khẩu"
                            disabled={isLoading}
                            required
                            autoComplete="new-password"
                            className="register-input"
                        />
                        <Form.Control.Feedback type="invalid" className="register-feedback">
                            {errors.confirmPassword}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className=" justify-content-between align-items-center">
                        <Button
                            type="submit"
                            className="register-submit-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
                        </Button>

                        <Link
                            to="/auth/login"
                            className="register-login-link"
                            onClick={() => clearError()}
                        >
                            Đã có tài khoản? Đăng nhập ngay
                        </Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};