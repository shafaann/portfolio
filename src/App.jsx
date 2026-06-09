import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MagneticCursor from './components/MagneticCursor';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Work from './pages/Work';
import Services from './pages/Services';
import Skills from './pages/Skills';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

import FoundryBot from './pages/FoundryBot';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/skills" element={<PageTransition><Skills /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><Admin /></PageTransition>} />
        <Route path="/foundrybot" element={<PageTransition><FoundryBot /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <MagneticCursor />
        <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.4s ease' }}>
          {/* Particle Animation Background */}
          <ParticleBackground />

          {/* Ambient glow */}
          <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', filter: 'blur(100px)' }}
            />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)', filter: 'blur(80px)' }}
            />
          </div>

          <div className="relative" style={{ zIndex: 1 }}>
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
