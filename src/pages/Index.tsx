import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from '@/components/CustomCursor';
import NanotechBackground from '@/components/NanotechBackground';
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
      <AnimatePresence>
        {showIntro && (
          <IntroScreen onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen text-foreground overflow-x-hidden relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        <NanotechBackground />

        <Navbar />

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

        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
