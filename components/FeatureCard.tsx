
import React, { useState, useRef, useEffect } from 'react';
import { Feature } from '../types';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isHovered) {
        // Card hover animation
        gsap.to(cardRef.current, {
          scale: 1.04,
          y: -12,
          duration: 0.5,
          ease: "power3.out"
        });

        // Icon specific animation - 3D Spin + Scale + Color Emphasis
        if (iconRef.current) {
          gsap.to(iconRef.current, {
            rotateY: 180,
            scale: 1.15,
            duration: 0.6,
            ease: "back.out(1.7)",
          });
          
          // Animate the icon color shift via background glow expansion
          gsap.to(glowRef.current, {
            opacity: 0.8,
            scale: 1.4,
            duration: 0.8,
            ease: "power2.out"
          });
        }
      } else {
        // Reset Card
        gsap.to(cardRef.current, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });

        // Reset Icon
        if (iconRef.current) {
          gsap.to(iconRef.current, {
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut"
          });

          gsap.to(glowRef.current, {
            opacity: 0,
            scale: 1,
            duration: 0.4,
            ease: "power2.in"
          });
        }
      }
    });

    return () => ctx.revert();
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-blue-500/15 transition-all flex flex-col items-start h-full transform cursor-default hover:border-blue-400 dark:hover:border-blue-700/60 overflow-visible"
    >
      {/* Icon Container with Perspective for 3D spin */}
      <div className="perspective-1000 mb-6">
        <div 
          ref={iconRef} 
          className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 text-blue-800 dark:text-blue-400 group-hover:bg-blue-800 dark:group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 relative border border-slate-100 dark:border-white/5 z-20 shadow-sm group-hover:shadow-blue-500/40"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative z-10">{feature.icon}</div>
          
          {/* Internal Glow Effect */}
          <div 
            ref={glowRef}
            className="absolute inset-0 rounded-lg bg-blue-400/30 blur-xl opacity-0 pointer-events-none -z-10" 
          />
        </div>
      </div>
      
      <div className="flex justify-between items-start w-full mb-3">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors duration-300">
          {feature.title}
        </h3>
        <div className="p-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <InformationCircleIcon className="w-4 h-4 text-blue-500" />
        </div>
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-base line-clamp-3 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
        {feature.description}
      </p>

      {/* Pop-over Detail tooltip */}
      <div 
        className={`absolute z-[100] bottom-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[320px] pointer-events-none transition-all duration-500 transform origin-bottom ${
          isHovered 
            ? 'opacity-100 translate-y-0 scale-100 visible' 
            : 'opacity-0 translate-y-6 scale-90 invisible'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        <div className="bg-slate-950 dark:bg-white text-white dark:text-slate-900 p-6 rounded-xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-white/10 dark:border-slate-200 backdrop-blur-xl relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
            <span className="font-bold text-[10px] text-blue-400 dark:text-blue-600 uppercase tracking-[0.25em] font-space">
              Core Capability
            </span>
          </div>
          <p className="text-sm text-slate-200 dark:text-slate-700 leading-relaxed font-medium">
            {feature.description}
          </p>
          
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 w-8 h-4 overflow-hidden">
            <div className="w-4 h-4 bg-slate-950 dark:bg-white rotate-45 transform origin-center -translate-y-1/2 mx-auto shadow-sm"></div>
          </div>
        </div>
      </div>
      
      {/* Animated Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-b-xl overflow-hidden">
        <div className={`h-full bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 transition-all duration-700 ease-out ${isHovered ? 'w-full' : 'w-0'}`} />
      </div>
    </div>
  );
};

export default FeatureCard;
