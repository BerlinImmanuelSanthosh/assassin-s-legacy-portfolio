import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import SectionBackground from '../SectionBackground';
import HoverCard from '../HoverCard';
import { Award, ExternalLink } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      name: 'Deploying SAP on Google Cloud, Gemini for Application Developers, Introduction to Responsible AI',
      org: 'Google Cloud',
      year: '2025',
      link: 'https://github.com/BerlinImmanuelSanthosh/Certificates/blob/main/Google%20Cloud%20Courses.pdf',
    },
    {
      name: 'Database Management System',
      org: 'MongoDB',
      year: '2025',
      link: 'https://github.com/BerlinImmanuelSanthosh/Certificates/blob/main/Berlin%20Immanuel%20Santhosh.J%20Mongo%20DB%20Certificates.pdf',
    },
    {
      name: 'Fundamentals Of Machine Learning And AI',
      org: 'AWS',
      year: '2025',
      link: 'https://github.com/BerlinImmanuelSanthosh/Certificates/blob/main/Fundamentals%20Of%20MAchine%20Learning.pdf',
    },
    {
      name: 'Foundations Of Prompt Engineering',
      org: 'AWS',
      year: '2025',
      link: 'https://github.com/BerlinImmanuelSanthosh/Certificates/blob/main/PromptEngineeringCertificate.PNG',
    },
  ];

  return (
    <section id="certifications" className="py-24 px-4 relative">
      <SectionBackground variant="alternate" />
      
      <div className="max-w-4xl mx-auto relative">
        <SectionHeading title="CERTIFICATIONS" />

        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <HoverCard>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border group"
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

                  <div className="relative z-10 p-5">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors"
                        style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                      >
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm text-foreground mb-2 group-hover:text-primary transition-colors">
                          {cert.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-primary">{cert.org}</span>
                          <span className="font-mono text-xs text-muted-foreground">{cert.year}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mt-3 text-muted-foreground group-hover:text-primary transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      <span className="font-mono text-xs">View Certificate</span>
                    </div>
                  </div>

                  {/* Corner dots */}
                  <div className="absolute top-2 left-2 w-1 h-1 bg-primary/60" />
                  <div className="absolute bottom-2 right-2 w-1 h-1 bg-primary/60" />
                </a>
              </HoverCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;