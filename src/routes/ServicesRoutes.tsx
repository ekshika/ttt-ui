// src/routes/ServicesRoutes.tsx
import { Route } from 'react-router-dom';
import ChatbotsPage from '../pages/public/ChatbotsPage';
import AgenticWorkflowsPage from '../pages/public/AgenticWorkflowsPage';
import ProcessAutomationPage from '../pages/public/ProcessAutomationPage';
import AiAppsPage from '../pages/public/AiAppsPage';

const ServicesRoutes = () => (
  <>
    <Route path="ai-chatbots" element={<ChatbotsPage />} />
    <Route path="agentic-ai-workflows" element={<AgenticWorkflowsPage />} />
    <Route path="smart-process-automation" element={<ProcessAutomationPage />} />
    <Route path="ai-apps-micro-saas" element={<AiAppsPage />} />
  </>
);

export default ServicesRoutes;
