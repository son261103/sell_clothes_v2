import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import AdminOrderList from '../../components/admin/ui/orders/AdminOrderList';
import AdminOrderAdd from '../../components/admin/ui/orders/AdminOrderAdd';
import AdminOrderEdit from '../../components/admin/ui/orders/AdminOrderEdit';
import AdminOrderItemList from '../../components/admin/ui/orders/AdminOrderItemList';
// import AdminOrderItemAdd from '../../components/admin/ui/orders/AdminOrderItemAdd';
// import AdminOrderItemEdit from '../../components/admin/ui/orders/AdminOrderItemEdit';
import '../../styles/admin/global.css';

const AdminOrderPage: React.FC = () => {
    return (
        <div className="admin-order-page">
            <Routes>
                <Route index element={<AdminOrderList />} />
                <Route path="add" element={<AdminOrderAdd />} />
                <Route path="edit/:id" element={<AdminOrderEdit />} />
                <Route path=":orderId/items" element={<OrderItemListWrapper />} />
                {/*<Route path=":orderId/items/add" element={<AdminOrderItemAdd />} />*/}
                {/*<Route path=":orderId/items/:productId" element={<AdminOrderItemEdit />} />*/}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </div>
    );
};

// Wrapper component to pass orderId to AdminOrderItemList
const OrderItemListWrapper: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    return <AdminOrderItemList orderId={Number(orderId)} />;
};

export default AdminOrderPage;