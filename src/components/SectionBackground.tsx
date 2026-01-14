import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface SectionBackgroundProps {
  variant?: 'default' | 'alternate';
}

const SectionBackground = ({ variant = 'default' }: SectionBackgroundProps) => {
  const particles = useMemo(() => 
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
    })), []
  );

  const floatingLines = useMemo(() =>
    [...Array(8)].map((_, i) => ({
      left: 10 + i * 12,
      delay: i * 0.3,
      height: 40 + Math.random() * 60,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: variant === 'default' 
            ? 'linear-gradient(180deg, transparent 0%, hsl(0 85% 45% / 0.03) 50%, transparent 100%)'
            : 'linear-gradient(180deg, hsl(0 85% 45% / 0.02) 0%, hsl(0 85% 45% / 0.05) 50%, hsl(0 85% 45% / 0.02) 100%)',
        }}
      />

      {/* Animated diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
        {[...Array(6)].map((_, i) => (
          <motion.line
            key={`diag-${i}`}
            x1={`${-10 + i * 25}%`}
            y1="0%"
            x2={`${10 + i * 25}%`}
            y2="100%"
            stroke="hsl(0, 85%, 45%)"
            strokeWidth="1"
            strokeDasharray="8 12"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.1 }}
          />
        ))}
      </svg>

      {/* Floating data particles */}
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
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
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

      {/* Vertical pulse lines */}
      {floatingLines.map((line, i) => (
        <motion.div
          key={`vline-${i}`}
          className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary/40 to-transparent"
          style={{
            left: `${line.left}%`,
            height: `${line.height}%`,
            top: '20%',
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: line.delay }}
        >
          {/* Traveling dot */}
          <motion.div
            className="absolute w-2 h-2 -left-[3px] bg-primary rounded-full"
            style={{ boxShadow: '0 0 8px hsl(0 85% 45%)' }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'linear',
              delay: line.delay,
            }}
          />
        </motion.div>
      ))}

      {/* Hexagonal grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        <defs>
          <pattern id="section-hex" width="50" height="43.3" patternUnits="userSpaceOnUse">
            <polygon 
              points="25,0 50,14.4 50,43.3 25,57.7 0,43.3 0,14.4" 
              fill="none" 
              stroke="hsl(0, 85%, 45%)"
              strokeWidth="0.5"
              transform="translate(0, -7.2)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#section-hex)" />
      </svg>

      {/* Corner tech accents */}
      <div className="absolute top-4 left-4">
        <motion.div
          className="w-12 h-[2px] bg-primary/50"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-[2px] h-12 bg-primary/50"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </div>

      <div className="absolute top-4 right-4">
        <motion.div
          className="w-12 h-[2px] bg-primary/50 ml-auto"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          className="w-[2px] h-12 bg-primary/50 ml-auto"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </div>

      {/* Animated scan effect */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Data flow lines on edges */}
      <motion.div
        className="absolute left-0 top-1/4 w-[3px] h-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-0 top-1/4 w-[3px] h-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
};

export default SectionBackground;