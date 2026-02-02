
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChatBubbleLeftEllipsisIcon, StarIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

const TESTIMONIALS = [
  {
    name: "Dr. Aradhana Sharma",
    role: "Director, Apex Group of Institutions",
    content: "Acadlog has completely transformed our administrative overhead. What used to take a team of five now happens autonomously. Their compliance reporting is a lifesaver for NAAC audits.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    name: "Prof. Vikram Mehra",
    role: "HOD Computer Science, NIT Delhi",
    content: "The AI Timetable generator is pure magic. We managed to resolve complex elective clashes for 2,000+ students in under ten minutes. The faculty adoption rate was surprisingly high.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    name: "Sanya Malhotra",
    role: "Final Year Student, Engineering",
    content: "The mobile app is so intuitive. Having all my lecture notes, attendance, and fee receipts in one place makes college life so much easier. I never miss an important notification now.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    name: "Mr. Rajesh Iyer",
    role: "Registrar, Zenith Institute of Management",
    content: "Handling admissions and fee reconciliation was our biggest pain point. Acadlog's automated workflows and direct bank integrations have made our office virtually paperless and highly efficient.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150",
    rating: 5
  },
  {
    name: "Dr. Sneha Kulkarni",
    role: "Placement Officer, KJS Engineering College",
    content: "The digital portfolio feature is a game-changer for our students. Having verified credentials and performance analytics ready to share with recruiters has significantly boosted our placement conversion rates.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    rating: 5
  }
];

const TestimonialCard: React.FC<{ testimonial: typeof TESTIMONIALS[0]; index: number; isActive: boolean }> = ({ testimonial, index, isActive }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref: viewRef, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView && cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", delay: index * 0.1 }
      );
    }
  }, [inView, index]);

  useEffect(() => {
    if (isActive && cardRef.current) {
      const content = cardRef.current.querySelector('.testimonial-content');
      if (content) {
        gsap.fromTo(content, 
          { opacity: 0.7, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
        );
      }
    }
  }, [isActive]);

  return (
    <div ref={viewRef} className="w-full px-4 flex-shrink-0 flex items-center justify-center">
      <div 
        ref={cardRef}
        className={`relative mx-auto w-full max-w-4xl bg-white dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl shadow-blue-900/5 hover:shadow-blue-500/10 overflow-hidden transition-all duration-700 group opacity-0 ${isActive ? 'scale-100' : 'scale-95 opacity-50 blur-[2px]'}`}
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start text-center md:text-left testimonial-content">
          <div className="flex flex-col items-center gap-6 shrink-0">
            <div className="relative">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-3xl object-cover ring-4 ring-white/50 dark:ring-white/10 shadow-2xl border border-slate-100 dark:border-white/5 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg border border-blue-500">
                <ChatBubbleLeftEllipsisIcon className="w-4 h-4" />
              </div>
            </div>
            <div className="flex gap-1">
              {[...Array(testimonial.rating)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
              ))}
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <p className="text-xl lg:text-3xl text-slate-800 dark:text-slate-200 font-light leading-relaxed italic">
              "{testimonial.content}"
            </p>

            <div className="pt-6 border-t border-slate-200 dark:border-white/10">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{testimonial.name}</h4>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 font-space mt-1">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef, inView: sectionInView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useLayoutEffect(() => {
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        xPercent: -activeIndex * 100,
        duration: 1.2,
        ease: "expo.inOut",
        overwrite: "auto"
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!isPaused && sectionInView) {
      timerRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeIndex, sectionInView]);

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className="py-32 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none opacity-20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div 
          className={`text-center mb-24 space-y-6 transition-all duration-1000 transform ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30 text-blue-800 dark:text-blue-400 text-sm font-bold uppercase tracking-widest font-space">
            Voices of Impact
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-none">
            Trusted by the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-500 to-blue-400 dark:from-blue-400 dark:to-blue-600">
              Future of Education.
            </span>
          </h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light">
            Real feedback from institutional leaders, faculty, and students who are redefining excellence with Acadlog.
          </p>
        </div>

        <div 
          className="relative group/slider max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden rounded-[3rem]">
            <div 
              ref={sliderRef}
              className="flex will-change-transform"
            >
              {TESTIMONIALS.map((t, idx) => (
                <TestimonialCard 
                  key={idx} 
                  testimonial={t} 
                  index={idx}
                  isActive={activeIndex === idx}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 lg:-translate-x-16 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full shadow-2xl opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 z-20 focus:outline-none hover:scale-110 active:scale-90"
            aria-label="Previous Testimonial"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 lg:translate-x-16 p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full shadow-2xl opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 z-20 focus:outline-none hover:scale-110 active:scale-90"
            aria-label="Next Testimonial"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          <div className="flex justify-center gap-4 mt-12">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className="group relative h-4 transition-all duration-300 focus:outline-none"
                aria-label={`Go to slide ${idx + 1}`}
              >
                <div className={`h-2 rounded-full transition-all duration-500 bg-slate-200 dark:bg-slate-800 border-transparent overflow-hidden ${
                  activeIndex === idx ? 'w-12 bg-blue-600' : 'w-2.5 hover:bg-blue-400'
                }`}>
                  {activeIndex === idx && (
                    <div className="h-full bg-white/30 animate-[progress_6s_linear_infinite]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
