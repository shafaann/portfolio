import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowUp } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolio';

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
    <footer className="relative overflow-hidden">
      <div className="section-divider" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-8">
        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-20">
          <h3 className="text-4xl md:text-6xl font-display font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Let's work <span className="text-gradient">together</span>
          </h3>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind? I'm always open to new opportunities.
          </p>
          <Link to="/contact">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              className="px-10 py-4 rounded-full text-base font-semibold transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}>
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h4 className="text-2xl font-display font-bold text-gradient mb-4">
              {personalInfo.name.split(' ')[0]}<span style={{ color: 'var(--text-muted)' }}>.</span>
            </h4>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              {personalInfo.bio.substring(0, 130)}...
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-5 text-sm tracking-wider uppercase" style={{ color: 'var(--text-primary)' }}>Navigation</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {footerLinks.map((link) => (
                <Link key={link.name} to={link.path}
                  className="text-sm transition-colors duration-300 flex items-center gap-2 group"
                  style={{ color: 'var(--text-muted)' }}>
                  <span className="w-0 h-[1px] group-hover:w-3 transition-all duration-300" style={{ backgroundColor: 'var(--accent-cyan)' }} />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-5 text-sm tracking-wider uppercase" style={{ color: 'var(--text-primary)' }}>Connect</h4>
            <div className="flex gap-3 mb-5">
              {socialLinks.map((social) => (
                <motion.a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="magnetic-item w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
            <p className="text-sm font-mono" style={{ color: 'var(--text-muted)' }}>{personalInfo.email}</p>
            <p className="text-sm font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{personalInfo.phone}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <p className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <motion.button whileHover={{ scale: 1.1 }} onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            <FaArrowUp size={12} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
