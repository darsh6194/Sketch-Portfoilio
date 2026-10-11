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

export function ProjectsInterior() {
  return (
    <div>
      <motion.div custom={0} variants={stagger} initial="hidden" animate="show">
        <div className="interior-title">Projects</div>
        <div className="interior-subtitle">What I've Built</div>
      </motion.div>

      {RESUME.projects.map((project, i) => (
        <motion.div key={i} custom={1 + i} variants={stagger} initial="hidden" animate="show" className="board">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
            <div className="board-title">{project.title}</div>
            <span className="interior-subtitle" style={{ margin: 0 }}>{project.date}</span>
          </div>
          <div className="tags" style={{ marginBottom: '0.8rem' }}>
            {project.tech.split(', ').map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          {project.bullets.map((bullet, j) => (
            <div key={j} className="board-content" style={{ marginBottom: '0.4rem' }}>
              &#8226; {bullet}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
