import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Arrays for active elements
    let droplets = [];
    let splashes = [];
    let clouds = [];       // Drifting background clouds
    let clickClouds = [];  // Interactive clouds spawned on click
    let birds = [];        // Flying birds

    const DROP_COUNT = 80;
    const MOUSE = { x: -9999, y: -9999, radius: 120 };
    let wind = -0.4;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      MOUSE.x = e.clientX;
      MOUSE.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);
    
    const onMouseLeave = () => {
      MOUSE.x = -9999;
      MOUSE.y = -9999;
    };
    window.addEventListener('mouseleave', onMouseLeave);

    // Drifting Fluffy Cloud Class (Visible shapes made of connected circles)
    class DriftingCloud {
      constructor(y, size, speed) {
        this.x = Math.random() * canvas.width;
        this.y = y;
        this.size = size; // radius of core circle
        this.speed = speed;
        this.opacity = Math.random() * 0.06 + 0.04;
      }
      update() {
        this.x += this.speed;
        if (this.x - this.size * 3 > canvas.width) {
          this.x = -this.size * 3;
        }
      }
      draw() {
        const isDark = themeRef.current === 'dark';
        ctx.save();
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(15, 23, 42, ${this.opacity})`;
        ctx.beginPath();
        
        // Draw a fluffy cluster of circles
        const r = this.size;
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.arc(this.x - r * 0.65, this.y + r * 0.15, r * 0.7, 0, Math.PI * 2);
        ctx.arc(this.x + r * 0.65, this.y + r * 0.15, r * 0.7, 0, Math.PI * 2);
        ctx.arc(this.x - r * 1.1, this.y + r * 0.35, r * 0.5, 0, Math.PI * 2);
        ctx.arc(this.x + r * 1.1, this.y + r * 0.35, r * 0.5, 0, Math.PI * 2);
        
        ctx.fill();
        ctx.restore();
      }
    }

    // Cloud spawned on Click (explodes softly and expands)
    class ClickCloud {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.maxRadius = Math.random() * 40 + 35;
        this.alpha = 0.5;
        this.speed = Math.random() * 1.5 + 1;
      }
      update() {
        this.radius += this.speed;
        this.alpha -= 0.012;
      }
      draw() {
        if (this.alpha <= 0) return;
        const isDark = themeRef.current === 'dark';
        ctx.save();
        ctx.fillStyle = isDark ? `rgba(0, 229, 255, ${this.alpha * 0.3})` : `rgba(59, 130, 246, ${this.alpha * 0.3})`;
        ctx.beginPath();
        const r = this.radius;
        // Exploding puff cluster
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.arc(this.x - r * 0.5, this.y, r * 0.7, 0, Math.PI * 2);
        ctx.arc(this.x + r * 0.5, this.y, r * 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Animated Flying Bird Class (drifts across screen, wings flap dynamically)
    class FlyingBird {
      constructor(startX, startY, speedX, speedY) {
        this.x = startX;
        this.y = startY;
        this.vx = speedX;
        this.vy = speedY;
        this.wingSpeed = Math.random() * 0.15 + 0.12;
        this.wingPhase = Math.random() * Math.PI;
        this.size = Math.random() * 6 + 7;
        this.alpha = 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.wingPhase += this.wingSpeed;
        
        // Face wings outwards slightly or adjust vertical drift
        this.vy += Math.sin(this.wingPhase) * 0.05;

        // Fade out as they fly offscreen
        if (this.x > canvas.width || this.y < -50 || this.x < -100) {
          this.alpha -= 0.02;
        }
      }
      draw() {
        const isDark = themeRef.current === 'dark';
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.strokeStyle = isDark ? '#00E5FF' : '#2563EB'; // electric blue/cyan bird
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Glowing effect for bird
        ctx.shadowBlur = 4;
        ctx.shadowColor = isDark ? '#00E5FF' : '#2563EB';

        // Wing flapping calculation
        const flapHeight = Math.sin(this.wingPhase) * this.size * 0.8;

        ctx.beginPath();
        // Draw flapping vector bird ("V" shape with curved joints)
        ctx.moveTo(this.x - this.size, this.y - flapHeight);
        ctx.quadraticCurveTo(this.x - this.size * 0.4, this.y - flapHeight * 0.2, this.x, this.y);
        ctx.quadraticCurveTo(this.x + this.size * 0.4, this.y - flapHeight * 0.2, this.x + this.size, this.y - flapHeight);
        ctx.stroke();

        ctx.restore();
      }
    }

    // RippleSplash effect
    class RippleSplash {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.maxRadius = Math.random() * 6 + 3;
        this.color = color;
        this.alpha = 0.8;
        this.speed = Math.random() * 0.25 + 0.25;
      }
      update() {
        this.radius += this.speed;
        this.alpha -= 0.025;
      }
      draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius, this.radius * 0.3, 0, 0, Math.PI * 2);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 0.6;
        ctx.stroke();
        ctx.restore();
      }
    }

    // Drizzle rain droplet
    class DrizzleDrop {
      constructor() {
        this.init(true);
      }
      init(randomY = false) {
        this.x = Math.random() * (canvas.width + 200) - 100;
        this.y = randomY ? Math.random() * canvas.height : -30;
        this.length = Math.random() * 10 + 6;
        this.speed = Math.random() * 3 + 4;
        this.width = Math.random() * 0.6 + 0.2;
        this.opacity = Math.random() * 0.2 + 0.05;
        this.color = Math.random() > 0.5 ? 'rgba(0, 229, 255,' : 'rgba(59, 130, 246,';
      }
      update() {
        this.y += this.speed;
        this.x += wind;

        const dx = this.x - MOUSE.x;
        const dy = this.y - MOUSE.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < MOUSE.radius) {
          const force = (MOUSE.radius - distance) / MOUSE.radius;
          this.x += (dx / distance) * force * 2.5;
        }

        if (this.y > canvas.height) {
          if (Math.random() > 0.9) {
            splashes.push(new RippleSplash(this.x, canvas.height - 2, this.color + '0.3)'));
          }
          this.init(false);
        }
      }
      draw() {
        const isDark = themeRef.current === 'dark';
        const finalOpacity = isDark ? this.opacity : this.opacity * 0.4;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + wind * 1.5, this.y + this.length);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color + `${finalOpacity})`;
        ctx.stroke();
      }
    }

    // Initialize large drifting background clouds
    clouds.push(new DriftingCloud(120, 80, 0.12));
    clouds.push(new DriftingCloud(240, 110, 0.08));
    clouds.push(new DriftingCloud(80, 60, 0.16));
    clouds.push(new DriftingCloud(320, 95, 0.06));

    // Populate droplets
    for (let i = 0; i < DROP_COUNT; i++) {
      droplets.push(new DrizzleDrop());
    }

    // Interactive Trigger: Spawns a Click-Cloud and a Flock of Birds flying off
    const onClick = (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;

      // 1. Add interactive cloud burst at click position
      clickClouds.push(new ClickCloud(clickX, clickY));

      // 2. Spawn a flock of 3-5 electric birds rising and flying off to the right
      const count = Math.floor(Math.random() * 3) + 3;
      for (let i = 0; i < count; i++) {
        birds.push(
          new FlyingBird(
            clickX + (Math.random() - 0.5) * 40,
            clickY + (Math.random() - 0.5) * 40,
            Math.random() * 2 + 1.5, // vx (flying right)
            -(Math.random() * 1.5 + 1.2) // vy (rising up)
          )
        );
      }
    };
    window.addEventListener('click', onClick);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw large drifting background clouds
      clouds.forEach(c => {
        c.update();
        c.draw();
      });

      // 2. Draw & update click-triggered expanding clouds
      for (let i = clickClouds.length - 1; i >= 0; i--) {
        const cc = clickClouds[i];
        cc.update();
        cc.draw();
        if (cc.alpha <= 0) clickClouds.splice(i, 1);
      }

      // 3. Draw & update rain droplets
      droplets.forEach(d => {
        d.update();
        d.draw();
      });

      // 4. Draw & update clicks ripples
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        s.update();
        s.draw();
        if (s.alpha <= 0) splashes.splice(i, 1);
      }

      // 5. Draw & update interactive birds
      for (let i = birds.length - 1; i >= 0; i--) {
        const b = birds[i];
        b.update();
        b.draw();
        if (b.alpha <= 0) birds.splice(i, 1);
      }

      wind = -0.4 + Math.sin(Date.now() * 0.0004) * 0.15;
      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
