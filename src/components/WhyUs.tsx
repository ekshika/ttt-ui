import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Zap, Target, Users, Shield } from 'lucide-react';
import Container from './ui/Container';
import SectionHeading from './ui/SectionHeading';

const WhyUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reasons = [
    {
      icon: <Zap size={24} className="text-primary" />,
      title: "Speed with intention",
      description: "MVPs and workflows delivered fast, but with thoughtful planning and execution.",
    },
    {
      icon: <Target size={24} className="text-primary" />,
      title: "Clarity over complexity",
      description: "No black boxes, just clean, understandable systems that make sense for your business.",
    },
    {
      icon: <Users size={24} className="text-primary" />,
      title: "True collaboration",
      description: "We integrate like a teammate, not a vendor, focusing on your goals and processes.",
    },
    {
      icon: <Shield size={24} className="text-primary" />,
      title: "Innovation at the edge",
      description: "Every solution is custom-crafted and future-ready using the latest AI advancements.",
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
    <section id="why-us" className="py-20">
      <Container>
        <SectionHeading
          title="Why Teeny Tech Trek?"
          subtitle="Because we don't just build tech — we build momentum."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card flex items-start gap-4"
            >
              <div className="w-10 h-10 flex items-center justify-center bg-primary-100 rounded-full shrink-0 mt-1">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 relative overflow-hidden rounded-xl bg-white shadow-xl"
        >
          <div className="p-8 md:p-12 relative z-10">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <img src="/logo.svg" alt="Teeny Tech Trek Logo" className="w-10 h-10" />
                </div>
              </div>
              
              <blockquote className="text-xl md:text-2xl text-center text-gray-700 italic mb-6">
                "We believe that lean teams can move mountains when empowered by the right tools. That's why we build nimble, intelligent AI solutions designed for clarity, speed, and real-world results."
              </blockquote>
              
              <div className="text-center">
                <p className="font-medium text-primary">The Teeny Tech Trek Team</p>
                <p className="text-sm text-gray-500">Building small. Launching fast. Scaling smart.</p>
              </div>
            </div>
          </div>
          
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-100/40 to-transparent opacity-60"></div>
          <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-primary-200 rounded-full opacity-20"></div>
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary-200 rounded-full opacity-20"></div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyUs;