import React, { useEffect } from 'react';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import usePaymentMethod from '../../../../hooks/usePaymentMethod';
import '../../../../styles/admin/components/paymenMethod/AdminPaymentMethodList.css';
import {PaymentMethodsDTO} from "../../../../types/payment.method.types.tsx";

const AdminPaymentMethodList: React.FC = () => {
    const navigate = useNavigate();
    const {
        paymentMethods,
        getAllPaymentMethods,
        removePaymentMethod,
        error,
        loading
    } = usePaymentMethod();

    // Handling loading and error states
    useEffect(() => {
        const loadPaymentMethods = async () => {
            try {
                await getAllPaymentMethods(); // Fetch all payment methods from the API
            } catch (err) {
                console.error('Failed to load payment methods:', err);
            }
        };

        loadPaymentMethods();
    }, [getAllPaymentMethods]);

    const handleAddPaymentMethod = () => {
        navigate('/admin/methods/payment/add');
    };

    const handleEditPaymentMethod = (id: number) => {
        navigate(`/admin/methods/payment/edit/${id}`);
    };

    const handleDeletePaymentMethod = async (paymentMethod: PaymentMethodsDTO) => {
        if (!paymentMethod.paymentMethodId) {
            console.error('Cannot delete payment method without an ID');
            return;
        }

        const confirmDelete = window.confirm(`Are you sure you want to delete the payment method "${paymentMethod.methodName}"?`);
        if (confirmDelete) {
            try {
                await removePaymentMethod(paymentMethod.paymentMethodId);
                await getAllPaymentMethods(); // Refetch payment methods after deletion
            } catch (err) {
                console.error('Failed to delete payment method:', err);
            }
        }
    };

    // Render loading or error state if needed
    if (loading) {
        return <div>Loading payment methods...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    // Ensure paymentMethods is a valid array before rendering
    const validPaymentMethods = Array.isArray(paymentMethods) ? paymentMethods : [];

    return (
        <div className="payment-method-list">
            <h2>Payment Method List</h2>
            <button onClick={handleAddPaymentMethod} className="btn-add">
                <FaPlus /> Add Payment Method
            </button>
            {validPaymentMethods.length === 0 ? (
                <p>No payment methods found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Payment Method Name</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {validPaymentMethods.map((paymentMethod) => (
                        <tr key={paymentMethod.paymentMethodId}>
                            <td>#{paymentMethod.paymentMethodId ?? 'N/A'}</td>
                            <td>{paymentMethod.methodName}</td>
                            <td>{paymentMethod.createdAt}</td>
                            <td>{paymentMethod.updatedAt}</td>
                            <td className="actions">
                                <button
                                    onClick={() => paymentMethod.paymentMethodId && handleEditPaymentMethod(paymentMethod.paymentMethodId)}
                                    className="btn-edit"
                                    disabled={!paymentMethod.paymentMethodId}
                                >
                                    <FaEdit /> Edit
                                </button>
                                <button
                                    onClick={() => handleDeletePaymentMethod(paymentMethod)}
                                    className="btn-delete"
                                >
                                    <FaTrashAlt /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminPaymentMethodList;
