import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import AnimatedCard from '../AnimatedCard';
import { ExternalLink, Bot, Brain, BarChart3 } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      title: 'Learning Organizer Chatbot',
      description: 'An intelligent chatbot that creates personalized study notes and schedules. Uses ML, OCR, and Google Translate to scan PDFs and images while supporting multiple languages.',
      technologies: ['Python', 'Machine Learning', 'OCR', 'Groq API', 'Gradio'],
      icon: Bot,
      link: 'https://bit.ly/4jp6CoZ',
      featured: true,
    },
    {
      title: 'TCS Data Visualization',
      description: 'Created comprehensive data visualizations for Tata Consultancy Services, helping executives make effective data-driven decisions.',
      technologies: ['Python', 'Data Analysis', 'Visualization', 'Power BI'],
      icon: BarChart3,
      link: 'https://bit.ly/4kA9luJ',
    },
    {
      title: 'ML Workflow Pipeline',
      description: 'Built and evaluated ML workflows using Python during GenZ Educate Wing internship, working on real-world data and models.',
      technologies: ['Python', 'Machine Learning', 'Data Preprocessing', 'Model Evaluation'],
      icon: Brain,
      link: 'https://bit.ly/4sqeDy9',
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="PROJECTS"
          subtitle="Innovations brought to life through code"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimatedCard
              key={project.title}
              delay={index * 0.15}
              className={project.featured ? 'md:col-span-2 lg:col-span-1' : ''}
            >
              <div className="flex flex-col h-full">
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 12, scale: 1.05 }}
                >
                  <project.icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Featured badge */}
                {project.featured && (
                  <motion.span
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 rounded-full text-xs font-mono text-primary mb-3 w-fit"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    FEATURED
                  </motion.span>
                )}

                {/* Title */}
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-secondary/50 rounded text-xs font-mono text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-display text-sm font-semibold group"
                  whileHover={{ x: 5 }}
                >
                  View Project
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
