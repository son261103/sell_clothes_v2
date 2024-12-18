import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import {
    AiOutlineHome,
    AiOutlineShoppingCart,
    AiOutlineDown,
    AiOutlineUp,
    AiOutlineCar,
    AiOutlineDollar, AiOutlineTruck, AiTwotoneEuro
} from 'react-icons/ai';
import {
    FaTshirt,
    FaUsers,
    FaCog,
    FaTags,
    FaClipboardList
} from 'react-icons/fa';
import '../../../styles/admin/base/Sidebar.css';
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const [isOrdersOpen, setIsOrdersOpen] = useState(location.pathname.startsWith('/admin/orders'));
    const [isMethodsOpen, setIsMethodsOpen] = useState(location.pathname.startsWith('/admin/methods'));
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLinkClick = (path: string) => {
        setActiveLink(path);
    };

    return (
        <div className="sidebar">
            <div className="sidebar-brand">
                Admin Panel
            </div>
            <Nav className="flex-column">
                {/* Dashboard */}
                <Nav.Link
                    href="/admin/dashboard"
                    className={`sidebar-link ${activeLink === '/admin/dashboard' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/admin/dashboard')}
                >
                    <AiOutlineHome /> Trang Chủ
                </Nav.Link>

                {/* Categories */}
                <Nav.Link
                    href="/admin/categories"
                    className={`sidebar-link ${activeLink === '/admin/categories' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/admin/categories')}
                >
                    <FaTags /> Danh Mục Sản Phẩm
                </Nav.Link>

                {/* Products */}
                <Nav.Link
                    href="/admin/products"
                    className={`sidebar-link ${activeLink === '/admin/products' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/admin/products')}
                >
                    <FaTshirt /> Quản Lý Sản Phẩm
                </Nav.Link>

                {/* Orders with nested menu */}
                <div className="nav-item">
                    <div
                        className={`sidebar-link ${activeLink.startsWith('/admin/orders') ? 'active' : ''}`}
                        onClick={() => setIsOrdersOpen(!isOrdersOpen)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <AiOutlineShoppingCart /> Quản Lý Đơn Hàng
                        </div>
                        <div className="svg-order">
                            {isOrdersOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                        </div>
                    </div>

                    {isOrdersOpen && (
                        <div className="nested-menu" style={{ marginLeft: '5%' }}>
                            <Nav.Link
                                href="/admin/orders"
                                className={`sidebar-link ${activeLink === '/admin/orders' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/admin/orders')}
                            >
                                <FaClipboardList /> Đơn Hàng
                            </Nav.Link>

                            <Nav.Link
                                href="/admin/orders/payment"
                                className={`sidebar-link ${activeLink === '/admin/orders/payment' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/admin/orders/payment')}
                            >
                                <AiOutlineDollar /> Thanh Toán
                            </Nav.Link>

                            <Nav.Link
                                href="/admin/orders/shipping"
                                className={`sidebar-link ${activeLink === '/admin/orders/shipping' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/admin/orders/shipping')}
                            >
                                <AiOutlineCar /> Vận Chuyển
                            </Nav.Link>
                        </div>
                    )}
                </div>

                {/* Method Management */}
                <div className="nav-item">
                    <div
                        className={`sidebar-link ${activeLink.startsWith('/admin/methods') ? 'active' : ''}`}
                        onClick={() => setIsMethodsOpen(!isMethodsOpen)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                            <FaCog /> Quản Lý Phương Thức
                        </div>
                        <div className="svg-methods">
                            {isMethodsOpen ? <AiOutlineUp /> : <AiOutlineDown />}
                        </div>
                    </div>

                    {isMethodsOpen && (
                        <div className="nested-menu" style={{ marginLeft: '5%' }}>
                            <Nav.Link
                                href="/admin/methods/payment"
                                className={`sidebar-link ${activeLink === '/admin/methods/payment' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/admin/methods/payment')}
                            >
                                <AiTwotoneEuro  />Thanh Toán
                            </Nav.Link>

                            <Nav.Link
                                href="/admin/methods/shipping"
                                className={`sidebar-link ${activeLink === '/admin/methods/shipping' ? 'active' : ''}`}
                                onClick={() => handleLinkClick('/admin/methods/shipping')}
                            >
                                <AiOutlineTruck  />Vận Chuyển
                            </Nav.Link>
                        </div>
                    )}
                </div>

                {/* Users */}
                <Nav.Link
                    href="/admin/users"
                    className={`sidebar-link ${activeLink === '/admin/users' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/admin/users')}
                >
                    <FaUsers /> Quản Lý Người Dùng
                </Nav.Link>

                {/* Settings */}
                <Nav.Link
                    href="/admin/settings"
                    className={`sidebar-link ${activeLink === '/admin/settings' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('/admin/settings')}
                >
                    <FaCog /> Cài Đặt
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
