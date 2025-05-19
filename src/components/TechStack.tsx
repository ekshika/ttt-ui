import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

const TechStack = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const technologies = [
    {
      category: "LLMs",
      items: ["GPT-4", "Claude", "Mistral", "Llama"],
      color: "bg-primary-200",
      hoverColor: "hover:bg-primary-300",
      textColor: "text-primary-700",
    },
    {
      category: "Frameworks",
      items: ["LangChain", "CrewAI", "AutoGen"],
      color: "bg-secondary/20",
      hoverColor: "hover:bg-secondary/30",
      textColor: "text-secondary-dark",
    },
    {
      category: "Automation",
      items: ["Zapier", "Make", "Python", "REST APIs"],
      color: "bg-accent/20",
      hoverColor: "hover:bg-accent/30",
      textColor: "text-accent-dark",
    },
    {
      category: "Platforms",
      items: ["Streamlit", "Chainlit", "Gradio"],
      color: "bg-primary-100",
      hoverColor: "hover:bg-primary-200",
      textColor: "text-primary-600",
    },
    {
      category: "Databases",
      items: ["Pinecone", "ChromaDB", "Supabase"],
      color: "bg-gray-200",
      hoverColor: "hover:bg-gray-300",
      textColor: "text-gray-700",
    },
    {
      category: "Deployments",
      items: ["Vercel", "Railway", "Docker", "On-prem"],
      color: "bg-blue-100",
      hoverColor: "hover:bg-blue-200",
      textColor: "text-blue-700",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="tech-stack" className="py-20 bg-gradient-to-b from-white to-primary-100/50">
      <Container>
        <SectionHeading
          title="Our Tech Stack"
          subtitle="We use cutting-edge technologies to build powerful, efficient, and scalable AI solutions."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card"
            >
              <h3 className="text-lg font-semibold mb-4 text-primary">{tech.category}</h3>
              <div className="flex flex-wrap gap-3">
                {tech.items.map((item, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded-lg ${tech.color} ${tech.hoverColor} ${tech.textColor} text-sm font-medium transition-colors duration-300`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 bg-primary p-8 rounded-xl text-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Custom Stack for Your Needs
            </h3>
            <p className="mb-6">
              Beyond our core technologies, we're adaptable and can work with your existing tech stack or recommend the best solutions for your specific needs. Our expertise spans across multiple AI, automation, and development platforms.
            </p>
            <a href="#contact" className="inline-block px-6 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Discuss Your Tech Requirements
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TechStack;