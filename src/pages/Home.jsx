import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import { projects, personalInfo, stats } from '../data/portfolio';
import TypeWriter from '../components/TypeWriter';
import GitHubButton from '../components/ui/GitHubButton';
import LinkedInButton from '../components/ui/LinkedInButton';
import { LiquidButton } from '../components/ui/liquid-glass-button';
import { CinematicHero } from '../components/ui/cinematic-landing-hero';

export default function Home() {
  const containerRef = useRef(null);
  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div ref={containerRef} className="w-full min-h-screen">
      <CinematicHero />

      {/* ─── STATS STRIP ─── */}
      <section className="py-16 border-y" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', position: 'relative', zIndex: 5 }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:divide-x divide-[var(--border-color)]">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center justify-center p-4"
              >
                <span className="text-5xl font-extrabold tracking-tight text-gradient mb-2 font-mono">
                  {stat.number}
                </span>
                <span className="text-sm font-semibold uppercase tracking-wider text-muted">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED WORK ─── */}
      <section className="py-28 px-6 lg:px-8" style={{ background: 'var(--section-work)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              Featured Work
            </h2>
            <Link to="/work" className="text-base font-medium hover:underline flex items-center gap-2"
              style={{ color: 'var(--accent-coral)' }}>
              All Work <FaArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, i) => {
              const colorMap = {
                cyan: 'var(--accent-teal)',
                emerald: 'var(--accent-sage)',
                violet: 'var(--accent-lavender)',
              };
              const accentColor = colorMap[project.color] || 'var(--accent-coral)';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-3xl border flex flex-col justify-between min-h-[380px]"
                  style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full"
                        style={{ background: `${accentColor}15`, color: accentColor }}>
                        {project.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="text-base leading-relaxed line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                      {project.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-6 mt-6" style={{ borderTop: '1px solid var(--border-color)' }}>
                    {project.liveUrl && (
                      <Link to={project.liveUrl.startsWith('/') ? project.liveUrl : undefined} 
                        href={project.liveUrl.startsWith('http') ? project.liveUrl : undefined}
                        target={project.liveUrl.startsWith('http') ? "_blank" : undefined}
                        rel={project.liveUrl.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="text-sm font-semibold flex items-center gap-2 hover:underline"
                        style={{ color: accentColor }}>
                        {project.title === 'FoundryBot' ? 'Launch' : 'View'} <FaExternalLinkAlt size={12} />
                      </Link>
                    )}
                    {project.githubUrl && project.title !== 'FoundryBot' && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="text-sm flex items-center gap-2 hover:underline" style={{ color: 'var(--text-secondary)' }}>
                        <FaGithub size={16} /> Code
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="py-28 px-6 lg:px-8" style={{ background: 'var(--bg-surface)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-center mb-16" style={{ color: 'var(--text-primary)' }}>
            My Approach
          </h2>

          <div className="space-y-6">
            {[
              { num: '01', title: 'Data Aggregation & Cleaning', desc: 'Sourcing multidimensional historical files, mapping fields, and parsing lifecycle milestone timelines.', color: 'var(--accent-coral)' },
              { num: '02', title: 'Retrieval Vector Pipeline', desc: 'Indexing cleaned startup descriptions into FAISS/Chroma database structures using OpenAI text-embedding models.', color: 'var(--accent-teal)' },
              { num: '03', title: 'Explainable LLM Analysis', desc: 'Formulating prompts to guide structured viability outcome evaluation, confidence metrics, and strategic risk patterns.', color: 'var(--accent-lavender)' }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-8 rounded-2xl border transition-all duration-300"
                style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
                <span className="font-display font-black text-4xl italic flex-shrink-0" style={{ color: step.color }}>
                  {step.num}
                </span>
                <div>
                  <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h4>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 px-6 lg:px-8" style={{ background: 'var(--section-contact)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-display font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
            Let's work <span className="italic" style={{ color: 'var(--accent-coral)' }}>together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg max-w-md mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
            Interested in custom LLM architectures, data aggregation models, or structural wireframe designs? Reach out.
          </motion.p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full text-base font-semibold transition-all duration-300"
              style={{ background: 'var(--accent-coral)', color: '#fff' }}>
              Start a Conversation
            </motion.button>
          </Link>
        </div>
      </section>
    </div>
  );
}
