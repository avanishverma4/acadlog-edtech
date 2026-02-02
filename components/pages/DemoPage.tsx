
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  CalendarDaysIcon, 
  VideoCameraIcon, 
  ClockIcon, 
  ArrowRightIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
  BoltIcon
} from '@heroicons/react/24/outline';
import gsap from 'gsap';

const DemoPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Intersection observer for the trust section
  const { ref: trustRef, inView: trustInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Initial Header & Form Entrance
      tl.fromTo(".demo-header", 
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, stagger: 0.15 }
      )
      .fromTo(".demo-form-container", 
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "back.out(1.2)" },
        "-=1"
      )
      .fromTo(".demo-feature-card", 
        { opacity: 0, x: 30, skewX: 5 },
        { opacity: 1, x: 0, skewX: 0, duration: 0.8, stagger: 0.12 },
        "-=0.8"
      );

      // Floating animation for feature icons
      gsap.to(".feature-icon-float", {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      // Subtle Background Aura movement
      if (auraRef.current) {
        gsap.to(auraRef.current, {
          x: "random(-50, 50)",
          y: "random(-50, 50)",
          duration: 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Input Focus Animations (Imperative GSAP)
      const inputs = document.querySelectorAll('input, select');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, { scale: 1.01, borderColor: '#2563eb', duration: 0.3 });
        });
        input.addEventListener('blur', () => {
          gsap.to(input, { scale: 1, borderColor: 'rgba(226, 232, 240, 1)', duration: 0.3 });
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Trust section staggered animation
  useEffect(() => {
    if (trustInView) {
      gsap.fromTo(".trust-partner", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [trustInView]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (formRef.current) {
      gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.5, onComplete: () => {
        gsap.fromTo(".success-message", 
          { opacity: 0, scale: 0.8, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }
        );
      }});
    }
  };

  return (
    <div ref={containerRef} className="bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500 overflow-hidden min-h-screen relative">
      {/* Background Aura */}
      <div 
        ref={auraRef}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <div className="demo-header inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-blue-800 dark:text-blue-400 text-xs font-black uppercase tracking-[0.2em] font-space">
                <ClockIcon className="w-4 h-4" />
                Experience the Future
              </div>
              <h1 className="demo-header text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none font-space">
                See Acadlog <br />
                <span className="text-blue-600 dark:text-blue-400">in Action.</span>
              </h1>
              <p className="demo-header text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-lg">
                Discover how we're empowering Indian institutions with seamless automation and predictive academic insights.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { 
                  icon: <AcademicCapIcon className="w-6 h-6" />, 
                  title: "Personalized Walkthrough", 
                  desc: "Our experts will map your current college workflows to Acadlog's automated modules." 
                },
                { 
                  icon: <ShieldCheckIcon className="w-6 h-6" />, 
                  title: "Security & Compliance", 
                  desc: "Learn how we handle data residency in India and NAAC/NIRF reporting standards." 
                },
                { 
                  icon: <ChartBarSquareIcon className="w-6 h-6" />, 
                  title: "Deep Analytics", 
                  desc: "Explore the dashboards used by hundreds of institutions to track student success." 
                }
              ].map((item, idx) => (
                <div key={idx} className="demo-feature-card flex gap-6 group">
                  <div className="feature-icon-float w-14 h-14 shrink-0 rounded-2xl bg-blue-50 dark:bg-slate-900 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="demo-header pt-8">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 flex items-center gap-4 hover:shadow-lg transition-all cursor-default">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 object-cover hover:scale-110 transition-transform cursor-pointer" alt="User" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Join 50+ Institutions</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Already modernizing their campus.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Form */}
          <div className="lg:col-span-7">
            <div className="demo-form-container relative">
              <div className="absolute inset-0 bg-blue-600 blur-[120px] opacity-10 dark:opacity-20 rounded-full" />
              <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-8 md:p-12 overflow-hidden">
                {!formSubmitted ? (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-space">Full Name</label>
                        <input required type="text" placeholder="Dr. Rahul Mehta" className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-space">Designation</label>
                        <input required type="text" placeholder="Director / HOD" className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-space">Institution Name</label>
                      <input required type="text" placeholder="Apex Institute of Technology" className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-space">Work Email</label>
                        <input required type="email" placeholder="rahul@institution.edu.in" className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-space">Phone Number</label>
                        <input required type="tel" placeholder="+91 98765 43210" className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="primary-interest" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-space">
                        Primary Interest
                      </label>
                      <select
                        id="primary-interest"
                        name="primary-interest"
                        title="Select your primary interest"
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                        required
                      >
                        <option value="">Select an option</option>
                        <option value="erp">ERP & Student Life-Cycle</option>
                        <option value="hybrid">Hybrid Classroom Technology</option>
                        <option value="naac">NAAC / NIRF Compliance Reporting</option>
                        <option value="financial">Financial & Fee Management</option>
                        <option>AI Assessments & Timetable</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3 group">
                      <CalendarDaysIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Schedule My 15-Min Demo
                    </button>

                    <p className="text-center text-[11px] text-slate-400 font-medium italic">
                      No obligation. No credit card required. Just a glimpse into the future.
                    </p>
                  </form>
                ) : (
                  <div className="success-message text-center py-20 space-y-6">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/10">
                      <BoltIcon className="w-10 h-10 animate-pulse" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white font-space">Request Received!</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      An implementation specialist will reach out to you within 2 business hours to coordinate the best time.
                    </p>
                    <button onClick={() => setFormSubmitted(false)} className="px-8 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-200 transition-all active:scale-95">
                      Go Back
                    </button>
                  </div>
                )}
              </div>

              {/* Instant Tour Shortcut */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-6 rounded-2xl bg-blue-600 text-white space-y-4 shadow-xl shadow-blue-600/20 group cursor-pointer hover:-translate-y-2 transition-all">
                    <VideoCameraIcon className="w-8 h-8 opacity-80 group-hover:scale-110 transition-transform" />
                    <h4 className="font-black font-space tracking-tight">Watch Video Tour</h4>
                    <p className="text-sm text-blue-100 font-light leading-relaxed">A quick 2-minute overview of our most loved features.</p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-2">
                      Watch Now <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                 </div>
                 <div className="p-6 rounded-2xl bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/30 space-y-4 shadow-sm group cursor-pointer hover:-translate-y-2 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:rotate-12 transition-transform">
                      <ChartBarSquareIcon className="w-5 h-5" />
                    </div>
                    <h4 className="font-black font-space tracking-tight text-orange-900 dark:text-orange-100">Download Brochure</h4>
                    <p className="text-sm text-orange-600 dark:text-orange-400/80 font-light leading-relaxed">PDF overview of all technical specifications.</p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest pt-2 text-orange-700 dark:text-orange-400">
                      Download <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <section ref={trustRef} className="mt-40 border-t border-slate-100 dark:border-white/5 pt-24">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
           <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 font-space">Institutional Trust Partners</h3>
           <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
              <div className="trust-partner text-2xl font-black font-space text-slate-500 hover:text-blue-600 transition-colors cursor-default">IISC BANGALORE</div>
              <div className="trust-partner text-2xl font-black font-space text-slate-500 hover:text-blue-600 transition-colors cursor-default">BITS PILANI</div>
              <div className="trust-partner text-2xl font-black font-space text-slate-500 hover:text-blue-600 transition-colors cursor-default">NIT TRICHY</div>
              <div className="trust-partner text-2xl font-black font-space text-slate-500 hover:text-blue-600 transition-colors cursor-default">VIT VELLORE</div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default DemoPage;
