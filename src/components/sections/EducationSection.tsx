import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import SectionBackground from '../SectionBackground';
import { GraduationCap } from 'lucide-react';

const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-4 relative">
      <SectionBackground variant="alternate" />
      
      <div className="max-w-4xl mx-auto relative">
        <SectionHeading title="EDUCATION" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="relative max-w-xl mx-auto overflow-hidden bg-card/80 backdrop-blur-xl border border-border group"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 right-0 w-8 h-8">
            <div className="absolute top-0 right-[20px] w-6 h-[2px] bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-[20px] right-0 w-[2px] h-6 bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="absolute bottom-0 left-0 w-8 h-8">
            <div className="absolute bottom-0 left-[20px] w-6 h-[2px] bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-[20px] left-0 w-[2px] h-6 bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="relative z-10 p-8">
            <div className="flex items-start gap-4">
              <motion.div
                className="w-14 h-14 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                whileHover={{ rotate: 45, scale: 1.05 }}
              >
                <GraduationCap className="w-7 h-7 text-primary" />
              </motion.div>

              <div>
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  ANAND INSTITUTE OF HIGHER TECHNOLOGY
                </h3>
                <p className="font-body text-muted-foreground mb-3">
                  B.Tech. Artificial Intelligence And Data Science
                </p>
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10"
                  style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
                >
                  <span className="font-mono text-sm text-primary font-semibold">CGPA - 8.81</span>
                </div>
              </div>
            </div>
          </div>

          {/* Corner dots */}
          <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-primary/60" />
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-primary/60" />
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;