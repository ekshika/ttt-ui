import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from './ui/Container';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    toast.success("Log out successfull!")
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Home', href: isHomePage ? '#home' : '/' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Services', href: isHomePage ? '#services' : '/#services' },
    { name: 'Tech Stack', href: isHomePage ? '#tech-stack' : '/#tech-stack' },
    { name: 'Why Us', href: isHomePage ? '#why-us' : '/#why-us' },
    { name: 'Pricing', href: isHomePage ? '#pricing' : '/#pricing' },
    { name: 'Contact', href: isHomePage ? '#contact' : '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-50">
            <img src="/logo.svg" alt="Teeny Tech Trek Logo" className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-lg md:text-xl font-display font-semibold text-primary">
              Teeny Tech Trek
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
            <ul className="flex items-center space-x-2 lg:space-x-6 mr-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('#') || link.href.includes('/#') ? (
                    <a
                      href={link.href}
                      className="nav-link px-2 py-2 text-sm lg:text-base whitespace-nowrap"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="nav-link px-2 py-2 text-sm lg:text-base whitespace-nowrap"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {user ? (
              <>
                <span className="text-gray-600 text-sm">Hi, {user.sub}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:underline ml-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm lg:text-base whitespace-nowrap min-w-[120px] text-center text-primary hover:underline"
              >
                Login
              </Link>
            )}

            <a
              href="#contact"
              className="btn btn-primary text-sm lg:text-base whitespace-nowrap min-w-[120px] text-center"
            >
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 z-40 bg-white"
            >
              <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-xl font-medium text-gray-800 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}

                {user ? (
                  <>
                    <span className="text-gray-600">Hi, {user.sub}</span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-600 text-lg hover:underline"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-blue-600 text-lg hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}

                <a
                  href="#contact"
                  className="btn btn-primary mt-4 w-full max-w-[200px] text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
};

export default Navbar;
