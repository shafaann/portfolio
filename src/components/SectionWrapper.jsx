import { motion } from 'framer-motion';

export default function SectionWrapper({ children, id, className = '', noPadding = false }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative ${noPadding ? '' : 'py-24 md:py-32 px-6 lg:px-8'} ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </motion.section>
  );
}

export function SectionHeader({ label, title, description, align = 'center' }) {
  return (
    <div className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : ''}`}>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-flex items-center gap-2 mb-4">
        <span className="w-8 h-[1px]" style={{ background: 'linear-gradient(to right, transparent, var(--accent-cyan))' }} />
        <span className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--accent-cyan)' }}>{label}</span>
        <span className="w-8 h-[1px]" style={{ background: 'linear-gradient(to left, transparent, var(--accent-cyan))' }} />
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
        {title}
      </motion.h2>
      {description && (
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`text-lg max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}
          style={{ color: 'var(--text-secondary)' }}>
          {description}
        </motion.p>
      )}
    </div>
  );
}
