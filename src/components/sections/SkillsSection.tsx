import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';

const SkillsSection = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: [
        { name: 'Python', level: 95 },
        { name: 'JavaScript', level: 85 },
        { name: 'Java', level: 75 },
        { name: 'SQL', level: 90 },
        { name: 'R', level: 70 },
      ],
    },
    {
      title: 'AI & ML',
      skills: [
        { name: 'TensorFlow', level: 85 },
        { name: 'PyTorch', level: 80 },
        { name: 'Azure ML', level: 75 },
        { name: 'Machine Learning', level: 90 },
        { name: 'Data Science', level: 88 },
      ],
    },
    {
      title: 'Data & Visualization',
      skills: [
        { name: 'Matplotlib', level: 90 },
        { name: 'Seaborn', level: 88 },
        { name: 'Power BI', level: 82 },
        { name: 'Tableau', level: 80 },
        { name: 'MongoDB', level: 75 },
      ],
    },
  ];

  const tools = [
    'Python', 'TensorFlow', 'PyTorch', 'Azure ML', 'MongoDB', 
    'SQL', 'Power BI', 'Tableau', 'Matplotlib', 'Seaborn',
    'Java', 'JavaScript', 'Gradio', 'Google Cloud', 'AWS',
  ];

  return (
    <section id="skills" className="py-24 px-4 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          title="SKILLS ARSENAL"
          subtitle="Technologies and tools in my toolkit"
        />

        {/* Skill bars */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.2 }}
              className="glass-card p-6 rounded-lg"
            >
              <h3 className="font-display font-bold text-xl mb-6 text-gradient-red">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-body text-sm text-foreground">{skill.name}</span>
                      <span className="font-mono text-xs text-primary">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating tool badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {tools.map((tool, index) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="px-4 py-2 glass-card rounded-full font-mono text-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
