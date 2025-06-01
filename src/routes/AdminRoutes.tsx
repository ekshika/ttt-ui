// src/routes/AdminRoutes.tsx
import { Fragment } from 'react';
import { Route } from 'react-router-dom';

import DashboardOverview from '../pages/admin/DashboardOverview';
import BlogManager from '../pages/admin/BlogManager';
import EventsManager from '../pages/admin/EventsManager';
import CareersManager from '../pages/admin/CareersManager';

const AdminRoutes = () => (
  <Fragment>
    <Route index element={<DashboardOverview />} />
    <Route path="blog/*" element={<BlogManager />} />
    <Route path="events/*" element={<EventsManager />} />
    <Route path="careers/*" element={<CareersManager />} />
  </Fragment>
);

export default AdminRoutes;
