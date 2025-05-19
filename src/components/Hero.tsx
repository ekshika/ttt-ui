import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Container from './ui/Container';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="font-bold mb-6">
              <span className="gradient-text">Small Teams.</span><br />
              <span className="text-gray-800">Big Impact.</span><br />
              <span className="text-primary-light">Powered by AI.</span>
            </h1>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              We build nimble, intelligent AI solutions designed for clarity, speed, and real-world results.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <a href="#services" className="btn btn-primary flex items-center justify-center gap-2 group">
                Explore Our Services
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact" className="btn btn-outline">Get in Touch</a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
                <div className="h-64 bg-gradient-to-br from-primary/10 to-primary-light/30 rounded-lg flex items-center justify-center mb-4">
                  <img 
                    src="/logo.svg" 
                    alt="Teeny Tech Trek AI Visualization" 
                    className="h-32 w-32 animate-float"
                  />
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
                </div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg w-56"
                initial={{ x: 30, y: 30, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="text-sm font-medium mb-2">AI-Powered Solutions</div>
                <div className="h-2 bg-white/30 rounded-full mb-1.5"></div>
                <div className="h-2 bg-white/30 rounded-full w-2/3"></div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -left-6 bg-secondary text-white p-4 rounded-lg shadow-lg w-48"
                initial={{ x: -30, y: -30, opacity: 0 }}
                animate={{ x: 0, y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <div className="text-sm font-medium mb-2">Fast Implementation</div>
                <div className="h-2 bg-white/30 rounded-full mb-1.5"></div>
                <div className="h-2 bg-white/30 rounded-full w-3/4"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;