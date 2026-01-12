import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import MagneticButton from '../MagneticButton';
import { Mail, MapPin, Linkedin, Send } from 'lucide-react';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'E.Mail',
      value: 'j.berlin.santhosh@gmail.com',
      href: 'mailto:j.berlin.santhosh@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Mylapore, Chennai',
      href: null,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'www.linkedin.com/in/berlin-imman',
      href: 'https://www.linkedin.com/in/berlin-imman',
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="CONTACT" />

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="group"
            >
              {info.href ? (
                <a
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 glass-card rounded-lg transition-all hover:border-primary/30 text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-3">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-body text-sm text-foreground group-hover:text-primary transition-colors break-all">
                    {info.value}
                  </p>
                </a>
              ) : (
                <div className="flex flex-col items-center p-6 glass-card rounded-lg text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-body text-sm text-foreground">{info.value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <MagneticButton href="mailto:j.berlin.santhosh@gmail.com">
            <Send className="w-4 h-4" />
            Send Message
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
