import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import SectionBackground from '../SectionBackground';
import AnimatedCard from '../AnimatedCard';
import { ExternalLink, Bot } from 'lucide-react';

const ProjectSection = () => {
  return (
    <section id="project" className="py-24 px-4 relative">
      <SectionBackground variant="default" />
      
      <div className="max-w-4xl mx-auto relative">
        <SectionHeading title="PROJECT" />

        <AnimatedCard className="max-w-2xl mx-auto">
          <div className="flex flex-col">
            {/* Icon */}
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6"
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              whileHover={{ rotate: 45, scale: 1.05 }}
            >
              <Bot className="w-8 h-8 text-primary" />
            </motion.div>

            {/* Title */}
            <h3 className="font-display font-bold text-2xl text-foreground mb-4">
              A LEARNING ORGANIZER CHATBOT
            </h3>

            {/* Description */}
            <ul className="space-y-3 mb-6">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-start gap-2 text-muted-foreground font-body"
              >
                <span 
                  className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                />
                Built a chatbot, which is a learning organizer that creates notes and study schedules.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-2 text-muted-foreground font-body"
              >
                <span 
                  className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                />
                Used machine learning, optical character recognition, Google Translate to scan PDFs and images while supporting multiple languages.
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-2 text-muted-foreground font-body"
              >
                <span 
                  className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                />
                Integrated Groq for intelligence with a Gradio user interface to ensure easy interaction.
              </motion.li>
            </ul>

            {/* Link */}
            <motion.a
              href="https://bit.ly/4jp6CoZ"
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
      </div>
    </section>
  );
};

export default ProjectSection;