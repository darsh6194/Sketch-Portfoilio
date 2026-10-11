import { usePortfolioState } from '../store/PortfolioContext';
import { SECTION_BOUNDARIES } from '../utils/constants';

const dots = [
  { id: 'intro', label: 'Start', icon: '🏠' },
  { id: 'education', label: 'Edu', icon: '🎓' },
  { id: 'experience', label: 'Exp', icon: '💼' },
  { id: 'projects', label: 'Proj', icon: '💻' },
  { id: 'skills', label: 'Skills', icon: '⚙️' },
  { id: 'contact', label: 'Mail', icon: '✉️' },
];

export function ProgressIndicator() {
  const { scrollProgress, currentSection, activeBuilding } = usePortfolioState();

  if (activeBuilding) return null;

  return (
    <div
      style={{
        position: 'fixed',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.3rem',
      }}
    >
      {dots.map((dot) => {
        const [start] = SECTION_BOUNDARIES[dot.id] || [0, 0];
        const isActive = currentSection === dot.id;
        const isPast = scrollProgress > start;

        return (
          <div
            key={dot.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              flexDirection: 'row-reverse',
            }}
          >
            {isActive && (
              <span
                style={{
                  fontFamily: 'var(--font-sketch)',
                  fontSize: '0.75rem',
                  color: 'var(--sketch-black)',
                  whiteSpace: 'nowrap',
                }}
              >
                {dot.label}
              </span>
            )}
            <div
              style={{
                width: isActive ? 12 : 8,
                height: isActive ? 12 : 8,
                borderRadius: '50%',
                border: `2px solid ${isPast ? 'var(--sketch-black)' : 'var(--sketch-light-gray)'}`,
                background: isActive ? 'var(--sketch-black)' : isPast ? 'var(--sketch-gray)' : 'transparent',
                transition: 'all 0.3s',
              }}
            />
          </div>
        );
      })}

      <div
        style={{
          position: 'absolute',
          right: isNaN(0) ? 0 : 3,
          top: 6,
          bottom: 6,
          width: 2,
          background: 'var(--sketch-light-gray)',
          zIndex: -1,
        }}
      />
    </div>
  );
}
