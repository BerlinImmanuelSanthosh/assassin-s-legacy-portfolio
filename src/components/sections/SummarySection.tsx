import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import HoverCard from '../HoverCard';
import { MapPin, Mail, Linkedin } from 'lucide-react';
import HakiTransition, { useHakiTransition } from '../HakiTransition';

const SummarySection = () => {
  const { isActive, triggerTransition, handleComplete } = useHakiTransition();

  return (
    <section id="summary" className="py-24 px-4 relative">
      <HakiTransition isActive={isActive} onComplete={handleComplete} />
      
      <div className="max-w-4xl mx-auto relative">
        <SectionHeading title="SUMMARY" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <HoverCard>
            <div 
              className="relative overflow-hidden glass-card"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
              }}
            >
              <div className="absolute top-0 right-0 w-10 h-10">
                <div className="absolute top-0 right-[24px] w-8 h-[2px] bg-primary" />
                <div className="absolute top-[24px] right-0 w-[2px] h-8 bg-primary" />
              </div>
              <div className="absolute bottom-0 left-0 w-10 h-10">
                <div className="absolute bottom-0 left-[24px] w-8 h-[2px] bg-primary" />
                <div className="absolute bottom-[24px] left-0 w-[2px] h-8 bg-primary" />
              </div>

              <div className="relative z-10 p-8">
                <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
                  AI/ML Developer with hands-on experience in machine learning, deep learning, NLP, LLMs, and computer vision. Skilled at
building and deploying end-to-end AI pipelines, agentic AI systems, and RAG-based applications. Delivered production tools with
measurable results, including 94% prediction accuracy and 40% efficiency gains. Experienced across the full ML lifecycle, from
model training and fine-tuning to API integration and deployment. Strong foundation in Python, FastAPI, and cloud-based
MLOps workflows. Worked on exploratory data analysis and data visualization using real-world datasets during industry internships. Able to translate technical concepts into clear solutions, with interest in applied AI, Machine Learning, and data-driven problem solving.
                </p>

                <div className="flex flex-wrap gap-6">
                  <motion.button
                    onClick={() => triggerTransition('mailto:j.berlin.santhosh@gmail.com')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                    whileHover={{ x: 3 }}
                  >
                    <Mail className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm">j.berlin.santhosh@gmail.com</span>
                  </motion.button>

                  <motion.div
                    className="flex items-center gap-2 text-muted-foreground"
                    whileHover={{ x: 3 }}
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm">Mylapore, Chennai</span>
                  </motion.div>

                  <motion.button
                    onClick={() => triggerTransition('https://www.linkedin.com/in/berlin-imman')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                    whileHover={{ x: 3 }}
                  >
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm">linkedin.com/in/berlin-imman</span>
                  </motion.button>
                </div>
              </div>

              <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-primary/60" />
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-primary/60" />
            </div>
          </HoverCard>
        </motion.div>
      </div>
    </section>
  );
};

export default SummarySection;
