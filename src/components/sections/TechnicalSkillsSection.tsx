import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <SectionHeading title="TECHNICAL SKILLS" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-lg"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"
                  whileHover={{ scale: 1.5 }}
                />
                <span className="font-body text-muted-foreground">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkillsSection;
