import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glowOnHover?: boolean;
}

const AnimatedCard = ({ children, className = '', delay = 0, glowOnHover = true }: AnimatedCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      {glowOnHover && isHovered && (
        <motion.div
          className="absolute pointer-events-none z-0"
          style={{
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, hsl(0 85% 45% / 0.3) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, hsl(0 85% 45% / 0.5), transparent, hsl(0 85% 45% / 0.3))',
          backgroundSize: '200% 200%',
        }}
        animate={isHovered ? {
          backgroundPosition: ['0% 0%', '100% 100%'],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Glass background */}
      <div className="glass-card relative z-10 h-full p-6">
        {children}
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
