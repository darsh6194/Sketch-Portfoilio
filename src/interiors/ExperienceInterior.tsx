import { motion } from 'framer-motion';
import { RESUME } from '../data/resume';

const stagger = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4 },
  }),
};

export function ExperienceInterior() {
  const { experience } = RESUME;

  return (
    <div>
      <motion.div custom={0} variants={stagger} initial="hidden" animate="show">
        <div className="interior-title">Experience</div>
        <div className="interior-subtitle">Professional Journey</div>
      </motion.div>

      <motion.div custom={1} variants={stagger} initial="hidden" animate="show" className="board">
        <div className="board-title">{experience.company}</div>
        <div className="board-content">
          <p><strong>{experience.role}</strong></p>
          <p>{experience.duration} | {experience.location}</p>
        </div>
      </motion.div>

      {experience.projects.map((project, i) => (
        <motion.div key={i} custom={2 + i} variants={stagger} initial="hidden" animate="show" className="sticky-note">
          <div className="sticky-note-title">{project.title}</div>
          <div className="board-content">{project.description}</div>
          <div className="tags">
            {project.tech.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
