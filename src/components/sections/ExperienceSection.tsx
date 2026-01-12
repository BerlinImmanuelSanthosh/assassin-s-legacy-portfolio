import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { Briefcase, GraduationCap, Award } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      type: 'work',
      title: 'Machine Learning Virtual Intern',
      organization: 'GenZ Educate Wing (MSME Approved)',
      date: 'August 2025',
      points: [
        'Completed hands-on Machine Learning internship using Python',
        'Built and evaluated ML workflows with real-world data',
        'Recognized for exceptional performance and active problem-solving',
      ],
    },
    {
      type: 'work',
      title: 'Virtual Intern',
      organization: 'Tata Consultancy Services',
      date: 'June 2025',
      points: [
        'Created data visualizations for executive decision making',
        'Prepared strategic questions for client senior leadership',
        'Developed visual analytics for effective data communication',
      ],
    },
    {
      type: 'education',
      title: 'B.Tech in AI and Data Science',
      organization: 'Anand Institute of Higher Technology',
      date: 'Current - CGPA: 8.81',
      points: [
        'Specializing in Artificial Intelligence and Data Science',
        'Active in practical AI project development',
        'Strong academic performance with focus on applied learning',
      ],
    },
  ];

  const certifications = [
    { name: 'Deploying SAP on Google Cloud, Gemini for App Developers, Intro to Responsible AI', org: 'Google Cloud', year: '2025' },
    { name: 'Database Management System', org: 'MongoDB', year: '2025' },
    { name: 'Fundamentals of Machine Learning and AI', org: 'AWS', year: '2025' },
    { name: 'Foundations of Prompt Engineering', org: 'AWS', year: '2025' },
  ];

  return (
    <section id="experience" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <SectionHeading
          title="EXPERIENCE"
          subtitle="Journey through the professional landscape"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
              </motion.div>

              {/* Content */}
              <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  className="glass-card p-6 rounded-lg"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {exp.type === 'work' ? (
                      <Briefcase className="w-5 h-5 text-primary" />
                    ) : (
                      <GraduationCap className="w-5 h-5 text-primary" />
                    )}
                    <span className="font-mono text-xs text-primary">{exp.date}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-foreground mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm mb-4">
                    {exp.organization}
                  </p>

                  <ul className="space-y-2">
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
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-primary" />
            <h3 className="font-display font-bold text-2xl text-gradient">Certifications</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-4 rounded-lg"
              >
                <p className="font-body text-sm text-foreground mb-1">{cert.name}</p>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs text-primary">{cert.org}</span>
                  <span className="font-mono text-xs text-muted-foreground">{cert.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
