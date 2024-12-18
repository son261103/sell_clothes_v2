import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaEdit,
    FaTrashAlt,
    FaEye,
    FaArrowLeft,
    FaArrowRight,
} from 'react-icons/fa';
import '../../../../styles/admin/components/orders/AdminOrderList.css';
import useOrder from "../../../../hooks/useOrder";
import { OrderDTO, OrderStatus } from "../../../../types/order.types";

const AdminOrderList: React.FC = () => {
    const navigate = useNavigate();
    const {
        orders,
        getAllOrders,
        removeOrder,
        loading,
        error,
        changeOrderStatus
    } = useOrder();

    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize] = useState(10);
    const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

    useEffect(() => {
        loadOrders();
    }, [currentPage, pageSize]);

    const loadOrders = async () => {
        try {
            await getAllOrders(currentPage, pageSize);
        } catch (err) {
            console.error('Failed to load orders:', err);
        }
    };

    const handleEditOrder = (orderId: number) => {
        navigate(`/admin/orders/edit/${orderId}`);
    };

    const handleViewOrderItems = (orderId: number) => {
        navigate(`/admin/orders/${orderId}/items`);
    };

    const handleDeleteOrder = async (order: OrderDTO) => {
        if (!order.order_item_id) {
            console.error('Cannot delete order: Invalid ID');
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete order #${order.order_item_id}?`);
        if (confirmDelete) {
            try {
                await removeOrder(order.order_item_id);
                await loadOrders();
            } catch (err) {
                console.error('Failed to delete order:', err);
            }
        }
    };

    const handleStatusChange = async (order: OrderDTO, newStatus: OrderStatus) => {
        if (!order.order_item_id || updatingStatus === order.order_item_id) return;

        try {
            setUpdatingStatus(order.order_item_id);
            await changeOrderStatus(order.order_item_id, newStatus);
            await loadOrders();
        } catch (err) {
            console.error('Failed to update order status:', err);
        } finally {
            setUpdatingStatus(null);
        }
    };

    const getStatusClass = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'status-pending';
            case 'processing':
                return 'status-processing';
            case 'shipped':
                return 'status-shipped';
            case 'delivered':
                return 'status-delivered';
            case 'cancelled':
                return 'status-cancelled';
            default:
                return '';
        }
    };

    if (loading) {
        return <div className="loading-spinner">Loading orders...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    const validOrders = Array.isArray(orders) ? orders : [];

    // Calculate totals for each status
    const statusCounts = {
        pending: validOrders.filter(order => order.status.toLowerCase() === 'pending').length,
        processing: validOrders.filter(order => order.status.toLowerCase() === 'processing').length,
        shipped: validOrders.filter(order => order.status.toLowerCase() === 'shipped').length,
        delivered: validOrders.filter(order => order.status.toLowerCase() === 'delivered').length,
        cancelled: validOrders.filter(order => order.status.toLowerCase() === 'cancelled').length
    };
    const totalOrderCount = validOrders.length;
    const totalRevenue = validOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    return (
        <div className="order-list">
            <h2>Order Management</h2>

            <div className="order-summary">
                <div className="summary-card">
                    <h3>Total Orders</h3>
                    <p>{totalOrderCount}</p>
                </div>
                <div className="summary-card">
                    <h3>Total Revenue</h3>
                    <p>${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="summary-card">
                    <h3>Status Overview</h3>
                    <div className="status-counts">
                        <p>Pending: {statusCounts.pending}</p>
                        <p>Processing: {statusCounts.processing}</p>
                        <p>Shipped: {statusCounts.shipped}</p>
                        <p>Delivered: {statusCounts.delivered}</p>
                        <p>Cancelled: {statusCounts.cancelled}</p>
                    </div>
                </div>
            </div>

            {validOrders.length === 0 ? (
                <p className="no-orders">No orders found.</p>
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Total Amount</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {validOrders.map((order) => (
                            <tr key={order.order_item_id}>
                                <td>#{order.order_item_id}</td>
                                <td>{order.userId}</td>
                                <td>{order.username || 'N/A'}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>
                                    <div className="status-actions">
                                        <span
                                            className={`status-badge ${getStatusClass(order.status)}`}
                                        >
                                            {order.status}
                                        </span>
                                        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                                                disabled={updatingStatus === order.order_item_id}
                                                className="status-select"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        )}
                                    </div>
                                </td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td className="actions">
                                    <button
                                        onClick={() => order.order_item_id && handleViewOrderItems(order.order_item_id)}
                                        className="btn-view"
                                        title="View Order Items"
                                    >
                                        <FaEye/>
                                    </button>
                                    <button
                                        onClick={() => order.order_item_id && handleEditOrder(order.order_item_id)}
                                        className="btn-edit"
                                        title="Edit Order"
                                    >
                                        <FaEdit/>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteOrder(order)}
                                        className="btn-delete"
                                        title="Delete Order"
                                    >
                                        <FaTrashAlt/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="pagination-btn"
                >
                    <FaArrowLeft size={16}/>
                </button>
                <span className="page-info">Page {currentPage + 1}</span>
                <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={validOrders.length < pageSize}
                    className="pagination-btn"
                >
                    <FaArrowRight size={16}/>
                </button>
            </div>
        </div>
    );
};

export default AdminOrderList;