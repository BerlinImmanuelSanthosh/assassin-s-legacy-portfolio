import { motion } from 'framer-motion';
import TypewriterText from '../TypewriterText';
import MagneticButton from '../MagneticButton';
import { ChevronDown, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background pointer-events-none" />

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
          />
        ))}
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
        initial={{ top: '-100%' }}
        animate={{ top: '100%' }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glitch intro text */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="font-mono text-primary text-sm tracking-[0.3em] uppercase">
            [ SYSTEM INITIALIZED ]
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
        >
          <span className="text-gradient">J. BERLIN</span>
          <br />
          <span className="text-gradient-red glow-text">IMMANUEL SANTHOSH</span>
        </motion.h1>

        {/* Animated role */}
        <motion.div
          variants={itemVariants}
          className="text-2xl md:text-3xl font-body text-muted-foreground mb-8 h-12"
        >
          <TypewriterText
            texts={['AIML ENGINEER']}
            speed={80}
            deleteSpeed={40}
            pauseDuration={5000}
          />
        </motion.div>

        {/* Summary from resume */}
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 font-body leading-relaxed"
        >
          Pre-final year B.Tech student in AI and Data Science with experience in Python, JavaScript, and R for data analysis. Built AI projects, including a learning organizer chatbot that creates study plans, multilingual answers, and structured notes from one prompt.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <MagneticButton onClick={() => scrollToSection('project')}>
            View Project
          </MagneticButton>
          <MagneticButton 
            href="mailto:j.berlin.santhosh@gmail.com"
            className="!bg-transparent border-2 border-primary hover:border-primary/80"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-6 mb-24"
        >
          {[
            { icon: Linkedin, href: 'https://www.linkedin.com/in/berlin-imman', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:j.berlin.santhosh@gmail.com', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full glass-card text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.button
          onClick={() => scrollToSection('summary')}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="font-mono text-xs tracking-widest mb-2">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
