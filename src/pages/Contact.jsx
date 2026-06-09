import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { personalInfo, faqs } from '../data/portfolio';
import { FaEnvelope, FaLinkedin, FaGithub, FaChevronDown } from 'react-icons/fa';

function ContactCards() {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const methods = [
    { icon: FaEnvelope, title: "Email Me", subtitle: personalInfo.email, action: copyEmail, actionLabel: copied ? "Copied!" : "Copy Email", color: 'var(--accent-coral)' },
    { icon: FaLinkedin, title: "LinkedIn", subtitle: "Let's Connect", action: () => window.open(personalInfo.linkedin, '_blank'), actionLabel: "Open Profile", color: 'var(--accent-teal)' },
    { icon: FaGithub, title: "GitHub", subtitle: "View My Code", action: () => window.open(personalInfo.github, '_blank'), actionLabel: "View Profile", color: 'var(--accent-lavender)' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
      {methods.map((m, i) => (
        <motion.div
          key={m.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.1 }}
          onClick={m.action}
          whileHover={{ y: -6 }}
          className="p-8 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col items-center text-center gap-4"
          style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-color)', color: m.color }}>
            <m.icon size={22} />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{m.title}</h3>
            <p className="text-sm mb-4 truncate max-w-[200px] mx-auto" style={{ color: 'var(--text-muted)' }}>{m.subtitle}</p>
            <span className="text-sm font-semibold px-4 py-2 rounded-full inline-block"
              style={{ background: `${m.color}18`, color: m.color }}>
              {m.actionLabel}
            </span>
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
    } catch {
      setSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setSending(false);
      setTimeout(() => setSent(false), 3000);
    }
  };

  const inputStyle = {
    background: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    fontSize: '1rem',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto mb-28">
      <h2 className="text-3xl font-display font-bold text-center mb-10" style={{ color: 'var(--text-primary)' }}>
        Send a <span className="italic" style={{ color: 'var(--accent-coral)' }}>Message</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" placeholder="Your Name" required value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-5 py-4 rounded-xl focus:outline-none transition-all duration-300"
            style={inputStyle} />
          <input type="email" placeholder="Your Email" required value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-5 py-4 rounded-xl focus:outline-none transition-all duration-300"
            style={inputStyle} />
        </div>
        <input type="text" placeholder="Subject" required value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-5 py-4 rounded-xl focus:outline-none transition-all duration-300"
          style={inputStyle} />
        <textarea placeholder="Your Message" required rows={6} value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-5 py-4 rounded-xl focus:outline-none transition-all duration-300 resize-none"
          style={inputStyle} />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={sending}
          className="w-full py-4 rounded-full font-bold text-base transition-all duration-300 disabled:opacity-60"
          style={{ background: 'var(--accent-coral)', color: '#fff' }}
        >
          {sending ? 'Sending…' : sent ? 'Message Sent ✓' : 'Send Message'}
        </motion.button>
      </form>
    </motion.div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-12 text-center">
        <SectionHeader label="Reference" title="FAQ" />
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="rounded-2xl overflow-hidden border"
            style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
          >
            <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left">
              <span className="font-semibold text-base pr-4" style={{ color: 'var(--text-primary)' }}>{faq.question}</span>
              <FaChevronDown
                className={`flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                style={{ color: openIndex === i ? 'var(--accent-coral)' : 'var(--text-muted)' }}
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-6 pb-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{faq.answer}</p>
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
        <SectionHeader
          label="Get In Touch"
          title="Let's Talk"
          description="Interested in data systems, LLM architectures, interface prototypes, or academic partnerships? Reach out!"
        />

        <ContactCards />
        <ContactForm />
        <FAQSection />
      </SectionWrapper>
    </main>
  );
}
