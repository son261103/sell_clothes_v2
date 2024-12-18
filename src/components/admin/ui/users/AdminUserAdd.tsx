import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/admin/components/users/AdminUserAdd.css';

const AdminUserAdd: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ username, email, role });

        setUsername('');
        setEmail('');
        setRole('User');
        navigate('/admin/users');
    };

    return (
        <div className="user-add">
            <h2>Add User</h2>
            <button className="btn_back_list" onClick={() => navigate('/admin/users')}>
                <FaArrowLeft className="back-arrow" /> Back
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
};

export default AdminUserAdd;
