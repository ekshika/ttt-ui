// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

import HomePage from '../pages/public/HomePage';
import AuthPage from '../pages/public/AuthPage';
import AdminDashboard from '../pages/admin/AdminDashboard';

import ServicesRoutes from './ServicesRoutes';
import AdminRoutes from './AdminRoutes';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({
  children,
  roles = [],
}: {
  children: JSX.Element;
  roles?: string[];
}) => {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const hasRoleAccess = roles.length === 0 || (user && roles.includes(user.role));

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRoleAccess) return <Navigate to="/" replace />;

  return children;
};

export const withAuthGuard = (Component: JSX.Element, roles: string[] = []) => {
  return <ProtectedRoute roles={roles}>{Component}</ProtectedRoute>;
};

const AppRoutes = () => (
  <>
    <ScrollToTop />

    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />

      {/* All /services/* routes are delegated to ServicesRoutes */}
      <Route path="/services/*">{ServicesRoutes()}</Route>

      {/* Admin routes (protected) */}
      <Route path="/admin/*" element={withAuthGuard(<AdminDashboard />, ['admin'])}>
      {AdminRoutes()}
      </Route>
    </Routes>
  </>
);

export default AppRoutes;
