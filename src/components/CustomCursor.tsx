import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('[role="button"]') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Assassin's Creed inspired cursor - Red diamond/cross shape */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {/* Main diamond cursor */}
        <motion.div
          className="relative"
          animate={{
            scale: isClicking ? 0.7 : isHovering ? 1.3 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {/* Diamond shape */}
          <div 
            className="w-4 h-4 rotate-45 border-2 border-primary bg-primary/20"
            style={{
              boxShadow: '0 0 10px hsl(0 85% 45% / 0.8), 0 0 20px hsl(0 85% 45% / 0.4)',
            }}
          />
          
          {/* Cross lines extending from cursor */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: isHovering ? 1 : 0.6,
            }}
          >
            <div className="absolute w-6 h-[1px] bg-primary left-1/2 -translate-x-1/2" style={{ boxShadow: '0 0 6px hsl(0 85% 45%)' }} />
            <div className="absolute h-6 w-[1px] bg-primary top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" style={{ boxShadow: '0 0 6px hsl(0 85% 45%)' }} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Outer tracking ring - tech style */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          animate={{
            scale: isHovering ? 1.4 : 1,
            rotate: isHovering ? 90 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Corner brackets - tech HUD style */}
          <motion.path
            d="M2 12 L2 2 L12 2"
            fill="none"
            stroke="hsl(0, 85%, 45%)"
            strokeWidth="1.5"
            animate={{ opacity: isHovering ? 1 : 0.5 }}
          />
          <motion.path
            d="M28 2 L38 2 L38 12"
            fill="none"
            stroke="hsl(0, 85%, 45%)"
            strokeWidth="1.5"
            animate={{ opacity: isHovering ? 1 : 0.5 }}
          />
          <motion.path
            d="M38 28 L38 38 L28 38"
            fill="none"
            stroke="hsl(0, 85%, 45%)"
            strokeWidth="1.5"
            animate={{ opacity: isHovering ? 1 : 0.5 }}
          />
          <motion.path
            d="M12 38 L2 38 L2 28"
            fill="none"
            stroke="hsl(0, 85%, 45%)"
            strokeWidth="1.5"
            animate={{ opacity: isHovering ? 1 : 0.5 }}
          />
        </motion.svg>
      </motion.div>

      {/* Click burst effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: cursorX.get() - 30,
            y: cursorY.get() - 30,
          }}
        >
          <motion.svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.path
              d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z"
              fill="none"
              stroke="hsl(0, 85%, 45%)"
              strokeWidth="1"
            />
          </motion.svg>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;