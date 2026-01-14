import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import SummarySection from '@/components/sections/SummarySection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CertificationsSection from '@/components/sections/CertificationsSection';
import ProjectSection from '@/components/sections/ProjectSection';
import TechnicalSkillsSection from '@/components/sections/TechnicalSkillsSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import IntroScreen from '@/components/IntroScreen';

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Intro Screen */}
      <AnimatePresence>
        {showIntro && (
          <IntroScreen onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        className="min-h-screen bg-background text-foreground overflow-x-hidden noise-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Custom cursor - hidden on mobile */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        {/* Animated background with parallax orbs */}
        <AnimatedBackground />

        {/* Grid overlay - optimized */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(0 0% 0% / 0.03) 1px, transparent 1px),
              linear-gradient(90deg, hsl(0 0% 0% / 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            willChange: 'transform',
          }}
        />

        {/* Navigation */}
        <Navbar />

        {/* Main content - Order matches resume exactly */}
        <main>
          <HeroSection />
          <SummarySection />
          <ExperienceSection />
          <CertificationsSection />
          <ProjectSection />
          <TechnicalSkillsSection />
          <EducationSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;