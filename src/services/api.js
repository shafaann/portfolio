import axios from 'axios';

const API_BASE = import.meta.env.PROD 
  ? '/api' 
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── Auth ───
export const authAPI = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  verify: () => api.post('/auth/verify'),
};

// ─── Contact ───
export const contactAPI = {
  send: (data) => api.post('/contact', data),
  getMessages: () => api.get('/contact/messages'),
  markRead: (id) => api.patch(`/contact/messages/${id}/read`),
  deleteMessage: (id) => api.delete(`/contact/messages/${id}`),
};

// ─── Portfolio ───
export const portfolioAPI = {
  getAll: () => api.get('/portfolio'),
  getProjects: () => api.get('/portfolio/projects'),
  addProject: (data) => api.post('/portfolio/projects', data),
  updateProject: (id, data) => api.put(`/portfolio/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/portfolio/projects/${id}`),
  updateStats: (data) => api.put('/portfolio/stats', data),
};

export default api;
