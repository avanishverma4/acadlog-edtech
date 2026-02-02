
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PARTNERS = [
  "INSTITUTION A",
  "UNIVERSITY B",
  "COLLEGE C",
  "ACADEMY D",
];

const TrustMarquee: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      if (!marquee) return;

      const totalWidth = marquee.scrollWidth / 2;
      
      gsap.to(marquee, {
        x: -totalWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        runBackwards: false
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  // Repeat partners to ensure seamless loop
  const listItems = [...PARTNERS, ...PARTNERS];

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-950 overflow-hidden relative border-y border-slate-200/60 dark:border-white/5 group">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 text-center font-space">
          Global Trust Network
        </p>
      </div>

      <div className="flex whitespace-nowrap">
        <div 
          ref={marqueeRef}
          className="flex items-center gap-12 md:gap-24 will-change-transform"
        >
          {listItems.map((partner, idx) => (
            <div 
              key={idx}
              className="flex items-center justify-center px-8 py-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/30 backdrop-blur-sm transition-all duration-500 hover:border-blue-500 dark:hover:border-blue-400 group/item"
            >
              <span className="text-3xl md:text-5xl font-black font-space tracking-tighter text-slate-300 dark:text-slate-700 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustMarquee;
