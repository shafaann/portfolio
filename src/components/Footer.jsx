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
    { name: 'Admin', path: '/admin' },
  ];
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden mt-24" style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)' }}>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Editorial layout: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Col 1: Name & Brand imprint */}
          <div className="space-y-4">
            <h4 className="text-xl font-display font-bold">
              shafan<span className="text-xs font-mono font-normal opacity-50 ml-1">/portfolio</span>
            </h4>
            <p className="text-xs leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              A collection of digital artifacts, analytical reports, and interactive tools demonstrating the alignment of raw data with strategic decision frameworks.
            </p>
          </div>

          {/* Col 2: Navigation index */}
          <div>
            <h5 className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>// INDEX</h5>
            <div className="grid grid-cols-2 gap-y-2.5">
              {footerLinks.map((link) => (
                <Link key={link.name} to={link.path}
                  className="text-xs font-mono hover:text-gradient transition-colors flex items-center gap-1.5"
                  style={{ color: 'var(--text-secondary)' }}>
                  <span>→</span> {link.name.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Coordinates / Socials */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--text-secondary)' }}>// COORDINATES</h5>
            <div className="flex gap-3">
              <a href="https://github.com/shafaann" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors hover:bg-elevated"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                <FaGithub size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors hover:bg-elevated"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                <FaLinkedin size={14} />
              </a>
            </div>
            <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{personalInfo.email}</p>
          </div>
        </div>

        {/* Bottom imprint line */}
        <div className="pt-8 flex items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
            © {currentYear} SHAFAN MANAZ. TYPESET IN PLAYFAIR & OUTFIT.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            onClick={scrollToTop}
            className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all duration-300 hover:bg-elevated"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            aria-label="Scroll to top">
            <FaArrowUp size={10} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
