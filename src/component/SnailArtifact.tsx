import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import escargot from '../assets/artifact/escargot.svg';

export interface SnailArtifactState {
  isActive: boolean;
  activateSnail: () => void;
  remainingTime: number;
}

// Hook personnalisé pour gérer l'état de l'artéfact escargot
export const useSnailArtifact = (): SnailArtifactState => {
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour activer l'artéfact escargot 
  const activateSnail = useCallback(() => {
    setIsActive(true);
    setRemainingTime(60);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (isActive && remainingTime > 0) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prevTime => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            setIsActive(false);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isActive]); 

  return { isActive, activateSnail, remainingTime };
};

export const SnailTimer = ({ isActive, remainingTime }: { isActive: boolean; remainingTime: number }) => {
  if (!isActive) return null;

  return (
    <div className="snail-timer">
      <img src={escargot} alt="Escargot" className="snail-timer-icon" />
      <span className="manjari">{remainingTime}s</span>
    </div>
  );
};

export const SnailArtifactOverlay = ({ isActive, remainingTime }: { isActive: boolean; remainingTime: number }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  
  useEffect(() => {
    if (isActive) {
      setShowOverlay(true);
    }
  }, [isActive]);

  if (!isActive || !showOverlay) return null;

  return createPortal(
    <div className="snail-artifact-overlay" onClick={() => setShowOverlay(false)}>
      <div className="snail-artifact-message" onClick={(e) => e.stopPropagation()}>
        <img src={escargot} alt="Escargot" className="snail-artifact-icon" />
        <h2 className="manjari">L'escargot a été activé !</h2>
        <p className="manjari">Vous ne pouvez pas cliquer sur les liens pendant {remainingTime} secondes.</p>
      </div>
      <div className="snail-artifact-backdrop" />
    </div>,
    document.body
  );
};

export const SnailArtifact = {
  name: "L'escargot",
  description: "Vous condamne à rester au moins 1 minute sur l'article ; vous ne pouvez pas cliquer sur un lien pendant ce laps de temps.",
  img: escargot
}; 