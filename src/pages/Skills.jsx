import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import RadialOrbitalTimeline from '../components/ui/radial-orbital-timeline';
import { skills, skillCategories } from '../data/portfolio';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  // Map the portfolio skills to the orbital timeline data structure
  const timelineData = filteredSkills.map((skill) => {
    const globalId = skills.findIndex(s => s.name === skill.name) + 1;
    
    // Connect skills in the same category together
    const related = filteredSkills
      .filter(s => s.category === skill.category && s.name !== skill.name)
      .map(s => skills.findIndex(item => item.name === s.name) + 1);

    return {
      id: globalId,
      title: skill.name,
      date: skill.level, // e.g. "Advanced"
      content: `I possess ${skill.proficiency}% proficiency in ${skill.name}, qualifying as ${skill.level} level.`,
      category: skill.category,
      icon: skill.icon,
      relatedIds: related,
      status: skill.proficiency >= 75 ? "completed" : skill.proficiency >= 50 ? "in-progress" : "pending",
      energy: skill.proficiency,
    };
  });

  return (
    <main className="pt-28 min-h-screen">
      <SectionWrapper>
        <SectionHeader
          label="Expertise Map"
          title="Skills Orbit"
          description="Click on any orbiting skill bubble to analyze my proficiency levels and see related skill nodes."
        />

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 pointer-events-auto relative z-20">
          {skillCategories.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border cursor-pointer"
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

        {/* 3D Circling Orbit Timeline */}
        <div className="relative pointer-events-auto w-full flex justify-center">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </SectionWrapper>
    </main>
  );
}
