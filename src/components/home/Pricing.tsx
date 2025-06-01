import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Zap, Target, Users, Rocket } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';

const Pricing = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const plans = [
    {
      name: "Starter Strategy Call",
      icon: <Target className="text-primary" size={24} />,
      price: {
        inr: "₹4,999",
        usd: "$60"
      },
      duration: "45 minutes",
      description: "Perfect for founders and creators exploring AI potential",
      features: [
        "AI opportunity assessment",
        "Quick-win identification",
        "Tech stack recommendations",
        "Implementation roadmap overview",
        "ROI calculation guidance",
        "Follow-up resource pack"
      ],
      popular: false
    },
    {
      name: "AI Readiness Audit",
      icon: <Users className="text-primary" size={24} />,
      price: {
        inr: "₹9,999",
        usd: "$120"
      },
      duration: "90-minute consultation + PDF",
      description: "For businesses evaluating AI implementation",
      features: [
        "Deep-dive process analysis",
        "AI readiness assessment",
        "Integration opportunity mapping",
        "Detailed PDF report",
        "Risk assessment",
        "3-month action plan",
        "Tool recommendations"
      ],
      popular: true
    },
    {
      name: "Custom AI Roadmap",
      icon: <Zap className="text-primary" size={24} />,
      price: {
        inr: "₹24,999",
        usd: "$299"
      },
      duration: "3-5 hours (2 sessions)",
      description: "Teams ready for 30-60 day implementation",
      features: [
        "Complete workflow analysis",
        "Custom implementation plan",
        "ROI projections",
        "Technical requirements doc",
        "Vendor recommendations",
        "Timeline & milestones",
        "Team training outline",
        "Risk mitigation strategy"
      ],
      popular: false
    },
    {
      name: "Done-With-You AI Sprint",
      icon: <Rocket className="text-primary" size={24} />,
      price: {
        inr: "₹59,999",
        usd: "$699"
      },
      duration: "8-10 hours over 2 weeks",
      description: "Strategic AI implementation projects",
      features: [
        "Hands-on implementation",
        "Custom AI solution setup",
        "Integration support",
        "Team training sessions",
        "Testing & optimization",
        "Documentation & SOPs",
        "30-day support",
        "Quarterly review session"
      ],
      popular: false
    }
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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-white to-primary-100/30">
      <Container>
        <SectionHeading
          title="Simple, Transparent Pricing"
          subtitle="Choose the perfect plan to accelerate your AI journey"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative card flex flex-col ${
                plan.popular ? 'border-2 border-primary shadow-lg' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  {plan.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-primary">{plan.price.inr}</span>
                  <span className="text-gray-500">/ {plan.price.usd}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.duration}</p>
              </div>

              <div className="flex-grow">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={18} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className={`btn w-full text-center ${
                  plan.popular ? 'btn-primary' : 'btn-outline'
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 mb-4">
            Need a custom solution? We've got you covered.
          </p>
          <a href="#contact" className="btn btn-primary inline-flex items-center gap-2">
            Contact Us
            <Zap size={16} />
          </a>
        </motion.div>
      </Container>
    </section>
  );
};

export default Pricing;