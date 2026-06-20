"use client";

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { LiquidButton } from "./liquid-glass-button";
import TypeWriter from "../TypeWriter";
import GitHubButton from "./GitHubButton";
import LinkedInButton from "./LinkedInButton";
import { FaDatabase, FaBrain, FaChartBar } from "react-icons/fa";
import { personalInfo } from "../../data/portfolio";

const INJECTED_STYLES = `
  /* Environment Overlays */
  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image: 
          linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  /* Physical materials */
  .text-3d-matte {
      color: var(--text-primary);
      text-shadow: 
          0 10px 30px rgba(0, 229, 255, 0.15), 
          0 2px 4px rgba(0, 229, 255, 0.08);
  }

  .text-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.4) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: 
          drop-shadow(0px 10px 20px rgba(0, 229, 255, 0.1)) 
          drop-shadow(0px 2px 4px rgba(0, 229, 255, 0.05));
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: 
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8)) 
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  /* Deep Physical Card with transparent portal center for Robot splines */
  .premium-depth-card {
      background: radial-gradient(circle at center, transparent 35%, rgba(5, 8, 20, 0.85) 75%),
                  linear-gradient(145deg, rgba(15, 23, 42, 0.35) 0%, rgba(3, 7, 18, 0.9) 100%);
      box-shadow: 
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.08),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
      transition: transform 0.15s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 229, 255, 0.04) 0%, transparent 40%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(16px); 
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.08),
          0 20px 40px -10px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.15),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }
`;

export function CinematicHero({ className, ...props }) {
  const mainCardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!mainCardRef.current) return;
    const rect = mainCardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    mainCardRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
    mainCardRef.current.style.setProperty("--mouse-y", `${mouseY}px`);

    // Normalize mouse coords between -1 and 1
    const xVal = (e.clientX / window.innerWidth - 0.5) * 12; // Max 6 deg either side
    const yVal = (e.clientY / window.innerHeight - 0.5) * 12;
    mainCardRef.current.style.setProperty("--rotate-y", `${xVal}deg`);
    mainCardRef.current.style.setProperty("--rotate-x", `${-yVal}deg`);
  };

  const handleMouseLeave = () => {
    if (!mainCardRef.current) return;
    mainCardRef.current.style.setProperty("--rotate-y", "0deg");
    mainCardRef.current.style.setProperty("--rotate-x", "0deg");
  };

  return (
    <div
      className={cn("relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-transparent text-white font-sans antialiased py-20 px-4 md:px-8", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1200px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme absolute inset-0 z-0 pointer-events-none opacity-40" aria-hidden="true" />

      {/* Hero content card */}
      <motion.div
        ref={mainCardRef}
        initial={{ opacity: 0, y: 80, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(var(--rotate-y, 0deg)) rotateX(var(--rotate-x, 0deg))",
        }}
        className="main-card premium-depth-card relative overflow-hidden flex items-center justify-center pointer-events-auto w-full max-w-6xl min-h-[500px] md:min-h-[600px] rounded-[32px] md:rounded-[40px] p-6 md:p-12 z-20"
      >
        <div className="card-sheen" aria-hidden="true" />

        <div className="relative w-full h-full flex flex-col justify-between lg:grid lg:grid-cols-3 items-center lg:gap-12 z-10 py-6 lg:py-0">
          
          {/* 1. LEFT CONTAINER: Branding, Subtitle, Tagline, CTAs & Socials */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left z-20 w-full lg:max-w-none px-2 lg:px-0"
          >
            <span className="inline-block self-center lg:self-start px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 animate-pulse"
              style={{ background: 'rgba(0, 229, 255, 0.12)', color: 'var(--accent-coral)', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
              Data & Machine Learning
            </span>

            <h2 className="text-[#F8FAFC] text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight leading-none mb-3">
              SHAFAN <span className="text-[#00E5FF] italic">MANAZ</span>
            </h2>

            {/* Typewriter Subtitle */}
            <div className="h-6 mb-6 text-sm md:text-base font-semibold font-sans text-cyan-400">
              <TypeWriter words={['Data Analyst', 'ML Engineer', 'RAG Architect', 'Problem Solver']} delay={2000} />
            </div>

            {/* Tagline Description */}
            <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed mx-auto lg:mx-0 max-w-sm lg:max-w-none mb-8">
              {personalInfo.tagline}
            </p>

            {/* Liquid Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <Link to="/work" className="pointer-events-auto">
                <LiquidButton size="default" className="font-semibold text-white">
                  View My Work
                </LiquidButton>
              </Link>
              <Link to="/contact" className="pointer-events-auto">
                <LiquidButton size="default" variant="outline" className="font-semibold text-white">
                  Get In Touch
                </LiquidButton>
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center lg:justify-start items-center gap-4">
              <GitHubButton />
              <LinkedInButton />
            </div>
          </motion.div>

          {/* 2. MIDDLE CONTAINER: FLOATING WIDGETS OVER ROBOT PORTAL */}
          <div className="order-2 lg:order-2 relative w-full h-[280px] lg:h-[420px] flex items-center justify-center z-10" style={{ transformStyle: "preserve-3d" }}>
            
            {/* Visual core accuracy bubble */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute w-40 h-40 rounded-full border border-cyan-400/10 flex items-center justify-center bg-transparent drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            >
              <div className="text-center z-10 flex flex-col items-center">
                <span className="text-5xl font-extrabold tracking-tighter text-cyan-400 font-mono">85%</span>
                <span className="text-[10px] text-cyan-200/50 uppercase tracking-[0.1em] font-bold mt-1 font-display">Accuracy</span>
              </div>
            </motion.div>

            {/* Floating Glass Badge 1 - RAG */}
            <motion.div 
              animate={{ y: [0, -12, 0], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.2 }}
              className="floating-badge absolute flex top-0 left-[-10px] lg:left-[-40px] floating-ui-badge rounded-xl p-3.5 items-center gap-3 z-30"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#00E5FF]/20 to-neutral-900 flex items-center justify-center border border-[#00E5FF]/30">
                <FaBrain className="text-[#00E5FF]" size={14} />
              </div>
              <div>
                <p className="text-white text-xs font-bold tracking-tight">RAG Pipelines</p>
                <p className="text-cyan-200/40 text-[9px] font-medium">Viability matcher</p>
              </div>
            </motion.div>

            {/* Floating Glass Badge 2 - SQL */}
            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="floating-badge absolute flex bottom-6 right-[-10px] lg:right-[-40px] floating-ui-badge rounded-xl p-3.5 items-center gap-3 z-30"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#3B82F6]/20 to-neutral-900 flex items-center justify-center border border-[#3B82F6]/30">
                <FaDatabase className="text-[#3B82F6]" size={14} />
              </div>
              <div>
                <p className="text-white text-xs font-bold tracking-tight">SQL Systems</p>
                <p className="text-blue-200/40 text-[9px] font-medium">Optimized indexes</p>
              </div>
            </motion.div>

            {/* Floating Glass Badge 3 - Power BI */}
            <motion.div 
              animate={{ y: [0, -6, 0], x: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.8 }}
              className="floating-badge absolute flex bottom-[-20px] left-[10px] floating-ui-badge rounded-xl p-3.5 items-center gap-3 z-30"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#8B5CF6]/20 to-neutral-900 flex items-center justify-center border border-[#8B5CF6]/30">
                <FaChartBar className="text-[#8B5CF6]" size={14} />
              </div>
              <div>
                <p className="text-white text-xs font-bold tracking-tight">Power BI</p>
                <p className="text-purple-200/40 text-[9px] font-medium">Interactive reports</p>
              </div>
            </motion.div>

          </div>

          {/* 3. RIGHT CONTAINER: VERTICAL PORTFOLIO TEXT OVERLAY */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="card-right-text order-1 lg:order-3 flex justify-center lg:justify-end z-20 w-full"
          >
            <h2 className="text-5xl md:text-[5.5rem] lg:text-[6.5rem] font-black uppercase tracking-tighter text-card-silver-matte font-display">
              PORTFOLIO
            </h2>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
