import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import SectionHeading from '../SectionHeading';
import { ExternalLink, Bot, GraduationCap, HeartPulse, Github } from 'lucide-react';
import HakiTransition, { useHakiTransition } from '../HakiTransition';

const projects = [
  {
    title: 'HALO',
    subtitle: 'Learning Organizer Chatbot',
    icon: Bot,
    color: 'from-primary/30 to-accent/20',
    link: 'https://github.com/BerlinImmanuelSanthosh/Chatbot-Project-HALO-',
    tech: ['Python', 'ML', 'OCR', 'Groq', 'Gradio'],
    description: [
      'Built a chatbot learning organizer that creates notes and study schedules.',
      'Used ML, OCR, Google Translate to scan PDFs and images with multi-language support.',
      'Integrated Groq for intelligence with a Gradio UI for easy interaction.',
    ],
  },
  {
    title: 'NEXUS',
    subtitle: 'Student Chatbot & Quiz Platform',
    icon: GraduationCap,
    color: 'from-primary/25 to-primary/10',
    link: 'https://github.com/BerlinImmanuelSanthosh/Nexus',
    tech: ['Python', 'AI', 'NLP', 'Analytics'],
    description: [
      'Intelligent student chatbot with personalized learning assistance.',
      'Quiz system with automatic marking and performance analytics.',
      'Smart timetable generator that adapts based on quiz performance.',
      'All three modules work together for context-aware recommendations.',
    ],
  },
  {
    title: 'HEALTH GUARDIAN',
    subtitle: 'AI Disease Prediction System',
    icon: HeartPulse,
    color: 'from-accent/25 to-primary/15',
    link: 'https://github.com/BerlinImmanuelSanthosh/Health-Guardian',
    tech: ['ML', 'Deep Learning', 'OCR', 'Chatbot'],
    description: [
      'Predicts diseases using ML/DL based on symptoms and health data.',
      'OCR for prescription reading and medication understanding.',
      'Intelligent chatbot for health recommendations and medical guidance.',
      'Combines symptom analysis, scanning, and AI into one platform.',
    ],
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 20, stiffness: 150 });
  const { isActive, triggerTransition, handleComplete } = useHakiTransition();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = project.icon;

  return (
    <>
      <HakiTransition isActive={isActive} onComplete={handleComplete} />
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.2, duration: 0.7, ease: 'easeOut' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
        className="group relative"
      >
        <div className="relative overflow-hidden rounded-xl glass-card hover:border-primary/40 transition-all duration-500">
          <motion.div
            className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, hsl(0 85% 40% / 0.3), transparent, hsl(0 85% 40% / 0.3))',
              filter: 'blur(1px)',
              zIndex: -1,
            }}
          />

          <div className={`relative p-6 pb-4 bg-gradient-to-br ${project.color}`}>
            <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
              <defs>
                <pattern id={`hex-${index}`} width="30" height="26" patternUnits="userSpaceOnUse">
                  <polygon points="15,0 30,8.7 30,21.3 15,30 0,21.3 0,8.7" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#hex-${index})`} />
            </svg>

            <div className="relative flex items-start justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-14 h-14 bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                  whileHover={{ rotate: 60, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Icon className="w-7 h-7 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground tracking-wide">{project.title}</h3>
                  <p className="font-mono text-xs text-primary/80 tracking-widest uppercase">{project.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <motion.div
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] text-primary/60 uppercase">Active</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tech.map((t) => (
                <motion.span
                  key={t}
                  className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 rounded"
                  whileHover={{ scale: 1.05, borderColor: 'hsl(0 85% 40% / 0.5)' }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="p-6 pt-4 space-y-3">
            {project.description.map((desc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.08 }}
                className="flex items-start gap-3"
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0"
                  style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                />
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="px-6 pb-6">
            <motion.button
              onClick={() => triggerTransition(project.link)}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-lg transition-all duration-300 group/btn"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="w-4 h-4 text-primary" />
              <span className="font-display text-sm font-semibold text-primary tracking-wide">VIEW PROJECT</span>
              <ExternalLink className="w-3.5 h-3.5 text-primary/60 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
            </motion.button>
          </div>

          <div className="absolute top-0 right-0">
            <div className="w-6 h-[2px] bg-primary/40 absolute top-2 right-2" />
            <div className="w-[2px] h-6 bg-primary/40 absolute top-2 right-2" />
          </div>
          <div className="absolute bottom-0 left-0">
            <div className="w-6 h-[2px] bg-primary/40 absolute bottom-2 left-2" />
            <div className="w-[2px] h-6 bg-primary/40 absolute bottom-2 left-2" />
          </div>
        </div>
      </motion.div>
    </>
  );
};

const ProjectSection = () => {
  return (
    <section id="project" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto relative">
        <SectionHeading title="PROJECTS" />

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
