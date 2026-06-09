import { motion } from 'framer-motion';

export default function SectionWrapper({ children, id, className = '', noPadding = false }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative ${noPadding ? '' : 'py-24 md:py-32 px-6 lg:px-8'} ${className}`}
    >
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </motion.section>
  );
}

export function SectionHeader({ label, title, description, align = 'center' }) {
  return (
    <div className={`mb-16 md:mb-20 ${align === 'center' ? 'text-center' : ''}`}>
      {label && (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-5">
          <span className="w-8 h-[2px] rounded-full" style={{ background: 'var(--accent-coral)' }} />
          <span className="text-sm font-semibold tracking-wide uppercase" style={{ color: 'var(--accent-coral)' }}>{label}</span>
          <span className="w-8 h-[2px] rounded-full" style={{ background: 'var(--accent-coral)' }} />
        </motion.div>
      )}
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
        {title}
      </motion.h2>
      {description && (
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`text-lg md:text-xl max-w-2xl leading-relaxed ${align === 'center' ? 'mx-auto' : ''}`}
          style={{ color: 'var(--text-secondary)' }}>
          {description}
        </motion.p>
      )}
    </div>
  );
}
