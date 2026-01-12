import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'button' | 'link' | 'text'>('default');
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
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
      if (target.closest('button') || target.closest('[role="button"]')) {
        setCursorVariant('button');
        setIsHovering(true);
      } else if (target.closest('a')) {
        setCursorVariant('link');
        setIsHovering(true);
      } else if (target.closest('p') || target.closest('h1') || target.closest('h2') || target.closest('h3')) {
        setCursorVariant('text');
        setIsHovering(false);
      } else {
        setCursorVariant('default');
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

  const variants = {
    default: { scale: 1, backgroundColor: 'transparent' },
    button: { scale: 1.5, backgroundColor: 'hsl(0, 85%, 45%, 0.2)' },
    link: { scale: 1.3, backgroundColor: 'hsl(0, 85%, 45%, 0.15)' },
    text: { scale: 0.8, backgroundColor: 'transparent' },
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-primary"
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      {/* Cursor glow ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="w-full h-full rounded-full border border-primary/30"
          animate={{
            scale: isClicking ? 1.5 : 1,
            opacity: isClicking ? 0 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[9997]"
          style={{
            x: cursorX.get() - 40,
            y: cursorY.get() - 40,
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-full rounded-full bg-primary/20" />
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
