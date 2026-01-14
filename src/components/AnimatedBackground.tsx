import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useMemo, memo } from 'react';

const AnimatedBackground = memo(() => {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smoother spring config for less jank
  const smoothX = useSpring(mouseX, { damping: 80, stiffness: 50 });
  const smoothY = useSpring(mouseY, { damping: 80, stiffness: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [mouseX, mouseY]);

  // Simpler parallax transforms
  const orb1X = useTransform(smoothX, [0, dimensions.width], [-30, 30]);
  const orb1Y = useTransform(smoothY, [0, dimensions.height], [-30, 30]);
  const orb2X = useTransform(smoothX, [0, dimensions.width], [20, -20]);
  const orb2Y = useTransform(smoothY, [0, dimensions.height], [20, -20]);

  // Reduced floating dots for performance
  const floatingDots = useMemo(() => 
    [...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 4,
      size: 2 + Math.random() * 2,
    })), []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
      {/* White base */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(0_85%_40%/0.02)_0%,_transparent_70%)]" />
      
      {/* Animated gradient orbs - GPU accelerated */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, hsl(0 85% 40% / 0.08) 0%, transparent 70%)',
          x: orb1X,
          y: orb1Y,
          left: '5%',
          top: '10%',
          filter: 'blur(60px)',
          willChange: 'transform',
        }}
      />

      <motion.div
        className="absolute rounded-full"
        style={{
          width: 450,
          height: 450,
          background: 'radial-gradient(circle, hsl(0 70% 45% / 0.06) 0%, transparent 70%)',
          x: orb2X,
          y: orb2Y,
          right: '0%',
          top: '30%',
          filter: 'blur(50px)',
          willChange: 'transform',
        }}
      />

      {/* Floating diamonds - reduced count */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`diamond-${i}`}
          className="absolute border border-primary/15"
          style={{
            width: 12 + i * 6,
            height: 12 + i * 6,
            left: `${15 + i * 20}%`,
            top: `${20 + (i % 2) * 30}%`,
            transform: 'rotate(45deg)',
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Single scan line */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      />

      {/* Mouse follow glow - simplified */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, hsl(0 85% 40% / 0.04) 0%, transparent 60%)',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          filter: 'blur(30px)',
          willChange: 'transform',
        }}
      />

      {/* Corner accents - simplified */}
      <div className="absolute top-6 left-6 w-16 h-[2px] bg-gradient-to-r from-primary/40 to-transparent" />
      <div className="absolute top-6 left-6 w-[2px] h-16 bg-gradient-to-b from-primary/40 to-transparent" />
      <div className="absolute top-6 right-6 w-16 h-[2px] bg-gradient-to-l from-primary/40 to-transparent" />
      <div className="absolute top-6 right-6 w-[2px] h-16 bg-gradient-to-b from-primary/40 to-transparent" style={{ marginLeft: 'auto' }} />
      <div className="absolute bottom-6 left-6 w-16 h-[2px] bg-gradient-to-r from-primary/40 to-transparent" />
      <div className="absolute bottom-6 left-6 w-[2px] h-16 bg-gradient-to-t from-primary/40 to-transparent" />
      <div className="absolute bottom-6 right-6 w-16 h-[2px] bg-gradient-to-l from-primary/40 to-transparent" />
      <div className="absolute bottom-6 right-6 w-[2px] h-16 bg-gradient-to-t from-primary/40 to-transparent" style={{ marginLeft: 'auto' }} />

      {/* Rising dots - reduced */}
      {floatingDots.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute bg-primary/25"
          style={{
            width: dot.size,
            height: dot.size,
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            willChange: 'transform, opacity',
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, -30],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Hexagon grid pattern - static for performance */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
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
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export default AnimatedBackground;