import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/admin/components/users/AdminUserList.css';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';

interface User {
    id: number;
    username: string;
    email: string;
    role: string;
}

interface AdminUserListProps {
    users: User[];
}

const AdminUserList: React.FC<AdminUserListProps> = ({ users }) => {
    const navigate = useNavigate();

    return (
        <div className="user-list">
            <h2>Users</h2>
            <button onClick={() => navigate('/admin/users/add')} className="btn-add">
                <FaPlus />   Thêm Người Dùng
            </button>
            <table>
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="actions">
                            <button onClick={() => navigate(`/admin/users/edit/${user.id}`)} className="btn-edit">
                                <FaEdit /> Edit
                            </button>
                            <button onClick={() => navigate(`/admin/users/delete/${user.id}`)} className="btn-delete">
                                <FaTrashAlt /> Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUserList;
