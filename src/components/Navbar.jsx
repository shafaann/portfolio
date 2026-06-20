import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

import { LiquidButton } from './ui/liquid-glass-button';

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
    const handleScroll = () => setScrolled(window.scrollY > 40);
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
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-glass border-b' : 'bg-transparent'
        }`}
        style={{ borderColor: 'var(--border-color)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-lg italic transition-all duration-300"
                style={{ background: 'var(--accent-coral)', color: '#fff' }}>
                S
              </div>
              <span className="font-display font-bold text-lg tracking-tight hidden sm:block"
                style={{ color: 'var(--text-primary)' }}>
                shafan
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.name} to={link.path} className="relative px-4 py-2 group">
                    <span className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive ? 'font-bold' : ''
                    }`} style={{ color: isActive ? 'var(--accent-coral)' : 'var(--text-secondary)' }}>
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div layoutId="activeNav"
                        className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                        style={{ background: 'var(--accent-coral)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="hidden md:flex items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-105"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--bg-surface)' }}
                aria-label="Toggle theme">
                {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>
              <Link to="/contact" className="pointer-events-auto">
                <LiquidButton size="default">
                  Let's Talk
                </LiquidButton>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-3 md:hidden">
              <button onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 flex items-center justify-center" aria-label="Toggle menu">
                <div className="relative w-5 h-4 flex flex-col justify-between">
                  <motion.span animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="w-full h-[2px] rounded-full origin-center" style={{ backgroundColor: 'var(--text-primary)' }} />
                  <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="w-3/4 h-[2px] rounded-full" style={{ backgroundColor: 'var(--text-primary)' }} />
                  <motion.span animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="w-full h-[2px] rounded-full origin-center" style={{ backgroundColor: 'var(--text-primary)' }} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-primary)' }} />
            <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-5 px-6">
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }} transition={{ delay: i * 0.05 }}>
                  <Link to={link.path}
                    className={`block text-3xl font-display font-bold py-2 tracking-tight transition-all duration-300 ${
                      location.pathname === link.path ? 'italic' : ''
                    }`} style={{ color: location.pathname === link.path ? 'var(--accent-coral)' : 'var(--text-primary)' }}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
