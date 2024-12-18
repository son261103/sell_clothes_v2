import React from 'react';
import { Container } from 'react-bootstrap';
import '../../../styles/admin/base/Footer.css';
const Footer: React.FC = () => {
    return (
        <footer className="footer text-center py-3">
            <Container>
                <p>© 2024 Your Company. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;
