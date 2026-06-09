import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { projects } from '../data/portfolio';
import { FaExternalLinkAlt, FaGithub, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import SpotlightCard from '../components/SpotlightCard';

const colorMap = {
  cyan: {
    gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
    bg: 'rgba(6,182,212,0.07)',
    border: 'rgba(6,182,212,0.22)',
    text: 'var(--accent-cyan)',
    spotlight: 'rgba(6,182,212,0.12)',
    glow: 'rgba(6,182,212,0.15)',
  },
  emerald: {
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    bg: 'rgba(16,185,129,0.07)',
    border: 'rgba(16,185,129,0.22)',
    text: 'var(--accent-emerald)',
    spotlight: 'rgba(16,185,129,0.12)',
    glow: 'rgba(16,185,129,0.15)',
  },
  violet: {
    gradient: 'from-violet-400 via-purple-500 to-pink-500',
    bg: 'rgba(139,92,246,0.07)',
    border: 'rgba(139,92,246,0.22)',
    text: 'var(--accent-violet)',
    spotlight: 'rgba(139,92,246,0.12)',
    glow: 'rgba(139,92,246,0.15)',
  },
};

export default function Work() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <main className="pt-28">
      <SectionWrapper>
        <SectionHeader
          label="Portfolio"
          title="My Work"
          description="Projects showcasing data analytics, machine learning, and design — each solving a real problem."
        />

        <div className="space-y-8">
          {projects.map((project, i) => {
            const c = colorMap[project.color] || colorMap.cyan;
            const isExpanded = expandedId === project.id;

            return (
              <motion.div key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}>
                <SpotlightCard
                  glowColor={c.spotlight}
                  className="group rounded-2xl overflow-hidden relative"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', transition: 'border-color 0.4s, box-shadow 0.4s' }}>

                  {/* Top accent bar */}
                  <div className={`h-[2px] bg-gradient-to-r ${c.gradient}`} />

                  {/* Main content */}
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-start gap-6">

                      {/* Project number badge */}
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center"
                          style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                          <span className="text-[9px] font-mono tracking-widest uppercase mb-0.5" style={{ color: c.text, opacity: 0.6 }}>
                            {project.tag || 'PROJ'}
                          </span>
                          <span className="text-xl font-display font-black" style={{ color: c.text }}>0{project.id}</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h2 className="text-2xl md:text-3xl font-display font-black group-hover:text-gradient transition-all duration-400"
                              style={{ color: 'var(--text-primary)' }}>
                              {project.title}
                            </h2>
                          </div>

                          {/* Live / GitHub buttons */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.07, boxShadow: `0 0 20px ${c.glow}` }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300"
                                style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                                onClick={e => e.stopPropagation()}>
                                <FaExternalLinkAlt size={9} />
                                <span className="hidden sm:inline">
                                  {project.title === 'DotedOn' ? 'Figma Prototype' :
                                    project.title === 'FoundryBot' ? 'GitHub' : 'Live'}
                                </span>
                                <span className="sm:hidden">View</span>
                              </motion.a>
                            )}
                            {project.githubUrl && project.title !== 'FoundryBot' && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.07 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                                onClick={e => e.stopPropagation()}>
                                <FaGithub size={13} />
                                <span className="hidden sm:inline">GitHub</span>
                              </motion.a>
                            )}
                          </div>
                        </div>

                        <p className="leading-relaxed text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.techStack.map(tech => (
                            <span key={tech}
                              className="px-3 py-1.5 text-[11px] rounded-full font-mono tracking-wide"
                              style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Toggle details */}
                        {project.details && (
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : project.id)}
                            className="flex items-center gap-2 text-sm font-semibold mt-1 transition-colors duration-300"
                            style={{ color: 'var(--accent-cyan)' }}>
                            {isExpanded ? 'Hide Details' : 'View Details'}
                            <motion.span
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}>
                              <FaChevronDown size={11} />
                            </motion.span>
                          </button>
                        )}

                        {/* Expanded details */}
                        <AnimatePresence>
                          {isExpanded && project.details && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                              className="overflow-hidden">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 p-6 rounded-2xl"
                                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)' }}>
                                <div>
                                  <p className="text-[9px] uppercase tracking-[0.2em] font-mono mb-2" style={{ color: 'var(--text-muted)' }}>Role</p>
                                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{project.details.role}</p>
                                </div>
                                <div>
                                  <p className="text-[9px] uppercase tracking-[0.2em] font-mono mb-2" style={{ color: 'var(--text-muted)' }}>Duration</p>
                                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{project.details.duration}</p>
                                </div>
                                <div className="md:col-span-2">
                                  <p className="text-[9px] uppercase tracking-[0.2em] font-mono mb-2" style={{ color: 'var(--text-muted)' }}>Challenges</p>
                                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.details.challenges}</p>
                                </div>
                                <div className="md:col-span-2 p-4 rounded-xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                                  <p className="text-[9px] uppercase tracking-[0.2em] font-mono mb-2" style={{ color: 'var(--accent-emerald)', opacity: 0.7 }}>Outcome</p>
                                  <p className="text-sm leading-relaxed font-medium" style={{ color: 'var(--accent-emerald)' }}>{project.details.outcome}</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>

                  {/* Corner glow on hover */}
                  <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                    style={{ background: c.glow, transform: 'translate(50%, 50%)' }} />
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* More on GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-16">
          <a href="https://github.com/shafaann" target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(6,182,212,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <FaGithub size={16} />
              See More on GitHub
              <FaArrowRight size={11} />
            </motion.button>
          </a>
        </motion.div>
      </SectionWrapper>
    </main>
  );
}
