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
        <SectionHeader label="Get to Know Me" title="About Me" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-5xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
            <div className="md:col-span-2 flex justify-center">
              <div className="relative group">
                <motion.div whileHover={{ scale: 1.03 }} className="w-52 h-52 rounded-3xl flex items-center justify-center"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <span className="text-7xl font-display font-bold text-gradient">SM</span>
                </motion.div>
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
                  style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(139,92,246,0.2))' }} />
                <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full animate-float" style={{ background: 'rgba(6,182,212,0.2)' }} />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full animate-float-delayed" style={{ background: 'rgba(139,92,246,0.15)' }} />
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-5" style={{ color: 'var(--text-primary)' }}>
                Hi, I'm <span className="text-gradient">{personalInfo.name}</span> 👋
              </h2>
              <p className="leading-relaxed text-lg mb-7" style={{ color: 'var(--text-secondary)' }}>{personalInfo.bio}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full text-sm font-mono" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.15)', color: 'var(--accent-cyan)' }}>📍 India</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.15)', color: 'var(--accent-emerald)' }}>🎓 IT Student</span>
                <span className="px-4 py-2 rounded-full text-sm font-mono" style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)', color: 'var(--accent-violet)' }}>💼 Open to Work</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-24">
          <SectionHeader label="Journey" title="Milestones" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((m, i) => (
              <motion.div key={m.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-2xl card-hover relative overflow-hidden"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="relative z-10 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                    <m.icon className="text-xl" style={{ color: m.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-bold mb-2 group-hover:text-gradient transition-all" style={{ color: 'var(--text-primary)' }}>{m.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{m.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <SectionHeader label="Passions" title="What Excites Me" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {interests.map((interest, i) => (
            <motion.div key={interest.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl text-center card-hover relative overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                  <interest.icon className="text-2xl" style={{ color: interest.color }} />
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{interest.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
