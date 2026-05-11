import {
  FaPython, FaDatabase, FaChartBar, FaGithub, FaLinkedin, FaEnvelope, FaPhone,
  FaBrain, FaCode, FaServer, FaRobot, FaChartPie, FaChartLine, FaGlobe,
  FaPalette, FaCogs, FaLaptopCode
} from 'react-icons/fa';
import {
  SiPandas, SiNumpy, SiScikitlearn,
  SiJupyter, SiStreamlit, SiMysql, SiPostgresql
} from 'react-icons/si';

export const personalInfo = {
  name: "Shafan Manaz",
  title: "Data Analytics",
  tagline: "Transforming Raw Data into Actionable Insights that Drive Real Business Impact",
  bio: "Motivated IT student with a strong interest in data analytics, machine learning, and software development. Skilled in building practical projects and solving real-world problems through technology. Passionate about continuous learning and creating impactful digital solutions.",
  email: "shafanmanaz@gmail.com",
  phone: "+91 78459 61247",
  linkedin: "https://www.linkedin.com/in/shafan-manaz-085b34332",
  github: "https://github.com/shafaann",
  domain: "shafanmanazanalytics.in",
  cvLink: "/Shafan_Manaz_CV.pdf",
};

export const stats = [
  { number: "3+", label: "Projects Completed" },
  { number: "1+", label: "Freelance Clients" },
  { number: "5+", label: "Tech Skills" },
];

function getLevel(proficiency) {
  if (proficiency >= 75) return "Advanced";
  if (proficiency >= 50) return "Intermediate";
  return "Beginner";
}

export const skills = [
  { name: "Python", category: "Programming", icon: FaPython, proficiency: 85, level: "Advanced" },
  { name: "SQL", category: "Database", icon: FaDatabase, proficiency: 80, level: "Advanced" },
  { name: "Power BI", category: "Visualization", icon: FaChartBar, proficiency: 75, level: "Advanced" },
  { name: "Tableau", category: "Visualization", icon: FaChartPie, proficiency: 70, level: "Intermediate" },
  { name: "Machine Learning", category: "AI/ML", icon: FaBrain, proficiency: 75, level: "Advanced" },
  { name: "Pandas", category: "Programming", icon: SiPandas, proficiency: 80, level: "Advanced" },
  { name: "NumPy", category: "Programming", icon: SiNumpy, proficiency: 78, level: "Advanced" },
  { name: "Scikit-learn", category: "AI/ML", icon: SiScikitlearn, proficiency: 72, level: "Intermediate" },
  { name: "Streamlit", category: "Programming", icon: SiStreamlit, proficiency: 70, level: "Intermediate" },
  { name: "MySQL", category: "Database", icon: SiMysql, proficiency: 78, level: "Advanced" },
  { name: "PostgreSQL", category: "Database", icon: SiPostgresql, proficiency: 65, level: "Intermediate" },
  { name: "Jupyter", category: "Tools", icon: SiJupyter, proficiency: 85, level: "Advanced" },
];

export const skillCategories = ["All", "Programming", "Database", "Visualization", "AI/ML", "Tools"];

export const projects = [
  {
    id: 1,
    title: "FlowRoute",
    description: "A smart traffic navigation app that suggests optimal routes based on user mood and real-time conditions. Integrated real-time weather and map APIs to enhance route recommendation accuracy.",
    techStack: ["Python", "API Integration", "Maps API", "Weather API"],
    featured: true,
    color: "cyan",
    details: {
      role: "Full-Stack Developer",
      duration: "2 months",
      challenges: "Integrating multiple real-time APIs and handling edge cases in route optimization algorithms.",
      outcome: "Successfully reduced average route suggestion time by 40% compared to static route systems.",
    },
  },
  {
    id: 2,
    title: "DotedOn",
    description: "Designed a complete UI for a client company using Figma as a freelance project, delivering a professional, user-centered interface focused on usability, visual appeal, and client requirements.",
    techStack: ["Figma", "UI/UX Design", "Freelance"],
    featured: true,
    color: "emerald",
    details: {
      role: "UI/UX Designer",
      duration: "3 weeks",
      challenges: "Understanding client vision and iterating through multiple design revisions while maintaining consistency.",
      outcome: "Delivered a complete design system with 20+ screens, earning positive client feedback and repeat engagement.",
    },
  },
  {
    id: 3,
    title: "FoundryBot",
    description: "An evidence-driven startup viability analysis platform using Retrieval-Augmented Generation (RAG) to evaluate startup ideas against historical datasets. Features vector-based retrieval pipelines for similarity matching and LLM-powered grounded viability analysis.",
    techStack: ["Python", "RAG", "LLM", "Vector DB", "Machine Learning"],
    featured: true,
    color: "violet",
    details: {
      role: "ML Engineer",
      duration: "6 weeks",
      challenges: "Building efficient vector retrieval pipelines and ensuring LLM responses are grounded in factual data.",
      outcome: "Achieved 85% accuracy in startup viability predictions based on historical pattern matching.",
    },
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Data Discovery",
    description: "Understanding the business problem, data sources, and key metrics that matter.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Data Cleaning & Prep",
    description: "Transforming raw data into clean, structured datasets ready for analysis.",
    icon: "🧹",
  },
  {
    step: "03",
    title: "Analysis & Modeling",
    description: "Applying statistical methods and ML models to extract meaningful insights.",
    icon: "📊",
  },
  {
    step: "04",
    title: "Visualization & Delivery",
    description: "Creating compelling dashboards and reports that drive decision-making.",
    icon: "🚀",
  },
];

export const services = [
  {
    title: "Data Analytics & Visualization",
    description: "Transform your raw data into interactive dashboards and insightful visualizations using Power BI, Tableau, and Python.",
    deliverables: ["Interactive Dashboards", "Custom Reports", "KPI Tracking", "Data Storytelling"],
    icon: FaChartBar,
    color: "cyan",
    rate: "₹2,000 – ₹5,000",
    rateType: "per project",
  },
  {
    title: "Machine Learning Solutions",
    description: "Build predictive models and intelligent systems that automate decision-making and uncover hidden patterns in your data.",
    deliverables: ["Predictive Models", "Classification Systems", "Recommendation Engines", "NLP Solutions"],
    icon: FaRobot,
    color: "emerald",
    rate: "₹5,000 – ₹15,000",
    rateType: "per project",
  },
  {
    title: "UI/UX Design",
    description: "Design intuitive, visually appealing user interfaces in Figma that deliver exceptional user experiences.",
    deliverables: ["Wireframes", "High-Fidelity Mockups", "Prototype", "Design System"],
    icon: FaPalette,
    color: "violet",
    rate: "₹3,000 – ₹8,000",
    rateType: "per project",
  },
  {
    title: "Web Development",
    description: "Build responsive, modern web applications using React, Next.js, and other cutting-edge technologies.",
    deliverables: ["Responsive Websites", "Single Page Apps", "Portfolio Sites", "Landing Pages"],
    icon: FaLaptopCode,
    color: "cyan",
    rate: "₹5,000 – ₹12,000",
    rateType: "per project",
  },
  {
    title: "Database Design & Management",
    description: "Design optimized database schemas and manage data infrastructure using MySQL, PostgreSQL, and cloud solutions.",
    deliverables: ["Schema Design", "Query Optimization", "Data Migration", "Backup Solutions"],
    icon: FaDatabase,
    color: "emerald",
    rate: "₹2,000 – ₹6,000",
    rateType: "per project",
  },
  {
    title: "Data Consulting & Training",
    description: "Get expert guidance on data strategy, tool selection, and hands-on training sessions for your team.",
    deliverables: ["Strategy Consultation", "Tool Recommendations", "Team Training", "Process Optimization"],
    icon: FaCogs,
    color: "violet",
    rate: "₹500/hr",
    rateType: "hourly",
  },
];

export const socialLinks = [
  { name: "GitHub", url: "https://github.com/shafaann", icon: FaGithub },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/shafan-manaz-085b34332", icon: FaLinkedin },
  { name: "Email", url: "mailto:shafanmanaz@gmail.com", icon: FaEnvelope },
  { name: "Phone", url: "tel:+917845961247", icon: FaPhone },
];

export const faqs = [
  {
    question: "What tools do you primarily use for data analytics?",
    answer: "I primarily work with Python (Pandas, NumPy, Scikit-learn), SQL, Power BI, and Tableau for end-to-end data analytics workflows.",
  },
  {
    question: "Do you offer freelance services?",
    answer: "Yes! I'm available for freelance projects in data analytics, machine learning, and UI/UX design. Feel free to reach out to discuss your project requirements.",
  },
  {
    question: "What kind of projects are you interested in?",
    answer: "I'm passionate about projects that use data to solve real-world problems — from traffic optimization to startup viability analysis. I especially enjoy RAG-based and ML-driven solutions.",
  },
  {
    question: "How can I reach you for collaboration?",
    answer: "You can email me at shafanmanaz@gmail.com, connect on LinkedIn, or check out my GitHub for project collaborations.",
  },
];
