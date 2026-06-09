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
        <SectionHeader
          label="Expertise"
          title="Skills & Technologies"
          description="A curated stack of frameworks, libraries, and tools I use to build meaningful solutions."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {skillCategories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 border"
                style={isActive ? {
                  background: 'var(--accent-coral)',
                  borderColor: 'var(--accent-coral)',
                  color: '#fff',
                } : {
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)',
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4 }}
                className="relative p-6 rounded-2xl border transition-all duration-300"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: 'var(--accent-coral)' }}>
                    <skill.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold" style={{ color: 'var(--text-primary)' }}>{skill.name}</h3>
                    <p className="text-xs font-medium mt-0.5 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{skill.category}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-coral)' }}>
                    {skill.level}
                  </span>
                  <span className="text-sm font-bold font-mono" style={{ color: 'var(--accent-teal)' }}>{skill.proficiency}%</span>
                </div>

                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.9, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(to right, var(--accent-coral), var(--accent-teal))' }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionWrapper>
    </main>
  );
}
