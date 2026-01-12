import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { Briefcase, ExternalLink } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'Virtual Intern',
      organization: 'TATA CONSULTANCY SERVICES',
      date: 'June-2025',
      points: [
        'Completed a simulation involving creating data visualizations for Tata Consultancy Services',
        'Prepared questions for a meeting with client senior leadership',
        'Created visuals for data analysis to help executives with effective decision making',
      ],
      proofLink: 'https://bit.ly/4kA9luJ',
    },
    {
      title: 'Machine Learning Virtual Intern',
      organization: 'GENZ EDUCATE WING (MSME APPROVED)',
      date: 'August-2025',
      points: [
        'Completed a hands-on Machine Learning internship using Python, working on real-world data and models.',
        'Built and evaluated ML workflows while staying consistently engaged throughout the internship period.',
        'Recognized for exceptional performance, curiosity, and active problem-solving during the program.',
      ],
      proofLink: 'https://bit.ly/4sqeDy9',
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

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
                className="absolute left-0 md:left-8 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              </motion.div>

              {/* Content */}
              <motion.div
                className="glass-card p-6 rounded-lg"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
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
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
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
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
