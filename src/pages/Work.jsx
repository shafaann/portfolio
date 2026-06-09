import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from 'react-icons/fa';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { projects } from '../data/portfolio';
import SpotlightCard from '../components/SpotlightCard';

const colorMap = {
  cyan: {
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #6366f1 100%)',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.25)',
    text: 'var(--accent-cyan)',
    glow: 'rgba(6,182,212,0.2)',
    pill: 'rgba(6,182,212,0.15)',
  },
  emerald: {
    gradient: 'linear-gradient(135deg, #10b981 0%, #0891b2 50%, #06b6d4 100%)',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
    text: 'var(--accent-emerald)',
    glow: 'rgba(16,185,129,0.2)',
    pill: 'rgba(16,185,129,0.15)',
  },
  violet: {
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #ec4899 100%)',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.25)',
    text: 'var(--accent-violet)',
    glow: 'rgba(139,92,246,0.2)',
    pill: 'rgba(139,92,246,0.15)',
  },
};

/* ─── Animated project preview card ─── */
function ProjectPreview({ color, title, index }) {
  const c = colorMap[color] || colorMap.cyan;
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
      style={{ background: 'var(--bg-elevated)', border: `1px solid ${c.border}` }}>
      {/* Animated gradient blob */}
      <div className="absolute inset-0" style={{ background: `${c.gradient}`, opacity: 0.12 }} />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-3xl"
        style={{ background: c.glow }} />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full blur-3xl"
        style={{ background: c.glow }} />
      {/* Fake UI lines */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 gap-2">
        <div className="w-3/4 h-2 rounded-full opacity-20" style={{ background: c.text }} />
        <div className="w-1/2 h-2 rounded-full opacity-10" style={{ background: c.text }} />
        <div className="w-5/6 h-1.5 rounded-full opacity-10" style={{ background: c.text }} />
      </div>
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-9 flex items-center px-4 gap-2"
        style={{ background: 'rgba(0,0,0,0.3)', borderBottom: `1px solid ${c.border}` }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-60" />
        <div className="flex-1 mx-3 h-4 rounded-md opacity-20"
          style={{ background: c.text }} />
      </div>
      {/* Project number watermark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display font-black text-[100px] leading-none select-none"
          style={{ color: c.text, opacity: 0.04 }}>
          0{index + 1}
        </span>
      </div>
    </div>
  );
}

/* ─── Single project row ─── */
function ProjectRow({ project, index }) {
  const c = colorMap[project.color] || colorMap.cyan;
  const isReversed = index % 2 !== 0;
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: rowRef, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div ref={rowRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.75, ease: [0.215, 0.61, 0.355, 1] }}
      className="group relative">

      {/* Large faded number in background */}
      <motion.div style={{ y }}
        className="absolute -top-8 font-display font-black select-none pointer-events-none hidden lg:block"
        style={{
          fontSize: '18vw',
          lineHeight: 1,
          color: c.text,
          opacity: 0.025,
          left: isReversed ? 'auto' : '-2%',
          right: isReversed ? '-2%' : 'auto',
        }}>
        0{index + 1}
      </motion.div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:[direction:rtl]' : ''}`}>
        {/* Preview */}
        <div className={`relative ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
          <motion.div
            whileHover={{ scale: 1.02, y: -8 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
            <ProjectPreview color={project.color} title={project.title} index={index} />
          </motion.div>
          {/* Glow under preview */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
            style={{ background: c.glow }} />
        </div>

        {/* Info */}
        <div className={`flex flex-col gap-6 ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
          {/* Tag + number */}
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] uppercase rounded-full"
              style={{ background: c.pill, border: `1px solid ${c.border}`, color: c.text }}>
              {project.tag || 'Project'}
            </span>
            <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-display font-black leading-[1.05] tracking-tight group-hover:text-gradient transition-all duration-500"
            style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Role</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{project.details?.role}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-1.5" style={{ color: 'var(--text-muted)' }}>Duration</p>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{project.details?.duration}</p>
            </div>
          </div>

          {/* Outcome */}
          {project.details?.outcome && (
            <div className="p-4 rounded-xl" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
              <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-1.5" style={{ color: c.text, opacity: 0.7 }}>Outcome</p>
              <p className="text-sm leading-relaxed font-medium" style={{ color: c.text }}>{project.details.outcome}</p>
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span key={tech}
                className="px-3 py-1.5 text-xs rounded-full font-mono"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {tech}
              </span>
            ))}
          </div>

          {/* CTA links */}
          <div className="flex items-center gap-3 pt-2">
            {project.liveUrl && (
              <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: `0 0 24px ${c.glow}` }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300"
                style={{ background: c.gradient, color: '#fff' }}>
                <FaExternalLinkAlt size={11} />
                {project.title === 'DotedOn' ? 'View Prototype' :
                  project.title === 'FoundryBot' ? 'View on GitHub' : 'Live Demo'}
              </motion.a>
            )}
            {project.githubUrl && project.title !== 'FoundryBot' && (
              <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <FaGithub size={14} /> Code
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Divider line */}
      {index < projects.length - 1 && (
        <div className="mt-24 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }} />
      )}
    </motion.div>
  );
}

export default function Work() {
  return (
    <main className="pt-24">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-24">
          <SectionHeader
            label="Portfolio"
            title="My Work"
            description="Selected projects that showcase data analytics, machine learning, and creative design."
          />
        </div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mt-32">
          <SpotlightCard
            className="text-center px-12 py-10 rounded-3xl max-w-lg w-full"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <p className="text-xs font-mono tracking-[0.25em] uppercase mb-3" style={{ color: 'var(--accent-cyan)' }}>
              More Projects
            </p>
            <h3 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              See everything on GitHub
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              More experiments, datasets, and open-source contributions
            </p>
            <motion.a href="https://github.com/shafaann" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(6,182,212,0.2)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}>
              <FaGithub size={15} /> Visit GitHub
              <FaArrowRight size={11} />
            </motion.a>
          </SpotlightCard>
        </motion.div>
      </SectionWrapper>
    </main>
  );
}
