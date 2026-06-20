import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaTimes } from 'react-icons/fa';
import { Sparkles } from 'lucide-react';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { projects } from '../data/portfolio';
import DisplayCards from '../components/ui/display-cards';
import { LiquidButton } from '../components/ui/liquid-glass-button';

export default function Work() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  const projectCards = [
    {
      icon: <Sparkles className="size-4 text-cyan-300" />,
      title: "FlowRoute",
      description: "Smart Traffic Navigation App",
      date: "2 months duration",
      iconClassName: "text-cyan-500",
      titleClassName: "text-cyan-400",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Sparkles className="size-4 text-emerald-300" />,
      title: "DotedOn",
      description: "UI/UX Client Figma Design",
      date: "3 weeks duration",
      iconClassName: "text-emerald-500",
      titleClassName: "text-emerald-400",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Sparkles className="size-4 text-violet-300" />,
      title: "FoundryBot",
      description: "AI-Powered Startup Viability Platform",
      date: "6 weeks duration",
      iconClassName: "text-violet-500",
      titleClassName: "text-violet-400",
      className:
        "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];

  const activeProject = selectedIdx !== null ? projects[selectedIdx] : null;

  return (
    <main className="pt-24 pointer-events-none min-h-screen">
      <SectionWrapper>
        <SectionHeader
          label="Portfolio"
          title="My Work"
          description="Click on any card in the stack below to explore the details of my featured projects."
        />

        {/* Stack of Display Cards */}
        <div className="flex justify-center items-center py-20 min-h-[400px]">
          <DisplayCards cards={projectCards} onCardClick={(idx) => setSelectedIdx(idx)} />
        </div>

        {/* Detailed Project Modal Popup */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative max-w-2xl w-full rounded-3xl border p-8 md:p-10 space-y-6 shadow-2xl bg-[var(--bg-surface)] text-[var(--text-primary)]"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="absolute top-6 right-6 p-2 rounded-full border hover:bg-[var(--bg-elevated)] transition-colors duration-300"
                  style={{ borderColor: 'var(--border-color)' }}
                  aria-label="Close"
                >
                  <FaTimes size={14} className="text-white" />
                </button>

                {/* Header info */}
                <div className="space-y-2">
                  <span className="px-4 py-1.5 text-xs font-semibold tracking-wider uppercase rounded-full bg-cyan-500/10 text-cyan-400">
                    {activeProject.tag}
                  </span>
                  <h2 className="text-4xl font-display font-black tracking-tight pt-2">
                    {activeProject.title}
                  </h2>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                    Duration: {activeProject.details?.duration || 'Ongoing'}
                  </p>
                </div>

                {/* Main details */}
                <div className="space-y-4 text-base leading-relaxed text-[var(--text-secondary)]">
                  <p>{activeProject.description}</p>
                  <div className="p-5 rounded-2xl border space-y-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                    <div>
                      <strong className="text-white block text-sm font-bold uppercase tracking-wider mb-1">My Role:</strong>
                      <span className="text-sm">{activeProject.details?.role}</span>
                    </div>
                    <div>
                      <strong className="text-white block text-sm font-bold uppercase tracking-wider mb-1">Challenges:</strong>
                      <span className="text-sm">{activeProject.details?.challenges}</span>
                    </div>
                    <div>
                      <strong className="text-white block text-sm font-bold uppercase tracking-wider mb-1">Outcome:</strong>
                      <span className="text-sm">{activeProject.details?.outcome}</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-full text-xs font-semibold border text-white"
                        style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="flex gap-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl.startsWith('http') ? activeProject.liveUrl : undefined}
                      target={activeProject.liveUrl.startsWith('http') ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="pointer-events-auto inline-block"
                    >
                      <LiquidButton size="default">
                        {activeProject.title === 'FoundryBot' ? 'Launch App' : 'Live Demo'} <FaExternalLinkAlt size={12} className="inline ml-1.5" />
                      </LiquidButton>
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto inline-block"
                    >
                      <LiquidButton size="default">
                        <FaGithub size={16} className="inline mr-1.5" /> Source Code
                      </LiquidButton>
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </SectionWrapper>
    </main>
  );
}
