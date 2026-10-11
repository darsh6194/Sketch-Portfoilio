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

export function EducationInterior() {
  const { education, achievements } = RESUME;

  return (
    <div>
      <motion.div custom={0} variants={stagger} initial="hidden" animate="show">
        <div className="interior-title">Education</div>
        <div className="interior-subtitle">Academic Background</div>
      </motion.div>

      <motion.div custom={1} variants={stagger} initial="hidden" animate="show" className="board">
        <div className="board-title">{education.university}</div>
        <div className="board-content">
          <p><strong>{education.degree}</strong></p>
          <p>{education.cgpa}</p>
          <p>{education.duration}</p>
          <p>{education.location}</p>
        </div>
      </motion.div>

      <motion.div custom={2} variants={stagger} initial="hidden" animate="show">
        <div className="board-title" style={{ marginBottom: '0.8rem', marginTop: '1rem' }}>
          Achievements & Certifications
        </div>
      </motion.div>

      {achievements.map((a, i) => (
        <motion.div key={i} custom={3 + i} variants={stagger} initial="hidden" animate="show" className="achievement-card">
          <div className="achievement-icon">
            {i === 0 ? '🏆' : '🎯'}
          </div>
          <div className="achievement-info">
            <div className="achievement-title">{a.title}</div>
            <div className="achievement-detail">{a.detail}</div>
            <div className="achievement-detail">{a.date} — {a.location}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
