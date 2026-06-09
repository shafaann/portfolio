import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub, FaArrowRight } from 'react-icons/fa';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { projects } from '../data/portfolio';
import SpotlightCard from '../components/SpotlightCard';

const colorMap = {
  cyan: {
    gradient: 'linear-gradient(135deg, #2EC4B6 0%, #3b82f6 100%)',
    bg: 'rgba(46,196,182,0.08)',
    border: 'rgba(46,196,182,0.25)',
    text: 'var(--accent-teal)',
    glow: 'rgba(46,196,182,0.2)',
    pill: 'rgba(46,196,182,0.12)',
  },
  emerald: {
    gradient: 'linear-gradient(135deg, #7FB285 0%, #2EC4B6 100%)',
    bg: 'rgba(127,178,133,0.08)',
    border: 'rgba(127,178,133,0.25)',
    text: 'var(--accent-sage)',
    glow: 'rgba(127,178,133,0.2)',
    pill: 'rgba(127,178,133,0.12)',
  },
  violet: {
    gradient: 'linear-gradient(135deg, #9B8EC4 0%, #E8734A 100%)',
    bg: 'rgba(155,142,196,0.08)',
    border: 'rgba(155,142,196,0.25)',
    text: 'var(--accent-lavender)',
    glow: 'rgba(155,142,196,0.2)',
    pill: 'rgba(155,142,196,0.12)',
  },
};

function ProjectPreview({ color, index }) {
  const c = colorMap[color] || colorMap.cyan;
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden"
      style={{ background: 'var(--bg-elevated)', border: `1px solid ${c.border}` }}>
      <div className="absolute inset-0" style={{ background: c.gradient, opacity: 0.1 }} />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-3xl"
        style={{ background: c.glow }} />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.5 }}
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
        style={{ background: 'rgba(0,0,0,0.25)', borderBottom: `1px solid ${c.border}` }}>
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-60" />
        <div className="flex-1 mx-3 h-4 rounded-md opacity-20" style={{ background: c.text }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-display font-black text-[100px] leading-none select-none"
          style={{ color: c.text, opacity: 0.04 }}>
          0{index + 1}
        </span>
      </div>
    </div>
  );
}

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

      {/* Faded background number */}
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
          <motion.div whileHover={{ scale: 1.02, y: -8 }} transition={{ duration: 0.4 }}>
            <ProjectPreview color={project.color} index={index} />
          </motion.div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
            style={{ background: c.glow }} />
        </div>

        {/* Info */}
        <div className={`flex flex-col gap-6 ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
          {/* Tag */}
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 text-sm font-semibold rounded-full"
              style={{ background: c.pill, border: `1px solid ${c.border}`, color: c.text }}>
              {project.tag || 'Project'}
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-display font-black leading-[1.05] tracking-tight group-hover:text-gradient transition-all duration-500"
            style={{ color: 'var(--text-primary)' }}>
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Role</p>
              <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{project.details?.role}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-muted)' }}>Duration</p>
              <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{project.details?.duration}</p>
            </div>
          </div>

          {/* Outcome */}
          {project.details?.outcome && (
            <div className="p-5 rounded-xl" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: c.text, opacity: 0.8 }}>Outcome</p>
              <p className="text-base leading-relaxed font-medium" style={{ color: c.text }}>{project.details.outcome}</p>
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map(tech => (
              <span key={tech}
                className="px-3 py-1.5 text-sm rounded-full font-medium"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                {tech}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3 pt-2">
            {project.liveUrl && (
              project.liveUrl.startsWith('/') ? (
                <Link to={project.liveUrl}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300"
                    style={{ background: c.gradient, color: '#fff' }}>
                    <FaExternalLinkAlt size={13} /> Launch App
                  </motion.button>
                </Link>
              ) : (
                <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2.5 px-6 py-3 rounded-full text-base font-semibold transition-all duration-300"
                  style={{ background: c.gradient, color: '#fff' }}>
                  <FaExternalLinkAlt size={13} /> {project.title === 'DotedOn' ? 'View Prototype' : 'Live Demo'}
                </motion.a>
              )
            )}
            {project.githubUrl && (
              <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full text-base font-medium transition-all duration-300"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <FaGithub size={16} /> Code
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {index < projects.length - 1 && (
        <div className="mt-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)' }} />
      )}
    </motion.div>
  );
}

export default function Work() {
  return (
    <main className="pt-24">
      <SectionWrapper>
        <SectionHeader
          label="Portfolio"
          title="My Work"
          description="Selected projects showcasing data analytics, machine learning, and creative design."
        />

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
          className="flex justify-center mt-32">
          <SpotlightCard
            className="text-center px-12 py-12 rounded-3xl max-w-lg w-full"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <p className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-coral)' }}>
              More Projects
            </p>
            <h3 className="text-3xl font-display font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              See everything on GitHub
            </h3>
            <p className="text-base mb-8" style={{ color: 'var(--text-muted)' }}>
              More experiments, datasets, and open-source contributions
            </p>
            <motion.a href="https://github.com/shafaann" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-base font-semibold transition-all duration-300"
              style={{ background: 'var(--accent-coral)', color: '#fff' }}>
              <FaGithub size={18} /> Visit GitHub
              <FaArrowRight size={14} />
            </motion.a>
          </SpotlightCard>
        </motion.div>
      </SectionWrapper>
    </main>
  );
}
