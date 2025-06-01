import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../../../data/services';
import Container from '../../../components/ui/Container';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServiceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.slug === slug);
  
  // Handle case where service is not found
  if (!service) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">Service not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 inline-flex items-center gap-2 text-primary font-medium"
          >
            <ArrowLeft size={16} />
            Back to Services
          </button>
        </div>
      </Container>
    );
  }

  return (
    <section className="py-20">
      <Container>
        <div className="mb-8">
          <Link 
            to="/"
            className="mt-4 inline-flex items-center gap-2 text-primary font-medium"
          >
            <ArrowLeft size={16} />
            Back to Services
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center">
            {service.icon}
          </div>
          
          <h1 className="text-4xl font-bold mb-6">{service.title}</h1>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-600">{service.description}</p>
            
            <h2 className="text-2xl font-semibold mt-12 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary"></div>
                  <div>
                    <h3 className="font-medium text-lg">{feature}</h3>
                    <p className="text-gray-600">{service.featureDescriptions?.[i] || 'Detailed description coming soon.'}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {service.detailedContent && (
              <div dangerouslySetInnerHTML={{ __html: service.detailedContent }} />
            )}
            
            {service.caseStudies && service.caseStudies.length > 0 && (
              <>
                <h2 className="text-2xl font-semibold mt-12 mb-6">Case Studies</h2>
                <div className="grid grid-cols-1 gap-8">
                  {service.caseStudies.map((study, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                      <h3 className="text-xl font-semibold mb-3">{study.title}</h3>
                      <p className="text-gray-600 mb-4">{study.description}</p>
                      <div className="text-primary font-medium">Read more →</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
            <p className="text-gray-600 mb-6">Let's discuss how this service can help your business.</p>
            <Link to="/contact" className="btn btn-primary inline-flex items-center gap-2">
              Contact Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}