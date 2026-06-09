import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { personalInfo } from '../data/portfolio';
import { FaGraduationCap, FaLightbulb, FaRocket, FaChartLine, FaPython, FaDatabase, FaPalette } from 'react-icons/fa';

const milestones = [
  { icon: FaGraduationCap, title: "IT Student", description: "Currently pursuing a degree in Information Technology, building a strong foundation in computer science and data analytics.", color: "var(--accent-cyan)" },
  { icon: FaChartLine, title: "Data Enthusiast", description: "Passionate about transforming raw data into meaningful insights. Experienced with Python, SQL, Power BI, and Tableau.", color: "var(--accent-emerald)" },
  { icon: FaRocket, title: "Freelance Designer", description: "Completed freelance UI/UX design projects, delivering professional interfaces in Figma with positive client feedback.", color: "var(--accent-violet)" },
  { icon: FaLightbulb, title: "ML & AI Explorer", description: "Built RAG-based AI systems and smart applications using machine learning, LLMs, and vector databases.", color: "var(--accent-rose)" },
];

const interests = [
  { name: "Data Science", icon: FaPython, color: "var(--accent-cyan)" },
  { name: "Machine Learning", icon: FaChartLine, color: "var(--accent-emerald)" },
  { name: "Database Design", icon: FaDatabase, color: "var(--accent-violet)" },
  { name: "UI/UX Design", icon: FaPalette, color: "var(--accent-rose)" },
];

export default function About() {
  return (
    <main className="pt-28">
      <SectionWrapper>
        {/* Header */}
        <div className="mb-16">
          <SectionHeader label="Monograph // Biography" title="About Me" />
        </div>

        {/* Bio Spread */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-5xl mx-auto mb-28">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            {/* Left page graphic */}
            <div className="md:col-span-2 flex justify-center">
              <div className="relative p-6 rounded-3xl border w-64 h-64 flex flex-col justify-between"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <div className="flex justify-between items-start">
                  <div className="print-crosshair" />
                  <span className="text-[9px] font-mono tracking-widest text-muted">// PROFILE</span>
                </div>
                <div className="text-center my-auto">
                  <span className="font-display font-black text-6xl italic text-gradient">SM</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[9px] font-mono tracking-widest text-muted">2020 // 2026</span>
                  <div className="print-crosshair" />
                </div>
              </div>
            </div>

            {/* Right page content */}
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                Hi, I'm <span className="italic">{personalInfo.name}</span>
              </h2>
              <p className="leading-relaxed text-base" style={{ color: 'var(--text-secondary)' }}>
                {personalInfo.bio}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { label: 'India', color: 'var(--accent-cyan)' },
                  { label: 'IT Student', color: 'var(--accent-emerald)' },
                  { label: 'Open to Work', color: 'var(--accent-violet)' }
                ].map(tag => (
                  <span key={tag.label} className="px-4 py-2 rounded-full text-xs font-mono border" 
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: tag.color }}>
                    [ {tag.label} ]
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Milestones */}
        <div className="mb-28">
          <div className="mb-12">
            <SectionHeader label="Chronicle" title="Milestones" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {milestones.map((m, i) => (
              <motion.div 
                key={m.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} 
                transition={{ delay: i * 0.08 }}
                className="p-8 rounded-2xl border flex flex-col justify-between"
                style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-xl border flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: m.color }}>
                    <m.icon size={16} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{m.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-12">
          <SectionHeader label="Catalog // Passions" title="What Excites Me" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {interests.map((interest, i) => (
            <motion.div 
              key={interest.name} 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} 
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border text-center"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
            >
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-4 border"
                style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: interest.color }}>
                <interest.icon size={18} />
              </div>
              <p className="text-xs font-mono tracking-wide" style={{ color: 'var(--text-secondary)' }}>{interest.name.toUpperCase()}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
