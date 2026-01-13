import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const AnimatedBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  // Parallax transforms for orbs
  const orb1X = useTransform(smoothX, [0, dimensions.width], [-50, 50]);
  const orb1Y = useTransform(smoothY, [0, dimensions.height], [-50, 50]);
  const orb2X = useTransform(smoothX, [0, dimensions.width], [30, -30]);
  const orb2Y = useTransform(smoothY, [0, dimensions.height], [30, -30]);
  const orb3X = useTransform(smoothX, [0, dimensions.width], [-25, 25]);
  const orb3Y = useTransform(smoothY, [0, dimensions.height], [25, -25]);

  // Memoized random positions for floating elements
  const floatingDots = useMemo(() => 
    [...Array(30)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
      size: 2 + Math.random() * 3,
    })), []
  );

  const gridLines = useMemo(() => ({
    horizontal: [...Array(10)].map((_, i) => ({ top: (i + 1) * 10, delay: i * 0.1 })),
    vertical: [...Array(14)].map((_, i) => ({ left: (i + 1) * 7, delay: i * 0.08 })),
  }), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* White base with subtle texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(0_85%_40%/0.03)_0%,_transparent_70%)]" />
      
      {/* Animated gradient mesh - subtle for white theme */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, hsl(0 85% 40% / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, hsl(0 70% 40% / 0.06) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(0 60% 35% / 0.04) 0%, transparent 60%)
          `,
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Large animated gradient orbs with parallax - light red tints */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(0 85% 40% / 0.12) 0%, hsl(0 85% 40% / 0.05) 40%, transparent 70%)',
          x: orb1X,
          y: orb1Y,
          left: '5%',
          top: '10%',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(0 70% 45% / 0.1) 0%, transparent 70%)',
          x: orb2X,
          y: orb2Y,
          right: '0%',
          top: '30%',
          filter: 'blur(50px)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(0 60% 50% / 0.08) 0%, transparent 70%)',
          x: orb3X,
          y: orb3Y,
          left: '40%',
          bottom: '5%',
          filter: 'blur(40px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.08]">
        {gridLines.horizontal.map((line, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            style={{ top: `${line.top}%` }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: line.delay }}
          />
        ))}
        {gridLines.vertical.map((line, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary to-transparent"
            style={{ left: `${line.left}%` }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1.5, delay: line.delay }}
          />
        ))}
      </div>

      {/* Floating geometric shapes - diamonds (Assassin's Creed style) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`diamond-${i}`}
          className="absolute border border-primary/20"
          style={{
            width: 15 + i * 8,
            height: 15 + i * 8,
            left: `${12 + i * 14}%`,
            top: `${18 + (i % 3) * 22}%`,
            transform: 'rotate(45deg)',
          }}
          animate={{
            rotate: [45, 405],
            y: [0, -20, 0],
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 25 + i * 3, repeat: Infinity, ease: 'linear' },
            y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* Animated circles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full border border-primary/15"
          style={{
            width: 60 + i * 35,
            height: 60 + i * 35,
            right: `${8 + i * 10}%`,
            bottom: `${12 + i * 14}%`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 4 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Scan lines - subtle for white theme */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent"
        animate={{ top: ['105%', '-5%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 2 }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-primary/25 to-transparent"
        animate={{ left: ['-5%', '105%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      {/* Mouse follow glow - subtle */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(0 85% 40% / 0.06) 0%, hsl(0 85% 40% / 0.02) 30%, transparent 60%)',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          filter: 'blur(30px)',
        }}
      />

      {/* Corner accents - Assassin's Creed style */}
      <div className="absolute top-0 left-0 w-40 h-40">
        <motion.div
          className="absolute top-6 left-6 w-20 h-[2px] bg-gradient-to-r from-primary/50 to-transparent"
          animate={{ scaleX: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-6 left-6 w-[2px] h-20 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
        />
      </div>

      <div className="absolute top-0 right-0 w-40 h-40">
        <motion.div
          className="absolute top-6 right-6 w-20 h-[2px] bg-gradient-to-l from-primary/50 to-transparent"
          animate={{ scaleX: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute top-6 right-6 w-[2px] h-20 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.75 }}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-40 h-40">
        <motion.div
          className="absolute bottom-6 left-6 w-20 h-[2px] bg-gradient-to-r from-primary/50 to-transparent"
          animate={{ scaleX: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute bottom-6 left-6 w-[2px] h-20 bg-gradient-to-t from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.25 }}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-40 h-40">
        <motion.div
          className="absolute bottom-6 right-6 w-20 h-[2px] bg-gradient-to-l from-primary/50 to-transparent"
          animate={{ scaleX: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          className="absolute bottom-6 right-6 w-[2px] h-20 bg-gradient-to-t from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0.7, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.75 }}
        />
      </div>

      {/* Rising floating dots - red tinted */}
      {floatingDots.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full bg-primary/30"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.left}%`,
            top: `${dot.top}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -40, -80],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Hexagon grid pattern - subtle */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="hexagons" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
            <polygon 
              points="30,0 60,17.3 60,46.5 30,63.8 0,46.5 0,17.3" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      {/* Animated circuit-like lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.path
          d="M0,200 L100,200 L100,300 L200,300 L200,400 L350,400"
          stroke="hsl(0, 85%, 40%)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M100%,150 L85%,150 L85%,250 L70%,250 L70%,350 L55%,350"
          stroke="hsl(0, 85%, 40%)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        
        {/* Connecting dots */}
        <motion.circle
          cx="100" cy="200" r="3"
          fill="hsl(0, 85%, 40%)"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.circle
          cx="200" cy="300" r="3"
          fill="hsl(0, 85%, 40%)"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </svg>

      {/* Pulsing rings - center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
            style={{
              width: 180 + i * 120,
              height: 180 + i * 120,
            }}
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.08, 0.2, 0.08],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')]" />
    </div>
  );
};

export default AnimatedBackground;