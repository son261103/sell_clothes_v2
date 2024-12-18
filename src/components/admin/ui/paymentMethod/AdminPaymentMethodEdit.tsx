import React, {useState, useEffect} from 'react';
import {FaArrowLeft} from 'react-icons/fa';
import {useNavigate, useParams} from 'react-router-dom';
import '../../../../styles/admin/components/paymenMethod/AdminPaymentMethodEdit.css';
import usePaymentMethod from '../../../../hooks/usePaymentMethod'; // Assuming you have this hook
import {UpdatePaymentMethodRequest} from '../../../../types/payment.method.types';

const AdminPaymentMethodEdit: React.FC = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const paymentMethodId = id ? parseInt(id) : null;

    // Assuming the hook for managing payment methods exists
    const {
        selectedPaymentMethod,
        getPaymentMethodById,
        updateExistingPaymentMethod,
        loading,
        error,
    } = usePaymentMethod();

    const [name, setName] = useState('');

    // Fetch payment method data when component mounts
    useEffect(() => {
        const loadPaymentMethod = async () => {
            if (paymentMethodId) {
                try {
                    await getPaymentMethodById(paymentMethodId);
                } catch (err) {
                    console.error('Failed to load payment method:', err);
                }
            }
        };

        loadPaymentMethod();
    }, [paymentMethodId, getPaymentMethodById]);

    // Update form when selected payment method changes
    useEffect(() => {
        if (selectedPaymentMethod) {
            setName(selectedPaymentMethod.methodName);
        }
    }, [selectedPaymentMethod]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!paymentMethodId) {
            console.error('Payment Method ID is required');
            return;
        }

        const updateRequest: UpdatePaymentMethodRequest = {
            methodName: name,
        };

        try {
            await updateExistingPaymentMethod(paymentMethodId, updateRequest);
            navigate('/admin/methods/payment'); // Navigate back after successful update
        } catch (err) {
            console.error('Failed to update payment method:', err);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!selectedPaymentMethod && !loading) {
        return <div>Payment method not found</div>;
    }

    return (
        <div className="payment-method-edit">
            <div className="header-actions">
                <h2>Edit Payment Method</h2>
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
                    {loading ? 'Saving...' : 'Update Payment Method'}
                </button>
            </form>
        </div>
    );
};

export default AdminPaymentMethodEdit;
