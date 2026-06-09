import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '', duration = 1600 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const num = parseInt(value);

  useEffect(() => {
    if (!inView || isNaN(num)) return;
    let start = 0;
    const step = duration / num;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= num) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, num, duration]);

  return (
    <span ref={ref}>
      {isNaN(num) ? value : count}{suffix}
    </span>
  );
}
