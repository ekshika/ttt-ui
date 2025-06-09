import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const technologies = [
    {
      category: 'LLMs',
      items: ['GPT-4', 'Claude', 'Mistral', 'Llama'],
      color: 'bg-primary-200',
      hoverColor: 'hover:bg-primary-300',
      textColor: 'text-primary-700',
    },
    {
      category: 'Frameworks',
      items: ['LangChain', 'CrewAI', 'AutoGen'],
      color: 'bg-secondary/20',
      hoverColor: 'hover:bg-secondary/30',
      textColor: 'text-secondary-dark',
    },
    {
      category: 'Automation',
      items: ['Zapier', 'Make', 'Python', 'REST APIs'],
      color: 'bg-accent/20',
      hoverColor: 'hover:bg-accent/30',
      textColor: 'text-accent-dark',
    },
    {
      category: 'Platforms',
      items: ['Streamlit', 'Chainlit', 'Gradio'],
      color: 'bg-primary-100',
      hoverColor: 'hover:bg-primary-200',
      textColor: 'text-primary-600',
    },
    {
      category: 'Databases',
      items: ['Pinecone', 'ChromaDB', 'Supabase'],
      color: 'bg-gray-200',
      hoverColor: 'hover:bg-gray-300',
      textColor: 'text-gray-700',
    },
    {
      category: 'Deployments',
      items: ['Vercel', 'Railway', 'Docker', 'On-prem'],
      color: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
      textColor: 'text-blue-700',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.8 } },
  };

  return (
    <section id="tech-stack" className="py-24 bg-gradient-to-b from-white to-primary-100/50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[size:40px_40px] opacity-20" />

      <Container className="relative z-10">
        <SectionHeading
          title="Our Tech Stack"
          subtitle="Leveraging cutting-edge tools to deliver powerful, scalable AI solutions tailored to your needs."
        
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-5 text-primary tracking-tight">
                {tech.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tech.items.map((item, i) => (
                  <div
                    key={i}
                    className={`px-4 py-2 rounded-full ${tech.color} ${tech.hoverColor} ${tech.textColor} text-sm font-medium transition-all duration-300 transform hover:scale-105 cursor-default`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 bg-primary p-8 rounded-2xl text-white shadow-lg"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4 tracking-tight">
              Tailored Tech Solutions
            </h3>
            <p className="text-primary-100 text-sm leading-relaxed mb-6">
              Our expertise extends beyond our core stack. We adapt to your existing technologies or recommend the best tools to meet your unique project requirements.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Discuss Your Project
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TechStack;