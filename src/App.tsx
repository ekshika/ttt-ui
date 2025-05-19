import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import TechStack from './components/TechStack';
import WhyUs from './components/WhyUs';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/ui/Particles';
import ChatbotsPage from './pages/ChatbotsPage';
import AgenticWorkflowsPage from './pages/AgenticWorkflowsPage';
import ProcessAutomationPage from './pages/ProcessAutomationPage';
import AiAppsPage from './pages/AiAppsPage';

// ScrollToTop component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App component
function App() {
  return (
    <Router>
      <div className="relative overflow-hidden">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/ai-chatbots" element={<ChatbotsPage />} />
          <Route path="/services/agentic-ai-workflows" element={<AgenticWorkflowsPage />} />
          <Route path="/services/smart-process-automation" element={<ProcessAutomationPage />} />
          <Route path="/services/ai-apps-micro-saas" element={<AiAppsPage />} />
        </Routes>
        
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

// HomePage component containing all the sections
const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute('id') || '';
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href')?.includes(current)) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      <div className="relative">
        <Particles />
        <Hero />
      </div>
      <About />
      <Services />
      <TechStack />
      <WhyUs />
      <Pricing />
      <Contact />
    </main>
  );
};

export default App