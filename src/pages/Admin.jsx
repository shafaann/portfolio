import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { projects as localProjects, services, skills } from '../data/portfolio';
import {
  FaProjectDiagram, FaBriefcase, FaChartBar,
  FaSignOutAlt, FaInbox, FaTrash, FaEnvelope, FaUser,
  FaCalendarAlt, FaPaperPlane, FaShieldAlt, FaEye, FaEyeSlash
} from 'react-icons/fa';

const ADMIN_USER = 'shafan';
const ADMIN_PASS = 'shafan4747';

/* ─── Login Screen ─── */
function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // small delay for UX
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('admin_token', 'local_auth_ok');
      onLogin(true);
    } else {
      setError('Invalid credentials. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}>

      {/* Background decorative blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--accent-coral)' }} />
      <motion.div
        animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: 'var(--accent-teal)' }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className="w-full max-w-md"
      >
        <div className="p-8 md:p-10 rounded-3xl"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', boxShadow: '0 24px 64px rgba(0,0,0,0.08)' }}>

          {/* Icon + Title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
              style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.25)' }}>
              <FaShieldAlt size={26} style={{ color: 'var(--accent-coral)' }} />
            </div>
            <h2 className="text-3xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>
              Admin <span className="italic" style={{ color: 'var(--accent-coral)' }}>Access</span>
            </h2>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="relative">
              <FaUser size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-5 py-4 rounded-xl text-base focus:outline-none transition-all duration-300"
                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            {/* Password with show/hide */}
            <div className="relative">
              <FaShieldAlt size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-4 rounded-xl text-base focus:outline-none transition-all duration-300"
                style={{
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${error ? 'var(--accent-coral)' : 'var(--border-color)'}`,
                  color: 'var(--text-primary)'
                }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors duration-200"
                style={{ color: 'var(--text-muted)' }}>
                {showPass ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-sm text-center font-medium" style={{ color: 'var(--accent-coral)' }}>
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full font-bold text-base disabled:opacity-60 transition-all duration-300 mt-2"
              style={{ background: 'var(--accent-coral)', color: '#fff' }}
            >
              {loading ? 'Verifying…' : 'Sign In'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Dashboard Screen ─── */
function Dashboard({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { contactAPI } = await import('../services/api.js');
        const res = await contactAPI.getMessages();
        setMessages(res.data);
      } catch {
        setMessages([
          {
            id: '1',
            name: 'Faheel Ahmed',
            email: 'faheel@example.com',
            subject: 'Collaboration opportunity',
            message: "Hey Shafan, loved your FoundryBot project! Let's collaborate on integrating RAG pipelines into some web platforms.",
            read: false,
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Tech Ventures Inc',
            email: 'recruiting@techventures.io',
            subject: 'Data Analyst position invitation',
            message: 'Hello, we came across your analytics portfolio and would love to chat regarding some data visualization assignments.',
            read: true,
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
        ]);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    onLogout();
  };

  const markAsRead = async (id) => {
    try {
      const { contactAPI } = await import('../services/api.js');
      await contactAPI.markRead(id);
    } catch {}
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMsg = async (id) => {
    try {
      const { contactAPI } = await import('../services/api.js');
      await contactAPI.deleteMessage(id);
    } catch {}
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  const statsList = [
    { label: 'Projects', value: localProjects.length, color: 'var(--accent-coral)', icon: FaProjectDiagram },
    { label: 'Services', value: services.length, color: 'var(--accent-teal)', icon: FaBriefcase },
    { label: 'Core Skills', value: skills.length, color: 'var(--accent-lavender)', icon: FaChartBar },
    { label: 'Messages', value: messages.length, color: 'var(--accent-gold)', icon: FaEnvelope },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'messages', label: `Inbox (${messages.filter(m => !m.read).length})` },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <main className="pt-24 min-h-screen">
      <SectionWrapper>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
          <SectionHeader label="Admin" title="Command Center" align="left" />
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', color: 'var(--accent-coral)' }}
          >
            <FaSignOutAlt size={14} /> Sign Out
          </motion.button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statsList.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl border flex items-center justify-between"
              style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}
            >
              <div>
                <h4 className="text-4xl font-display font-black" style={{ color: 'var(--text-primary)' }}>{stat.value}</h4>
                <p className="text-sm font-medium mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}12`, border: `1px solid ${stat.color}30`, color: stat.color }}>
                <stat.icon size={18} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={activeTab === tab.id ? {
                background: 'var(--accent-coral)',
                color: '#fff',
              } : {
                background: 'transparent',
                color: 'var(--text-secondary)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Messages */}
              <div className="lg:col-span-2 p-6 rounded-2xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <h3 className="text-base font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <FaInbox size={16} style={{ color: 'var(--accent-coral)' }} /> Recent Inbox
                </h3>
                <div className="space-y-3">
                  {messages.slice(0, 3).map(msg => (
                    <div
                      key={msg.id}
                      onClick={() => { setSelectedMessage(msg); markAsRead(msg.id); setActiveTab('messages'); }}
                      className="p-4 rounded-xl cursor-pointer flex items-center justify-between transition-all duration-300 hover:bg-elevated"
                      style={{
                        background: msg.read ? 'var(--bg-elevated)' : 'rgba(0,229,255,0.05)',
                        border: `1px solid ${msg.read ? 'var(--border-color)' : 'rgba(0,229,255,0.2)'}`
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {!msg.read && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--accent-coral)' }} />}
                        <div>
                          <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{msg.name}</p>
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{msg.subject}</p>
                        </div>
                      </div>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <p className="text-sm text-center py-6" style={{ color: 'var(--text-muted)' }}>No messages yet</p>
                  )}
                </div>
              </div>

              {/* Status Board */}
              <div className="p-6 rounded-2xl border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                <h3 className="text-base font-bold mb-5" style={{ color: 'var(--text-primary)' }}>System Status</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Database', status: 'Operational', color: 'var(--accent-sage)' },
                    { label: 'Email API', status: 'Active', color: 'var(--accent-sage)' },
                    { label: 'Frontend Host', status: 'Online', color: 'var(--accent-sage)' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div key="messages" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message List */}
              <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => { setSelectedMessage(msg); markAsRead(msg.id); }}
                    className="p-4 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      background: selectedMessage?.id === msg.id ? 'rgba(0,229,255,0.06)' : 'var(--bg-surface)',
                      border: `1px solid ${selectedMessage?.id === msg.id ? 'var(--accent-coral)' : 'var(--border-color)'}`
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{msg.name}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm truncate font-medium" style={{ color: 'var(--accent-coral)' }}>{msg.subject}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-12 rounded-2xl" style={{ border: '1px dashed var(--border-color)' }}>
                    <FaInbox size={28} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No messages found</p>
                  </div>
                )}
              </div>

              {/* Message View */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <div className="p-6 rounded-2xl border h-full" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selectedMessage.subject}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                          <span className="flex items-center gap-1.5"><FaUser size={11} /> {selectedMessage.name}</span>
                          <span className="flex items-center gap-1.5"><FaEnvelope size={11} /> {selectedMessage.email}</span>
                          <span className="flex items-center gap-1.5"><FaCalendarAlt size={11} /> {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteMsg(selectedMessage.id)}
                        className="p-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                        style={{ border: '1px solid var(--border-color)', color: 'var(--accent-coral)', background: 'rgba(0,229,255,0.06)' }}
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>

                    <div className="p-5 rounded-xl text-base leading-relaxed mb-6"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {selectedMessage.message || 'No body text provided.'}
                    </div>

                    {/* Quick Reply */}
                    <div className="space-y-3">
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Quick Reply</p>
                      <textarea
                        placeholder="Type your reply..."
                        rows={3}
                        className="w-full p-4 rounded-xl text-base focus:outline-none transition-all"
                        style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                      />
                      <button
                        className="px-6 py-3 rounded-full text-base font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105"
                        style={{ background: 'var(--accent-coral)', color: '#fff' }}
                      >
                        <FaPaperPlane size={14} /> Send Reply
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 rounded-2xl" style={{ border: '1px dashed var(--border-color)' }}>
                    <FaEnvelope size={36} className="mb-4" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-base" style={{ color: 'var(--text-muted)' }}>Select a message to view details</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div key="projects" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-2xl overflow-hidden border" style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-color)' }}>
              <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Project Inventory</h3>
                <button className="px-5 py-2.5 rounded-full text-sm font-semibold"
                  style={{ background: 'var(--accent-coral)', color: '#fff' }}>
                  + New Entry
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      {['#', 'Title', 'Category', 'Tech Stack', 'Actions'].map(h => (
                        <th key={h} className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {localProjects.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td className="px-6 py-4 text-sm font-bold" style={{ color: 'var(--accent-coral)' }}>0{i + 1}</td>
                        <td className="px-6 py-4 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{p.title}</td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-semibold px-3 py-1 rounded-full"
                            style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-coral)' }}>
                            {p.tag || 'App'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 flex-wrap">
                            {p.techStack.slice(0, 3).map(t => (
                              <span key={t} className="text-xs px-2 py-0.5 rounded-md font-medium"
                                style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors"
                              style={{ borderColor: 'rgba(46,196,182,0.3)', color: 'var(--accent-teal)', background: 'rgba(46,196,182,0.06)' }}>Edit</button>
                            <button className="text-sm font-semibold px-3 py-1.5 rounded-lg border transition-colors"
                              style={{ borderColor: 'rgba(0,229,255,0.3)', color: 'var(--accent-coral)', background: 'rgba(0,229,255,0.06)' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </SectionWrapper>
    </main>
  );
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token === 'local_auth_ok') setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) return <AdminLogin onLogin={setIsLoggedIn} />;
  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
}
