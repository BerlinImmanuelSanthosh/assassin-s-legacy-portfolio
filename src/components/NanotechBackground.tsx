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
    pulse: number;
    pulseSpeed: number;
    hexPhase: number;
    assembled: boolean;
  }

  const createParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 6000), 300);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const baseSize = 2 + Math.random() * 3;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: baseSize,
        baseSize,
        opacity: 0.4 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        hexPhase: Math.random() * Math.PI * 2,
        assembled: false,
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

    // Theme colors: hsl(0 85% 40%) = rgb(189, 15, 15) approx
    const pR = 189, pG = 15, pB = 15;

    const drawHexagon = (cx: number, cy: number, r: number, opacity: number, rotation: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + rotation;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${pR}, ${pG}, ${pB}, ${opacity})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const drawDiamond = (cx: number, cy: number, size: number, opacity: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(Math.PI / 4);
      
      // Glow
      ctx.shadowColor = `rgba(${pR}, ${pG}, ${pB}, ${opacity * 0.8})`;
      ctx.shadowBlur = size * 4;
      
      ctx.fillStyle = `rgba(${pR}, ${pG}, ${pB}, ${opacity})`;
      ctx.fillRect(-size / 2, -size / 2, size, size);
      
      // Inner bright core
      const coreSize = size * 0.4;
      ctx.fillStyle = `rgba(255, ${100 + Math.floor(opacity * 80)}, ${100 + Math.floor(opacity * 80)}, ${opacity * 0.8})`;
      ctx.fillRect(-coreSize / 2, -coreSize / 2, coreSize, coreSize);
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const time = performance.now() * 0.001;

      // Draw connections first (behind particles)
      const connectionDist = 160;
      const connectionDistSq = connectionDist * connectionDist;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq);
            const opacity = (1 - dist / connectionDist) * 0.35;
            
            // Nanotech lattice style - pulsing connections
            const pulse = Math.sin(time * 2 + i * 0.1) * 0.15 + 0.85;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${pR}, ${pG}, ${pB}, ${opacity * pulse})`;
            ctx.lineWidth = opacity > 0.15 ? 1 : 0.5;
            ctx.stroke();
            
            // Data flow dots along connections
            if (opacity > 0.2 && Math.random() < 0.02) {
              const t = (time * 0.5 + i * 0.1) % 1;
              const flowX = particles[i].x + (particles[j].x - particles[i].x) * t;
              const flowY = particles[i].y + (particles[j].y - particles[i].y) * t;
              ctx.beginPath();
              ctx.arc(flowX, flowY, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 100, 100, ${opacity * 1.5})`;
              ctx.fill();
            }
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Pulse
        p.pulse += p.pulseSpeed;
        const pulseFactor = 0.7 + 0.3 * Math.sin(p.pulse);

        // Mouse interaction - nanotech assembly
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 250;

        let extraSize = 0;
        let extraOpacity = 0;

        if (dist < mouseRadius) {
          const influence = 1 - dist / mouseRadius;
          const force = influence * influence;
          
          // Particles assemble toward cursor like nanotech
          p.vx += dx * force * 0.003;
          p.vy += dy * force * 0.003;
          extraOpacity = force * 0.4;
          extraSize = force * 4;
          p.assembled = dist < mouseRadius * 0.5;
          
          // Speed limit
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > 2.5) {
            p.vx *= 2.5 / speed;
            p.vy *= 2.5 / speed;
          }
        } else {
          p.assembled = false;
          p.vx *= 0.995;
          p.vy *= 0.995;
        }

        const finalOpacity = Math.min(1, (p.opacity + extraOpacity) * pulseFactor);
        const finalSize = (p.baseSize + extraSize) * pulseFactor;

        // Draw nano-hex shell around assembled particles
        if (p.assembled || finalSize > 3.5) {
          p.hexPhase += 0.008;
          const hexRadius = finalSize * (p.assembled ? 4 : 3);
          drawHexagon(p.x, p.y, hexRadius, finalOpacity * 0.5, p.hexPhase);
          
          // Second rotating hex layer for assembled particles
          if (p.assembled) {
            drawHexagon(p.x, p.y, hexRadius * 1.4, finalOpacity * 0.25, -p.hexPhase * 0.5);
          }
        }

        // Draw the diamond particle
        drawDiamond(p.x, p.y, finalSize, finalOpacity);
      }

      // Nanotech assembly wave ripples from center
      const waveSpeed = 120;
      for (let w = 0; w < 2; w++) {
        const waveRadius = ((time * waveSpeed + w * 500) % (Math.max(width, height) * 1.8));
        const waveOpacity = Math.max(0, 0.12 - waveRadius / (Math.max(width, height) * 15));
        if (waveOpacity > 0.01) {
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${pR}, ${pG}, ${pB}, ${waveOpacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Mouse glow aura
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        gradient.addColorStop(0, `rgba(${pR}, ${pG}, ${pB}, 0.08)`);
        gradient.addColorStop(0.5, `rgba(${pR}, ${pG}, ${pB}, 0.03)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(mx - 200, my - 200, 400, 400);
      }

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
    />
  );
});

NanotechBackground.displayName = 'NanotechBackground';

export default NanotechBackground;
