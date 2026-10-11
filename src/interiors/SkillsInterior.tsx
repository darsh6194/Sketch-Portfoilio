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

export function SkillsInterior() {
  const categories = Object.entries(RESUME.skills);

  return (
    <div>
      <motion.div custom={0} variants={stagger} initial="hidden" animate="show">
        <div className="interior-title">Skills</div>
        <div className="interior-subtitle">Technical Library</div>
      </motion.div>

      {categories.map(([category, skills], i) => (
        <motion.div key={category} custom={1 + i} variants={stagger} initial="hidden" animate="show" className="skill-shelf">
          <div className="shelf-label">{category}</div>
          <div className="shelf-books">
            {skills.map((skill) => (
              <div key={skill} className="book">
                {skill}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
