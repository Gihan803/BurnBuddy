import { Navigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useState, useEffect } from 'react';
import api from '../../lib/axios';

export default function AdminRoute({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                // Interceptor handles 401
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (!user || !user.is_admin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <DashboardLayout>{children}</DashboardLayout>;
}
