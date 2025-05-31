import { useEffect } from 'react';
import Particles from '../components/ui/Particles';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import TechStack from '../components/TechStack';
import WhyUs from '../components/WhyUs';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';

const HomePage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - 200 &&
          window.scrollY < sectionTop + sectionHeight - 200
        ) {
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

export default HomePage;