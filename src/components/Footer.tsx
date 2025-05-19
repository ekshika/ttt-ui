import { ArrowUp } from 'lucide-react';
import Container from './ui/Container';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img src="/logo.svg" alt="Teeny Tech Trek Logo" className="w-8 h-8 bg-white p-1 rounded-md" />
              <span className="text-xl font-display font-semibold">Teeny Tech Trek</span>
            </div>
            <p className="text-white/80 mb-4">
              Small Teams. Big Impact. Powered by AI.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((platform, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300"
                >
                  {platform[0]}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                'AI-Powered Chatbots',
                'Agentic AI Workflows',
                'Smart Process Automation',
                'Lightweight AI Apps',
                'AI Consulting'
              ].map((service, index) => (
                <li key={index}>
                  <a href="#services" className="text-white/80 hover:text-white transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Services', href: '#services' },
                { name: 'Tech Stack', href: '#tech-stack' },
                { name: 'Why Us', href: '#why-us' },
                { name: 'Contact', href: '#contact' },
              ].map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-white/80 hover:text-white transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <span className="text-white/80">Email:</span>
                <a href="mailto:hello@teenytechtrek.com" className="text-white hover:underline">
                  hello@teenytechtrek.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/80">Phone:</span>
                <a href="tel:+15551234567" className="text-white hover:underline">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-white/80">Address:</span>
                <span className="text-white">San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/70 text-sm text-center md:text-left">
            © {new Date().getFullYear()} Teeny Tech Trek. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/70">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;