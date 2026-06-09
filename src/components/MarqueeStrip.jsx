import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

function MarqueeContent({ items, speed = 30, direction = 1 }) {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useAnimationFrame((_, delta) => {
    if (!contentRef.current) return;
    const contentWidth = contentRef.current.scrollWidth / 2;
    let newX = x.get() - (speed * delta * direction) / 1000;
    if (direction > 0 && newX < -contentWidth) newX = 0;
    if (direction < 0 && newX > 0) newX = -contentWidth;
    x.set(newX);
  });

  const doubled = [...items, ...items];

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div ref={contentRef} style={{ x, display: 'flex', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-3 mx-5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--accent-cyan)', opacity: 0.5 }} />
            <span className="text-sm font-mono tracking-wider" style={{ color: 'var(--text-muted)' }}>{item}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeStrip({ items, className = '' }) {
  return (
    <div className={`relative py-5 overflow-hidden ${className}`}
      style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, var(--bg-primary), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, var(--bg-primary), transparent)' }} />
      <MarqueeContent items={items} speed={28} direction={1} />
    </div>
  );
}
