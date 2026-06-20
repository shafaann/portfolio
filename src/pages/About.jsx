import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { personalInfo } from '../data/portfolio';
import { FaGraduationCap, FaLightbulb, FaRocket, FaChartLine, FaPython, FaDatabase, FaPalette } from 'react-icons/fa';

const milestones = [
  { icon: FaGraduationCap, title: "IT Student", description: "Currently pursuing a degree in Information Technology, building a strong foundation in computer science and data analytics.", color: "var(--accent-teal)" },
  { icon: FaChartLine, title: "Data Enthusiast", description: "Passionate about transforming raw data into meaningful insights. Experienced with Python, SQL, Power BI, and Tableau.", color: "var(--accent-sage)" },
  { icon: FaRocket, title: "Freelance Designer", description: "Completed freelance UI/UX design projects, delivering professional interfaces in Figma with positive client feedback.", color: "var(--accent-lavender)" },
  { icon: FaLightbulb, title: "ML & AI Explorer", description: "Built RAG-based AI systems and smart applications using machine learning, LLMs, and vector databases.", color: "var(--accent-coral)" },
];

const interests = [
  { name: "Data Science", icon: FaPython, color: "var(--accent-teal)" },
  { name: "Machine Learning", icon: FaChartLine, color: "var(--accent-sage)" },
  { name: "Database Design", icon: FaDatabase, color: "var(--accent-lavender)" },
  { name: "UI/UX Design", icon: FaPalette, color: "var(--accent-coral)" },
];

export default function About() {
  return (
    <main className="pt-28 pointer-events-none">
      <SectionWrapper>
        <ContainerScroll
          titleComponent={
            <SectionHeader label="Biography" title="About Me" />
          }
        >
          <div className="p-8 h-fit pointer-events-auto bg-[var(--bg-surface)] rounded-2xl space-y-16">
            {/* Bio section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                {/* Avatar Card */}
                <div className="md:col-span-2 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="relative p-8 rounded-3xl border w-64 h-64 flex flex-col items-center justify-center gap-4 animate-pulse"
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
                  >
                    <span className="font-display font-black text-7xl italic text-gradient">SM</span>
                    <div className="flex gap-2">
                      {['coral', 'teal', 'lavender'].map((c, i) => (
                        <div key={i} className="w-2.5 h-2.5 rounded-full"
                          style={{ background: c === 'coral' ? 'var(--accent-coral)' : c === 'teal' ? 'var(--accent-teal)' : 'var(--accent-lavender)' }} />
                      ))}
                    </div>
                    <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>India • 2024</span>
                  </motion.div>
                </div>

                {/* Bio text */}
                <div className="md:col-span-3 space-y-6">
                  <h2 className="text-4xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
                    Hi, I'm <span className="italic" style={{ color: 'var(--accent-coral)' }}>{personalInfo.name}</span>
                  </h2>
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {personalInfo.bio}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {[
                      { label: 'India', color: 'var(--accent-teal)' },
                      { label: 'IT Student', color: 'var(--accent-lavender)' },
                      { label: 'Open to Work', color: 'var(--accent-coral)' }
                    ].map(tag => (
                      <span key={tag.label}
                        className="px-4 py-2 rounded-full text-sm font-semibold border pointer-events-auto"
                        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)', color: tag.color }}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Milestones */}
            <div>
              <SectionHeader label="Journey" title="Milestones" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="p-8 rounded-2xl border flex items-start gap-5 transition-all duration-300 pointer-events-auto"
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="w-12 h-12 rounded-xl border flex-shrink-0 flex items-center justify-center"
                      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: m.color }}>
                      <m.icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{m.title}</h3>
                      <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <SectionHeader label="Passions" title="What Excites Me" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {interests.map((interest, i) => (
                  <motion.div
                    key={interest.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="p-8 rounded-2xl border text-center transition-all duration-300 pointer-events-auto"
                    style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
                  >
                    <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 border"
                      style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: interest.color }}>
                      <interest.icon size={22} />
                    </div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{interest.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ContainerScroll>
      </SectionWrapper>
    </main>
  );
}
