import { useEffect, useRef, useState } from 'react';

export default function MagneticCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.magnetic-item')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.magnetic-item')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    const animate = () => {
      // Dot follows quickly
      dotPos.current.x += (mouse.current.x - dotPos.current.x) * 0.2;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * 0.2;

      // Outline follows with delay
      outlinePos.current.x += (mouse.current.x - outlinePos.current.x) * 0.08;
      outlinePos.current.y += (mouse.current.y - outlinePos.current.y) * 0.08;

      if (dotRef.current) {
        const dotSize = isHovering ? 60 : 8;
        dotRef.current.style.transform = `translate(${dotPos.current.x - dotSize / 2}px, ${dotPos.current.y - dotSize / 2}px)`;
      }

      if (outlineRef.current) {
        const outlineSize = isHovering ? 70 : 40;
        outlineRef.current.style.transform = `translate(${outlinePos.current.x - outlineSize / 2}px, ${outlinePos.current.y - outlineSize / 2}px)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isMobile, isHovering]);

  if (isMobile) return null;

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${isHovering ? 'hovering' : ''}`} />
      <div ref={outlineRef} className={`cursor-outline ${isHovering ? 'hovering' : ''}`} />
    </>
  );
}
