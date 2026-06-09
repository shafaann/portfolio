import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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

// Navigation order for determining slide direction
const pageOrder = ['/', '/work', '/services', '/skills', '/about', '/contact', '/admin', '/foundrybot'];

function getDirection(from, to) {
  const fromIdx = pageOrder.indexOf(from);
  const toIdx = pageOrder.indexOf(to);
  if (fromIdx === -1 || toIdx === -1) return 1;
  return toIdx > fromIdx ? 1 : -1;
}

// Book page-flip transition variants
const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    rotateY: direction > 0 ? 8 : -8,
    x: direction > 0 ? '4%' : '-4%',
    scale: 0.96,
    transformOrigin: direction > 0 ? 'left center' : 'right center',
  }),
  animate: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    transformOrigin: 'center center',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
      opacity: { duration: 0.4 },
    },
  },
  exit: (direction) => ({
    opacity: 0,
    rotateY: direction > 0 ? -8 : 8,
    x: direction > 0 ? '-4%' : '4%',
    scale: 0.96,
    transformOrigin: direction > 0 ? 'right center' : 'left center',
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.6, 1],
      opacity: { duration: 0.3 },
    },
  }),
};

function AnimatedRoutes() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const direction = getDirection(prevPath.current, location.pathname);

  useEffect(() => {
    prevPath.current = location.pathname;
  }, [location.pathname]);

  return (
    <div className="page-transition-container" style={{ minHeight: '100vh' }}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={location.pathname}
          custom={direction}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ perspective: '1200px' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/services" element={<Services />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/foundrybot" element={<FoundryBot />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <MagneticCursor />
        <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color 0.4s ease' }}>
          <ParticleBackground />
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
