import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import api from '../lib/axios';
import { User, Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (error) {
                // Interceptor handles 401 redirects automatically
                if (error.response?.status !== 401) {
                    console.error("Failed to load user info");
                }
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

    // Double check onboarding status
    if (user && !user.profile?.onboarding_completed) {
        return <Navigate to="/onboarding" replace />;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Desktop Sidebar */}
            <Sidebar user={user} />

            {/* Mobile Sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 flex z-40 md:hidden">
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white z-50">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                type="button"
                                className="ml-1 flex items-center justify-center h-10 w-10 text-white focus:outline-none"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="sr-only">Close sidebar</span>
                                <X className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <Sidebar user={user} isMobile={true} onClose={() => setSidebarOpen(false)} />
                    </div>
                </div>
            )}

            <div className="flex flex-col w-0 flex-1 overflow-hidden">

                {/* Mobile header */}
                <div className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-2">
                    <button
                        type="button"
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="font-bold text-lg text-primary-600">BurnBuddy</div>
                    <div className="w-12"></div> {/* spacer */}
                </div>

                {/* Top Header */}
                <header className="bg-white shadow-sm z-10 hidden md:block">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                                <div className="text-xs text-gray-500 capitalize">{user?.subscription_tier} Plan</div>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex justify-center items-center text-primary-600 border-2 border-primary-200">
                                <User className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
