import React from "react";
import {Route, Routes} from "react-router-dom";
import AdminPaymentMethodAdd from "../../components/admin/ui/paymentMethod/AdminPaymentMethodAdd";
import AdminPaymentMethodList from "../../components/admin/ui/paymentMethod/AdminPaymentMethodList";
import AdminPaymentMethodEdit from "../../components/admin/ui/paymentMethod/AdminPaymentMethodEdit";
import '../../styles/admin/global.css' ;


const AdminPaymentMethodPage: React.FC = () => {
    return (
        <div className="admin-payment-method-page">
            <Routes>
                <Route
                    index
                    element={<AdminPaymentMethodList/>}
                />
                <Route
                    path="add"
                    element={<AdminPaymentMethodAdd/>}
                />
                <Route
                    path="edit/:id"
                    element={<AdminPaymentMethodEdit/>}
                />
            </Routes>
        </div>
    );
};

export default AdminPaymentMethodPage;
