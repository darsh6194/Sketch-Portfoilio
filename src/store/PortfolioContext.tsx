import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface PortfolioState {
  activeBuilding: string | null;
  isTransitioning: boolean;
  currentSection: string;
  scrollProgress: number;
}

interface PortfolioActions {
  openBuilding: (id: string) => void;
  closeBuilding: () => void;
  setCurrentSection: (section: string) => void;
  setScrollProgress: (p: number) => void;
}

const StateCtx = createContext<PortfolioState>({
  activeBuilding: null,
  isTransitioning: false,
  currentSection: 'intro',
  scrollProgress: 0,
});

const ActionsCtx = createContext<PortfolioActions>({
  openBuilding: () => {},
  closeBuilding: () => {},
  setCurrentSection: () => {},
  setScrollProgress: () => {},
});

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeBuilding, setActiveBuilding] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentSection, setCurrentSection] = useState('intro');
  const [scrollProgress, setScrollProgress] = useState(0);

  const openBuilding = useCallback((id: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveBuilding(id);
      setIsTransitioning(false);
    }, 300);
  }, []);

  const closeBuilding = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveBuilding(null);
      setIsTransitioning(false);
    }, 300);
  }, []);

  return (
    <StateCtx.Provider value={{ activeBuilding, isTransitioning, currentSection, scrollProgress }}>
      <ActionsCtx.Provider value={{ openBuilding, closeBuilding, setCurrentSection, setScrollProgress }}>
        {children}
      </ActionsCtx.Provider>
    </StateCtx.Provider>
  );
}

export const usePortfolioState = () => useContext(StateCtx);
export const usePortfolioActions = () => useContext(ActionsCtx);
