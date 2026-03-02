import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';

interface HakiTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

const HakiTransition = ({ isActive, onComplete }: HakiTransitionProps) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          onAnimationComplete={() => {
            // Trigger navigation after impact peak
          }}
        >
          {/* Impact flash - white burst */}
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.1, 1, 1, 0],
            }}
            transition={{ duration: 0.6, times: [0, 0.1, 0.15, 0.5, 1], ease: 'easeOut' }}
          />

          {/* Radial shockwave rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              style={{
                borderColor: `hsl(0 85% 40% / ${0.8 - i * 0.2})`,
                boxShadow: `0 0 ${30 - i * 8}px hsl(0 85% 40% / ${0.5 - i * 0.15})`,
              }}
              initial={{ width: 0, height: 0, opacity: 1 }}
              animate={{
                width: [0, 3000],
                height: [0, 3000],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* Impact lines - radial burst */}
          {[...Array(12)].map((_, i) => {
            const angle = (360 / 12) * i;
            return (
              <motion.div
                key={`line-${i}`}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: '150vmax',
                  height: '3px',
                  transform: `rotate(${angle}deg)`,
                  background: `linear-gradient(90deg, hsl(0 85% 40%), transparent)`,
                }}
                initial={{ scaleX: 0, opacity: 1 }}
                animate={{
                  scaleX: [0, 1],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.35,
                  delay: 0.05,
                  ease: 'easeOut',
                }}
              />
            );
          })}

          {/* Red/dark vignette overlay - the "haki" color */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, hsl(0 85% 15% / 0.9) 60%, hsl(0 0% 0%) 100%)',
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0, 0.9, 0.9, 0],
            }}
            transition={{ duration: 0.8, times: [0, 0.1, 0.2, 0.6, 1] }}
            onAnimationComplete={onComplete}
          />

          {/* Speed lines inward - impact frames */}
          {[...Array(20)].map((_, i) => {
            const angle = Math.random() * 360;
            const distance = 40 + Math.random() * 60;
            return (
              <motion.div
                key={`speed-${i}`}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: `${3 + Math.random() * 4}px`,
                  height: `${60 + Math.random() * 120}px`,
                  background: `linear-gradient(180deg, transparent, hsl(0 0% 100% / ${0.4 + Math.random() * 0.4}), transparent)`,
                  transform: `rotate(${angle}deg) translateY(-${distance}vh)`,
                  transformOrigin: 'center center',
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [0, 1, 0.5],
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.05 + Math.random() * 0.1,
                  ease: 'easeOut',
                }}
              />
            );
          })}

          {/* Screen crack / fracture lines */}
          {[...Array(6)].map((_, i) => {
            const startAngle = (60 * i) + Math.random() * 30;
            return (
              <motion.div
                key={`crack-${i}`}
                className="absolute top-1/2 left-1/2 origin-left"
                style={{
                  width: '120vmax',
                  height: '2px',
                  transform: `rotate(${startAngle}deg)`,
                  background: `linear-gradient(90deg, hsl(0 0% 100%), hsl(0 85% 40% / 0.8), transparent)`,
                  filter: 'blur(0.5px)',
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 1, 1],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.02 + i * 0.02,
                  ease: 'easeOut',
                }}
              />
            );
          })}
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
      window.open(pendingUrl, '_self');
    }
    // Small delay before cleanup
    setTimeout(() => {
      setIsActive(false);
      setPendingUrl(null);
    }, 100);
  }, [pendingUrl]);

  return { isActive, triggerTransition, handleComplete };
};

export default HakiTransition;
