import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { services } from '../data/portfolio';
import { FaCheck } from 'react-icons/fa';

const colorAccentMap = {
  cyan: 'var(--accent-cyan)',
  emerald: 'var(--accent-emerald)',
  violet: 'var(--accent-violet)',
};

export default function Services() {
  return (
    <main className="pt-28">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-16">
          <SectionHeader 
            label="Monograph // Offerings" 
            title="Services" 
            description="Methodical data-driven pipelines and creative systems built for clarity and strategic scalability." 
          />
        </div>

        {/* Services Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const accentColor = colorAccentMap[service.color] || 'var(--accent-cyan)';
            return (
              <motion.div 
                key={service.title} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08 }}
                className="relative rounded-2xl border flex flex-col p-8 transition-all duration-300 hover:bg-elevated"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                {/* Visual marker inside the card representing a catalog tab */}
                <div className="w-1.5 h-1.5 rounded-full absolute top-8 right-8" style={{ background: accentColor }} />

                <div className="flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', color: accentColor }}>
                    <service.icon size={18} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>

                  {/* Cost/Rate Indicator */}
                  <div className="p-3 rounded-xl border mb-6 flex justify-between items-center"
                    style={{ background: 'rgba(255,255,255,0.01)', borderColor: 'var(--border-color)' }}>
                    <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Price Unit</span>
                    <span className="text-xs font-mono font-bold" style={{ color: accentColor }}>
                      {service.rate} <span className="opacity-50 font-normal">/ {service.rateType}</span>
                    </span>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                    // DELIVERABLES
                  </p>
                  <ul className="space-y-3">
                    {service.deliverables.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <div className="mt-1 flex-shrink-0">
                          <FaCheck className="text-[8px]" style={{ color: accentColor }} />
                        </div>
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>
    </main>
  );
}
