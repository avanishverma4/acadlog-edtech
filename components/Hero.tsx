
import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRightIcon, PlayCircleIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onNavigate?: (page: 'home' | 'features' | 'pricing' | 'demo') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });

      gsap.set([".hero-badge", ".hero-title", ".hero-desc", ".hero-btn", mockupRef.current], { 
        opacity: 0, 
        y: 30 
      });

      tl.to(".hero-badge", { opacity: 1, y: 0, delay: 0.2 })
        .to(".hero-title", { opacity: 1, y: 0, stagger: 0.15 }, "-=0.7")
        .to(".hero-desc", { opacity: 1, y: 0 }, "-=0.7")
        .to(".hero-btn", { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)" 
        }, "-=0.6")
        .to(mockupRef.current, { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.5,
          ease: "expo.out" 
        }, "-=0.5");
      
      gsap.to(mockupRef.current, {
        y: "-=15",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-10 relative z-10">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900/50 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-[0.2em] font-space">
            <GlobeAltIcon className="w-3.5 h-3.5 text-green-600 dark:text-green-500 animate-[spin_8s_linear_infinite]" />
            {t('hero.badge')}
          </div>
          
          <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white tracking-tight max-w-5xl mx-auto leading-[1.05]">
            {t('hero.title1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-500 dark:from-blue-600 dark:to-blue-400">
              {t('hero.title2')}
            </span>
          </h1>
          
          <p className="hero-desc text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            {t('hero.desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <button 
              onClick={() => onNavigate?.('demo')}
              className="hero-btn w-full sm:w-auto px-10 py-5 bg-blue-800 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-800/30 flex items-center justify-center gap-3 group active:scale-95"
            >
              {t('hero.cta.start')}
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate?.('demo')}
              className="hero-btn w-full sm:w-auto px-10 py-5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95"
            >
              <PlayCircleIcon className="w-6 h-6 text-orange-500" />
              {t('hero.cta.tour')}
            </button>
          </div>
        </div>

        <div ref={mockupRef} className="mt-24 relative max-w-5xl mx-auto z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-transparent to-transparent z-20 h-full pointer-events-none"></div>
          <div className="bg-slate-900/40 backdrop-blur-sm rounded-[2.5rem] p-3 shadow-2xl border border-slate-200/10 dark:border-white/5">
            <div className="aspect-[16/9] bg-slate-800 rounded-[2rem] overflow-hidden relative group cursor-pointer" onClick={() => onNavigate?.('demo')}>
               <img 
                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071" 
                 alt="Educational Tech" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
               />
               <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 group-hover:bg-transparent transition-colors z-40">
                  <div className="w-20 h-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                    <PlayCircleIcon className="w-10 h-10 text-blue-800 dark:text-blue-400" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;