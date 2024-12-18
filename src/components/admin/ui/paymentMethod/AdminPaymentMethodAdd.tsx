import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/admin/components/paymenMethod/AdminPaymentMethodAdd.css';
import usePaymentMethod from '../../../../hooks/usePaymentMethod';
import { CreatePaymentMethodRequest } from '../../../../types/payment.method.types';

const AdminPaymentMethodAdd: React.FC = () => {
    const navigate = useNavigate();
    const {
        createNewPaymentMethod,
        loading,
        error
    } = usePaymentMethod();

    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newPaymentMethod: CreatePaymentMethodRequest = {
            methodName: name,
        };

        try {
            await createNewPaymentMethod(newPaymentMethod); // Create payment method

            setName('');
            navigate('/admin/methods/payment'); // Navigate back to the payment method list after successful creation
        } catch (err) {
            console.error('Failed to add payment method:', err);
        }
    };

    return (
        <div className="payment-method-add">
            <div className="header-actions">
                <h2>Add Payment Method</h2>
                <button className="btn_back_list" onClick={() => navigate('/admin/methods/payment')}>
                    <FaArrowLeft className="back-arrow"/> Back
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}

                <input
                    type="text"
                    placeholder="Payment Method Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Add Payment Method'}
                    </button>
                </form>
            </div>
            );
            };

            export default AdminPaymentMethodAdd;
