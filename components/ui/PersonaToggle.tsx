
import React, { useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { PersonaType, PersonaData } from '../../types';
import gsap from 'gsap';

interface PersonaToggleProps {
  personas: PersonaData[];
  activePersona: PersonaType;
  onSelect: (type: PersonaType) => void;
}

const PersonaToggle: React.FC<PersonaToggleProps> = ({ personas, activePersona, onSelect }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const updateIndicator = useCallback(() => {
    const activeIndex = personas.findIndex(p => p.type === activePersona);
    const activeButton = buttonRefs.current[activeIndex];
    
    if (activeButton && indicatorRef.current) {
      // Calculate position relative to the container
      const { offsetLeft, offsetWidth } = activeButton;
      
      gsap.to(indicatorRef.current, {
        x: offsetLeft,
        width: offsetWidth,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto"
      });
    }
  }, [activePersona, personas]);

  useLayoutEffect(() => {
    // Small timeout to ensure layout has settled (fonts, etc)
    const timeout = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timeout);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    const observer = new ResizeObserver(updateIndicator);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      window.removeEventListener('resize', updateIndicator);
      observer.disconnect();
    };
  }, [updateIndicator]);

  return (
    <div className="w-full flex justify-center mb-16 px-4">
      <div 
        ref={containerRef}
        className="relative flex items-center p-1.5 bg-slate-100 dark:bg-slate-900/60 backdrop-blur-2xl rounded-full border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden no-scrollbar max-w-full overflow-x-auto transition-colors"
      >
        {/* The Sliding Pill */}
        <div 
          ref={indicatorRef}
          className="absolute h-[calc(100%-12px)] bg-blue-600 dark:bg-blue-500 rounded-full z-0 top-[6px] pointer-events-none shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-opacity duration-300"
          style={{ width: 0, x: 0 }}
        />

        {personas.map((persona, idx) => {
          const isActive = activePersona === persona.type;
          return (
            <button
              key={persona.type}
              ref={el => { buttonRefs.current[idx] = el; }}
              onClick={() => onSelect(persona.type)}
              className={`
                relative px-6 md:px-8 py-3.5 md:py-4 rounded-full text-[11px] md:text-xs font-black uppercase tracking-[0.2em] font-space transition-all duration-300 z-10 whitespace-nowrap outline-none
                ${isActive 
                  ? 'text-white scale-100' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 scale-95'}
                active:scale-90 transform-gpu
              `}
            >
              {persona.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonaToggle;
