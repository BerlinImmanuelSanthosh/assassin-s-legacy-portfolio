import { useEffect, useRef, memo, useCallback } from 'react';

const NanotechBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseSize: number;
    opacity: number;
    targetOpacity: number;
    pulse: number;
    pulseSpeed: number;
    hexPhase: number;
  }

  const createParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 12000), 180);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const baseSize = 1.5 + Math.random() * 2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: baseSize,
        baseSize,
        opacity: 0.1 + Math.random() * 0.4,
        targetOpacity: 0.1 + Math.random() * 0.4,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        hexPhase: Math.random() * Math.PI * 2,
      });
    }
    return particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particlesRef.current = createParticles(width, height);
    };

    resize();

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });

    // Pre-compute colors
    const primaryR = 179, primaryG = 20, primaryB = 20; // hsl(0 85% 40%) approx

    const drawHexagon = (x: number, y: number, r: number, opacity: number, phase: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + phase;
        const px = x + r * Math.cos(angle);
        const py = y + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${opacity * 0.6})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scrollY = window.scrollY;
      const time = performance.now() * 0.001;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Pulse
        p.pulse += p.pulseSpeed;
        const pulseFactor = 0.7 + 0.3 * Math.sin(p.pulse);

        // Mouse interaction - nanotech assembly effect
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 200;

        let extraOpacity = 0;
        let extraSize = 0;

        if (dist < mouseRadius) {
          const influence = 1 - dist / mouseRadius;
          const force = influence * influence;
          // Particles flow toward mouse like assembling nanotech
          p.vx += dx * force * 0.002;
          p.vy += dy * force * 0.002;
          extraOpacity = force * 0.5;
          extraSize = force * 3;
          // Speed limit
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 2) {
            p.vx *= 2 / speed;
            p.vy *= 2 / speed;
          }
        } else {
          // Dampen
          p.vx *= 0.99;
          p.vy *= 0.99;
        }

        const finalOpacity = Math.min(1, (p.opacity + extraOpacity) * pulseFactor);
        const finalSize = (p.baseSize + extraSize) * pulseFactor;

        // Draw nano-hex around particle
        if (finalSize > 2.5) {
          p.hexPhase += 0.005;
          drawHexagon(p.x, p.y, finalSize * 3, finalOpacity * 0.4, p.hexPhase);
        }

        // Draw particle (diamond shape for nanotech feel)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${finalOpacity})`;
        ctx.fillRect(-finalSize / 2, -finalSize / 2, finalSize, finalSize);
        // Glow
        ctx.shadowColor = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${finalOpacity * 0.5})`;
        ctx.shadowBlur = finalSize * 2;
        ctx.fillRect(-finalSize / 2, -finalSize / 2, finalSize, finalSize);
        ctx.restore();
      }

      // Draw connections (nanotech lattice)
      const connectionDist = 120;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = dx * dx + dy * dy;
          if (dist < connectionDist * connectionDist) {
            const opacity = (1 - Math.sqrt(dist) / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      // Nanotech assembly wave - ripple from center
      const waveRadius = ((time * 80) % (Math.max(width, height) * 1.5));
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, waveRadius, 0, Math.PI * 2);
      const waveOpacity = Math.max(0, 0.08 - waveRadius / (Math.max(width, height) * 20));
      ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${waveOpacity})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ willChange: 'auto' }}
    />
  );
});

NanotechBackground.displayName = 'NanotechBackground';

export default NanotechBackground;
