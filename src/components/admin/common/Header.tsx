import React, { useEffect, useState } from 'react';
import { Navbar, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { FaMoon, FaSun, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom

import '../../../styles/admin/base/Header.css';
import { useAuth } from "../../../hooks/useAuth.tsx";

const Header: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate(); // Khai báo hook useNavigate để điều hướng

    const toggleTheme = () => {
        const newTheme = !isDarkMode ? 'dark' : 'light';
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark-mode', !isDarkMode);
        localStorage.setItem('theme', newTheme); // Lưu trạng thái mới vào localStorage
    };

    const handleLogout = async () => {
        await logout();
        navigate('/auth/login'); // Điều hướng về trang login sau khi logout
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }, [isDarkMode]);

    return (
        <>
            <Navbar className="header" expand="lg">
                <Container fluid>
                    <Row className="w-100 align-items-center">
                        <Col sm={6} md={8} className="d-flex justify-content-start">
                            <Navbar.Brand className="header-title">
                                Dashboard
                            </Navbar.Brand>
                        </Col>
                        <Col sm={6} md={4} className="d-flex justify-content-end">
                            <Button
                                variant={isDarkMode ? 'light' : 'dark'}
                                onClick={toggleTheme}
                                className="theme-toggle"
                            >
                                {isDarkMode ? <FaSun /> : <FaMoon />}
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => setShowLogoutModal(true)} // Mở modal logout
                                className="ms-2 theme-toggle"
                            >
                                <FaSignOutAlt />
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Navbar>

            {/* Modal xác nhận đăng xuất */}
            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận đăng xuất</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Header;
