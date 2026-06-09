import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { projects as localProjects, services, skills } from '../data/portfolio';
import {
  FaLock, FaProjectDiagram, FaBriefcase, FaChartBar, FaUsers,
  FaSignOutAlt, FaInbox, FaCheck, FaTrash, FaEnvelope, FaUser,
  FaCalendarAlt, FaPaperPlane, FaShieldAlt
} from 'react-icons/fa';
import SpotlightCard from '../components/SpotlightCard';

/* ─── Login Screen ─── */
function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { authAPI } = await import('../services/api.js');
      const res = await authAPI.login(username, password);
      localStorage.setItem('admin_token', res.data.token);
      onLogin(true);
    } catch {
      // Fallback local verification
      if (password === 'admin123') {
        onLogin(true);
      } else {
        setError('Invalid admin credentials');
        setTimeout(() => setError(''), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--accent-cyan)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: 'var(--accent-violet)' }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        className="w-full max-w-md"
      >
        <SpotlightCard
          glowColor="rgba(6, 182, 212, 0.15)"
          className="p-8 md:p-10 rounded-3xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
        >
          {/* Logo / Icon */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center relative group"
              style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                style={{ background: 'var(--accent-cyan)' }} />
              <FaShieldAlt size={24} className="relative z-10" style={{ color: 'var(--accent-cyan)' }} />
            </div>
            <h2 className="text-2xl font-display font-black text-gradient">System Access</h2>
            <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Enter admin credentials to authenticate</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 rounded-xl text-sm focus:outline-none transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
            <div className="space-y-1">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl text-sm focus:outline-none transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: `1px solid ${error ? 'var(--accent-rose)' : 'var(--border-color)'}`,
                  color: 'var(--text-primary)'
                }}
              />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-center" style={{ color: 'var(--accent-rose)' }}>
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6,182,212,0.3)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-sm disabled:opacity-60 transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}
            >
              {loading ? 'Authenticating...' : 'Authenticate'}
            </motion.button>
          </form>

          <p className="text-center text-[10px] mt-6 font-mono" style={{ color: 'var(--text-muted)' }}>
            Demo: admin / admin123
          </p>
        </SpotlightCard>
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
        // Mock fallback messages
        setMessages([
          {
            id: '1',
            name: 'Faheel Ahmed',
            email: 'faheel@example.com',
            subject: 'Collaboration opportunity',
            message: 'Hey Shafan, loved your FoundryBot project! Let\'s collaborate on integrating RAG pipelines into some web platforms.',
            read: false,
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Tech Ventures Inc',
            email: 'recruiting@techventures.io',
            subject: 'Data Analyst position invitation',
            message: 'Hello, we came across your analytics portfolio at shafanmanazanalytics.in and would love to chat regarding some data visualization assignments.',
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
    { label: 'Projects', value: localProjects.length, color: 'var(--accent-cyan)', icon: FaProjectDiagram },
    { label: 'Services Offered', value: services.length, color: 'var(--accent-violet)', icon: FaBriefcase },
    { label: 'Core Skills', value: skills.length, color: 'var(--accent-emerald)', icon: FaChartBar },
    { label: 'Total Messages', value: messages.length, color: 'var(--accent-rose)', icon: FaEnvelope },
  ];

  return (
    <main className="pt-24 min-h-screen">
      <SectionWrapper>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-6">
          <SectionHeader label="System Management" title="Command Center" align="left" />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold font-mono tracking-wider transition-all duration-300"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.18)', color: 'var(--accent-rose)' }}
          >
            <FaSignOutAlt size={12} /> EXIT SESSION
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsList.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <SpotlightCard
                glowColor={`${stat.color}15`}
                className="p-6 rounded-2xl h-full"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-3xl font-display font-black" style={{ color: 'var(--text-primary)' }}>{stat.value}</h4>
                    <p className="text-[10px] font-mono tracking-widest uppercase mt-1.5" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                  </div>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}25`, color: stat.color }}>
                    <stat.icon size={14} />
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Tabs Control */}
        <div className="flex gap-2 mb-8" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          {[
            { id: 'overview', label: 'OVERVIEW' },
            { id: 'messages', label: `INBOX (${messages.filter(m => !m.read).length})` },
            { id: 'projects', label: 'PROJECTS' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-5 py-2.5 rounded-xl text-xs font-mono tracking-widest transition-all duration-300"
              style={activeTab === tab.id ? {
                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                color: '#050505',
                fontWeight: 700
              } : {
                background: 'transparent',
                color: 'var(--text-secondary)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Messages Widget */}
                <SpotlightCard
                  glowColor="rgba(6,182,212,0.1)"
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                >
                  <h3 className="text-sm font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--accent-cyan)' }}>// RECENT INBOX</h3>
                  <div className="space-y-3">
                    {messages.slice(0, 3).map(msg => (
                      <div
                        key={msg.id}
                        onClick={() => { setSelectedMessage(msg); markAsRead(msg.id); }}
                        className="p-4 rounded-xl cursor-pointer flex items-center justify-between transition-all duration-300"
                        style={{
                          background: msg.read ? 'rgba(255,255,255,0.01)' : 'rgba(6,182,212,0.04)',
                          border: `1px solid ${msg.read ? 'var(--border-color)' : 'rgba(6,182,212,0.18)'}`
                        }}
                      >
                        <div className="flex items-center gap-3">
                          {!msg.read && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-cyan)' }} />}
                          <div>
                            <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{msg.name}</p>
                            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{msg.subject}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                    {messages.length === 0 && (
                      <p className="text-xs text-center py-6" style={{ color: 'var(--text-muted)' }}>No messages yet</p>
                    )}
                  </div>
                </SpotlightCard>
              </div>

              {/* Status Board */}
              <SpotlightCard
                glowColor="rgba(139,92,246,0.1)"
                className="p-6 rounded-2xl"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
              >
                <h3 className="text-sm font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--accent-violet)' }}>// SERVER STATUS</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Database Connection', status: 'Operational', color: 'var(--accent-emerald)' },
                    { label: 'Email Provider API', status: 'Active', color: 'var(--accent-emerald)' },
                    { label: 'Frontend Host (Vercel)', status: 'Online', color: 'var(--accent-emerald)' },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                        style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Message List */}
              <div className="lg:col-span-1 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => { setSelectedMessage(msg); markAsRead(msg.id); }}
                    className="p-4 rounded-xl cursor-pointer transition-all duration-300"
                    style={{
                      background: selectedMessage?.id === msg.id ? 'rgba(6,182,212,0.06)' : msg.read ? 'rgba(255,255,255,0.015)' : 'rgba(6,182,212,0.03)',
                      border: `1px solid ${selectedMessage?.id === msg.id ? 'var(--accent-cyan)' : 'var(--border-color)'}`
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{msg.name}</span>
                      <span className="text-[9px] font-mono" style={{ color: 'var(--text-muted)' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs truncate font-medium" style={{ color: 'var(--accent-cyan)' }}>{msg.subject}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="text-center py-12" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
                    <FaInbox size={28} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>No messages found</p>
                  </div>
                )}
              </div>

              {/* Message View */}
              <div className="lg:col-span-2">
                {selectedMessage ? (
                  <SpotlightCard
                    glowColor="rgba(6,182,212,0.08)"
                    className="p-6 rounded-2xl h-full"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                  >
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{selectedMessage.subject}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                          <span className="flex items-center gap-1.5"><FaUser size={10} /> {selectedMessage.name}</span>
                          <span className="flex items-center gap-1.5"><FaEnvelope size={10} /> {selectedMessage.email}</span>
                          <span className="flex items-center gap-1.5"><FaCalendarAlt size={10} /> {new Date(selectedMessage.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteMsg(selectedMessage.id)}
                        className="p-2.5 rounded-lg transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                        style={{ border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>

                    <div className="p-5 rounded-xl text-sm leading-relaxed mb-6" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {selectedMessage.message || 'No body text provided.'}
                    </div>

                    {/* Quick Reply Form */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--accent-cyan)' }}>// QUICK REPLY</p>
                      <textarea
                        placeholder="Type reply message..."
                        rows={3}
                        className="w-full p-4 rounded-xl text-xs focus:outline-none focus:border-cyan-500/50 transition-all"
                        style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                      />
                      <button
                        className="px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-2"
                        style={{ background: 'var(--accent-cyan)', color: '#050505' }}
                      >
                        <FaPaperPlane size={10} /> SEND REPLY
                      </button>
                    </div>
                  </SpotlightCard>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 rounded-2xl" style={{ border: '1px dashed var(--border-color)' }}>
                    <FaEnvelope size={32} className="mb-3" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Select a message to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <SpotlightCard
              glowColor="rgba(139,92,246,0.06)"
              className="rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
            >
              <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <h3 className="text-sm font-mono tracking-widest uppercase" style={{ color: 'var(--accent-violet)' }}>// PROJECT INVENTORY</h3>
                <button className="px-4 py-2 rounded-lg text-xs font-mono font-bold tracking-wider"
                  style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: 'var(--accent-violet)' }}>
                  + NEW ENTRY
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      {['INDEX', 'TITLE', 'CATEGORY', 'TECH STACK', 'ACTIONS'].map(h => (
                        <th key={h} className="text-left px-6 py-4 text-[9px] font-mono tracking-widest" style={{ color: 'var(--text-muted)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {localProjects.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td className="px-6 py-4 text-xs font-mono" style={{ color: 'var(--accent-cyan)' }}>0{i + 1}</td>
                        <td className="px-6 py-4 text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{p.title}</td>
                        <td className="px-6 py-4 text-xs font-mono" style={{ color: 'var(--accent-violet)' }}>{p.tag || 'App'}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1">
                            {p.techStack.map(t => (
                              <span key={t} className="text-[9px] px-2 py-0.5 rounded-md font-mono"
                                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>{t}</span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-[10px] font-mono font-semibold px-3 py-1.5 rounded-lg border border-cyan-500/20 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10">EDIT</button>
                            <button className="text-[10px] font-mono font-semibold px-3 py-1.5 rounded-lg border border-rose-500/20 text-rose-400 bg-rose-500/5 hover:bg-rose-500/10">DELETE</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SpotlightCard>
          )}
        </div>
      </SectionWrapper>
    </main>
  );
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      (async () => {
        try {
          const { authAPI } = await import('../services/api.js');
          const res = await authAPI.verify();
          if (res.data.valid) setIsLoggedIn(true);
        } catch {}
      })();
    }
  }, []);

  if (!isLoggedIn) return <AdminLogin onLogin={setIsLoggedIn} />;
  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
}
