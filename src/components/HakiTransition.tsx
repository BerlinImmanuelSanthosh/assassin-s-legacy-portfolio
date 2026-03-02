import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useState, useEffect } from 'react';

interface HakiTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

const HakiTransition = ({ isActive, onComplete }: HakiTransitionProps) => {
  // Use useEffect with timer for reliable completion
  useEffect(() => {
    if (!isActive) return;
    const timer = setTimeout(() => {
      onComplete();
    }, 800);
    return () => clearTimeout(timer);
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Full white flash impact */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 1, 1, 0.8, 0],
            }}
            transition={{ duration: 0.8, times: [0, 0.05, 0.1, 0.2, 0.5, 1], ease: 'easeOut' }}
          />

          {/* Dark haki vignette */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, hsl(0 85% 15% / 0.95) 50%, hsl(0 0% 0%) 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0.95, 0.95, 0],
            }}
            transition={{ duration: 0.8, times: [0, 0.12, 0.18, 0.55, 1] }}
          />

          {/* Radial shockwave rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full"
              style={{
                borderWidth: `${4 - i}px`,
                borderStyle: 'solid',
                borderColor: `hsl(0 85% ${40 + i * 10}% / ${0.9 - i * 0.2})`,
                boxShadow: `0 0 ${40 - i * 10}px hsl(0 85% 40% / ${0.6 - i * 0.15}), inset 0 0 ${20 - i * 5}px hsl(0 85% 40% / ${0.3 - i * 0.1})`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{
                width: [0, 4000],
                height: [0, 4000],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Impact burst lines - radial */}
          {[...Array(16)].map((_, i) => {
            const angle = (360 / 16) * i;
            return (
              <motion.div
                key={`line-${i}`}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: '200vmax',
                  height: i % 2 === 0 ? '4px' : '2px',
                  transform: `rotate(${angle}deg)`,
                  background: `linear-gradient(90deg, hsl(0 0% 100%), hsl(0 85% 50%), transparent 60%)`,
                }}
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{
                  scaleX: [0, 1],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.03,
                  ease: 'easeOut',
                }}
              />
            );
          })}

          {/* Speed lines - inward rush */}
          {[...Array(24)].map((_, i) => {
            const angle = (360 / 24) * i + Math.random() * 10;
            const length = 80 + Math.random() * 150;
            const thickness = 2 + Math.random() * 4;
            return (
              <motion.div
                key={`speed-${i}`}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: `${thickness}px`,
                  height: `${length}px`,
                  background: `linear-gradient(180deg, transparent, hsl(0 0% 100% / ${0.5 + Math.random() * 0.5}), hsl(0 85% 50% / 0.3), transparent)`,
                  transform: `rotate(${angle}deg) translateY(-${35 + Math.random() * 25}vh)`,
                  transformOrigin: 'center center',
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0, 1.2, 0.3],
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.02 + Math.random() * 0.08,
                  ease: 'easeOut',
                }}
              />
            );
          })}

          {/* Screen crack / fracture lines */}
          {[...Array(8)].map((_, i) => {
            const startAngle = (45 * i) + (Math.random() - 0.5) * 20;
            return (
              <motion.div
                key={`crack-${i}`}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: '150vmax',
                  height: i % 2 === 0 ? '3px' : '2px',
                  transform: `rotate(${startAngle}deg)`,
                  background: `linear-gradient(90deg, hsl(0 0% 100% / 0.9), hsl(0 85% 50% / 0.7), transparent 40%)`,
                  filter: 'blur(0.3px)',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 1.2, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.01 + i * 0.015,
                  ease: 'easeOut',
                }}
              />
            );
          })}

          {/* Center impact point glow */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: 'radial-gradient(circle, hsl(0 0% 100%) 0%, hsl(0 85% 50%) 30%, transparent 70%)',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{
              width: [0, 300, 600],
              height: [0, 300, 600],
              opacity: [1, 0.8, 0],
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook to use the transition
export const useHakiTransition = () => {
  const [isActive, setIsActive] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);

  const triggerTransition = useCallback((url: string) => {
    setPendingUrl(url);
    setIsActive(true);
  }, []);

  const handleComplete = useCallback(() => {
    if (pendingUrl) {
      window.location.href = pendingUrl;
    }
    setTimeout(() => {
      setIsActive(false);
      setPendingUrl(null);
    }, 100);
  }, [pendingUrl]);

  return { isActive, triggerTransition, handleComplete };
};

export default HakiTransition;
