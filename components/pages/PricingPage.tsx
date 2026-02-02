
import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { 
  CheckIcon, 
  XMarkIcon, 
  QuestionMarkCircleIcon, 
  ArrowRightIcon, 
  BoltIcon, 
  ShieldCheckIcon, 
  GlobeAltIcon, 
  TrophyIcon 
} from '@heroicons/react/24/outline';
import gsap from 'gsap';

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  
  // Refs for animation targeting
  const headerRef = useRef<HTMLDivElement>(null);
  const tiersContainerRef = useRef<HTMLDivElement>(null);
  const proCardRef = useRef<HTMLDivElement>(null);
  const matrixContainerRef = useRef<HTMLDivElement>(null);
  const addonsContainerRef = useRef<HTMLDivElement>(null);
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);

  // Intersection Observers
  const { ref: headerViewRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: tiersViewRef, inView: tiersInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: matrixViewRef, inView: matrixInView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const { ref: addonsViewRef, inView: addonsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: faqViewRef, inView: faqInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  // Fix: Removed accidental space in variable name ctaInView
  const { ref: ctaViewRef, inView: ctaInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Header Animation
  useEffect(() => {
    if (headerInView && headerRef.current) {
      gsap.fromTo(headerRef.current.children, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out" }
      );
    }
  }, [headerInView]);

  // Tiers Animation
  useEffect(() => {
    if (tiersInView && tiersContainerRef.current) {
      const cards = tiersContainerRef.current.querySelectorAll('.pricing-card-gsap');
      
      gsap.fromTo(cards, 
        { 
          opacity: 0, 
          y: 80, 
          scale: 0.9,
          rotateX: -15
        },
        { 
          opacity: 1, 
          y: 0, 
          scale: (i) => i === 1 ? 1.05 : 1, 
          rotateX: 0,
          duration: 1.4, 
          stagger: {
            each: 0.2,
            from: "center"
          }, 
          ease: "expo.out",
          clearProps: "rotateX"
        }
      );
    }
  }, [tiersInView]);

  // Interactive 3D Tilt for Pro Tier
  const handleProMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!proCardRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate rotation based on mouse position relative to card center
    const xRotation = ((clientY - top) / height - 0.5) * -10; // Max 5 degrees
    const yRotation = ((clientX - left) / width - 0.5) * 10;  // Max 5 degrees
    
    gsap.to(proCardRef.current, {
      rotateX: xRotation,
      rotateY: yRotation,
      scale: 1.08,
      transformPerspective: 1000,
      duration: 0.4,
      ease: "power2.out"
    });

    // Animate internal elements for parallax feel
    gsap.to(proCardRef.current.querySelectorAll('.parallax-element'), {
      x: (clientX - (left + width / 2)) * 0.05,
      y: (clientY - (top + height / 2)) * 0.05,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const handleProMouseLeave = () => {
    if (!proCardRef.current) return;
    gsap.to(proCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1.05, // Pro tier default scale
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
    gsap.to(proCardRef.current.querySelectorAll('.parallax-element'), {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  // Matrix Animation
  useEffect(() => {
    if (matrixInView && matrixContainerRef.current) {
      gsap.fromTo(".matrix-row-gsap", 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [matrixInView]);

  // Addons Animation
  useEffect(() => {
    if (addonsInView && addonsContainerRef.current) {
      gsap.fromTo(".addon-card-gsap", 
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [addonsInView]);

  // FAQ Animation
  useEffect(() => {
    if (faqInView && faqContainerRef.current) {
      gsap.fromTo(".faq-item-gsap", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }
  }, [faqInView]);

  // CTA Animation
  useEffect(() => {
    if (ctaInView && ctaContainerRef.current) {
      gsap.fromTo(ctaContainerRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "expo.out" }
      );
    }
  }, [ctaInView]);

  const pricingData = {
    monthly: { starter: '9,999', pro: '24,999', enterprise: 'Custom' },
    annual: { starter: '7,499', pro: '19,999', enterprise: 'Custom' }
  };

  const comparisonFeatures = [
    { category: 'Academic Management', features: [
      { name: 'Student Strength', starter: 'Up to 500', pro: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'AI Timetable Generator', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom Logic' },
      { name: 'Hybrid Attendance (QR)', starter: true, pro: true, enterprise: true },
      { name: 'Digital Gradebooks', starter: true, pro: true, enterprise: true },
      { name: 'LMS & Video Library', starter: '100GB', pro: '1TB', enterprise: 'Unlimited' },
    ]},
    { category: 'Administration & Finance', features: [
      { name: 'Online Fee Collection', starter: true, pro: true, enterprise: true },
      { name: 'Payroll & HR Management', starter: false, pro: true, enterprise: true },
      { name: 'Inventory & Assets', starter: false, pro: true, enterprise: true },
      { name: 'Hostel & Mess Admin', starter: 'Add-on', pro: true, enterprise: true },
      { name: 'Multi-Campus Support', starter: false, pro: false, enterprise: true },
    ]},
    { category: 'Support & Compliance', features: [
      { name: 'NAAC/NIRF Data Hub', starter: false, pro: true, enterprise: true },
      { name: 'WhatsApp/SMS Alerts', starter: 'Basic', pro: 'Unlimited', enterprise: 'Unlimited' },
      { name: 'Dedicated Account Manager', starter: false, pro: false, enterprise: true },
      { name: 'Custom Domain/Branding', starter: false, pro: true, enterprise: true },
    ]}
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 pt-32 pb-20 transition-colors duration-500 overflow-hidden">
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pro-gradient {
          background: linear-gradient(-45deg, rgba(37,99,235,0.08), rgba(249,115,22,0.08), rgba(37,99,235,0.08));
          background-size: 400% 400%;
          animation: gradient-move 10s ease infinite;
        }
        .pricing-tier-container {
          perspective: 2000px;
        }
      `}</style>

      {/* Header Section */}
      <div ref={headerViewRef} className="max-w-7xl mx-auto px-4 text-center mb-16">
        <div ref={headerRef} className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight">
            Invest in <span className="text-blue-600 dark:text-blue-400">Institutional Growth.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light">
            Transparent, scalable pricing designed for individual departments, full campuses, and large-scale universities.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <span className={`text-sm font-bold transition-colors ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Monthly</span>
            <button
              type="button"
              aria-label={`Switch to ${billingCycle === 'monthly' ? 'annual' : 'monthly'} billing`}
              title={`Switch to ${billingCycle === 'monthly' ? 'Annual' : 'Monthly'} Billing`}
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-16 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full relative p-1 transition-all border border-blue-200 dark:border-blue-800"
            >
              <div
                className={`w-6 h-6 bg-blue-600 rounded-full transition-all transform ${billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-0'} shadow-md`}
              ></div>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold transition-colors ${billingCycle === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>Annual Billing</span>
              <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded border border-green-200 dark:border-green-800/30">Save 25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div ref={tiersViewRef} className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 pricing-tier-container">
        <div ref={tiersContainerRef} className="contents">
          {/* Starter */}
          <div className="pricing-card-gsap p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col hover:border-blue-400 transition-colors opacity-0">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Dept Starter</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Perfect for niche departments.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">₹{pricingData[billingCycle].starter}</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/month</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Up to 500 Students', 'Academic Calendar', 'Hybrid Attendance', 'Basic Testing'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <CheckIcon className="w-4 h-4 text-blue-600" /> {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">Get Started</button>
          </div>

          {/* Pro */}
          <div 
            ref={proCardRef}
            onMouseMove={handleProMouseMove}
            onMouseLeave={handleProMouseLeave}
            className="pricing-card-gsap p-8 rounded-2xl border-2 border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 shadow-2xl z-10 flex flex-col relative overflow-hidden group opacity-0 scale-105"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Animated Hover Background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none animate-pro-gradient z-[-1]" />
            
            <div className="parallax-element absolute top-0 right-0 px-6 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-bl-xl shadow-lg">Recommended</div>
            
            <div className="parallax-element">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Campus Pro</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">The complete college OS.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">₹{pricingData[billingCycle].pro}</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
              {['Unlimited Students', 'Full ERP Suite', 'NAAC/NIRF Data Hub', 'Custom Branding'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-900 dark:text-white font-medium">
                  <div className="parallax-element flex-shrink-0">
                    <CheckIcon className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="parallax-element">{f}</span>
                </li>
              ))}
            </ul>

            <button className="parallax-element w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95">
              Upgrade Now
            </button>
          </div>

          {/* Enterprise */}
          <div className="pricing-card-gsap p-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col hover:border-blue-400 transition-colors opacity-0">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">University</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">For multi-campus institutions.</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold text-slate-900 dark:text-white">Custom</span>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
              {['Multi-College Hub', 'Dedicated Server', 'On-Premise Option', '24/7 Priority Support'].map(f => (
                <li key={f} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <CheckIcon className="w-4 h-4 text-blue-600" /> {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95">Contact Sales</button>
          </div>
        </div>
      </div>

      {/* Comparison Matrix */}
      <div ref={matrixViewRef} className="max-w-7xl mx-auto px-4 mb-32 overflow-x-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Detailed Feature Matrix</h2>
        <div ref={matrixContainerRef} className="border border-slate-200 dark:border-white/10 rounded-xl overflow-hidden bg-white dark:bg-slate-900/30 shadow-xl">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-900/50">
                <th className="py-6 px-6 text-left text-sm font-bold uppercase tracking-widest text-slate-400 w-1/3">Capabilities</th>
                <th className="py-6 px-4 text-center text-sm font-bold uppercase tracking-widest text-slate-400">Starter</th>
                <th className="py-6 px-4 text-center text-sm font-bold uppercase tracking-widest text-blue-500">Pro</th>
                <th className="py-6 px-4 text-center text-sm font-bold uppercase tracking-widest text-slate-400">University</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((cat) => (
                <React.Fragment key={cat.category}>
                  <tr className="matrix-row-gsap bg-slate-100/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-white/10">
                    <td colSpan={4} className="py-4 px-6 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">{cat.category}</td>
                  </tr>
                  {cat.features.map((f, fIdx) => (
                    <tr key={f.name} className={`matrix-row-gsap border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors ${fIdx === cat.features.length - 1 ? 'border-b-2' : ''}`}>
                      <td className="py-6 px-6 flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{f.name}</span>
                        <QuestionMarkCircleIcon className="w-3 h-3 text-slate-300 cursor-help" />
                      </td>
                      <td className="py-6 px-4 text-center text-sm text-slate-500">
                        {typeof f.starter === 'boolean' ? (f.starter ? <CheckIcon className="w-5 h-5 text-blue-600 mx-auto" /> : <XMarkIcon className="w-5 h-5 text-slate-200 mx-auto" />) : f.starter}
                      </td>
                      <td className="py-6 px-4 text-center text-sm font-bold text-slate-900 dark:text-white">
                        {typeof f.pro === 'boolean' ? (f.pro ? <CheckIcon className="w-5 h-5 text-orange-500 mx-auto" /> : <XMarkIcon className="w-5 h-5 text-slate-200 mx-auto" />) : f.pro}
                      </td>
                      <td className="py-6 px-4 text-center text-sm text-slate-500">
                        {typeof f.enterprise === 'boolean' ? (f.enterprise ? <CheckIcon className="w-5 h-5 text-blue-600 mx-auto" /> : <XMarkIcon className="w-5 h-5 text-slate-200 mx-auto" />) : f.enterprise}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add-ons Section */}
      <div ref={addonsViewRef} className="max-w-7xl mx-auto px-4 mb-40">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Institutional Add-ons</h2>
        <div ref={addonsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Biometric Devices', icon: <BoltIcon className="w-5 h-5" />, price: '₹4,500/unit', desc: 'Plug-and-play facial/thumb hardware.' },
            { title: 'AI Exam Procting', icon: <ShieldCheckIcon className="w-5 h-5" />, price: '₹45/student', desc: 'Secure, remote AI-driven invigilation.' },
            { title: 'RFID Cards', icon: <GlobeAltIcon className="w-5 h-5" />, price: '₹25/card', desc: 'High-quality smart cards for library/access.' },
            { title: 'SMS Bundles', icon: <TrophyIcon className="w-5 h-5" />, price: '₹0.18/sms', desc: 'Daik-compliant transactional SMS routes.' },
          ].map((addon) => (
            <div key={addon.title} className="addon-card-gsap p-6 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-400 dark:hover:border-blue-700/50 transition-all hover:-translate-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-4 border border-blue-100 dark:border-blue-800">{addon.icon}</div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-1">{addon.title}</h4>
              <p className="text-blue-600 dark:text-blue-400 text-xs font-bold mb-3 uppercase tracking-widest">{addon.price}</p>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{addon.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing FAQ Section */}
      <div ref={faqViewRef} className="max-w-4xl mx-auto px-4 mb-40">
         <h3 className="text-2xl font-bold text-center mb-10 text-slate-900 dark:text-white">Pricing FAQ</h3>
         <div ref={faqContainerRef} className="space-y-6">
            <div className="faq-item-gsap p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 hover:border-blue-200 transition-colors">
               <p className="font-bold text-slate-900 dark:text-white mb-2">Is there an implementation fee?</p>
               <p className="text-sm text-slate-500">Yes, we charge a one-time onboarding fee based on student volume. This covers data migration from your old ERP and a 3-day on-campus faculty training program.</p>
            </div>
            <div className="faq-item-gsap p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 hover:border-blue-200 transition-colors">
               <p className="font-bold text-slate-900 dark:text-white mb-2">Can we change plans mid-semester?</p>
               <p className="text-sm text-slate-500">Absolutely. You can upgrade your plan anytime. Downsizing is only allowed at the end of an academic year cycle.</p>
            </div>
         </div>
      </div>

      {/* Final CTA Banner */}
      <div ref={ctaViewRef} className="max-w-7xl mx-auto px-4">
        <div ref={ctaContainerRef} className="bg-blue-600 rounded-2xl p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-600/30 border border-blue-500">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">Ready to modernize?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button className="px-12 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:scale-105 transition-all flex items-center gap-2 border border-white shadow-xl">
                Request a Quote
                <ArrowRightIcon className="w-5 h-5" />
              </button>
              <button className="px-12 py-5 bg-blue-700 text-white rounded-xl font-bold text-lg border border-blue-500 hover:bg-blue-800 transition-all active:scale-95">
                Talk to an Expert
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
