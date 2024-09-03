import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminSection = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await axios.get('/api/admin-requests');
                setAdmins(response.data.admins);
            } catch (error) {
                console.error('Failed to fetch admins:', error);
                alert('Failed to load admin data.');
            }
        };

        fetchAdmins();
    }, []);

    const handleUpdateStatus = async (adminId, newStatus) => {
        try {
            const response = await axios.post('/api/update-admin-status', {
                adminId,
                status: newStatus
            });
            alert('Admin status updated successfully!');
            setAdmins(admins.map(admin => admin._id === adminId ? { ...admin, adminRequested: newStatus } : admin));
        } catch (error) {
            console.error('Failed to update admin status:', error);
            alert('Error updating admin status.');
        }
    };

    return (
        <div className="mt-6 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
            <div>
                <div className="text-xl font-medium text-black">Admin Tools</div>
                <p className="text-gray-500">
                    View Admin Panel: <a href="/admin">Admin</a>
                </p>
                {admins?.map((admin) => (
                    <div key={admin._id}>
                        <p>{admin.email} - Requested: {admin.adminRequested}</p>
                        <button onClick={() => handleUpdateStatus(admin._id, 'CONFIRMED')}>Confirm</button>
                        <button onClick={() => handleUpdateStatus(admin._id, 'NO')}>Deny</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSection;
