import { motion } from 'framer-motion';
import { FaGithub, FaArrowRight, FaBrain, FaDatabase, FaChartBar, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import { SiPython, SiOpenai } from 'react-icons/si';
import { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import SpotlightCard from '../components/SpotlightCard';

const GITHUB_URL = 'https://github.com/shafaann/LLM-Project';

const pipelineSteps = [
  { icon: FaCode,     label: 'User Input',      desc: 'Enter startup idea — industry, stage, location, funding',   color: '#06b6d4' },
  { icon: FaBrain,    label: 'Embedding',        desc: 'Idea is converted into a semantic vector representation',   color: '#8b5cf6' },
  { icon: FaDatabase, label: 'Vector Retrieval', desc: 'FAISS/Chroma finds similar historical startups',            color: '#10b981' },
  { icon: FaBrain,    label: 'LLM Reasoning',    desc: 'GPT/Ollama analyzes retrieved cases and patterns',         color: '#f43f5e' },
  { icon: FaChartBar, label: 'Viability Report', desc: 'Structured score, risks, and actionable recommendations',   color: '#f59e0b' },
];

const techStack = [
  { name: 'Python',    icon: SiPython,   color: '#3b82f6' },
  { name: 'OpenAI',    icon: SiOpenai,   color: '#10b981' },
  { name: 'FAISS',     icon: FaDatabase, color: '#8b5cf6' },
  { name: 'Streamlit', icon: FaCode,     color: '#f43f5e' },
  { name: 'Pandas',    icon: FaChartBar, color: '#06b6d4' },
];

const sampleOutput = {
  idea: 'AI-powered legal document assistant for small businesses',
  industry: 'Legal Tech / SaaS',
  stage: 'Seed',
  score: 74,
  verdict: 'Viable with Caution',
  verdictColor: '#f59e0b',
  risks: ['Regulatory compliance complexity', 'High competition from established players', 'Long B2B sales cycles'],
  recommendations: ['Focus on niche vertical (e.g., contracts only)', 'Target SMBs in specific geography', 'Partner with law firms for distribution'],
  comparables: ['LexisNexis (acquired)', 'Clio (Series F, $900M)', 'DoNotPay (operating)'],
};

function ScoreRing({ score }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 70 ? '#10b981' : score >= 50 ? '#f59e0b' : '#f43f5e';
  return (
    <div className="relative inline-flex items-center justify-center w-32 h-32">
      <svg width="128" height="128" className="-rotate-90">
        <circle cx="64" cy="64" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <motion.circle
          cx="64" cy="64" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="text-3xl font-display font-black" style={{ color }}>
          {score}
        </motion.span>
        <span className="text-[9px] font-mono tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Score</span>
      </div>
    </div>
  );
}

function DemoSimulator() {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => { setRunning(false); setDone(true); }, 2800);
  };

  return (
    <SpotlightCard
      glowColor="rgba(139,92,246,0.12)"
      className="rounded-2xl overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid rgba(139,92,246,0.2)' }}>
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-5 py-3" style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="w-3 h-3 rounded-full bg-red-400 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-70" />
        <div className="w-3 h-3 rounded-full bg-green-400 opacity-70" />
        <span className="ml-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>foundrybot — startup analyzer</span>
      </div>
      <div className="p-6">
        {/* Input sample */}
        <div className="space-y-3 mb-6">
          {[
            ['Startup Idea', sampleOutput.idea],
            ['Industry', sampleOutput.industry],
            ['Stage', sampleOutput.stage],
          ].map(([label, val]) => (
            <div key={label} className="flex items-start gap-3">
              <span className="text-xs font-mono pt-0.5 flex-shrink-0" style={{ color: 'var(--accent-cyan)' }}>{label}:</span>
              <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{val}</span>
            </div>
          ))}
        </div>

        {/* Run button */}
        {!running && !done && (
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 25px rgba(139,92,246,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={handleRun}
            className="w-full py-3 rounded-xl text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}>
            ▶ Run Analysis
          </motion.button>
        )}

        {/* Loading */}
        {running && (
          <div className="space-y-2">
            {['Embedding idea vector...', 'Querying FAISS index...', 'Retrieving 5 similar startups...', 'Generating LLM analysis...'].map((step, i) => (
              <motion.div key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.6 }}
                className="flex items-center gap-2">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-cyan)' }} />
                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{step}</span>
              </motion.div>
            ))}
          </div>
        )}

        {/* Output */}
        {done && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Score */}
            <div className="flex items-center gap-6">
              <ScoreRing score={sampleOutput.score} />
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Verdict</p>
                <p className="text-xl font-display font-bold" style={{ color: sampleOutput.verdictColor }}>{sampleOutput.verdict}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Based on 5 comparable startups</p>
              </div>
            </div>
            {/* Risks */}
            <div>
              <p className="text-[9px] font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--accent-rose)', opacity: 0.7 }}>Key Risks</p>
              {sampleOutput.risks.map(r => (
                <div key={r} className="flex items-start gap-2 mb-1">
                  <span className="text-xs mt-0.5" style={{ color: 'var(--accent-rose)' }}>●</span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{r}</span>
                </div>
              ))}
            </div>
            {/* Recommendations */}
            <div>
              <p className="text-[9px] font-mono tracking-widest uppercase mb-2" style={{ color: 'var(--accent-emerald)', opacity: 0.7 }}>Recommendations</p>
              {sampleOutput.recommendations.map(r => (
                <div key={r} className="flex items-start gap-2 mb-1">
                  <span className="text-xs mt-0.5" style={{ color: 'var(--accent-emerald)' }}>→</span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{r}</span>
                </div>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setDone(false)}
              className="text-xs font-mono underline"
              style={{ color: 'var(--text-muted)' }}>
              Reset demo
            </motion.button>
          </motion.div>
        )}
      </div>
    </SpotlightCard>
  );
}

export default function FoundryBotPage() {
  return (
    <main className="pt-24">
      <SectionWrapper>
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 text-[10px] font-mono tracking-[0.25em] uppercase rounded-full mb-6"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: 'var(--accent-violet)' }}>
              AI / ML Project
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black text-gradient mb-6">
            FoundryBot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            An evidence-driven startup viability analyzer powered by RAG + LLM — evaluates ideas against real historical startup data to generate structured feasibility reports.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="flex items-center justify-center gap-4">
            <motion.a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold"
              style={{ background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))', color: '#fff' }}>
              <FaGithub size={15} /> View Source Code <FaArrowRight size={11} />
            </motion.a>
            <motion.a href="https://streamlit.io/cloud" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-medium"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
              <FaExternalLinkAlt size={11} /> Deploy on Streamlit
            </motion.a>
          </motion.div>
        </div>

        {/* Demo + Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
          {/* Interactive Demo */}
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent-cyan)' }}>— Live Demo Simulator</p>
            <DemoSimulator />
          </div>

          {/* Pipeline */}
          <div>
            <p className="text-xs font-mono tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent-violet)' }}>— RAG Pipeline</p>
            <div className="space-y-3">
              {pipelineSteps.map((step, i) => (
                <motion.div key={step.label}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}>
                  <SpotlightCard
                    glowColor={`${step.color}15`}
                    className="flex items-start gap-4 p-5 rounded-xl"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                      <step.icon size={14} style={{ color: step.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-mono" style={{ color: 'var(--text-muted)' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{step.label}</h3>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
          <p className="text-xs font-mono tracking-[0.2em] uppercase text-center mb-8" style={{ color: 'var(--text-muted)' }}>
            — Tech Stack
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, i) => (
              <motion.div key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.05 }}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl w-28 text-center"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <tech.icon size={28} style={{ color: tech.color }} />
                <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Deploy yourself CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden text-center py-16 px-8"
          style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(6,182,212,0.08))', border: '1px solid rgba(139,92,246,0.15)' }}>
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: 'var(--accent-violet)' }} />
          <div className="relative z-10">
            <p className="text-xs font-mono tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--accent-violet)' }}>Open Source</p>
            <h2 className="text-3xl md:text-4xl font-display font-black mb-4 text-gradient">Run it yourself</h2>
            <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
              Clone the repo, add your OpenAI API key, and run <code className="px-2 py-0.5 rounded font-mono text-xs" style={{ background: 'rgba(139,92,246,0.15)', color: 'var(--accent-violet)' }}>streamlit run main.py</code>
            </p>
            <motion.a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139,92,246,0.3)' }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold"
              style={{ background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))', color: '#fff' }}>
              <FaGithub size={16} /> Clone from GitHub
            </motion.a>
          </div>
        </motion.div>
      </SectionWrapper>
    </main>
  );
}
