import { motion } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { Award, ExternalLink } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      name: 'Deploying SAP on Google Cloud, Gemini for Application Developers, Introduction to Responsible AI',
      org: 'Google Cloud',
      year: '2025',
      link: 'https://bit.ly/4oPlcIK',
    },
    {
      name: 'Database Management System',
      org: 'MongoDB',
      year: '2025',
      link: 'https://bit.ly/4ku95x8',
    },
    {
      name: 'Fundamentals Of Machine Learning And AI',
      org: 'AWS',
      year: '2025',
      link: 'https://bit.ly/4q9hMkn',
    },
    {
      name: 'Foundations Of Prompt Engineering',
      org: 'AWS',
      year: '2025',
      link: 'https://bit.ly/49naoL6',
    },
  ];

  return (
    <section id="certifications" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="CERTIFICATIONS" />

        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <motion.a
              key={index}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -3 }}
              className="glass-card p-5 rounded-lg group cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
