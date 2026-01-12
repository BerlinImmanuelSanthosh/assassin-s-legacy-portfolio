import CustomCursor from '@/components/CustomCursor';
import ParticleBackground from '@/components/ParticleBackground';
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden noise-overlay">
      {/* Custom cursor - hidden on mobile */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Animated background with parallax orbs */}
      <AnimatedBackground />

      {/* Particle background */}
      <ParticleBackground />

      {/* Grid overlay */}
      <div className="fixed inset-0 bg-grid pointer-events-none opacity-30" />

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
    </div>
  );
};

export default Index;
