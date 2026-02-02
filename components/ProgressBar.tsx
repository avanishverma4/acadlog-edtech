
import React, { useState, useEffect } from 'react';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = docHeight - winHeight;
      const currentScroll = window.scrollY;
      
      if (totalScroll <= 0) {
        setProgress(0);
        return;
      }
      
      const scrollPercent = (currentScroll / totalScroll) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initialize on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(249,115,22,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
