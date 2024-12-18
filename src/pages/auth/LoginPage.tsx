import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LoginForm } from '../../components/auth/LoginForm';
import '../../styles/admin/global.css';

export const LoginPage: React.FC = () => {
    return (
        <div className={'container-fluid login-page'}>
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={6} lg={5}>
                    <LoginForm />
                </Col>
            </Row>
        </div>
    );
};