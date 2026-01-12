import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms for orbs
  const orb1X = useTransform(smoothX, [0, window.innerWidth], [-30, 30]);
  const orb1Y = useTransform(smoothY, [0, window.innerHeight], [-30, 30]);
  const orb2X = useTransform(smoothX, [0, window.innerWidth], [20, -20]);
  const orb2Y = useTransform(smoothY, [0, window.innerHeight], [20, -20]);
  const orb3X = useTransform(smoothX, [0, window.innerWidth], [-15, 15]);
  const orb3Y = useTransform(smoothY, [0, window.innerHeight], [15, -15]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Animated gradient orbs with parallax */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(0 85% 45% / 0.4) 0%, transparent 70%)',
          x: orb1X,
          y: orb1Y,
          left: '10%',
          top: '20%',
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(0 70% 40% / 0.3) 0%, transparent 70%)',
          x: orb2X,
          y: orb2Y,
          right: '5%',
          top: '40%',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(0 60% 50% / 0.3) 0%, transparent 70%)',
          x: orb3X,
          y: orb3Y,
          left: '50%',
          bottom: '10%',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating geometric shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border border-primary/20"
          style={{
            width: 40 + i * 20,
            height: 40 + i * 20,
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            rotate: i * 15,
          }}
          animate={{
            rotate: [i * 15, i * 15 + 360],
            y: [0, -20, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
            y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* Animated scan lines */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        animate={{
          top: ['-5%', '105%'],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{
          top: ['105%', '-5%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="absolute inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        animate={{
          left: ['-5%', '105%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Mouse follow glow */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(0 85% 45% / 0.08) 0%, transparent 60%)',
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <motion.div
          className="absolute top-4 left-4 w-16 h-[1px] bg-gradient-to-r from-primary/50 to-transparent"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-4 left-4 w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </div>

      <div className="absolute top-0 right-0 w-32 h-32">
        <motion.div
          className="absolute top-4 right-4 w-16 h-[1px] bg-gradient-to-l from-primary/50 to-transparent"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-4 right-4 w-[1px] h-16 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32">
        <motion.div
          className="absolute bottom-4 left-4 w-16 h-[1px] bg-gradient-to-r from-primary/50 to-transparent"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-[1px] h-16 bg-gradient-to-t from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        />
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32">
        <motion.div
          className="absolute bottom-4 right-4 w-16 h-[1px] bg-gradient-to-l from-primary/50 to-transparent"
          animate={{ scaleX: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-4 right-4 w-[1px] h-16 bg-gradient-to-t from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      {/* Floating dots */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Hexagon grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon 
              points="25,0 50,14.4 50,38.6 25,53 0,38.6 0,14.4" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              className="text-primary"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      {/* Glowing lines connecting points */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <motion.line
          x1="10%"
          y1="20%"
          x2="30%"
          y2="40%"
          stroke="hsl(0, 85%, 45%)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.line
          x1="70%"
          y1="30%"
          x2="90%"
          y2="60%"
          stroke="hsl(0, 85%, 45%)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.line
          x1="40%"
          y1="70%"
          x2="60%"
          y2="90%"
          stroke="hsl(0, 85%, 45%)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
