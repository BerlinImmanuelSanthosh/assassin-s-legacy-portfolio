import { motion } from 'framer-motion';
import { ReactNode, useState, useRef } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

const HoverCard = ({ children, className = '' }: HoverCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ willChange: 'transform' }}
    >
      {/* Spotlight effect following cursor */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          left: mousePos.x - 100,
          top: mousePos.y - 100,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, hsl(0 85% 45% / 0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Border trace animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        style={{ overflow: 'visible' }}
      >
        <motion.rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="hsl(0, 85%, 45%)"
          strokeWidth="2"
          strokeDasharray="20 80"
          strokeDashoffset={isHovered ? 0 : 100}
          animate={{
            strokeDashoffset: isHovered ? [100, 0] : 100,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
          }}
        />
      </svg>

      {/* Scan line on hover */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none z-10"
        initial={{ top: '-2px', opacity: 0 }}
        animate={isHovered ? {
          top: ['0%', '100%'],
          opacity: [0, 1, 1, 0],
        } : { top: '-2px', opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />

      {/* Vertical scan */}
      <motion.div
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent pointer-events-none z-10"
        initial={{ left: '-2px', opacity: 0 }}
        animate={isHovered ? {
          left: ['0%', '100%'],
          opacity: [0, 1, 1, 0],
        } : { left: '-2px', opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }}
      />

      {/* Glitch effect on hover */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none z-30"
            style={{ background: 'hsl(0 85% 45% / 0.03)' }}
            animate={{
              opacity: [0, 1, 0],
              x: [0, 2, -2, 0],
            }}
            transition={{ duration: 0.15, repeat: 2 }}
          />
          <motion.div
            className="absolute top-1/4 left-0 right-0 h-[1px] bg-primary/40 pointer-events-none z-30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 0.3 }}
          />
        </>
      )}

      {/* Data stream particles on hover */}
      {isHovered && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary pointer-events-none z-10"
          style={{
            left: `${10 + i * 12}%`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
          initial={{ top: '100%', opacity: 0 }}
          animate={{
            top: '-5%',
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.5 + i * 0.1,
            delay: i * 0.05,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default HoverCard;