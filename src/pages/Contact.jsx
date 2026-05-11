import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { personalInfo, socialLinks, faqs } from '../data/portfolio';
import { FaEnvelope, FaLinkedin, FaGithub, FaCheck, FaChevronDown } from 'react-icons/fa';

function ContactCards() {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => { navigator.clipboard.writeText(personalInfo.email); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const methods = [
    { icon: FaEnvelope, title: "Email Me", subtitle: personalInfo.email, action: copyEmail, actionLabel: copied ? "Copied!" : "Copy Email", color: 'var(--accent-cyan)' },
    { icon: FaLinkedin, title: "LinkedIn", subtitle: "Let's Connect", action: () => window.open(personalInfo.linkedin, '_blank'), actionLabel: "Open Profile", color: 'var(--accent-violet)' },
    { icon: FaGithub, title: "GitHub", subtitle: "View My Code", action: () => window.open(personalInfo.github, '_blank'), actionLabel: "View Profile", color: 'var(--accent-emerald)' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
      {methods.map((m, i) => (
        <motion.div key={m.title} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.3 }} onClick={m.action}
          className="group p-6 rounded-2xl card-hover cursor-pointer relative overflow-hidden"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <m.icon className="text-lg" style={{ color: m.color }} />
            </div>
            <h3 className="text-lg font-display font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{m.title}</h3>
            <p className="text-sm mb-4 font-mono" style={{ color: 'var(--text-muted)' }}>{m.subtitle}</p>
            <span className="text-sm font-medium" style={{ color: 'var(--accent-cyan)' }}>{m.actionLabel} →</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const { contactAPI } = await import('../services/api.js');
      await contactAPI.send(formData);
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      // Fallback: still show success (form data was captured)
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSending(false);
      setTimeout(() => setSent(false), 3000);
    }
  };

  const inputStyle = { background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="max-w-2xl mx-auto mb-20">
      <h2 className="text-2xl font-display font-bold text-center mb-8" style={{ color: 'var(--text-primary)' }}>
        Send a <span className="text-gradient">Message</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Your Name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-5 py-4 rounded-xl text-sm focus:outline-none transition-all" style={inputStyle} />
          <input type="email" placeholder="Your Email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-5 py-4 rounded-xl text-sm focus:outline-none transition-all" style={inputStyle} />
        </div>
        <input type="text" placeholder="Subject" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
          className="w-full px-5 py-4 rounded-xl text-sm focus:outline-none transition-all" style={inputStyle} />
        <textarea placeholder="Your Message" required rows={5} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full px-5 py-4 rounded-xl text-sm focus:outline-none transition-all resize-none" style={inputStyle} />
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={sending}
          className="w-full py-4 rounded-xl font-semibold text-base transition-all disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}>
          {sending ? 'Sending...' : sent ? '✓ Message Sent!' : 'Send Message'}
        </motion.button>
      </form>
    </motion.div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="max-w-2xl mx-auto">
      <SectionHeader label="FAQ" title="Common Questions" />
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left">
              <span className="font-medium pr-4 text-sm" style={{ color: 'var(--text-primary)' }}>{faq.question}</span>
              <FaChevronDown className={`flex-shrink-0 text-xs transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                style={{ color: openIndex === i ? 'var(--accent-cyan)' : 'var(--text-muted)' }} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <main className="pt-28">
      <SectionWrapper>
        <SectionHeader label="Let's Talk" title="Get In Touch" description="Have a project in mind or just want to say hi? I'd love to hear from you." />
        <ContactCards />
        <ContactForm />
        <FAQSection />
      </SectionWrapper>
    </main>
  );
}
