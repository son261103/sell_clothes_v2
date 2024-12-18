import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminCategoryList from "../../components/admin/ui/categories/AdminCategoryList.tsx";
import AdminCategoryAdd from "../../components/admin/ui/categories/AdminCategoryAdd.tsx";
import AdminCategoryEdit from "../../components/admin/ui/categories/AdminCategoryEdit.tsx";
import '../../styles/admin/global.css' ;

const AdminCategoryPage: React.FC = () => {
    return (
        <div className="admin-category-page">
            <Routes>
                <Route
                    index
                    element={<AdminCategoryList  />}
                />
                <Route
                    path="add"
                    element={<AdminCategoryAdd />}
                />
                <Route
                    path="edit/:id"
                    element={<AdminCategoryEdit />}
                />
            </Routes>
        </div>
    );
};

export default AdminCategoryPage;
