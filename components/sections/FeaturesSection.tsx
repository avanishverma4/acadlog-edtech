
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { PERSONA_CONTENT } from '../../constants';
import { PersonaType } from '../../types';
import PersonaToggle from '../ui/PersonaToggle';
import FeatureCard from '../ui/FeatureCard';
import { ArrowRightIcon, BoltIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

interface FeaturesSectionProps {
  onNavigate?: (page: 'home' | 'features' | 'pricing' | 'demo') => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ onNavigate }) => {
  const [activePersonaType, setActivePersonaType] = useState<PersonaType>('SUPER_ADMIN');
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const sideHeaderRef = useRef<HTMLDivElement>(null);

  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const activePersonaData = PERSONA_CONTENT.find(p => p.type === activePersonaType)!;

  useEffect(() => {
    if (contentInView) {
      const ctx = gsap.context(() => {
        // Animate Side Header Content
        if (sideHeaderRef.current) {
          gsap.fromTo(sideHeaderRef.current.children, 
            { opacity: 0, x: -30 },
            { 
              opacity: 1, 
              x: 0, 
              duration: 0.8, 
              stagger: 0.12, 
              ease: "expo.out",
              overwrite: true 
            }
          );
        }

        // Stagger Feature Cards
        if (featuresContainerRef.current) {
          const cards = featuresContainerRef.current.querySelectorAll('.gsap-feature-card');
          
          // Kill any existing animations on these elements to prevent conflicts
          gsap.killTweensOf(cards);

          gsap.fromTo(cards, 
            { 
              opacity: 0, 
              y: 40, 
              scale: 0.94,
              filter: 'blur(10px)'
            }, 
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              filter: 'blur(0px)',
              duration: 0.9, 
              stagger: 0.1, 
              ease: "back.out(1.2)",
              delay: 0.1,
              overwrite: true
            }
          );
        }
      });

      return () => ctx.revert();
    }
  }, [activePersonaType, contentInView]);

  const handleViewAll = () => {
    if (onNavigate) {
      onNavigate('features');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookDemo = () => {
    if (onNavigate) {
      onNavigate('demo');
    }
  };

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div 
          ref={headerRef}
          className={`text-center mb-12 space-y-4 transition-all duration-1000 transform ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 text-sm font-bold uppercase tracking-widest font-space">
            Platform Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Everything you need for a{' '}
            <span className="relative group/text inline-block cursor-help">
              <span className="text-blue-800 dark:text-blue-400 underline decoration-blue-200 dark:decoration-blue-800 underline-offset-8 transition-colors hover:text-blue-600 dark:hover:text-blue-300">
                modern campus
              </span>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-72 h-44 opacity-0 pointer-events-none group-hover/text:opacity-100 group-hover/text:translate-y-[-10px] transition-all duration-500 z-50">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(30,64,175,0.4)] border-4 border-white dark:border-slate-800 transform rotate-2 group-hover/text:rotate-0 transition-transform duration-500 ease-out">
                  <img 
                    src="https://plus.unsplash.com/premium_photo-1693138542811-461f99c9d4d4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Next-gen Campus Environment" 
                    className="w-full h-full object-cover scale-110 group-hover/text:scale-100 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent flex items-end p-5">
                    <div className="space-y-1">
                      <p className="text-blue-200 text-[10px] font-bold uppercase tracking-[0.2em] font-space">Next-Gen</p>
                      <p className="text-white text-sm font-bold">Tech-Integrated Learning Atrium</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-4 h-4 overflow-hidden">
                  <div className="w-3 h-3 bg-white dark:bg-slate-800 rotate-45 transform origin-center -translate-y-1/2 mx-auto shadow-sm"></div>
                </div>
              </div>
            </span>
            .
          </h2>
          <h3 className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light">
            Empower every stakeholder in your college with tools built for Indian academic workflows.
          </h3>
        </div>

        <div className={`transition-all duration-1000 delay-300 transform ${
          headerInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <PersonaToggle 
            personas={PERSONA_CONTENT} 
            activePersona={activePersonaType} 
            onSelect={setActivePersonaType} 
          />
        </div>

        <div 
          ref={contentRef}
          className="grid gap-12 transition-all duration-700 grid-cols-1 lg:grid-cols-12"
        >
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div ref={sideHeaderRef} className="space-y-6">
              <div className="space-y-2">
                <p className="text-orange-600 dark:text-orange-400 font-bold uppercase text-xs tracking-widest flex items-center gap-2 font-space">
                  <span className="w-8 h-px bg-orange-200 dark:bg-orange-800/50 inline-block"></span>
                  {activePersonaData.tagline}
                </p>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                  Built for <span className="text-blue-700 dark:text-blue-400">{activePersonaData.label}</span>
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
                {activePersonaData.description}
              </p>
              
              <div className="pt-4">
                <button 
                  onClick={handleBookDemo}
                  className="px-8 py-4 bg-blue-800 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-800/20 active:scale-95 duration-200"
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div ref={featuresContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activePersonaData.features.map((feature) => (
                <div 
                  key={`${activePersonaType}-${feature.id}`} 
                  className="gsap-feature-card will-change-transform opacity-0"
                >
                  <FeatureCard 
                    feature={feature} 
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button 
                onClick={handleViewAll}
                className="group flex items-center gap-3 px-8 py-4 rounded-full border border-orange-200 dark:border-orange-800/30 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:bg-orange-100 dark:hover:bg-orange-900/40 hover:shadow-xl hover:shadow-orange-500/10 hover:-translate-y-1 active:scale-95"
              >
                <BoltIcon className="w-4 h-4 text-orange-600 dark:text-orange-400 group-hover:fill-current transition-all" />
                View All Platform Features
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-orange-50 dark:bg-orange-900/5 rounded-full blur-3xl opacity-30 pointer-events-none -z-10"></div>
    </section>
  );
};

export default FeaturesSection;
