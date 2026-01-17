import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import HoverCard from '../HoverCard';

const skills = [
  { category: 'Programming Languages', items: ['Python', 'JavaScript', 'R'] },
  { category: 'AI/ML Tools', items: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy'] },
  { category: 'Web Technologies', items: ['React', 'Node.js', 'HTML/CSS', 'REST APIs'] },
  { category: 'Data Visualization', items: ['Matplotlib', 'Seaborn', 'Plotly', 'Power BI'] },
  { category: 'Databases', items: ['MongoDB', 'MySQL', 'PostgreSQL'] },
  { category: 'Tools & Platforms', items: ['Git', 'Docker', 'AWS', 'Google Cloud'] },
];

const TechnicalSkillsSection = () => {
  return (
    <section id="technical-skills" className="py-24 px-4 relative">

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
                <div className="grid sm:grid-cols-2 gap-6">
                  {skills.map((skillGroup, groupIndex) => (
                    <motion.div
                      key={groupIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.1 }}
                      className="space-y-3"
                    >
                      <h4 className="font-display font-semibold text-primary text-sm uppercase tracking-wider">
                        {skillGroup.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((item, itemIndex) => (
                          <motion.span
                            key={itemIndex}
                            className="px-3 py-1 text-sm font-body text-muted-foreground bg-primary/5 border border-primary/20"
                            style={{
                              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                            }}
                            whileHover={{ 
                              backgroundColor: 'hsl(0 85% 45% / 0.15)',
                              color: 'hsl(0 85% 45%)',
                              scale: 1.05,
                            }}
                          >
                            {item}
                          </motion.span>
                        ))}
                      </div>
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