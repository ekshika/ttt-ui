import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import AdminDashboard from '../pages/AdminDashboard';
import servicesRoutes from './ServicesRoutes';

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
  const { user, loading } = useAuth();

  if (loading) return null; // Or show a spinner

  const isAuthenticated = !!user;
  const hasRoleAccess = roles.length === 0 || (user && roles.includes(user.role));

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!hasRoleAccess) return <Navigate to="/" replace />;

  return children;
};

export const withAuthGuard = (Component: JSX.Element, roles: string[] = []) => {
  return (
    <ProtectedRoute roles={roles}>
      {Component}
    </ProtectedRoute>
  );
};

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/services/*">{servicesRoutes}</Route>
      <Route path="/admin/*" element={withAuthGuard(<AdminDashboard />, ['admin'])} />
    </Routes>
  </>
);

export default AppRoutes;
