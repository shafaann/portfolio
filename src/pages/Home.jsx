import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaBrain } from 'react-icons/fa';
import { projects, personalInfo } from '../data/portfolio';
import TypeWriter from '../components/TypeWriter';
import AnimatedCounter from '../components/AnimatedCounter';

// Abstract shapes for the Bauhaus/editorial book cover illustration
const coverShapes = [
  { className: "absolute top-12 left-12 w-36 h-36 rounded-full", style: { background: "rgba(43, 107, 118, 0.15)", mixBlendMode: "multiply" } },
  { className: "absolute bottom-16 right-12 w-48 h-32 rounded-l-full rotate-45", style: { background: "rgba(115, 81, 168, 0.15)", mixBlendMode: "multiply" } },
  { className: "absolute top-1/3 right-8 w-24 h-48 rounded-t-full -rotate-12", style: { background: "rgba(163, 72, 94, 0.15)", mixBlendMode: "multiply" } },
  { className: "absolute bottom-1/3 left-6 w-32 h-32 rotate-12", style: { background: "rgba(57, 122, 92, 0.12)", mixBlendMode: "multiply" } }
];

export default function Home() {
  const containerRef = useRef(null);

  // Take featured projects
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div ref={containerRef} className="book-layout w-full min-h-screen">
      {/* ─── LEFT COLUMN: Sticky Cover Spread ─── */}
      <div className="book-left-pane px-8 py-12 lg:py-24 flex flex-col justify-between"
        style={{ background: 'var(--bg-surface)' }}>
        <div className="book-spine" />
        
        {/* Top Print Details */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="print-crosshair" />
            <span className="book-print-mark">MONOGRAPH // VOL. 2026</span>
          </div>
          <span className="book-print-mark">p. 01 / 05</span>
        </div>

        {/* Profile/Title Display */}
        <div className="my-auto relative py-8">
          {/* Cover Art Illustration (Bauhaus Style) */}
          <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl opacity-60 pointer-events-none">
            {coverShapes.map((shape, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: i * 0.15 }}
                className={shape.className}
                style={shape.style}
              />
            ))}
          </div>

          <div className="relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: 'var(--accent-cyan)' }}>
              Data & Machine Learning
            </motion.span>
            
            <h1 className="text-6xl sm:text-7xl font-display font-black leading-none mt-4 mb-2 tracking-tight">
              SHAFAN
            </h1>
            <h1 className="text-6xl sm:text-7xl font-display font-black leading-none tracking-tight italic" style={{ color: 'var(--text-secondary)' }}>
              MANAZ
            </h1>

            <div className="h-6 mt-6 mb-8 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
              <span className="mr-1">//</span>
              <TypeWriter words={['Data Analyst', 'ML Engineer', 'RAG Architect', 'Problem Solver']} delay={2000} />
            </div>

            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              Selected works, research briefs, and interactive applications demonstrating case-based startup reasoning and client interface prototypes.
            </p>
          </div>
        </div>

        {/* Footer info inside cover */}
        <div className="mt-12 pt-8 flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)' }}>
          <div className="flex gap-4">
            <a href="https://github.com/shafaann" target="_blank" rel="noopener noreferrer" 
              className="text-xs font-mono hover:text-gradient transition-colors">
              [ GITHUB ]
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
              className="text-xs font-mono hover:text-gradient transition-colors">
              [ LINKEDIN ]
            </a>
          </div>
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>©2026 SM</span>
        </div>
      </div>

      {/* ─── RIGHT COLUMN: Scrollable Chapters ─── */}
      <div className="px-6 sm:px-12 lg:px-20 py-12 lg:py-24 space-y-32 overflow-y-auto">
        
        {/* CHAPTER I: INTRODUCTION */}
        <section className="space-y-6 max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--accent-cyan)' }}>Chapter I</span>
            <div className="h-px flex-1" style={{ background: 'var(--border-color)' }} />
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            “Bridging numbers and narratives to formulate <span className="italic">grounded decisions</span>.”
          </h2>
          
          <p className="text-base sm:text-lg leading-relaxed pt-2" style={{ color: 'var(--text-secondary)' }}>
            I specialize in designing Retrieval-Augmented Generation (RAG) pipelines that convert massive historical datasets into logical, explainable evaluation systems. Simultaneously, I construct clean, user-focused digital interface blueprints to deliver responsive solutions for startups and enterprises.
          </p>
        </section>

        {/* CHAPTER II: METRICS MONOGRAPH */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--accent-violet)' }}>Chapter II // Metrics</span>
            <div className="h-px flex-1" style={{ background: 'var(--border-color)' }} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: 12, suffix: '+', label: 'Completed Projects' },
              { value: 85, suffix: '%', label: 'Viability Accuracy' },
              { value: 20, suffix: '+', label: 'Prototype Screens' },
              { value: 3, suffix: '', label: 'Production Sites' }
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <h3 className="text-4xl font-display font-black flex items-baseline">
                  <AnimatedCounter value={stat.value} />
                  <span style={{ color: 'var(--accent-cyan)' }}>{stat.suffix}</span>
                </h3>
                <p className="text-xs font-mono uppercase tracking-wider mt-2" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER III: SELECTED WORK */}
        <section className="space-y-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 mr-4">
              <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--accent-emerald)' }}>Chapter III // Portfolio</span>
              <div className="h-px flex-1" style={{ background: 'var(--border-color)' }} />
            </div>
            <Link to="/work" className="text-xs font-mono hover:underline flex items-center gap-1.5 flex-shrink-0">
              ALL WORK <FaArrowRight size={10} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, i) => {
              const colors = {
                cyan: 'rgba(43, 107, 118, 0.1)',
                emerald: 'rgba(57, 122, 92, 0.1)',
                violet: 'rgba(115, 81, 168, 0.1)'
              };
              const accentColor = project.color === 'emerald' ? 'var(--accent-emerald)' : project.color === 'violet' ? 'var(--accent-violet)' : 'var(--accent-cyan)';
              const bg = colors[project.color] || colors.cyan;

              return (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-2xl border flex flex-col justify-between h-[340px]"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 text-[9px] font-mono tracking-wider uppercase rounded-full"
                        style={{ background: bg, color: accentColor, border: `1px solid ${accentColor}20` }}>
                        {project.tag}
                      </span>
                      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>0{i+1}</span>
                    </div>

                    <h3 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                    {project.liveUrl && (
                      <Link to={project.liveUrl.startsWith('/') ? project.liveUrl : undefined} 
                        href={project.liveUrl.startsWith('http') ? project.liveUrl : undefined}
                        target={project.liveUrl.startsWith('http') ? "_blank" : undefined}
                        rel={project.liveUrl.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="text-xs font-mono font-bold flex items-center gap-1 hover:underline"
                        style={{ color: accentColor }}>
                        {project.title === 'FoundryBot' ? 'LAUNCH SIMULATOR' : 'VIEW PROTOTYPE'} <FaExternalLinkAlt size={10} />
                      </Link>
                    )}
                    {project.githubUrl && project.title !== 'FoundryBot' && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-mono flex items-center gap-1 hover:underline" style={{ color: 'var(--text-secondary)' }}>
                        REPOS <FaGithub size={11} />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CHAPTER IV: ANALYTICAL PROCESS */}
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--accent-rose)' }}>Chapter IV // Methodology</span>
            <div className="h-px flex-1" style={{ background: 'var(--border-color)' }} />
          </div>

          <div className="space-y-4">
            {[
              { num: '01', title: 'Data Aggregation & Cleaning', desc: 'Sourcing multidimensional historical files, mapping fields, and parsing lifecycle milestone timelines.' },
              { num: '02', title: 'Retrieval Vector Pipeline', desc: 'Indexing cleaned startup descriptions into FAISS/Chroma database structures using OpenAI text-embedding models.' },
              { num: '03', title: 'Explainable LLM Analysis', desc: 'Formulating prompts to guide structured viability outcome evaluation, confidence metrics, and strategic risk patterns.' }
            ].map((step, i) => (
              <div key={i} className="flex gap-6 p-6 rounded-xl border transition-all duration-300 hover:bg-elevated"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <span className="font-display font-bold text-2xl italic" style={{ color: 'var(--accent-cyan)' }}>
                  {step.num}
                </span>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{step.title}</h4>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER V: CONTACT COLLOPHON */}
        <section className="relative rounded-3xl border p-8 md:p-12 overflow-hidden text-center"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
          <div className="relative z-10">
            <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: 'var(--accent-cyan)' }}>COLLOPHON</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-4 mb-4" style={{ color: 'var(--text-primary)' }}>
              Let's write the <span className="italic">next brief</span>
            </h2>
            <p className="text-sm max-w-md mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
              Interested in custom LLM architectures, data aggregation models, or structural wireframe designs? Reach out.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-full text-xs font-semibold transition-all duration-300"
                style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
              >
                REQUEST COLLABORATION
              </motion.button>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
