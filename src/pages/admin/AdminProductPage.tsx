import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminProductList from "../../components/admin/ui/products/AdminProductList.tsx";
import AdminProductAdd from "../../components/admin/ui/products/AdminProductAdd.tsx";
import AdminProductEdit from "../../components/admin/ui/products/AdminProductEdit.tsx";
import '../../styles/admin/global.css' ;

const AdminProductPage: React.FC = () => {

    return (
        <div className="admin-product-page">
            <Routes>
                <Route
                    index
                    element={<AdminProductList />}
                />
                <Route
                    path="add"
                    element={<AdminProductAdd />}
                />
                <Route
                    path="edit/:id"
                    element={<AdminProductEdit />}
                />
            </Routes>
        </div>
    );
};

export default AdminProductPage;
