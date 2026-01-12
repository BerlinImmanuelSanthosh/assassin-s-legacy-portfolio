import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionHeading from '../SectionHeading';
import MagneticButton from '../MagneticButton';
import { Mail, MapPin, Linkedin, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:j.berlin.santhosh@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
    window.open(mailtoLink, '_blank');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
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
      value: 'berlin-imman',
      href: 'https://www.linkedin.com/in/berlin-imman',
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="CONTACT"
          subtitle="Let's build something extraordinary together"
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Interested in collaborating on AI/ML projects or have an opportunity to discuss? 
              I'm always open to connecting with fellow innovators and tech enthusiasts.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  {info.href ? (
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 glass-card rounded-lg transition-all hover:border-primary/30"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">{info.label}</p>
                        <p className="font-body text-foreground group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 glass-card rounded-lg">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <info.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">{info.label}</p>
                        <p className="font-body text-foreground">{info.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card p-8 rounded-lg space-y-6"
          >
            {[
              { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
            ].map((field) => (
              <motion.div
                key={field.name}
                className="relative"
                animate={{ y: focusedField === field.name ? -2 : 0 }}
              >
                <label className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: focusedField === field.name ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}

            <motion.div
              className="relative"
              animate={{ y: focusedField === 'message' ? -2 : 0 }}
            >
              <label className="block font-mono text-xs text-muted-foreground mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                name="message"
                placeholder="Your message..."
                rows={5}
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                required
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <MagneticButton className="w-full">
              <Send className="w-4 h-4" />
              Send Message
            </MagneticButton>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
