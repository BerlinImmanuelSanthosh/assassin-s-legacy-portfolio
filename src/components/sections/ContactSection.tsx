import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import SectionBackground from '../SectionBackground';
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
      <SectionBackground variant="default" />
      
      <div className="max-w-4xl mx-auto relative">
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
                  className="flex flex-col items-center p-6 relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border transition-all text-center"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  }}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className="absolute top-0 right-[16px] w-4 h-[2px] bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-[16px] right-0 w-[2px] h-4 bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-6 h-6">
                    <div className="absolute bottom-0 left-[16px] w-4 h-[2px] bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-[16px] left-0 w-[2px] h-4 bg-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div 
                    className="w-12 h-12 bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-3"
                    style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                  >
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-body text-sm text-foreground group-hover:text-primary transition-colors break-all">
                    {info.value}
                  </p>

                  {/* Corner dots */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-primary/60" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-primary/60" />
                </a>
              ) : (
                <div 
                  className="flex flex-col items-center p-6 relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border text-center"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  }}
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className="absolute top-0 right-[16px] w-4 h-[2px] bg-primary opacity-50" />
                    <div className="absolute top-[16px] right-0 w-[2px] h-4 bg-primary opacity-50" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-6 h-6">
                    <div className="absolute bottom-0 left-[16px] w-4 h-[2px] bg-primary opacity-50" />
                    <div className="absolute bottom-[16px] left-0 w-[2px] h-4 bg-primary opacity-50" />
                  </div>

                  <div 
                    className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-3"
                    style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                  >
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mb-1">{info.label}</p>
                  <p className="font-body text-sm text-foreground">{info.value}</p>

                  {/* Corner dots */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-primary/60" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-primary/60" />
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