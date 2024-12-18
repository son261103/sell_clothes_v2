import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminUserList from '../../components/admin/ui/users/AdminUserList';
import AdminUserAdd from '../../components/admin/ui/users/AdminUserAdd';
import AdminUserEdit from '../../components/admin/ui/users/AdminUserEdit';
import '../../styles/admin/global.css' ;

const AdminUserPage: React.FC = () => {
    const users = [
        { id: 1, username: 'JohnDoe', email: 'john@example.com', role: 'User' },
        { id: 2, username: 'JaneAdmin', email: 'jane@example.com', role: 'Admin' },
        { id: 3, username: 'SamUser', email: 'sam@example.com', role: 'User' },
    ];

    return (
        <div className="admin-user-page">
            <Routes>
                <Route
                    index
                    element={<AdminUserList users={users} />}
                />
                <Route
                    path="add"
                    element={<AdminUserAdd />}
                />
                <Route
                    path="edit/:id"
                    element={<AdminUserEdit />}
                />
            </Routes>
        </div>
    );
};

export default AdminUserPage;
