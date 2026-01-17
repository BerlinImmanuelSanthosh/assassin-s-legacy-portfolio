import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useMemo, memo, useCallback } from 'react';

const ParallaxBackground = memo(() => {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Optimized spring config for smooth performance
  const springConfig = { damping: 30, stiffness: 20, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 60);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 60);
    });
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Parallax transforms - smoother with CSS transforms
  const layer1Y = useTransform(scrollY, [0, 3000], [0, -400]);
  const layer2Y = useTransform(scrollY, [0, 3000], [0, -250]);
  const layer3Y = useTransform(scrollY, [0, 3000], [0, -150]);

  // Memoized elements for performance
  const glowOrbs = useMemo(() => [
    { size: 700, x: '-5%', y: '0%', opacity: 0.25, delay: 0 },
    { size: 500, x: '70%', y: '30%', opacity: 0.2, delay: 2 },
    { size: 600, x: '20%', y: '80%', opacity: 0.22, delay: 4 },
    { size: 450, x: '60%', y: '150%', opacity: 0.18, delay: 1 },
    { size: 550, x: '10%', y: '200%', opacity: 0.2, delay: 3 },
  ], []);

  const dataStreams = useMemo(() => 
    [...Array(10)].map((_, i) => ({
      left: 8 + i * 10,
      delay: i * 0.2,
      height: 150 + Math.random() * 200,
      top: 5 + (i % 3) * 100,
    })), []
  );

  const floatingDiamonds = useMemo(() => 
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 250,
      size: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    })), []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* LAYER 1: Large glowing orbs with parallax */}
      <motion.div 
        className="absolute w-full h-[350%]"
        style={{ y: layer1Y, willChange: 'transform' }}
      >
        {glowOrbs.map((orb, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: `radial-gradient(circle, hsl(0 85% 50% / ${orb.opacity}) 0%, hsl(0 85% 45% / ${orb.opacity * 0.5}) 40%, transparent 70%)`,
              filter: 'blur(40px)',
              x: i % 2 === 0 ? smoothMouseX : useTransform(smoothMouseX, v => -v * 0.5),
              y: i % 2 === 0 ? smoothMouseY : useTransform(smoothMouseY, v => -v * 0.5),
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          />
        ))}
      </motion.div>

      {/* LAYER 2: Data streams with traveling particles */}
      <motion.div 
        className="absolute w-full h-[350%]"
        style={{ y: layer2Y, willChange: 'transform' }}
      >
        {dataStreams.map((stream, i) => (
          <div
            key={`stream-${i}`}
            className="absolute"
            style={{
              left: `${stream.left}%`,
              top: `${stream.top}%`,
              width: 2,
              height: stream.height,
            }}
          >
            {/* Static glow line */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 0%, hsl(0 85% 50% / 0.5) 20%, hsl(0 85% 50% / 0.7) 50%, hsl(0 85% 50% / 0.5) 80%, transparent 100%)',
                boxShadow: '0 0 10px hsl(0 85% 50% / 0.4)',
              }}
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scaleY: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: stream.delay,
                ease: 'easeInOut',
              }}
            />
            {/* Traveling diamond */}
            <motion.div
              className="absolute w-4 h-4 -left-[7px] bg-primary"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                boxShadow: '0 0 20px hsl(0 85% 50%), 0 0 40px hsl(0 85% 50% / 0.6)',
              }}
              animate={{ top: ['-10%', '110%'] }}
              transition={{
                duration: 2.5 + i * 0.3,
                repeat: Infinity,
                ease: 'linear',
                delay: stream.delay,
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* LAYER 3: Floating diamonds */}
      <motion.div 
        className="absolute w-full h-[350%]"
        style={{ y: layer3Y, willChange: 'transform' }}
      >
        {floatingDiamonds.map((diamond, i) => (
          <motion.div
            key={`diamond-${i}`}
            className="absolute bg-primary"
            style={{
              left: `${diamond.left}%`,
              top: `${diamond.top}%`,
              width: diamond.size,
              height: diamond.size,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow: '0 0 12px hsl(0 85% 50% / 0.8)',
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: diamond.duration,
              repeat: Infinity,
              delay: diamond.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Horizontal scan lines - very visible */}
      <motion.div
        className="fixed inset-x-0 h-[4px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 85% 50% / 0.7) 15%, hsl(0 85% 50%) 50%, hsl(0 85% 50% / 0.7) 85%, transparent 100%)',
          boxShadow: '0 0 30px hsl(0 85% 50% / 0.6), 0 0 60px hsl(0 85% 50% / 0.3)',
        }}
        animate={{ top: ['-2%', '102%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="fixed inset-x-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 85% 50% / 0.5) 20%, hsl(0 85% 50% / 0.8) 50%, hsl(0 85% 50% / 0.5) 80%, transparent 100%)',
          boxShadow: '0 0 20px hsl(0 85% 50% / 0.4)',
        }}
        animate={{ top: ['102%', '-2%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear', delay: 2.5 }}
      />

      {/* Circuit pattern - more visible */}
      <div className="absolute inset-0 h-[350%] opacity-[0.08]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
              <path 
                d="M 10 40 L 30 40 L 40 30 L 50 40 L 70 40 M 40 10 L 40 30 M 40 50 L 40 70" 
                stroke="hsl(0, 85%, 50%)" 
                strokeWidth="1.5" 
                fill="none"
              />
              <circle cx="10" cy="40" r="3" fill="hsl(0, 85%, 50%)" />
              <circle cx="70" cy="40" r="3" fill="hsl(0, 85%, 50%)" />
              <circle cx="40" cy="10" r="3" fill="hsl(0, 85%, 50%)" />
              <circle cx="40" cy="70" r="3" fill="hsl(0, 85%, 50%)" />
              <circle cx="40" cy="40" r="2" fill="hsl(0, 85%, 50%)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Hexagonal grid - more visible */}
      <svg className="absolute inset-0 w-full h-[350%] opacity-[0.05]">
        <defs>
          <pattern id="hexGrid" width="50" height="43" patternUnits="userSpaceOnUse" patternTransform="scale(1.8)">
            <polygon 
              points="25,0 50,14.4 50,38.7 25,53.1 0,38.7 0,14.4" 
              fill="none" 
              stroke="hsl(0, 85%, 50%)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>

      {/* Corner HUD brackets - pulsing */}
      <div className="fixed top-4 left-4 z-10">
        <motion.div 
          className="w-16 h-[3px] bg-primary"
          style={{ boxShadow: '0 0 10px hsl(0 85% 50%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div 
          className="w-[3px] h-16 bg-primary"
          style={{ boxShadow: '0 0 10px hsl(0 85% 50%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="fixed top-4 right-4 z-10 flex flex-col items-end">
        <motion.div 
          className="w-16 h-[3px] bg-primary"
          style={{ boxShadow: '0 0 10px hsl(0 85% 50%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
        <motion.div 
          className="w-[3px] h-16 bg-primary ml-auto"
          style={{ boxShadow: '0 0 10px hsl(0 85% 50%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      <div className="fixed bottom-4 left-4 z-10">
        <motion.div 
          className="w-[3px] h-16 bg-primary"
          style={{ boxShadow: '0 0 10px hsl(0 85% 50%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
        />
        <motion.div 
          className="w-16 h-[3px] bg-primary"
          style={{ boxShadow: '0 0 10px hsl(0 85% 50%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
        />
      </div>
      <div className="fixed bottom-4 right-4 z-10 flex flex-col items-end">
        <motion.div 
          className="w-[3px] h-16 bg-primary ml-auto"
          style={{ boxShadow: '0 0 10px hsl(0 85% 50%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
        />
        <motion.div 
          className="w-16 h-[3px] bg-primary"
          style={{ boxShadow: '0 0 10px hsl(0 85% 50%)' }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 1.2 }}
        />
      </div>

      {/* Center pulsing glow */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(0 85% 50% / 0.12) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;
