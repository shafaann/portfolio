import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { services } from '../data/portfolio';
import { FaCheck } from 'react-icons/fa';

const colorAccentMap = {
  cyan: 'var(--accent-teal)',
  emerald: 'var(--accent-sage)',
  violet: 'var(--accent-lavender)',
};

export default function Services() {
  return (
    <main className="pt-28">
      <SectionWrapper>
        <SectionHeader
          label="What I Offer"
          title="Services"
          description="Data-driven pipelines and creative systems built for clarity, impact, and strategic scalability."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const accentColor = colorAccentMap[service.color] || 'var(--accent-coral)';
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative rounded-2xl border flex flex-col p-8 transition-all duration-300"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                {/* Color dot */}
                <div className="w-2 h-2 rounded-full absolute top-8 right-8" style={{ background: accentColor }} />

                <div className="flex-1">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: accentColor }}>
                    <service.icon size={22} />
                  </div>

                  <h3 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {service.title}
                  </h3>

                  <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>

                  {/* Rate */}
                  <div className="p-4 rounded-xl border mb-6 flex justify-between items-center"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Starting at</span>
                    <span className="text-base font-bold" style={{ color: accentColor }}>
                      {service.rate} <span className="opacity-60 font-normal text-sm">/ {service.rateType}</span>
                    </span>
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <p className="text-sm font-semibold mb-4 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                    Deliverables
                  </p>
                  <ul className="space-y-3">
                    {service.deliverables.map(item => (
                      <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: `${accentColor}20` }}>
                          <FaCheck className="text-[9px]" style={{ color: accentColor }} />
                        </div>
                        <span className="leading-snug">{item}</span>
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
