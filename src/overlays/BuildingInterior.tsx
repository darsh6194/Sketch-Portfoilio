import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioState, usePortfolioActions } from '../store/PortfolioContext';
import { EducationInterior } from '../interiors/EducationInterior';
import { ExperienceInterior } from '../interiors/ExperienceInterior';
import { ProjectsInterior } from '../interiors/ProjectsInterior';
import { SkillsInterior } from '../interiors/SkillsInterior';
import { ContactInterior } from '../interiors/ContactInterior';
import '../styles/overlay.css';

const interiors: Record<string, () => React.JSX.Element> = {
  education: EducationInterior,
  experience: ExperienceInterior,
  projects: ProjectsInterior,
  skills: SkillsInterior,
  contact: ContactInterior,
};

export function BuildingInterior() {
  const { activeBuilding } = usePortfolioState();
  const { closeBuilding } = usePortfolioActions();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeBuilding) closeBuilding();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [activeBuilding, closeBuilding]);

  const Interior = activeBuilding ? interiors[activeBuilding] : null;

  return (
    <AnimatePresence>
      {activeBuilding && Interior && (
        <motion.div
          className="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeBuilding}
        >
          <motion.div
            className="interior-panel"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeBuilding}>
              ✕
            </button>
            <Interior />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
