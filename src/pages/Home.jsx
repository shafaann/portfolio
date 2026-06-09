import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { useRef, useState } from 'react';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { personalInfo, stats, projects, skills, skillCategories, processSteps } from '../data/portfolio';
import TypeWriter from '../components/TypeWriter';
import AnimatedCounter from '../components/AnimatedCounter';
import MarqueeStrip from '../components/MarqueeStrip';
import SpotlightCard from '../components/SpotlightCard';

const marqueeItems = [
  'Python', 'Machine Learning', 'SQL', 'Power BI', 'Tableau',
  'Pandas', 'NumPy', 'Scikit-learn', 'Streamlit', 'MySQL',
  'PostgreSQL', 'Jupyter', 'Data Analytics', 'RAG', 'LLM',
];

/* ─── Split Letter Animation ─── */
function SplitText({ text, className, delay = 0 }) {
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.04,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Hero ─── */
function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid bg */}
      <div className="hero-grid-bg" />
      {/* Aura blobs */}
      <div className="hero-aura top-[5%] left-[15%]" />
      <div className="hero-aura-secondary bottom-[5%] right-[10%]" />
      <div className="hero-aura-tertiary top-[60%] left-[60%]" />

      <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10 backdrop-blur-sm"
            style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--accent-emerald)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: 'var(--accent-emerald)' }} />
            </span>
            <span className="text-xs font-mono tracking-[0.2em] uppercase"
              style={{ color: 'var(--accent-cyan)' }}>Open to Freelance</span>
          </div>
        </motion.div>

        {/* Main Name - split letter */}
        <div className="mb-3 overflow-hidden" style={{ perspective: '1000px' }}>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-display font-black leading-[0.92] tracking-tight">
            <SplitText text="Shafan" className="text-gradient block" delay={0.3} />
            <SplitText text="Manaz" className="text-gradient block" delay={0.55} />
          </h1>
        </div>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05 }}
          className="mb-8 h-10 flex items-center justify-center">
          <span className="text-xl md:text-2xl font-display font-medium" style={{ color: 'var(--text-secondary)' }}>
            <TypeWriter
              words={['Data Analyst', 'ML Engineer', 'UI/UX Designer', 'Problem Solver']}
              speed={70}
              deleteSpeed={45}
              pause={2000}
            />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'var(--text-muted)' }}>
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/work">
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(6,182,212,0.35)' }}
              whileTap={{ scale: 0.97 }}
              className="group px-8 py-4 rounded-full font-semibold text-sm flex items-center gap-3 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}>
              View My Work
              <FaArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={13} />
            </motion.button>
          </Link>
          <a href={personalInfo.cvLink} download>
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'rgba(6,182,212,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-semibold text-sm backdrop-blur-sm flex items-center gap-3 transition-all duration-300"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              <FaDownload size={13} /> Download CV
            </motion.button>
          </a>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.04, borderColor: 'rgba(139,92,246,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 rounded-full font-semibold text-sm backdrop-blur-sm transition-all duration-300"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex items-center justify-center gap-5 mt-14">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-mono transition-all duration-300"
            style={{ color: 'var(--text-muted)' }}>
            <motion.span whileHover={{ scale: 1.2, color: '#06b6d4' }} transition={{ duration: 0.2 }}>
              <FaGithub size={18} />
            </motion.span>
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
            className="group transition-all duration-300" style={{ color: 'var(--text-muted)' }}>
            <motion.span whileHover={{ scale: 1.2, color: '#06b6d4' }} transition={{ duration: 0.2 }}>
              <FaLinkedin size={18} />
            </motion.span>
          </a>
          <span className="w-px h-4" style={{ background: 'var(--border-color)' }} />
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{personalInfo.domain}</span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] font-mono tracking-[0.4em] uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
        <div className="relative w-[1px] h-14 overflow-hidden" style={{ background: 'var(--border-color)' }}>
          <motion.div
            animate={{ y: [-48, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="absolute w-full h-7"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--accent-cyan), transparent)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Stats ─── */
function StatsSection() {
  return (
    <SectionWrapper>
      <div className="grid grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const numMatch = stat.number.match(/\d+/);
          const num = numMatch ? numMatch[0] : stat.number;
          const suffix = stat.number.replace(num, '');
          return (
            <SpotlightCard
              key={stat.label}
              className="group relative text-center p-8 md:p-10 rounded-2xl card-hover"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}>
                <h3 className="text-4xl md:text-5xl font-display font-black text-gradient mb-2">
                  <AnimatedCounter value={num} suffix={suffix} />
                </h3>
                <p className="text-[11px] font-mono tracking-[0.2em] uppercase" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </motion.div>
            </SpotlightCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

/* ─── Featured Projects ─── */
function FeaturedProjects() {
  const colorMap = {
    cyan: {
      gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
      bg: 'rgba(6,182,212,0.07)',
      border: 'rgba(6,182,212,0.25)',
      text: 'var(--accent-cyan)',
      glow: 'rgba(6,182,212,0.18)',
      spotlight: 'rgba(6,182,212,0.12)',
    },
    emerald: {
      gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
      bg: 'rgba(16,185,129,0.07)',
      border: 'rgba(16,185,129,0.25)',
      text: 'var(--accent-emerald)',
      glow: 'rgba(16,185,129,0.18)',
      spotlight: 'rgba(16,185,129,0.12)',
    },
    violet: {
      gradient: 'from-violet-400 via-purple-500 to-pink-500',
      bg: 'rgba(139,92,246,0.07)',
      border: 'rgba(139,92,246,0.25)',
      text: 'var(--accent-violet)',
      glow: 'rgba(139,92,246,0.18)',
      spotlight: 'rgba(139,92,246,0.12)',
    },
  };

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
        <SectionHeader label="Portfolio" title="Featured Projects" />
        <Link to="/work"
          className="hidden md:flex items-center gap-2 font-medium text-sm group transition-colors"
          style={{ color: 'var(--accent-cyan)' }}>
          <span className="group-hover:underline">View All Projects</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={11} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.filter(p => p.featured).map((project, i) => {
          const c = colorMap[project.color] || colorMap.cyan;
          return (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}>
              <SpotlightCard
                glowColor={c.spotlight}
                className="group relative rounded-2xl overflow-hidden h-full"
                style={{ background: 'var(--bg-card)', border: `1px solid var(--border-color)`, transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)' }}>
                {/* Top gradient bar */}
                <div className={`h-[2px] bg-gradient-to-r ${c.gradient}`} />

                <div className="p-7">
                  {/* Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 text-[10px] font-mono tracking-widest uppercase rounded-full"
                      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                      {project.tag || 'Project'}
                    </span>
                    <span className="text-sm font-mono font-bold opacity-30" style={{ color: c.text }}>0{project.id}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-gradient transition-all duration-300"
                    style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map(tech => (
                      <span key={tech} className="px-2.5 py-1 text-[10px] rounded-full font-mono"
                        style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono font-semibold px-4 py-2 rounded-full transition-all duration-300"
                        style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
                        onClick={e => e.stopPropagation()}>
                        <FaExternalLinkAlt size={9} /> Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-xs font-mono font-semibold px-4 py-2 rounded-full transition-all duration-300"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                        onClick={e => e.stopPropagation()}>
                        <FaGithub size={11} /> GitHub
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                  style={{ background: c.glow }} />
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      <div className="md:hidden flex justify-center mt-10">
        <Link to="/work" className="flex items-center gap-2 font-medium text-sm" style={{ color: 'var(--accent-cyan)' }}>
          View All Projects <FaArrowRight size={11} />
        </Link>
      </div>
    </SectionWrapper>
  );
}

/* ─── Tech Stack ─── */
function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <SectionWrapper>
      <SectionHeader label="Expertise" title="Tech Stack" description="The tools and technologies I use to turn data into decisions." />
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {skillCategories.map(cat => (
          <motion.button key={cat} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setActiveCategory(cat)}
            className="px-5 py-2 rounded-full text-[11px] font-mono tracking-wider uppercase transition-all duration-300"
            style={activeCategory === cat ? {
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
              color: '#050505',
              boxShadow: '0 4px 20px rgba(6,182,212,0.25)',
            } : {
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
            }}>
            {cat}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((skill, i) => (
          <motion.div key={skill.name} layout
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -6, scale: 1.04 }}
            className="group relative p-5 rounded-2xl text-center overflow-hidden cursor-default"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', transition: 'border-color 0.3s' }}>
            <div className="relative z-10">
              <skill.icon className="mx-auto text-3xl mb-3 transition-all duration-300 group-hover:scale-110"
                style={{ color: 'var(--text-muted)' }} />
              <p className="text-[11px] font-medium mb-3" style={{ color: 'var(--text-secondary)' }}>{skill.name}</p>
              <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.04, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

/* ─── Process ─── */
function ProcessSection() {
  const processColors = ['var(--accent-cyan)', 'var(--accent-emerald)', 'var(--accent-violet)', 'var(--accent-rose)'];
  return (
    <SectionWrapper>
      <SectionHeader label="Workflow" title="The Process" description="A systematic approach to delivering exceptional, data-driven results." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {processSteps.map((step, i) => (
          <motion.div key={step.step}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}>
            <SpotlightCard
              glowColor={`${processColors[i]}20`}
              className="group relative p-7 rounded-2xl h-full overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', transition: 'border-color 0.4s, box-shadow 0.4s' }}>
              {/* Big step number BG */}
              <span className="absolute -top-3 -right-1 text-8xl font-display font-black select-none"
                style={{ color: processColors[i], opacity: 0.05 }}>
                {step.step}
              </span>
              {/* Step pill */}
              <span className="inline-block px-3 py-1 text-[10px] font-mono tracking-[0.2em] uppercase rounded-full mb-5"
                style={{ background: `${processColors[i]}15`, border: `1px solid ${processColors[i]}30`, color: processColors[i] }}>
                Step {step.step}
              </span>
              <h3 className="text-lg font-display font-bold mb-3 group-hover:text-gradient transition-all duration-300"
                style={{ color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.description}</p>
              {/* Connector arrow (desktop only) */}
              {i < processSteps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 items-center z-10">
                  <FaArrowRight size={10} style={{ color: 'var(--border-hover)', opacity: 0.6 }} />
                </div>
              )}
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-3xl overflow-hidden text-center py-20 px-8">
        {/* Gradient background */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(139,92,246,0.1) 50%, rgba(16,185,129,0.06) 100%)', border: '1px solid rgba(6,182,212,0.15)' }} />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'var(--accent-cyan)' }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-15"
          style={{ background: 'var(--accent-violet)' }} />

        <div className="relative z-10">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--accent-cyan)' }}>
            — Let's Collaborate —
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 text-gradient">
            Have a project in mind?
          </h2>
          <p className="text-base mb-10 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
            I'm always open to new opportunities, interesting problems, and creative collaborations.
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(6,182,212,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="group px-10 py-4 rounded-full font-bold text-sm flex items-center gap-3 mx-auto transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}>
              Start a Conversation
              <FaArrowRight className="group-hover:translate-x-1.5 transition-transform duration-300" size={13} />
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

/* ─── Home ─── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <MarqueeStrip items={marqueeItems} />
      <div className="section-divider" />
      <StatsSection />
      <div className="section-divider" />
      <FeaturedProjects />
      <div className="section-divider" />
      <TechStackSection />
      <div className="section-divider" />
      <ProcessSection />
      <div className="section-divider" />
      <CTABanner />
    </main>
  );
}
