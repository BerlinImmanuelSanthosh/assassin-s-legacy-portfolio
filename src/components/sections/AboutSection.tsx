import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import AnimatedCard from '../AnimatedCard';
import { Brain, Code, Database, Sparkles } from 'lucide-react';

const AboutSection = () => {
  const highlights = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems with TensorFlow, PyTorch, and cutting-edge ML frameworks',
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Python, JavaScript, Java with experience in data pipelines and web applications',
    },
    {
      icon: Database,
      title: 'Data Science',
      description: 'Expert in data visualization, analysis, and building actionable insights',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Passionate about translating complex concepts into elegant, practical solutions',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="ABOUT ME"
          subtitle="Decoding the future, one algorithm at a time"
        />

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              I'm a pre-final year <span className="text-primary font-semibold">B.Tech student in AI and Data Science</span> at 
              Anand Institute of Higher Technology, maintaining a <span className="text-primary font-semibold">CGPA of 8.81</span>.
            </p>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              With hands-on experience in Python, JavaScript, and R for data analysis, I've built 
              AI projects including a <span className="text-primary font-semibold">learning organizer chatbot</span> that creates 
              personalized study plans, multilingual answers, and structured notes from a single prompt.
            </p>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              My approach combines technical precision with creative problem-solving, translating 
              complex algorithms into clear, impactful solutions.
            </p>

            {/* Location badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-sm text-muted-foreground">
                📍 Mylapore, Chennai
              </span>
            </motion.div>
          </motion.div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <AnimatedCard
                key={item.title}
                delay={0.1 * index}
                className="h-full"
              >
                <div className="flex flex-col h-full">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body">
                    {item.description}
                  </p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
