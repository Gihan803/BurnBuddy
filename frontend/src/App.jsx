import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/public/HomePage';
import ContactPage from './pages/public/ContactPage';
import BlogPage from './pages/public/BlogPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import OnboardingPage from './pages/auth/OnboardingPage';

import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/dashboard/OverviewPage';
import MealsPage from './pages/dashboard/MealsPage';
import WorkoutsPage from './pages/dashboard/WorkoutsPage';
import ProgressPage from './pages/dashboard/ProgressPage';
import HistoryPage from './pages/dashboard/HistoryPage';

import AdminRoute from './components/admin/AdminRoute';
import AdminMealsPage from './pages/admin/AdminMealsPage';
import AdminWorkoutsPage from './pages/admin/AdminWorkoutsPage';
import { useEffect, useState } from 'react';
import api from './lib/axios';

// ... other imports ...

// Protected Route Wrapper
const ProtectedRoute = ({ children, useLayout = true }) => {
  const token = localStorage.getItem('auth_token');
  if (!token) return <Navigate to="/login" replace />;

  if (useLayout) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          const response = await api.get('/user');
          setUser(response.data);
        }
      } catch (error) {
        // App ignores errors; interceptor handles 401s
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/onboarding" element={<ProtectedRoute useLayout={false}><OnboardingPage /></ProtectedRoute>} />

        {/* Secure Dashboard Routes - All use DashboardLayout via ProtectedRoute default */}
        <Route path="/admin/meals" element={<AdminRoute><AdminMealsPage /></AdminRoute>} />
        <Route path="/admin/workouts" element={<AdminRoute><AdminWorkoutsPage /></AdminRoute>} />

        <Route path="/dashboard" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
        <Route path="/dashboard/meals" element={<ProtectedRoute><MealsPage /></ProtectedRoute>} />
        <Route path="/dashboard/workouts" element={<ProtectedRoute><WorkoutsPage /></ProtectedRoute>} />
        <Route path="/dashboard/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="/dashboard/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />

        {/* Fallback Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
