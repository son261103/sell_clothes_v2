import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/admin/components/orders/AdminOrderAdd.css';

const AdminOrderAdd: React.FC = () => {
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState('');
    const [productList, setProductList] = useState('');
    const [status, setStatus] = useState('Pending');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you can handle the order creation logic
        console.log({ customerName, productList, status });

        setCustomerName('');
        setProductList('');
        setStatus('Pending');
        navigate('/admin/orders');
    };

    return (
        <div className="order-add">
            <h2>Add Order</h2>
            <button className="btn_back_list" onClick={() => navigate('/admin/orders')}>
                <FaArrowLeft className="back-arrow" /> Back
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
                <textarea
                    placeholder="Product List"
                    value={productList}
                    onChange={(e) => setProductList(e.target.value)}
                />
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <button type="submit">Add Order</button>
            </form>
        </div>
    );
};

export default AdminOrderAdd;
