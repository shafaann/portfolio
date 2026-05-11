import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { projects } from '../data/portfolio';
import { FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';

export default function Work() {
  const [expandedId, setExpandedId] = useState(null);
  const colorMap = {
    cyan: { gradient: 'from-cyan-400 via-blue-500 to-indigo-500', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.15)', text: 'var(--accent-cyan)' },
    emerald: { gradient: 'from-emerald-400 via-teal-500 to-cyan-500', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)', text: 'var(--accent-emerald)' },
    violet: { gradient: 'from-violet-400 via-purple-500 to-pink-500', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.15)', text: 'var(--accent-violet)' },
  };

  return (
    <main className="pt-28">
      <SectionWrapper>
        <SectionHeader label="Portfolio" title="My Work" description="Projects showcasing data analytics, ML, and design." />
        <div className="space-y-6">
          {projects.map((project, i) => {
            const c = colorMap[project.color] || colorMap.cyan;
            const isExpanded = expandedId === project.id;
            return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                className="group rounded-2xl overflow-hidden card-hover relative"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className={`h-[2px] bg-gradient-to-r ${c.gradient}`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${c.bg}, transparent)` }} />
                <div className="relative z-10 p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-mono font-bold"
                      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>#{project.id}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-2xl md:text-3xl font-display font-bold group-hover:text-gradient transition-all"
                          style={{ color: 'var(--text-primary)' }}>{project.title}</h2>
                        <motion.div whileHover={{ scale: 1.1, rotate: -10 }} style={{ color: 'var(--text-muted)' }}><FaExternalLinkAlt size={14} /></motion.div>
                      </div>
                      <p className="leading-relaxed mb-6 text-base mt-3" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map(tech => (
                          <span key={tech} className="px-4 py-1.5 text-xs rounded-full font-mono"
                            style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>{tech}</span>
                        ))}
                      </div>
                      {project.details && (
                        <button onClick={() => setExpandedId(isExpanded ? null : project.id)}
                          className="flex items-center gap-2 text-sm font-medium transition-colors mt-2" style={{ color: 'var(--accent-cyan)' }}>
                          {isExpanded ? 'Hide Details' : 'View Details'}
                          <FaChevronDown className={`text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                      <AnimatePresence>
                        {isExpanded && project.details && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-5 rounded-xl"
                              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>Role</p>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{project.details.role}</p>
                              </div>
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>Duration</p>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{project.details.duration}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>Challenges</p>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.details.challenges}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-[10px] uppercase tracking-[0.15em] font-mono mb-1" style={{ color: 'var(--text-muted)' }}>Outcome</p>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--accent-emerald)' }}>{project.details.outcome}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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
