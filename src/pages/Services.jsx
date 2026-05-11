import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { services } from '../data/portfolio';
import { FaCheck } from 'react-icons/fa';

export default function Services() {
  const colorMap = {
    cyan: { gradient: 'from-cyan-400 via-blue-500 to-indigo-500', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.1)', text: 'var(--accent-cyan)', checkBg: 'rgba(6,182,212,0.1)' },
    emerald: { gradient: 'from-emerald-400 via-teal-500 to-cyan-500', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.1)', text: 'var(--accent-emerald)', checkBg: 'rgba(16,185,129,0.1)' },
    violet: { gradient: 'from-violet-400 via-purple-500 to-pink-500', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.1)', text: 'var(--accent-violet)', checkBg: 'rgba(139,92,246,0.1)' },
  };

  return (
    <main className="pt-28">
      <SectionWrapper>
        <SectionHeader label="What I Offer" title="Services" description="Data-driven solutions and creative designs to help your business grow." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const c = colorMap[service.color] || colorMap.cyan;
            return (
              <motion.div key={service.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden card-hover flex flex-col"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className={`h-[2px] bg-gradient-to-r ${c.gradient}`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${c.bg}, transparent)` }} />
                <div className="relative z-10 p-7 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                    <service.icon size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-gradient transition-all" style={{ color: 'var(--text-primary)' }}>
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>{service.description}</p>
                  <div className="rate-badge mb-6">
                    <span>{service.rate}</span>
                    <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{service.rateType}</span>
                  </div>
                  <div className="mt-auto">
                    <p className="text-[10px] uppercase tracking-[0.15em] mb-4 font-mono" style={{ color: 'var(--text-muted)' }}>Deliverables</p>
                    <ul className="space-y-2.5">
                      {service.deliverables.map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: c.checkBg }}>
                            <FaCheck className="text-[8px]" style={{ color: c.text }} />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>
    </main>
  );
}
