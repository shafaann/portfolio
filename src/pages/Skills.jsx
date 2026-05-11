import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { skills, skillCategories } from '../data/portfolio';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <main className="pt-28">
      <SectionWrapper>
        <SectionHeader label="Expertise" title="Skills & Technologies" description="The tools and technologies I use to bring ideas to life." />
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {skillCategories.map(cat => (
            <motion.button key={cat} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(cat)}
              className="magnetic-item px-6 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all"
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
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div key={skill.name} layout initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ delay: i * 0.04 }}
                className="group relative p-6 rounded-2xl card-hover overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.05), transparent)' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-13 h-13 rounded-xl flex items-center justify-center"
                      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                      <skill.icon className="text-2xl" style={{ color: 'var(--text-secondary)' }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold" style={{ color: 'var(--text-primary)' }}>{skill.name}</h3>
                      <p className="text-[10px] uppercase tracking-[0.15em] font-mono" style={{ color: 'var(--text-muted)' }}>{skill.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`level-badge level-${skill.level.toLowerCase()}`}>{skill.level}</span>
                    <span className="text-xs font-mono" style={{ color: 'var(--accent-cyan)' }}>{skill.proficiency}%</span>
                  </div>
                  <div className="h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.proficiency}%` }}
                      viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.04, duration: 1, ease: [0.4, 0, 0.2, 1] }}
                      className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))' }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionWrapper>
    </main>
  );
}
