import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { MapPin, Mail, Linkedin } from 'lucide-react';

const SummarySection = () => {
  return (
    <section id="summary" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="SUMMARY" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-8 rounded-lg"
        >
          <p className="text-lg text-muted-foreground font-body leading-relaxed mb-8">
            Pre-final year B.Tech student in AI and Data Science with experience in Python, JavaScript, and R for data analysis. Built AI projects, including a learning organizer chatbot that creates study plans, multilingual answers, and structured notes from one prompt. Worked on exploratory data analysis and data visualization using real-world datasets during industry internships. Able to translate technical concepts into clear solutions, with interest in applied AI, Machine Learning, and data-driven problem solving.
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-6">
            <motion.a
              href="mailto:j.berlin.santhosh@gmail.com"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ x: 3 }}
            >
              <Mail className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm">j.berlin.santhosh@gmail.com</span>
            </motion.a>

            <motion.div
              className="flex items-center gap-2 text-muted-foreground"
              whileHover={{ x: 3 }}
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm">Mylapore, Chennai</span>
            </motion.div>

            <motion.a
              href="https://www.linkedin.com/in/berlin-imman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ x: 3 }}
            >
              <Linkedin className="w-4 h-4 text-primary" />
              <span className="font-mono text-sm">linkedin.com/in/berlin-imman</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SummarySection;
