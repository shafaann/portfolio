import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { useRef, useState } from 'react';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { personalInfo, stats, projects, skills, skillCategories, processSteps } from '../data/portfolio';

/* ─── Hero ─── */
function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="hero-aura top-[10%] left-[20%]" />
      <div className="hero-aura-secondary bottom-[10%] right-[15%]" />

      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status Badge */}
        <motion.div initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.3 }}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full backdrop-blur-sm mb-8"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--accent-emerald)' }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: 'var(--accent-emerald)' }} />
            </span>
            <span className="text-sm font-mono tracking-wide" style={{ color: 'var(--text-secondary)' }}>Available for Freelance Projects</span>
          </div>
        </motion.div>

        {/* Main Name */}
        <motion.h1 initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold leading-[0.95] mb-4 tracking-tight">
          <span className="text-gradient block">{personalInfo.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }} className="mb-6">
          <span className="text-xl md:text-2xl font-display font-medium" style={{ color: 'var(--text-secondary)' }}>{personalInfo.title}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/work">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              className="magnetic-item group px-8 py-4 rounded-full font-semibold text-base flex items-center gap-3 transition-shadow duration-300"
              style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}>
              See My Work <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>
          <a href={personalInfo.cvLink} download>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              className="magnetic-item px-8 py-4 rounded-full font-semibold text-base backdrop-blur-sm transition-all duration-300 flex items-center gap-3"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              <FaDownload size={14} /> Download CV
            </motion.button>
          </a>
          <Link to="/contact">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}
              className="magnetic-item px-8 py-4 rounded-full font-semibold text-base backdrop-blur-sm transition-all duration-300"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
              Get In Touch
            </motion.button>
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.3 }}
          className="flex items-center justify-center gap-5 mt-14">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            className="magnetic-item transition-colors duration-300 hover:text-accent-cyan" style={{ color: 'var(--text-muted)' }}>
            <FaGithub size={20} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
            className="magnetic-item transition-colors duration-300 hover:text-accent-cyan" style={{ color: 'var(--text-muted)' }}>
            <FaLinkedin size={20} />
          </a>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>·</span>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{personalInfo.domain}</span>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: 'var(--text-muted)' }}>Scroll</span>
          <div className="w-[1px] h-12" style={{ background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)' }}>
            <motion.div animate={{ y: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-3" style={{ backgroundColor: 'var(--accent-cyan)' }} />
          </div>
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
        {stats.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="group relative text-center p-6 md:p-8 rounded-2xl card-hover overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.04), transparent)' }} />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-display font-bold text-gradient mb-2">{stat.number}</h3>
              <p className="text-xs md:text-sm font-mono tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ─── Featured Projects ─── */
function FeaturedProjects() {
  const colorMap = {
    cyan: { gradient: 'from-cyan-400 via-blue-500 to-indigo-500', bg: 'rgba(6,182,212,0.06)', border: 'rgba(6,182,212,0.2)', text: 'var(--accent-cyan)', glow: '#06b6d4' },
    emerald: { gradient: 'from-emerald-400 via-teal-500 to-cyan-500', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)', text: 'var(--accent-emerald)', glow: '#10b981' },
    violet: { gradient: 'from-violet-400 via-purple-500 to-pink-500', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.2)', text: 'var(--accent-violet)', glow: '#8b5cf6' },
  };

  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16">
        <SectionHeader label="Portfolio" title="Featured Projects" />
        <Link to="/work" className="hidden md:flex items-center gap-2 font-medium text-sm group hover:text-accent-cyan transition-colors"
          style={{ color: 'var(--accent-cyan)' }}>
          View All Projects <FaArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.filter(p => p.featured).map((project, i) => {
          const c = colorMap[project.color] || colorMap.cyan;
          return (
            <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl overflow-hidden card-hover"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className={`h-[2px] bg-gradient-to-r ${c.gradient}`} />
              <div className="p-6 md:p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <span className="text-sm font-mono font-bold" style={{ color: c.text }}>#{project.id}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold group-hover:text-gradient transition-all" style={{ color: 'var(--text-primary)' }}>
                    {project.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 text-[11px] rounded-full font-mono"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                style={{ background: c.glow }} />
            </motion.div>
          );
        })}
      </div>
      <div className="md:hidden flex justify-center mt-10">
        <Link to="/work" className="flex items-center gap-2 font-medium text-sm" style={{ color: 'var(--accent-cyan)' }}>
          View All Projects <FaArrowRight size={12} />
        </Link>
      </div>
    </SectionWrapper>
  );
}

/* ─── Tech Stack ─── */
function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredSkills = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <SectionWrapper>
      <SectionHeader label="Expertise" title="Tech Stack" description="The tools and technologies I use to turn ideas into reality." />
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {skillCategories.map(cat => (
          <motion.button key={cat} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={() => setActiveCategory(cat)}
            className="magnetic-item px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all"
            style={activeCategory === cat ? {
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505',
              boxShadow: '0 4px 15px rgba(6,182,212,0.2)',
            } : {
              background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)',
            }}>
            {cat}
          </motion.button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredSkills.map((skill, i) => (
          <motion.div key={skill.name} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }} transition={{ delay: i * 0.04 }}
            className="group relative p-5 rounded-2xl text-center card-hover overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="relative z-10">
              <skill.icon className="mx-auto text-3xl mb-3 transition-colors" style={{ color: 'var(--text-muted)' }} />
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>{skill.name}</p>
              <div className="h-[2px] rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }} transition={{ delay: 0.3, duration: 1, ease: [0.4, 0, 0.2, 1] }}
                  className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }} />
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
  return (
    <SectionWrapper>
      <SectionHeader label="Workflow" title="The Process" description="A systematic approach to delivering exceptional results." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {processSteps.map((step, i) => (
          <motion.div key={step.step} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.15 }}
            className="group relative p-7 rounded-2xl card-hover overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <span className="absolute -top-2 -right-2 text-7xl font-display font-bold" style={{ color: 'var(--border-color)', opacity: 0.5 }}>
              {step.step}
            </span>
            <div className="relative z-10">
              <span className="text-4xl mb-5 block">{step.icon}</span>
              <h3 className="text-lg font-display font-bold mb-3 group-hover:text-gradient transition-all" style={{ color: 'var(--text-primary)' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.description}</p>
            </div>
            {i < processSteps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[1px]"
                style={{ background: 'linear-gradient(to right, rgba(6,182,212,0.3), transparent)' }} />
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ─── Home ─── */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="section-divider" />
      <StatsSection />
      <div className="section-divider" />
      <FeaturedProjects />
      <div className="section-divider" />
      <TechStackSection />
      <div className="section-divider" />
      <ProcessSection />
    </main>
  );
}
