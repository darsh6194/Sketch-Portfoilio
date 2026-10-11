import { usePortfolioState } from '../store/PortfolioContext';

const sections = [
  { id: 'intro', label: 'Home' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function NavigationBar() {
  const { currentSection, activeBuilding } = usePortfolioState();

  if (activeBuilding) return null;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '0.8rem 1.5rem',
        fontFamily: 'var(--font-sketch)',
        fontSize: '1.1rem',
        zIndex: 50,
        background: 'linear-gradient(to bottom, rgba(250,246,240,0.95), rgba(250,246,240,0))',
        pointerEvents: 'none',
      }}
    >
      {sections.map((s) => (
        <span
          key={s.id}
          style={{
            color: currentSection === s.id ? 'var(--sketch-black)' : 'var(--sketch-gray)',
            fontWeight: currentSection === s.id ? 700 : 400,
            borderBottom: currentSection === s.id ? '2px solid var(--sketch-black)' : '2px solid transparent',
            paddingBottom: '0.2rem',
            transition: 'all 0.3s',
            cursor: 'default',
            pointerEvents: 'auto',
          }}
        >
          {s.label}
        </span>
      ))}
    </nav>
  );
}
