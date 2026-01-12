import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { GraduationCap } from 'lucide-react';

const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="EDUCATION" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="glass-card p-8 rounded-lg max-w-xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
              whileHover={{ rotate: 12, scale: 1.05 }}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                <span className="font-mono text-sm text-primary font-semibold">CGPA - 8.81</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
