import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import HoverCard from '../HoverCard';
import { ExternalLink, Bot } from 'lucide-react';

const ProjectSection = () => {
  return (
    <section id="project" className="py-24 px-4 relative">
      
      <div className="max-w-4xl mx-auto relative">
        <SectionHeading title="PROJECT" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <HoverCard>
            <div 
              className="relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-8 h-8">
                <div className="absolute top-0 right-[20px] w-6 h-[2px] bg-primary" />
                <div className="absolute top-[20px] right-0 w-[2px] h-6 bg-primary" />
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8">
                <div className="absolute bottom-0 left-[20px] w-6 h-[2px] bg-primary" />
                <div className="absolute bottom-[20px] left-0 w-[2px] h-6 bg-primary" />
              </div>

              <div className="relative z-10 p-6">
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
                    href="https://github.com/BerlinImmanuelSanthosh/Chatbot-Project-HALO-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-display text-sm font-semibold group"
                    whileHover={{ x: 5 }}
                  >
                    View Project
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.a>
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

export default ProjectSection;