import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useMemo, memo } from 'react';

const ParallaxBackground = memo(() => {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for mouse
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 30 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 100);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 100);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Parallax transforms for different layers
  const layer1Y = useTransform(scrollY, [0, 5000], [0, -800]);
  const layer2Y = useTransform(scrollY, [0, 5000], [0, -500]);
  const layer3Y = useTransform(scrollY, [0, 5000], [0, -300]);
  const scanLineY = useTransform(scrollY, [0, 5000], [0, -200]);

  // Memoized particles
  const floatingParticles = useMemo(() => 
    [...Array(25)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 300,
      size: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4,
    })), []
  );

  const dataStreams = useMemo(() => 
    [...Array(8)].map((_, i) => ({
      left: 10 + i * 12,
      delay: i * 0.3,
      height: 200 + Math.random() * 300,
    })), []
  );

  const diagonalLines = useMemo(() => 
    [...Array(6)].map((_, i) => ({
      offset: i * 18,
      delay: i * 0.2,
    })), []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Large animated gradient mesh - Layer 1 (slowest parallax) */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer1Y, willChange: 'transform' }}
      >
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(0 85% 45% / 0.12) 0%, transparent 60%)',
            left: '-10%',
            top: '5%',
            filter: 'blur(80px)',
            x: smoothMouseX,
            y: smoothMouseY,
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(0 70% 40% / 0.1) 0%, transparent 60%)',
            right: '-5%',
            top: '40%',
            filter: 'blur(70px)',
            x: useTransform(smoothMouseX, v => -v * 0.5),
            y: useTransform(smoothMouseY, v => -v * 0.5),
          }}
          animate={{
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(0 90% 50% / 0.08) 0%, transparent 60%)',
            left: '30%',
            top: '120%',
            filter: 'blur(90px)',
          }}
          animate={{
            x: [-50, 50, -50],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(0 80% 45% / 0.1) 0%, transparent 60%)',
            right: '20%',
            top: '200%',
            filter: 'blur(60px)',
          }}
          animate={{
            y: [-30, 30, -30],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Data streams - Layer 2 (medium parallax) */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer2Y, willChange: 'transform' }}
      >
        {dataStreams.map((stream, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-[2px]"
            style={{
              left: `${stream.left}%`,
              height: stream.height,
              top: `${10 + i * 35}%`,
              background: 'linear-gradient(180deg, transparent 0%, hsl(0 85% 45% / 0.4) 20%, hsl(0 85% 45% / 0.6) 50%, hsl(0 85% 45% / 0.4) 80%, transparent 100%)',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scaleY: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: stream.delay,
              ease: 'easeInOut',
            }}
          >
            {/* Traveling dot on stream */}
            <motion.div
              className="absolute w-3 h-3 -left-[5px] bg-primary"
              style={{
                clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                boxShadow: '0 0 15px hsl(0 85% 45%), 0 0 30px hsl(0 85% 45% / 0.5)',
              }}
              animate={{ top: ['0%', '100%'] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'linear',
                delay: stream.delay,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Diagonal scan lines - Layer 3 (faster parallax) */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: layer3Y, willChange: 'transform' }}
      >
        <svg className="absolute inset-0 w-full h-[400%] opacity-30">
          {diagonalLines.map((line, i) => (
            <motion.line
              key={`diag-${i}`}
              x1={`${line.offset}%`}
              y1="0%"
              x2={`${line.offset + 30}%`}
              y2="100%"
              stroke="hsl(0, 85%, 45%)"
              strokeWidth="1.5"
              strokeDasharray="15 25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                delay: line.delay + i * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating particles throughout the page */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: scanLineY, willChange: 'transform' }}
      >
        {floatingParticles.map((particle, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-primary"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow: '0 0 8px hsl(0 85% 45% / 0.6)',
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.3, 0.8, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Horizontal scan lines */}
      <motion.div
        className="absolute inset-x-0 h-[3px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 85% 45% / 0.6) 20%, hsl(0 85% 45% / 0.8) 50%, hsl(0 85% 45% / 0.6) 80%, transparent 100%)',
          boxShadow: '0 0 20px hsl(0 85% 45% / 0.5)',
        }}
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-x-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 85% 45% / 0.4) 30%, hsl(0 85% 45% / 0.5) 50%, hsl(0 85% 45% / 0.4) 70%, transparent 100%)',
        }}
        animate={{ top: ['105%', '-5%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear', delay: 3 }}
      />

      {/* Circuit board pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg className="w-full h-[400%]">
          <defs>
            <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
              <path 
                d="M 10 50 L 40 50 L 50 40 L 60 50 L 90 50 M 50 10 L 50 40 M 50 60 L 50 90" 
                stroke="hsl(0, 85%, 45%)" 
                strokeWidth="1" 
                fill="none"
              />
              <circle cx="10" cy="50" r="3" fill="hsl(0, 85%, 45%)" />
              <circle cx="90" cy="50" r="3" fill="hsl(0, 85%, 45%)" />
              <circle cx="50" cy="10" r="3" fill="hsl(0, 85%, 45%)" />
              <circle cx="50" cy="90" r="3" fill="hsl(0, 85%, 45%)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Hexagonal grid overlay */}
      <svg className="absolute inset-0 w-full h-[400%] opacity-[0.025]">
        <defs>
          <pattern id="hexGrid" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon 
              points="30,0 60,17.3 60,46.5 30,63.8 0,46.5 0,17.3" 
              fill="none" 
              stroke="hsl(0, 85%, 45%)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexGrid)" />
      </svg>

      {/* Glowing corner brackets - fixed to viewport */}
      <div className="fixed top-6 left-6 z-10">
        <motion.div 
          className="w-20 h-[3px] bg-gradient-to-r from-primary to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div 
          className="w-[3px] h-20 bg-gradient-to-b from-primary to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="fixed top-6 right-6 z-10 flex flex-col items-end">
        <motion.div 
          className="w-20 h-[3px] bg-gradient-to-l from-primary to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div 
          className="w-[3px] h-20 bg-gradient-to-b from-primary to-transparent ml-auto"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </div>
      <div className="fixed bottom-6 left-6 z-10">
        <motion.div 
          className="w-[3px] h-20 bg-gradient-to-t from-primary to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        <motion.div 
          className="w-20 h-[3px] bg-gradient-to-r from-primary to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </div>
      <div className="fixed bottom-6 right-6 z-10 flex flex-col items-end">
        <motion.div 
          className="w-[3px] h-20 bg-gradient-to-t from-primary to-transparent ml-auto"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
        <motion.div 
          className="w-20 h-[3px] bg-gradient-to-l from-primary to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      {/* Pulsing center glow */}
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(0 85% 45% / 0.06) 0%, transparent 50%)',
          filter: 'blur(60px)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
});

ParallaxBackground.displayName = 'ParallaxBackground';

export default ParallaxBackground;
