import React from 'react';
import {  Row, Col } from 'react-bootstrap';
import { RegisterForm } from '../../components/auth/RegisterForm';
import '../../styles/admin/global.css';
export const RegisterPage: React.FC = () => {
    return (
        <div className={'container-fluid register-page'}>
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={6} lg={5}>
                    <RegisterForm />
                </Col>
            </Row>
        </div>
    );
};