import { motion } from 'framer-motion';
import { useMemo, memo } from 'react';

interface SectionBackgroundProps {
  variant?: 'default' | 'alternate';
}

const SectionBackground = memo(({ variant = 'default' }: SectionBackgroundProps) => {
  const particles = useMemo(() => 
    [...Array(12)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
    })), []
  );

  const floatingLines = useMemo(() =>
    [...Array(5)].map((_, i) => ({
      left: 15 + i * 18,
      delay: i * 0.4,
      height: 30 + Math.random() * 40,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ willChange: 'transform' }}>
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: variant === 'default' 
            ? 'linear-gradient(180deg, transparent 0%, hsl(0 85% 45% / 0.02) 50%, transparent 100%)'
            : 'linear-gradient(180deg, hsl(0 85% 45% / 0.015) 0%, hsl(0 85% 45% / 0.04) 50%, hsl(0 85% 45% / 0.015) 100%)',
        }}
      />

      {/* Diagonal lines - reduced */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12]">
        {[...Array(4)].map((_, i) => (
          <motion.line
            key={`diag-${i}`}
            x1={`${-5 + i * 30}%`}
            y1="0%"
            x2={`${15 + i * 30}%`}
            y2="100%"
            stroke="hsl(0, 85%, 45%)"
            strokeWidth="1"
            strokeDasharray="8 16"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: i * 0.15 }}
          />
        ))}
      </svg>

      {/* Floating particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute bg-primary"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: particle.size,
            height: particle.size,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            willChange: 'transform, opacity',
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Vertical pulse lines with dots */}
      {floatingLines.map((line, i) => (
        <motion.div
          key={`vline-${i}`}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{
            left: `${line.left}%`,
            height: `${line.height}%`,
            top: '25%',
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: line.delay }}
        >
          <motion.div
            className="absolute w-2 h-2 -left-[3px] bg-primary"
            style={{ 
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              boxShadow: '0 0 6px hsl(0 85% 45%)',
            }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'linear',
              delay: line.delay,
            }}
          />
        </motion.div>
      ))}

      {/* Corner accents */}
      <div className="absolute top-4 left-4">
        <motion.div
          className="w-10 h-[2px] bg-primary/40"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="w-[2px] h-10 bg-primary/40"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      </div>

      <div className="absolute top-4 right-4">
        <motion.div
          className="w-10 h-[2px] bg-primary/40 ml-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="w-[2px] h-10 bg-primary/40 ml-auto"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      </div>

      {/* Scan effect */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      />

      {/* Edge data flows */}
      <motion.div
        className="absolute left-0 top-1/3 w-[2px] h-1/3 bg-gradient-to-b from-transparent via-primary/25 to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-0 top-1/3 w-[2px] h-1/3 bg-gradient-to-b from-transparent via-primary/25 to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
      />
    </div>
  );
});

SectionBackground.displayName = 'SectionBackground';

export default SectionBackground;