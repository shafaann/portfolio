import { useRef, useState } from 'react';

export default function SpotlightCard({ children, className = '', style = {}, glowColor = 'rgba(6,182,212,0.15)' }) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      className={className}
      style={{ ...style, position: 'relative', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      {/* Spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 70%)`,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
