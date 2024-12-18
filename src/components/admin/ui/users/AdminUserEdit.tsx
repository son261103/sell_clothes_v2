import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../../styles/admin/components/users/AdminUserEdit.css';

const AdminUserEdit: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get user ID from URL
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');

    useEffect(() => {
        const fetchedUser = {
            id: 1,
            username: 'User1',
            email: 'user1@example.com',
            role: 'Admin',
        };

        if (fetchedUser.id.toString() === id) {
            setUsername(fetchedUser.username);
            setEmail(fetchedUser.email);
            setRole(fetchedUser.role);
        }
    }, [id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ username, email, role });

        navigate('/admin/users'); // Navigate to users list
    };

    return (
        <div className="user-edit">
            <h2>Edit User</h2>
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
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default AdminUserEdit;