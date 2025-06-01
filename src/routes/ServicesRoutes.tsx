import { Route } from 'react-router-dom';
import ChatbotsPage from '../pages/ChatbotsPage';
import AgenticWorkflowsPage from '../pages/AgenticWorkflowsPage';
import ProcessAutomationPage from '../pages/ProcessAutomationPage';
import AiAppsPage from '../pages/AiAppsPage';

const servicesRoutes = [
  <Route path="ai-chatbots" element={<ChatbotsPage />} key="ai-chatbots" />,
  <Route path="agentic-ai-workflows" element={<AgenticWorkflowsPage />} key="agentic-ai-workflows" />,
  <Route path="smart-process-automation" element={<ProcessAutomationPage />} key="smart-process-automation" />,
  <Route path="ai-apps-micro-saas" element={<AiAppsPage />} key="ai-apps-micro-saas" />,
];

export default servicesRoutes;
