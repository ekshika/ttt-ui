// src/routes/AppRoutes.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { withAuthGuard } from './RouteGuards';

import HomePage from '../pages/public/HomePage';
import AuthPage from '../pages/public/AuthPage';
import AdminDashboard from '../pages/admin/AdminDashboard';

import ServicesRoutes from './ServicesRoutes';
import AdminRoutes from './AdminRoutes';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll to top if there is NO hash; otherwise let HashLink handle anchor scrolling
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
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
