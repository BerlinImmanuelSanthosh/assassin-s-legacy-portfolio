import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback, useMemo } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [phase, setPhase] = useState<'scramble' | 'reveal' | 'exit'>('scramble');
  const [displayText, setDisplayText] = useState<string[]>([]);
  
  const targetName = "J.BERLIN IMMANUEL SANTHOSH";
  const asciiChars = useMemo(() => "!@#$%^&*()_+-=[]{}|;':\",./<>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''), []);
  
  const getRandomChar = useCallback(() => {
    return asciiChars[Math.floor(Math.random() * asciiChars.length)];
  }, [asciiChars]);

  useEffect(() => {
    const chars = targetName.split('');
    const revealed = new Array(chars.length).fill(false);
    let currentDisplay = chars.map(() => getRandomChar());
    
    setDisplayText(currentDisplay);

    // Scrambling phase - rapid character changes
    const scrambleInterval = setInterval(() => {
      currentDisplay = currentDisplay.map((char, i) => {
        if (revealed[i]) return chars[i];
        return getRandomChar();
      });
      setDisplayText([...currentDisplay]);
    }, 50);

    // Start revealing characters after 1.5 seconds
    const revealTimeout = setTimeout(() => {
      setPhase('reveal');
      
      let revealIndex = 0;
      const revealInterval = setInterval(() => {
        if (revealIndex < chars.length) {
          revealed[revealIndex] = true;
          currentDisplay[revealIndex] = chars[revealIndex];
          setDisplayText([...currentDisplay]);
          revealIndex++;
        } else {
          clearInterval(revealInterval);
        }
      }, 80);

      return () => clearInterval(revealInterval);
    }, 1500);

    // Exit phase after 5 seconds
    const exitTimeout = setTimeout(() => {
      setPhase('exit');
      clearInterval(scrambleInterval);
    }, 5000);

    // Complete transition after 5.8 seconds
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 5800);

    return () => {
      clearInterval(scrambleInterval);
      clearTimeout(revealTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  }, [getRandomChar, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            {/* Scanning lines */}
            <motion.div
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent"
              animate={{ left: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Corner brackets */}
            <div className="absolute top-8 left-8">
              <motion.div 
                className="w-16 h-[2px] bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div 
                className="w-[2px] h-16 bg-primary"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              />
            </div>
            <div className="absolute top-8 right-8">
              <motion.div 
                className="w-16 h-[2px] bg-primary ml-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.div 
                className="w-[2px] h-16 bg-primary ml-auto"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </div>
            <div className="absolute bottom-8 left-8">
              <motion.div 
                className="w-[2px] h-16 bg-primary"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.div 
                className="w-16 h-[2px] bg-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              />
            </div>
            <div className="absolute bottom-8 right-8">
              <motion.div 
                className="w-[2px] h-16 bg-primary ml-auto"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.div 
                className="w-16 h-[2px] bg-primary ml-auto"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              />
            </div>

            {/* Floating data particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary/30 font-mono text-xs"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 0.5, 0],
                  y: [0, -50],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {getRandomChar()}
              </motion.div>
            ))}
          </div>

          {/* Main name display */}
          <div className="relative z-10 text-center px-4">
            {/* Status text */}
            <motion.div
              className="font-mono text-xs text-primary mb-8 tracking-[0.3em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              [ SYSTEM INITIALIZING... ]
            </motion.div>

            {/* Name with ASCII scramble effect */}
            <div className="relative">
              <motion.h1
                className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {displayText.map((char, i) => (
                  <motion.span
                    key={i}
                    className={char === targetName[i] ? 'text-primary' : 'text-muted-foreground'}
                    style={{
                      textShadow: char === targetName[i] 
                        ? '0 0 20px hsl(0 85% 45% / 0.8), 0 0 40px hsl(0 85% 45% / 0.4)' 
                        : 'none',
                    }}
                    animate={char !== targetName[i] ? {
                      opacity: [0.3, 1, 0.3],
                    } : {}}
                    transition={{ duration: 0.1 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Glitch lines */}
              <motion.div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
              >
                <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-primary/50" />
                <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-primary/30" />
              </motion.div>
            </div>

            {/* Loading bar */}
            <motion.div
              className="mt-12 mx-auto max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="h-[2px] bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4.5, ease: 'easeInOut' }}
                />
              </div>
              <motion.p
                className="font-mono text-xs text-muted-foreground mt-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                LOADING PORTFOLIO...
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroScreen;