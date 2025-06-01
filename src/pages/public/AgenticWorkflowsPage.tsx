import { motion } from 'framer-motion';
import ServiceDetail from '../../components/home/ServiceDetail';
import Container from '../../components/ui/Container';
import { Puzzle } from 'lucide-react';

const AgenticWorkflowsPage = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-primary-50 to-white pt-32 pb-16">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Puzzle size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Agentic AI Workflows</h1>
            <p className="text-xl text-gray-600">
              Harness the power of autonomous AI agents that work together to solve complex problems, 
              retrieve data, make decisions, and complete multi-step tasks with minimal human supervision.
            </p>
          </motion.div>
        </Container>
      </section>
      
      <ServiceDetail serviceId="agentic-ai-workflows" />
    </>
  );
};

export default AgenticWorkflowsPage;