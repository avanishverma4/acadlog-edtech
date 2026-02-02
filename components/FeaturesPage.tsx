
import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  BookOpenIcon, 
  UsersIcon, 
  ArrowRightIcon,
  AcademicCapIcon,
  BoltIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import gsap from 'gsap';

const DETAILED_CATEGORIES = [
  {
    title: "Academic Operations",
    description: "Reinvent the teaching-learning experience with tools that automate the mundane and amplify the educational impact across your campus.",
    icon: <BookOpenIcon className="w-10 h-10" />,
    features: [
      { name: "Smart Timetabling", desc: "Conflict-free schedule generation with AI-assisted faculty load balancing and classroom optimization." },
      { name: "Hybrid Classrooms", desc: "Seamless integration for live streaming, recording, and digital resource sharing for modern learners." },
      { name: "Automated Grading", desc: "Digital evaluation workflows with instant marksheet generation and real-time result analytics." }
    ]
  },
  {
    title: "Administrative Hub",
    description: "Empower campus leaders with a 360-degree view of institutional health, financial metrics, and operational efficiency.",
    icon: <UsersIcon className="w-10 h-10" />,
    features: [
      { name: "Unified CRM", desc: "Manage the complete student lifecycle from admission to alumni status with a single source of truth." },
      { name: "Compliance Engine", desc: "Automated data harvesting for NAAC, NIRF, and University audits to save hundreds of work hours." },
      { name: "Fee Management", desc: "Direct collection with automated reconciliation, installment tracking, and digital receipts." }
    ]
  },
  {
    title: "Student Success",
    description: "A mobile-first ecosystem designed to keep students engaged, informed, and ready for their professional careers.",
    icon: <AcademicCapIcon className="w-10 h-10" />,
    features: [
      { name: "Mobile Learning", desc: "Access lecture recordings, notes, and personalized schedules on any device, even on low bandwidth." },
      { name: "Progress Analytics", desc: "Real-time visualization of academic performance, attendance trends, and credit completion." },
      { name: "Digital Portfolio", desc: "Verified credentials and achievement tracking for placement readiness and professional visibility." }
    ]
  },
  {
    title: "Global Infrastructure",
    description: "Enterprise-grade security and scalability that grows with your institution's ambition and global presence.",
    icon: <GlobeAltIcon className="w-10 h-10" />,
    features: [
      { name: "Cloud Residency", desc: "Data stored in local Mumbai regions ensuring strict compliance with Indian data regulations." },
      { name: "API Ecosystem", desc: "Easily integrate with third-party tools, legacy hardware, and modern payment gateways." },
      { name: "Military Encryption", desc: "AES-256 bit encryption for all institutional data points, ensuring privacy and trust." }
    ]
  }
];

interface FeatureCategoryProps {
  cat: typeof DETAILED_CATEGORIES[0];
  idx: number;
}

const FeatureCategory: React.FC<FeatureCategoryProps> = ({ cat, idx }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView && containerRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        tl.fromTo(".category-header-icon", 
          { scale: 0, opacity: 0, rotate: -20 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "back.out(1.7)" }
        )
        .fromTo(".category-header-title", 
          { opacity: 0, x: idx % 2 === 0 ? -60 : 60, skewX: idx % 2 === 0 ? 10 : -10, filter: 'blur(10px)' },
          { opacity: 1, x: 0, skewX: 0, filter: 'blur(0px)', duration: 1.2 },
          "-=0.7"
        )
        .fromTo(".category-header-desc", 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.9"
        )
        .fromTo(".category-header-cta", 
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.8"
        );

        gsap.fromTo(".feature-detail-card", 
          { opacity: 0, scale: 0.9, y: 40, filter: 'blur(4px)' },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            filter: 'blur(0px)', 
            duration: 0.9, 
            stagger: 0.12, 
            delay: 0.4, 
            ease: "back.out(1.2)" 
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [inView, idx]);

  return (
    <section 
      ref={ref} 
      className={`relative py-40 px-4 md:px-8 transition-colors ${
        idx % 2 === 0 ? 'bg-slate-50/70 dark:bg-slate-900/40' : 'bg-slate-50 dark:bg-slate-950'
      }`}
    >
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Category Content Side */}
          <div className={`lg:col-span-5 space-y-8 ${idx % 2 !== 0 ? 'lg:order-last' : ''}`}>
            <div className="space-y-6">
              <div className="flex items-center gap-4 category-header-icon">
                 <div className="w-14 h-14 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                   {/* Cast to React.ReactElement<any> to fix type error when cloning with className */}
                   {React.cloneElement(cat.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-500 font-space">
                   Phase 0{idx + 1}
                 </span>
              </div>
              
              <h2 className="category-header-title text-5xl md:text-6xl font-black text-slate-950 dark:text-white leading-[1.1] tracking-tighter font-space">
                {cat.title}
              </h2>
              
              <div className="category-header-desc w-20 h-1.5 bg-gradient-to-r from-blue-600 to-transparent rounded-full shadow-sm" />
              
              <p className="category-header-desc text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light max-w-lg">
                {cat.description}
              </p>
            </div>

            <button className="category-header-cta flex items-center gap-4 text-blue-700 dark:text-blue-400 font-black uppercase tracking-widest text-[10px] font-space hover:gap-6 transition-all group">
              Explore the Module <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </button>
          </div>

          {/* Features Grid Side */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cat.features.map((feature, fIdx) => (
              <div 
                key={fIdx}
                className="feature-detail-card p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1.5 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-6">
                  <BoltIcon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {feature.name}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                  {feature.desc}
                </p>
              </div>
            ))}
            
            {/* CTA Sub-card */}
            <div className="feature-detail-card p-8 rounded-2xl bg-blue-700 text-white flex flex-col justify-between shadow-2xl shadow-blue-800/30 transform hover:scale-[1.02] transition-all">
               <div>
                 <h4 className="text-xl font-black font-space tracking-tight leading-tight mb-3">Integrate existing workflows.</h4>
                 <p className="text-blue-100 text-sm font-light leading-relaxed">Our API-first architecture allows for seamless legacy hardware and software bridging.</p>
               </div>
               <button className="mt-8 bg-white text-blue-800 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-colors w-full sm:w-fit font-space">
                 Connect API
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeaturesPageProps {
  onNavigate?: (page: 'home' | 'features' | 'pricing' | 'demo' | 'login') => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
  const handleBookDemo = () => {
    if (onNavigate) {
      onNavigate('demo');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      {/* Page Header */}
      <header className="pt-48 pb-32 px-4 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-blue-50/80 dark:from-blue-900/10 to-transparent -z-10" />
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full shadow-sm">
             <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 dark:text-blue-400 font-space">Enterprise OS</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-950 dark:text-white leading-none tracking-tighter font-space">
            The Digital OS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 dark:from-blue-600 dark:to-blue-200">
              for Campuses.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light max-w-3xl mx-auto leading-tight tracking-tight">
            Every department. Every stakeholder. <br className="hidden md:block" />
            Built into one beautiful, unified institutional ecosystem.
          </p>
        </div>
      </header>

      {/* Categories Content */}
      <div className="relative">
        {DETAILED_CATEGORIES.map((cat, idx) => (
          <FeatureCategory key={cat.title} cat={cat} idx={idx} />
        ))}
      </div>

      {/* Ecosystem Section */}
      <section className="py-40 px-4 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
               <h2 className="text-5xl md:text-7xl font-black font-space tracking-tighter leading-none">Ecosystem First.</h2>
               <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">Acadlog connects with the tools you already use—from GSuite and Zoom to Indian gateways like Razorpay.</p>
               <div className="flex flex-wrap gap-4">
                 {['Razorpay', 'AWS', 'Zoom', 'GSuite', 'Slack', 'WhatsApp'].map(tool => (
                   <span key={tool} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-slate-400 font-bold text-xs tracking-widest">{tool}</span>
                 ))}
               </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-blue-600/20 rounded-full blur-[120px] absolute inset-0" />
              <div className="relative border border-white/10 rounded-2xl p-12 bg-white/5 backdrop-blur-2xl">
                 <div className="grid grid-cols-2 gap-8">
                   {[
                     { l: 'Uptime', v: '99.9%' },
                     { l: 'Latency', v: '<50ms' },
                     { l: 'Security', v: 'AES-256' },
                     { l: 'Updates', v: 'Weekly' }
                   ].map(stat => (
                     <div key={stat.l} className="space-y-1">
                       <p className="text-3xl font-black font-space">{stat.v}</p>
                       <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">{stat.l}</p>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-16 md:p-32 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,64,175,0.4)] border border-blue-500/50">
          <div className="relative z-10 space-y-12">
            <h2 className="text-6xl md:text-8xl font-black font-space tracking-tighter leading-none">Modernize your institution.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button 
                onClick={handleBookDemo}
                className="px-12 py-6 bg-white text-blue-800 rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-xl"
              >
                Book Global Demo
              </button>
              <button className="px-12 py-6 border-2 border-white/30 hover:bg-white/10 rounded-2xl font-black text-lg uppercase tracking-widest transition-all">
                Contact Strategy
              </button>
            </div>
          </div>
          <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-white/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-black/20 rounded-full blur-[150px] pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;