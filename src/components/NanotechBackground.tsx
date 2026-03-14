import { useEffect, useRef, memo, useCallback } from 'react';

const NanotechBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
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
    orbitAngle: number;
    orbitSpeed: number;
    orbitRadius: number;
    originX: number;
    originY: number;
  }

  const createParticles = useCallback((width: number, height: number) => {
    const count = Math.min(Math.floor((width * height) / 6000), 300);
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const baseSize = 2 + Math.random() * 3;
      const ox = Math.random() * width;
      const oy = Math.random() * height;
      particles.push({
        x: ox,
        y: oy,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: baseSize,
        baseSize,
        opacity: 0.4 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025,
        hexPhase: Math.random() * Math.PI * 2,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitSpeed: 0.002 + Math.random() * 0.006,
        orbitRadius: 20 + Math.random() * 60,
        originX: ox,
        originY: oy,
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

    window.addEventListener('resize', resize, { passive: true });

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
      
      ctx.shadowColor = `rgba(${pR}, ${pG}, ${pB}, ${opacity * 0.8})`;
      ctx.shadowBlur = size * 4;
      
      ctx.fillStyle = `rgba(${pR}, ${pG}, ${pB}, ${opacity})`;
      ctx.fillRect(-size / 2, -size / 2, size, size);
      
      const coreSize = size * 0.4;
      ctx.fillStyle = `rgba(255, ${100 + Math.floor(opacity * 80)}, ${100 + Math.floor(opacity * 80)}, ${opacity * 0.8})`;
      ctx.fillRect(-coreSize / 2, -coreSize / 2, coreSize, coreSize);
      
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const time = performance.now() * 0.001;

      // Draw connections
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
            const pulse = Math.sin(time * 2 + i * 0.1) * 0.15 + 0.85;
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${pR}, ${pG}, ${pB}, ${opacity * pulse})`;
            ctx.lineWidth = opacity > 0.15 ? 1 : 0.5;
            ctx.stroke();
            
            // Data flow dots
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

      // Update and draw particles — autonomous orbit movement
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Orbit around origin point
        p.orbitAngle += p.orbitSpeed;
        p.x = p.originX + Math.cos(p.orbitAngle) * p.orbitRadius + p.vx * Math.sin(time * 0.5 + i);
        p.y = p.originY + Math.sin(p.orbitAngle) * p.orbitRadius + p.vy * Math.cos(time * 0.5 + i);

        // Slowly drift origins
        p.originX += Math.sin(time * 0.1 + i * 0.3) * 0.1;
        p.originY += Math.cos(time * 0.1 + i * 0.5) * 0.1;

        // Wrap origins
        if (p.originX < -40) p.originX = width + 40;
        if (p.originX > width + 40) p.originX = -40;
        if (p.originY < -40) p.originY = height + 40;
        if (p.originY > height + 40) p.originY = -40;

        // Pulse
        p.pulse += p.pulseSpeed;
        const pulseFactor = 0.7 + 0.3 * Math.sin(p.pulse);

        const finalOpacity = Math.min(1, p.opacity * pulseFactor);
        const finalSize = p.baseSize * pulseFactor;

        // Draw hex shell for larger particles
        if (finalSize > 3.5) {
          p.hexPhase += 0.008;
          const hexRadius = finalSize * 3;
          drawHexagon(p.x, p.y, hexRadius, finalOpacity * 0.4, p.hexPhase);
        }

        // Periodically "assemble" clusters autonomously
        const clusterPhase = Math.sin(time * 0.3 + i * 0.7);
        if (clusterPhase > 0.8) {
          const hexRadius = finalSize * 4;
          drawHexagon(p.x, p.y, hexRadius, finalOpacity * 0.5, p.hexPhase);
          drawHexagon(p.x, p.y, hexRadius * 1.4, finalOpacity * 0.2, -p.hexPhase * 0.5);
        }

        drawDiamond(p.x, p.y, finalSize, finalOpacity);
      }

      // Nanotech assembly wave ripples from center
      const waveSpeed = 120;
      for (let w = 0; w < 3; w++) {
        const waveRadius = ((time * waveSpeed + w * 400) % (Math.max(width, height) * 1.8));
        const waveOpacity = Math.max(0, 0.15 - waveRadius / (Math.max(width, height) * 12));
        if (waveOpacity > 0.01) {
          ctx.beginPath();
          ctx.arc(width / 2, height / 2, waveRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${pR}, ${pG}, ${pB}, ${waveOpacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
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
