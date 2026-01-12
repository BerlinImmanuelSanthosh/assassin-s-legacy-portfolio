import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 px-4 border-t border-border/30"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-sm text-muted-foreground">
          © {new Date().getFullYear()} J. Berlin Immanuel Santhosh
        </p>

        <motion.p
          className="flex items-center gap-2 font-body text-sm text-muted-foreground"
          whileHover={{ scale: 1.05 }}
        >
          Crafted with
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Heart className="w-4 h-4 text-primary fill-primary" />
          </motion.span>
          and precision
        </motion.p>

        <p className="font-mono text-xs text-muted-foreground">
          [ SYSTEM.STATUS: ACTIVE ]
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
