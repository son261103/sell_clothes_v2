// components/admin/orders/AdminOrderEdit.tsx
import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useOrder } from '../../../../hooks/useOrder';
import { UpdateOrderRequest, OrderStatus } from '../../../../types/order.types';
import '../../../../styles/admin/components/orders/AdminOrderEdit.css';

const AdminOrderEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        getOrderById,
        updateExistingOrder,
        selectedOrder,
        loading,
        error
    } = useOrder();

    // Form state
    const [formData, setFormData] = useState<UpdateOrderRequest>({
        userId: 0,
        username: '',
        orderDate: '',
        status: '',
        totalAmount: 0
    });

    // Load order data when component mounts
    useEffect(() => {
        if (id) {
            getOrderById(parseInt(id));
        }
    }, [id, getOrderById]);

    // Update form when selected order changes
    useEffect(() => {
        if (selectedOrder) {
            setFormData({
                order_item_id: selectedOrder.order_item_id,
                userId: selectedOrder.userId,
                username: selectedOrder.username,
                orderDate: selectedOrder.orderDate,
                status: selectedOrder.status,
                totalAmount: selectedOrder.totalAmount
            });
        }
    }, [selectedOrder]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'totalAmount' || name === 'userId'
                ? parseFloat(value)
                : value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) return;

        try {
            await updateExistingOrder(parseInt(id), formData);
            navigate('/admin/orders');
        } catch (err) {
            console.error('Failed to update order:', err);
        }
    };

    const orderStatuses: OrderStatus[] = [
        'Pending',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled'
    ];

    return (
        <div className="order-edit">
            <div className="header-actions">
                <h2>Edit Order</h2>
                <button
                    className="btn_back_list"
                    onClick={() => navigate('/admin/orders')}
                >
                    <FaArrowLeft className="back-arrow"/> Back
                </button>
            </div>

            <form onSubmit={handleSubmit} className="edit-form">
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label htmlFor="userId">User ID:</label>
                    <input
                        type="number"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username || ''}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="orderDate">Order Date:</label>
                    <input
                        type="datetime-local"
                        id="orderDate"
                        name="orderDate"
                        value={formData.orderDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status:</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Status</option>
                        {orderStatuses.map(status => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="totalAmount">Total Amount:</label>
                    <input
                        type="number"
                        id="totalAmount"
                        name="totalAmount"
                        value={formData.totalAmount}
                        onChange={handleInputChange}
                        step="0.01"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Order'}
                </button>
            </form>
        </div>
    );
};

export default AdminOrderEdit;