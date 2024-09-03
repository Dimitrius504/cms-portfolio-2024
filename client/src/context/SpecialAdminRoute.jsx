import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext.js';

const SpecialAdminRoute = ({ children }) => {
    const { user } = useUser();
    const authorizedEmail = 'dimitriusmckinnon419@gmail.com'

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user !== null) {
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user || user?.user?.email !== authorizedEmail) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default SpecialAdminRoute;
