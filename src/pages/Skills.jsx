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
        {/* Header */}
        <div className="mb-16">
          <SectionHeader 
            label="Monograph // Technical Index" 
            title="Skills & Technologies" 
            description="A curated index of frameworks, mathematical libraries, and visual tools." 
          />
        </div>

        {/* Categories Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {skillCategories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <motion.button 
                key={cat} 
                whileHover={{ scale: 1.03 }} 
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border"
                style={isActive ? {
                  background: 'var(--text-primary)',
                  borderColor: 'var(--text-primary)',
                  color: 'var(--bg-primary)',
                  fontWeight: 700
                } : {
                  background: 'var(--bg-surface)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-secondary)'
                }}
              >
                [ {cat} ]
              </motion.button>
            );
          })}
        </div>

        {/* Skills Index Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div 
                key={skill.name} 
                layout 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.04 }}
                className="relative p-6 rounded-2xl border transition-all duration-300 hover:bg-elevated"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center border"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    <skill.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold" style={{ color: 'var(--text-primary)' }}>{skill.name}</h3>
                    <p className="text-[9px] uppercase tracking-widest font-mono" style={{ color: 'var(--text-muted)' }}>{skill.category}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className={`level-badge level-${skill.level.toLowerCase()}`}>{skill.level}</span>
                  <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{skill.proficiency}%</span>
                </div>

                {/* Simplified Progress bar */}
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border-color)' }}>
                  <motion.div 
                    initial={{ width: 0 }} 
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }} 
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="h-full rounded-full" 
                    style={{ background: 'var(--accent-cyan)' }} 
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
