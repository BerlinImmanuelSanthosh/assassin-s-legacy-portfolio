import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import SectionBackground from '../SectionBackground';
import HoverCard from '../HoverCard';

const TechnicalSkillsSection = () => {
  const skills = [
    'Python - Machine Learning, Data Science',
    'Mongo DB',
    'Structured Query Language (SQL)',
    'Azure ML',
    'Java, JavaScript',
    'Data Structures And Algorithms',
    'Data Visualization: Matplotlib, Seaborn, PowerBI, Tableau',
    'TensorFlow, PyTorch',
  ];

  return (
    <section id="technical-skills" className="py-24 px-4 relative">
      <SectionBackground variant="default" />

      <div className="max-w-4xl mx-auto relative">
        <SectionHeading title="TECHNICAL SKILLS" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HoverCard>
            {/* Tech card container */}
            <div 
              className="relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-10 h-10">
                <div className="absolute top-0 right-[24px] w-8 h-[2px] bg-primary" />
                <div className="absolute top-[24px] right-0 w-[2px] h-8 bg-primary" />
              </div>
              <div className="absolute bottom-0 left-0 w-10 h-10">
                <div className="absolute bottom-0 left-[24px] w-8 h-[2px] bg-primary" />
                <div className="absolute bottom-[24px] left-0 w-[2px] h-8 bg-primary" />
              </div>

              <div className="relative z-10 p-8">
                <div className="grid sm:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        x: 5,
                        backgroundColor: 'hsl(0 85% 45% / 0.05)',
                      }}
                      className="flex items-start gap-3 p-3 group relative overflow-hidden transition-colors"
                      style={{
                        clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-primary mt-2 flex-shrink-0"
                        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                        whileHover={{ scale: 1.5, rotate: 45 }}
                      />
                      <span className="font-body text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Corner dots */}
              <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-primary/60" />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-primary/60" />
            </div>
          </HoverCard>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkillsSection;