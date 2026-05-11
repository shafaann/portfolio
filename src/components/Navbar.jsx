import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'Services', path: '/services' },
  { name: 'Skills', path: '/skills' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'bg-glass-heavy shadow-2xl' : 'bg-transparent'
        }`}
        style={{ boxShadow: scrolled ? `0 25px 50px ${theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.08)'}` : 'none' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="relative z-50 group flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
                  border: '1px solid rgba(6,182,212,0.2)',
                }}>
                <span className="text-sm font-display font-bold text-gradient">SM</span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="magnetic-item relative px-4 py-2 group">
                  <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                    location.pathname === link.path ? 'text-gradient' : ''
                  }`} style={{ color: location.pathname === link.path ? undefined : 'var(--text-secondary)' }}>
                    {link.name}
                  </span>
                  {location.pathname === link.path && (
                    <motion.div layoutId="activeNav"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button whileHover={{ scale: 1.1, rotate: 15 }} whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="magnetic-item w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                aria-label="Toggle theme">
                {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
              </motion.button>
              <Link to="/contact">
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="magnetic-item px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))',
                    border: '1px solid rgba(6,182,212,0.3)',
                    color: 'var(--text-primary)',
                  }}>
                  Let's Talk
                </motion.button>
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-3 md:hidden">
              <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme}
                className="relative z-50 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
              </motion.button>
              <button onClick={() => setIsOpen(!isOpen)} className="relative z-50 w-12 h-12 flex items-center justify-center" aria-label="Toggle menu">
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <motion.span animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                    className="w-full h-[2px] rounded-full origin-center" style={{ backgroundColor: 'var(--text-primary)' }} />
                  <motion.span animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                    className="w-4 h-[2px] rounded-full" style={{ backgroundColor: 'var(--text-primary)' }} />
                  <motion.span animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                    className="w-full h-[2px] rounded-full origin-center" style={{ backgroundColor: 'var(--text-primary)' }} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 backdrop-blur-2xl"
              style={{ backgroundColor: theme === 'dark' ? 'rgba(5,5,5,0.97)' : 'rgba(245,245,245,0.97)' }} />
            <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-2">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }} transition={{ delay: i * 0.08 }}>
                  <Link to={link.path}
                    className={`block text-4xl sm:text-5xl font-display font-bold py-3 transition-all duration-300 ${
                      location.pathname === link.path ? 'text-gradient' : ''
                    }`} style={{ color: location.pathname === link.path ? undefined : 'var(--text-secondary)' }}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="absolute bottom-12">
                <span className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>{personalInfo.email}</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
