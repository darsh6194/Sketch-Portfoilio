import { motion } from 'framer-motion';
import { RESUME } from '../data/resume';

const stagger = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export function ContactInterior() {
  const { contact } = RESUME;

  return (
    <div>
      <motion.div custom={0} variants={stagger} initial="hidden" animate="show">
        <div className="interior-title">Contact</div>
        <div className="interior-subtitle">Get In Touch</div>
      </motion.div>

      <motion.div custom={1} variants={stagger} initial="hidden" animate="show" className="board">
        <div className="board-title">Let's Connect</div>
        <div className="board-content">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <a href={`mailto:${contact.email}`} className="contact-link">{contact.email}</a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📱</span>
            <span>{contact.phone}</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💼</span>
            <a href={contact.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">💻</span>
            <a href={contact.github} className="contact-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🌐</span>
            <a href={`https://${contact.website}`} className="contact-link" target="_blank" rel="noopener noreferrer">
              {contact.website}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
