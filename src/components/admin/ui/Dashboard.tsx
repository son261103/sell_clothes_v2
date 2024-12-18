import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <Row className="g-4">
                <Col md={4}>
                    <Card className="stat-card">
                        <Card.Body>
                            <Card.Title>Total Users</Card.Title>
                            <Card.Text className="stat-number">1,245</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="stat-card">
                        <Card.Body>
                            <Card.Title>Total Orders</Card.Title>
                            <Card.Text className="stat-number">532</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="stat-card">
                        <Card.Body>
                            <Card.Title>Revenue</Card.Title>
                            <Card.Text className="stat-number">$12,345</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;