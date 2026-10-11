import { usePortfolioState } from '../store/PortfolioContext';
import { RESUME } from '../data/resume';

export function IntroOverlay() {
  const { scrollProgress, activeBuilding } = usePortfolioState();

  const opacity = scrollProgress < 0.05 ? 1 : Math.max(0, 1 - (scrollProgress - 0.05) * 15);

  if (opacity <= 0 || activeBuilding) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '3rem',
        left: '3rem',
        zIndex: 40,
        opacity,
        transition: 'opacity 0.2s',
        pointerEvents: opacity > 0.5 ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-sketch)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: 'var(--sketch-black)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
        }}
      >
        {RESUME.name.toUpperCase()}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          color: 'var(--sketch-gray)',
          marginTop: '0.3rem',
        }}
      >
        {RESUME.title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
          color: 'var(--sketch-gray)',
          marginTop: '0.1rem',
        }}
      >
        {RESUME.subtitle}
      </div>

      <div
        style={{
          marginTop: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-sketch)',
          fontSize: '1.1rem',
          color: 'var(--sketch-black)',
          animation: 'bounce 2s infinite',
        }}
      >
        <span>Scroll to explore</span>
        <span style={{ fontSize: '1.3rem' }}>↓</span>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}
