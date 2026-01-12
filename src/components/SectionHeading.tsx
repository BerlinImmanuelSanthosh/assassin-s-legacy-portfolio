import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeading = ({ title, subtitle, className = '' }: SectionHeadingProps) => {
  return (
    <motion.div
      className={`text-center mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="inline-block mb-4"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </motion.div>

      <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
        <span className="text-gradient">{title}</span>
      </h2>

      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
          {subtitle}
        </p>
      )}

      <motion.div
        className="inline-block mt-4"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
      </motion.div>
    </motion.div>
  );
};

export default SectionHeading;
