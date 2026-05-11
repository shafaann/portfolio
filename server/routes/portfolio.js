import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAuth } from './auth.js';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, '..', 'data', 'portfolio.json');

// ─── Helpers ───
function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { projects: [], services: [], skills: [], stats: [] };
  }
}

function writeData(data) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  writeData({
    projects: [
      { id: 1, title: "FlowRoute", description: "Route optimization system using ML algorithms for logistics, achieving 30% efficiency improvement.", techStack: ["Python", "Scikit-learn", "Flask", "React"], color: "cyan", featured: true, details: { role: "Full Stack Developer", duration: "3 months", challenges: "Handling real-time geospatial data and optimizing complex route algorithms.", outcome: "30% improvement in delivery efficiency for test logistics data." } },
      { id: 2, title: "DotedOn", description: "E-commerce analytics dashboard with real-time sales tracking and predictive inventory management.", techStack: ["Python", "Power BI", "SQL", "Pandas"], color: "emerald", featured: true, details: { role: "Data Analyst", duration: "2 months", challenges: "Integrating multiple data sources and creating meaningful KPI visualizations.", outcome: "Enabled data-driven decisions, reducing stockout by 25%." } },
      { id: 3, title: "FoundryBot", description: "RAG-based AI chatbot using LangChain, vector embeddings, and Gemini for intelligent document Q&A.", techStack: ["LangChain", "Gemini API", "ChromaDB", "Python"], color: "violet", featured: true, details: { role: "ML Engineer", duration: "4 months", challenges: "Fine-tuning retrieval accuracy and managing large document embeddings.", outcome: "Achieved 92% relevance score in document Q&A responses." } },
    ],
    services: [],
    skills: [],
    stats: [
      { number: "3+", label: "Projects Completed" },
      { number: "2+", label: "Years Experience" },
      { number: "10+", label: "Technologies" },
    ],
  });
}

// ─── PUBLIC routes ───

// GET /api/portfolio — Get all portfolio data
router.get('/', (req, res) => {
  const data = readData();
  res.json(data);
});

// GET /api/portfolio/projects
router.get('/projects', (req, res) => {
  const data = readData();
  res.json(data.projects || []);
});

// GET /api/portfolio/stats
router.get('/stats', (req, res) => {
  const data = readData();
  res.json(data.stats || []);
});

// ─── ADMIN routes (require auth) ───

// POST /api/portfolio/projects — Add project
router.post('/projects', requireAuth, (req, res) => {
  const data = readData();
  const newProject = {
    id: (data.projects.length ? Math.max(...data.projects.map(p => p.id)) + 1 : 1),
    ...req.body,
    createdAt: new Date().toISOString(),
  };
  data.projects.push(newProject);
  writeData(data);
  res.status(201).json(newProject);
});

// PUT /api/portfolio/projects/:id — Update project
router.put('/projects/:id', requireAuth, (req, res) => {
  const data = readData();
  const idx = data.projects.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Project not found' });
  data.projects[idx] = { ...data.projects[idx], ...req.body };
  writeData(data);
  res.json(data.projects[idx]);
});

// DELETE /api/portfolio/projects/:id — Delete project
router.delete('/projects/:id', requireAuth, (req, res) => {
  const data = readData();
  const idx = data.projects.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Project not found' });
  data.projects.splice(idx, 1);
  writeData(data);
  res.json({ success: true });
});

// PUT /api/portfolio/stats — Update stats
router.put('/stats', requireAuth, (req, res) => {
  const data = readData();
  data.stats = req.body;
  writeData(data);
  res.json(data.stats);
});

export default router;
