import { useEffect } from 'react';
import Particles from '../../components/ui/Particles';
import Hero from '../../components/home/Hero';
import About from '../../components/home/About';
import Services from '../../components/home/ServicesList';
import TechStack from '../../components/home/TechStack';
import WhyUs from '../../components/home/WhyUs';
import Pricing from '../../components/home/Pricing';
import Contact from '../../components/home/Contact';

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