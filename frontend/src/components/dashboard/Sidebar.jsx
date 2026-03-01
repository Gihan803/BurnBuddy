import { Link, useLocation } from 'react-router-dom';
import { Home, Utensils, Activity, LineChart, LogOut, Flame, History, ShieldAlert } from 'lucide-react';
import api from '../../lib/axios';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ user, isMobile, onClose }) {
    const location = useLocation();
    const navigate = useNavigate();

    const navigation = [
        { name: 'Overview', href: '/dashboard', icon: Home },
        { name: 'Meals', href: '/dashboard/meals', icon: Utensils },
        { name: 'Workouts', href: '/dashboard/workouts', icon: Activity },
        { name: 'History', href: '/dashboard/history', icon: History },
        { name: 'Progress', href: '/dashboard/progress', icon: LineChart },
    ];

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (e) {
            // ignore
        } finally {
            localStorage.removeItem('auth_token');
            navigate('/login');
        }
    };

    return (
        <div className={`flex flex-col w-64 bg-white border-r border-gray-200 ${isMobile ? 'h-full' : 'hidden md:flex min-h-screen'}`}>
            <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
                <Link to="/dashboard" className="flex items-center gap-2">
                    <Flame className="h-8 w-8 text-primary-600" />
                    <span className="text-xl font-bold text-gray-900">BurnBuddy</span>
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto pt-5 pb-4">
                <nav className="mt-5 px-2 space-y-1">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={onClose}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <item.icon
                                    className={`mr-3 flex-shrink-0 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                                        }`}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        );
                    })}

                    {user?.is_admin && (
                        <>
                            <div className="mt-8 mb-2 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Admin Panel
                            </div>
                            <Link
                                to="/admin/meals"
                                onClick={onClose}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === '/admin/meals'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Utensils
                                    className={`mr-3 flex-shrink-0 h-5 w-5 ${location.pathname === '/admin/meals' ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`}
                                    aria-hidden="true"
                                />
                                Manage Meals
                            </Link>
                            <Link
                                to="/admin/workouts"
                                onClick={onClose}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${location.pathname === '/admin/workouts'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Activity
                                    className={`mr-3 flex-shrink-0 h-5 w-5 ${location.pathname === '/admin/workouts' ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'}`}
                                    aria-hidden="true"
                                />
                                Manage Workouts
                            </Link>
                        </>
                    )}
                </nav>
            </div>

            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <button
                    onClick={handleLogout}
                    className="flex-shrink-0 w-full group block text-left"
                >
                    <div className="flex items-center">
                        <div className="rounded-full bg-danger-100 p-2">
                            <LogOut className="h-5 w-5 text-danger-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                Sign out
                            </p>
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}
