import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import HoverCard from '../HoverCard';
import { Briefcase, ExternalLink } from 'lucide-react';

const experiences = [
  {
    title: 'Data Visualization Virtual Intern',
    company: 'Tata Group',
    period: 'Aug 2024',
    description: [
      'Completed a job simulation involving creating data visualizations for Tata Consultancy Services',
      'Prepared questions for a meeting with client senior leadership',
      'Created visuals for data analysis to help executives with effective decision making',
    ],
    proofLink: 'https://github.com/BerlinImmanuelSanthosh/Certificates/blob/main/Tata%20internship%20Data%20Visualization.pdf',
  },
  {
    title: 'Machine Learning Virtual Intern',
    company: 'Genz.ai',
    period: 'May 2025',
    description: [
      'Completed a comprehensive internship focused on core machine learning concepts including Supervised & Unsupervised Learning, Neural Networks, and Model Evaluation.',
      'Built and evaluated ML workflows while staying consistently engaged throughout the internship period.',
      'Recognized for exceptional performance, curiosity, and active problem-solving during the program.',
    ],
    proofLink: 'https://github.com/BerlinImmanuelSanthosh/Certificates/blob/main/Genzinternship.jpg',
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative">

      <div className="max-w-4xl mx-auto relative">
        <SectionHeading title="EXPERIENCE" />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative pl-12 md:pl-20 mb-12"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-8 w-4 h-4 bg-primary transform -translate-x-1/2 z-10"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-primary"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>

              {/* Content - Tech Card Style with HoverCard */}
              <HoverCard>
                <div
                  className="relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  }}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className="absolute top-0 right-[16px] w-4 h-[2px] bg-primary opacity-50" />
                    <div className="absolute top-[16px] right-0 w-[2px] h-4 bg-primary opacity-50" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-6 h-6">
                    <div className="absolute bottom-0 left-[16px] w-4 h-[2px] bg-primary opacity-50" />
                    <div className="absolute bottom-[16px] left-0 w-[2px] h-4 bg-primary opacity-50" />
                  </div>

                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="font-mono text-xs text-primary">{exp.date}</span>
                    </div>

                    <h3 className="font-display font-bold text-xl text-foreground mb-1">
                      {exp.organization}
                    </h3>
                    <p className="text-primary font-body text-sm mb-4">
                      {exp.title}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {exp.points.map((point, pointIndex) => (
                        <motion.li
                          key={pointIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + pointIndex * 0.1 }}
                          className="flex items-start gap-2 text-sm text-muted-foreground font-body"
                        >
                          <span 
                            className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0"
                            style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                          />
                          {point}
                        </motion.li>
                      ))}
                    </ul>

                    <motion.a
                      href={exp.proofLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-mono text-xs hover:underline"
                      whileHover={{ x: 3 }}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Proof of Completion
                    </motion.a>
                  </div>

                  {/* Corner dots */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-primary/60" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-primary/60" />
                </div>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;