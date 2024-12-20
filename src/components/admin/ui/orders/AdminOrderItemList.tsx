import React, { useEffect, useMemo } from 'react';
import {  FaEdit, FaTrashAlt, FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../../styles/admin/components/orders/AdminOrderItemList.css';
import useOrderItem from "../../../../hooks/useOrderItem";
import useProduct from "../../../../hooks/useProduct";
import { OrderItemDTO } from "../../../../types/order.item.types";

const AdminOrderItemList: React.FC = () => {
    const navigate = useNavigate();
    const { orderId } = useParams<{ orderId: string }>();

    // Hooks
    const {
        orderItems,
        getOrderItems,
        removeOrderItem,
        error,
        loading,
        totalQuantity,
        totalAmount
    } = useOrderItem();

    const {
        products,
        getAllProducts
    } = useProduct();

    // Load Order Items and Products
    useEffect(() => {
        const loadData = async () => {
            if (orderId) {
                await getOrderItems(parseInt(orderId));
            }
            await getAllProducts(); // Load all products to map product names
        };

        loadData();
    }, [getOrderItems, getAllProducts, orderId]);

    // Map productId to productName
    const productNameMap = useMemo(() => {
        const map = new Map<number, string>();
        products.forEach(product => {
            map.set(product.productId || 0, product.productName); // Assuming product.id and product.name exist
        });
        return map;
    }, [products]);

    // const handleAddOrderItem = () => {
    //     navigate(`/admin/orders/${orderId}/items/add`);
    // };

    const handleEditOrderItem = (productId: number) => {
        navigate(`/admin/orders/${orderId}/items/edit/${productId}`);
    };

    const handleDeleteOrderItem = async (item: OrderItemDTO) => {
        if (!item.orderId || !item.productId) return;

        const confirmDelete = window.confirm(`Are you sure you want to delete this order item?`);
        if (confirmDelete) {
            await removeOrderItem(item.orderId, item.productId);
            if (orderId) await getOrderItems(parseInt(orderId));
        }
    };

    const handleBackToOrderList = () => {
        navigate('/admin/orders');
    };

    if (loading) return <div className="loading-spinner">Loading order items...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    const validOrderItems = Array.isArray(orderItems) ? orderItems : [];

    return (
        <div className="order-item-list">
            <div className="header-actions">
                <h2>Order Items List</h2>
                <button onClick={handleBackToOrderList} className="btn-back">
                    <FaArrowLeft/> Back
                </button>
            </div>
            <div className="order-summary">
                <div className="summary-item">
                    <span>Total Items:</span>
                    <span>{totalQuantity}</span>
                </div>
                <div className="summary-item">
                    <span>Total Amount:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                </div>
            </div>
            {/*<button onClick={handleAddOrderItem} className="btn-add">*/}
            {/*    <FaPlus /> Add Order Item*/}
            {/*</button>*/}
            {validOrderItems.length === 0 ? (
                <p className="no-items">No order items found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Subtotal</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {validOrderItems.map((item) => (
                        <tr key={`${item.orderId}-${item.productId}`} className="order-item-row">
                            <td>{item.orderId}</td>
                            <td>{item.productId}</td>
                            <td>{productNameMap.get(item.productId) || 'N/A'}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price.toFixed(2)}</td>
                            <td>${(item.price * item.quantity).toFixed(2)}</td>
                            <td>{new Date(item.createdAt || '').toLocaleDateString()}</td>
                            <td className="actions">
                                <button
                                    onClick={() => item.productId && handleEditOrderItem(item.productId)}
                                    className="btn-edit"
                                    disabled={!item.productId}
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteOrderItem(item)}
                                    className="btn-delete"
                                >
                                    <FaTrashAlt /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={5} className="total-label">Total</td>
                        <td className="total-amount">${totalAmount.toFixed(2)}</td>
                        <td colSpan={2}></td>
                    </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};

export default AdminOrderItemList;
