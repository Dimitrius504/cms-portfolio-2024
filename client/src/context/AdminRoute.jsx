import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext.js';

const AdminRoute = ({ children }) => {
    const { user, loading } = useUser();
    console.log('User in AdminRoute:', user);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user || user?.user?.adminRequested !== 'CONFIRMED') {
        console.log('Redirecting to sign-in because user is not confirmed admin.');
        return <Navigate to="/signin" replace />;
    }
    return children;
};

export default AdminRoute;
