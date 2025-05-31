// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import ChatbotsPage from '../pages/ChatbotsPage';
import AgenticWorkflowsPage from '../pages/AgenticWorkflowsPage';
import ProcessAutomationPage from '../pages/ProcessAutomationPage';
import AiAppsPage from '../pages/AiAppsPage';
import AdminDashboard from '../pages/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ProtectedRoute = ({ children, roles = [] }: { children: JSX.Element; roles?: string[] }) => {
  const { user } = useAuth();
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
      <Route path="/services/ai-chatbots" element={<ChatbotsPage />} />
      <Route path="/services/agentic-ai-workflows" element={<AgenticWorkflowsPage />} />
      <Route path="/services/smart-process-automation" element={<ProcessAutomationPage />} />
      <Route path="/services/ai-apps-micro-saas" element={<AiAppsPage />} />
      <Route path="/admin/*" element={withAuthGuard(<AdminDashboard />, ['admin'])} />
    </Routes>
  </>
);

export default AppRoutes;
