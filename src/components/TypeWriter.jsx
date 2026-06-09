import { useState, useEffect } from 'react';

export default function TypeWriter({ words, speed = 80, deleteSpeed = 50, pause = 1800, className = '' }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentWord.length) {
          setText(currentWord.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (text.length > 0) {
          setText(currentWord.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex(i => i + 1);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, deleteSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span style={{
        opacity: showCursor ? 1 : 0,
        transition: 'opacity 0.1s',
        color: 'var(--accent-cyan)',
        marginLeft: '2px',
        fontWeight: 300,
      }}>|</span>
    </span>
  );
}
