import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowUp, FaGithub, FaLinkedin } from 'react-icons/fa';
import { personalInfo } from '../data/portfolio';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'Skills', path: '/skills' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden mt-24" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h4 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              shafan<span className="text-sm font-sans font-normal opacity-40 ml-1">/portfolio</span>
            </h4>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              A collection of data-driven projects, analytical systems, and creative interfaces demonstrating strategic decision making.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wider mb-5" style={{ color: 'var(--text-secondary)' }}>Navigation</h5>
            <div className="grid grid-cols-2 gap-y-3">
              {footerLinks.map((link) => (
                <Link key={link.name} to={link.path}
                  className="text-sm transition-colors hover:underline flex items-center gap-1.5"
                  style={{ color: 'var(--text-secondary)' }}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-5">
            <h5 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Connect</h5>
            <div className="flex gap-3">
              <a href="https://github.com/shafaann" target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}>
                <FaGithub size={18} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}>
                <FaLinkedin size={18} />
              </a>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{personalInfo.email}</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {currentYear} Shafan Manaz. All rights reserved.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300"
            style={{ borderColor: 'var(--border-color)', color: 'var(--accent-coral)', background: 'var(--bg-elevated)' }}
            aria-label="Scroll to top">
            <FaArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
