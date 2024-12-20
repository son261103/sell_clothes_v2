import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Dashboard from "../../components/admin/ui/Dashboard.tsx";
import '../../styles/admin/global.css' ;

const AdminDashboardPage: React.FC = () => {
    return (
        <div className="admin-dashboard">
            <Row className="mb-4">
                <Col>
                    <Card className="welcome-card">
                        <Card.Body>
                            <Card.Title>Welcome to the Admin Dashboard</Card.Title>
                            <Card.Text>
                                This is your centralized control panel for managing all aspects of your application.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Dashboard />
        </div>
    );
};

export default AdminDashboardPage;