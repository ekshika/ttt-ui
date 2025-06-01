import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import { createContact } from '../../services/contactService';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      await createContact({
        name: formData.name,
        email: formData.email,
        country_code: '', // empty for now
        phone_number: '', // empty for now
        message: formData.message,
        subject: formData.service,
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', service: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
      toast.success('Message sent!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: "Email",
      value: "hello@teenytechtrek.com",
    },
    {
      icon: <Phone size={20} />,
      title: "Phone",
      value: "+1 (555) 123-4567",
    },
    {
      icon: <MapPin size={20} />,
      title: "Location",
      value: "San Francisco, CA",
    },
  ];

  const services = [
    "AI-Powered Chatbots",
    "Agentic AI Workflows",
    "Smart Process Automation",
    "AI Apps & Micro-SaaS Tools",
    "Other / Consulting",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-20 bg-primary-100">
      <Container>
        <SectionHeading
          title="Get in Touch"
          subtitle="Ready to harness the power of AI for your business? Let's chat about your project."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-12"
        >
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white p-8 rounded-xl shadow-md h-full">
              <h3 className="text-xl font-semibold mb-6 text-primary">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-primary-100 rounded-full shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.title}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-lg font-medium mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {['Twitter', 'LinkedIn', 'GitHub'].map((platform, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-10 h-10 flex items-center justify-center bg-primary-100 rounded-full hover:bg-primary/10 transition-colors duration-300"
                    >
                      {platform[0]}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-primary">Send us a Message</h3>
              
              {isSubmitted ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Success!</strong>
                  <span className="block sm:inline"> Your message has been sent. We'll get back to you soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="" disabled>Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary min-h-[120px]"
                      placeholder="Tell us about your project or needs..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn btn-primary w-full flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Contact;