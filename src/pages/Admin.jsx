import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper, { SectionHeader } from '../components/SectionWrapper';
import { projects as localProjects, services, skills } from '../data/portfolio';
import { FaLock, FaProjectDiagram, FaBriefcase, FaChartBar, FaUsers, FaSignOutAlt, FaInbox, FaCheck, FaTrash } from 'react-icons/fa';

/* ─── Login ─── */
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
      // Fallback demo login
      if (password === 'admin123') {
        onLogin(true);
      } else {
        setError('Invalid credentials');
        setTimeout(() => setError(''), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(6,182,212,0.2)' }}>
            <FaLock size={24} style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <h2 className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Admin Dashboard</h2>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Enter credentials to access</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-4 rounded-xl text-sm focus:outline-none transition-all"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-xl text-sm focus:outline-none transition-all"
            style={{ background: 'var(--bg-card)', border: `1px solid ${error ? 'var(--accent-rose)' : 'var(--border-color)'}`, color: 'var(--text-primary)' }} />
          {error && <p className="text-sm" style={{ color: 'var(--accent-rose)' }}>{error}</p>}
          <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-base disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }}>
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
        <p className="text-center text-xs mt-6 font-mono" style={{ color: 'var(--text-muted)' }}>Default: admin / admin123</p>
      </motion.div>
    </div>
  );
}

/* ─── Dashboard ─── */
function Dashboard({ onLogout }) {
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    (async () => {
      try {
        const { contactAPI } = await import('../services/api.js');
        const res = await contactAPI.getMessages();
        setMessages(res.data);
      } catch {
        // Demo messages if server unavailable
        setMessages([
          { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Project Inquiry', read: false, createdAt: new Date().toISOString() },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', subject: 'Freelance Opportunity', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
        ]);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    onLogout();
  };

  const dashStats = [
    { icon: FaProjectDiagram, label: 'Projects', value: localProjects.length, color: 'var(--accent-cyan)' },
    { icon: FaBriefcase, label: 'Services', value: services.length, color: 'var(--accent-violet)' },
    { icon: FaChartBar, label: 'Skills', value: skills.length, color: 'var(--accent-emerald)' },
    { icon: FaUsers, label: 'Messages', value: messages.length, color: 'var(--accent-rose)' },
  ];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'messages', label: `Messages (${messages.filter(m => !m.read).length})` },
    { key: 'projects', label: 'Projects' },
  ];

  return (
    <main className="pt-28">
      <SectionWrapper>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <SectionHeader label="Admin" title="Dashboard" align="left" />
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium"
            style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.15)', color: 'var(--accent-rose)' }}>
            <FaSignOutAlt size={12} /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {dashStats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
              <stat.icon size={20} style={{ color: stat.color }} className="mb-3" />
              <p className="text-2xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
              <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className="px-4 py-2 rounded-lg text-xs font-mono transition-all"
              style={activeTab === tab.key
                ? { background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))', color: '#050505' }
                : { background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }
              }>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <h3 className="font-display font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Recent Activity</h3>
            <div className="space-y-3">
              {messages.slice(0, 5).map(msg => (
                <div key={msg.id} className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: msg.read ? 'transparent' : 'rgba(6,182,212,0.04)', border: '1px solid var(--border-color)' }}>
                  <div className="flex items-center gap-3">
                    {!msg.read && <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-cyan)' }} />}
                    <div>
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{msg.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{msg.subject}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-sm text-center py-8" style={{ color: 'var(--text-muted)' }}>No messages yet</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-3">
            {messages.map(msg => (
              <div key={msg.id} className="p-5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.read && <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent-cyan)' }} />}
                      <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{msg.name}</h4>
                      <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>{msg.email}</span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--accent-cyan)' }}>{msg.subject}</p>
                    {msg.message && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{msg.message}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {!msg.read && (
                      <button onClick={async () => {
                        try { const { contactAPI } = await import('../services/api.js'); await contactAPI.markRead(msg.id); } catch {}
                        setMessages(prev => prev.map(m => m.id === msg.id ? {...m, read: true} : m));
                      }} className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(6,182,212,0.08)', color: 'var(--accent-cyan)' }}>
                        <FaCheck size={10} />
                      </button>
                    )}
                    <button onClick={async () => {
                      try { const { contactAPI } = await import('../services/api.js'); await contactAPI.deleteMessage(msg.id); } catch {}
                      setMessages(prev => prev.filter(m => m.id !== msg.id));
                    }} className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(244,63,94,0.08)', color: 'var(--accent-rose)' }}>
                      <FaTrash size={10} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="text-center py-16 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <FaInbox size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No messages yet</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
            <div className="p-5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <h3 className="font-display font-bold" style={{ color: 'var(--text-primary)' }}>Projects</h3>
              <button className="px-4 py-2 rounded-lg text-xs font-medium"
                style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))', border: '1px solid rgba(6,182,212,0.2)', color: 'var(--accent-cyan)' }}>
                + Add Project
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    {['ID', 'Title', 'Tech', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[10px] uppercase tracking-wider font-mono" style={{ color: 'var(--text-muted)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {localProjects.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td className="px-5 py-4 text-sm font-mono" style={{ color: 'var(--accent-cyan)' }}>#{p.id}</td>
                      <td className="px-5 py-4 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.title}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1">
                          {p.techStack.slice(0, 2).map(t => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>{t}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--accent-cyan)', background: 'rgba(6,182,212,0.08)' }}>Edit</button>
                          <button className="text-xs px-3 py-1.5 rounded-lg" style={{ color: 'var(--accent-rose)', background: 'rgba(244,63,94,0.08)' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </SectionWrapper>
    </main>
  );
}

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check existing token
    const token = localStorage.getItem('admin_token');
    if (token) {
      (async () => {
        try {
          const { authAPI } = await import('../services/api.js');
          const res = await authAPI.verify();
          if (res.data.valid) setIsLoggedIn(true);
        } catch { /* token invalid */ }
      })();
    }
  }, []);

  if (!isLoggedIn) return <AdminLogin onLogin={setIsLoggedIn} />;
  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
}
