import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface TechCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const TechCard = ({ children, className = '', delay = 0 }: TechCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Clipped tech container with angled corners */}
      <div 
        className="relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
        }}
      >
        {/* Animated corner accents */}
        <motion.div
          className="absolute top-0 right-0 w-8 h-8"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          <div className="absolute top-0 right-[20px] w-6 h-[2px] bg-primary" />
          <div className="absolute top-[20px] right-0 w-[2px] h-6 bg-primary" />
          <div className="absolute top-[2px] right-[22px] w-[18px] h-[2px] bg-primary/50 rotate-45 origin-right" />
        </motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-8 h-8"
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          <div className="absolute bottom-0 left-[20px] w-6 h-[2px] bg-primary" />
          <div className="absolute bottom-[20px] left-0 w-[2px] h-6 bg-primary" />
          <div className="absolute bottom-[2px] left-[22px] w-[18px] h-[2px] bg-primary/50 rotate-45 origin-left" />
        </motion.div>

        {/* Scanning line effect on hover */}
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent pointer-events-none"
          initial={{ top: '-2px', opacity: 0 }}
          animate={isHovered ? {
            top: ['0%', '100%'],
            opacity: [0, 1, 0],
          } : { top: '-2px', opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        {/* Edge glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 30px hsl(0 85% 45% / 0.1)',
          }}
          animate={{
            boxShadow: isHovered 
              ? 'inset 0 0 40px hsl(0 85% 45% / 0.2)' 
              : 'inset 0 0 30px hsl(0 85% 45% / 0.05)',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10 p-6">
          {children}
        </div>

        {/* Corner dots */}
        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-primary/60" />
        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-primary/60" />
      </div>

      {/* Outer frame lines */}
      <motion.div
        className="absolute -top-1 -left-1 w-4 h-[2px] bg-primary/40"
        animate={{ width: isHovered ? '24px' : '16px' }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute -top-1 -left-1 w-[2px] h-4 bg-primary/40"
        animate={{ height: isHovered ? '24px' : '16px' }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute -bottom-1 -right-1 w-4 h-[2px] bg-primary/40"
        animate={{ width: isHovered ? '24px' : '16px' }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute -bottom-1 -right-1 w-[2px] h-4 bg-primary/40"
        animate={{ height: isHovered ? '24px' : '16px' }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default TechCard;