
import React, { useState, useEffect, useRef } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const threshold = 400;
      
      // Calculate progress
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = docHeight - winHeight;
      const progress = totalScroll > 0 ? (scrolled / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      if (scrolled > threshold) {
        if (!isVisible) setIsVisible(true);
      } else {
        if (isVisible) setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    if (buttonRef.current) {
      if (isVisible) {
        gsap.killTweensOf(buttonRef.current);
        gsap.fromTo(buttonRef.current, 
          { scale: 0, opacity: 0, y: 40, rotate: -45 },
          { 
            scale: 1, 
            opacity: 1, 
            y: 0, 
            rotate: 0,
            duration: 0.8, 
            ease: "elastic.out(1, 0.75)",
            display: 'flex'
          }
        );
      } else {
        gsap.to(buttonRef.current, { 
          scale: 0.5, 
          opacity: 0, 
          y: 20, 
          rotate: 45,
          duration: 0.5, 
          ease: "power2.in",
          onComplete: () => {
            if (buttonRef.current) buttonRef.current.style.display = 'none';
          }
        });
      }
    }
  }, [isVisible]);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -4,
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.inOut"
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG Circle calculations (based on 56x56 viewBox)
  const size = 56;
  const center = size / 2;
  const strokeWidth = 3;
  const radius = (size - strokeWidth - 4) / 2; // Adding some safety margin
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-8 right-8 z-[60] group flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-slate-900 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-none transition-transform active:scale-90 overflow-hidden"
      aria-label="Scroll to top"
      style={{ display: 'none' }}
    >
      {/* Progress Ring Background */}
      <svg 
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-100 dark:text-slate-800"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-orange-600 dark:text-orange-500 transition-all duration-300 ease-out"
        />
      </svg>
      
      {/* Inner Orange Core */}
      <div 
        ref={iconRef}
        className="relative z-10 w-10 h-10 flex items-center justify-center bg-orange-600 rounded-full text-white shadow-lg shadow-orange-600/20 group-hover:bg-orange-700 transition-colors"
      >
        <ChevronUpIcon className="w-5 h-5 stroke-[3.5px]" />
      </div>

      {/* Subtle Glow Pulse Decoration */}
      <div className="absolute inset-0 rounded-full bg-orange-500/10 animate-pulse -z-10 group-hover:bg-orange-500/20" />
    </button>
  );
};

export default ScrollToTop;
