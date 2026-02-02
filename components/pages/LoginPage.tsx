
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeftIcon, 
  AcademicCapIcon, 
  BriefcaseIcon, 
  KeyIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';
import gsap from 'gsap';

interface LoginPageProps {
  onNavigate: (page: 'home' | 'features' | 'pricing' | 'demo' | 'login' | 'super-admin-dashboard') => void;
}

type LoginPersona = 'student' | 'faculty' | 'admin';
type LoginView = 'login' | 'forgot';

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const [persona, setPersona] = useState<LoginPersona>('student');
  const [view, setView] = useState<LoginView>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main Panel Entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      tl.fromTo(leftPanelRef.current, 
        { xPercent: -100 },
        { xPercent: 0, duration: 1.4 }
      )
      .fromTo(rightPanelRef.current, 
        { xPercent: 100 },
        { xPercent: 0, duration: 1.4 },
        "-=1.4"
      )
      .fromTo(".auth-stagger", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=0.6"
      );

      // Background floating particles animation
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        Array.from(particles).forEach((p) => {
          gsap.to(p as Element, {
            x: "random(-40, 40)",
            y: "random(-40, 40)",
            rotation: "random(-15, 15)",
            duration: "random(4, 8)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // Handle persona selection indicator
  useEffect(() => {
    const activeButton = document.getElementById(`persona-${persona}`);
    if (activeButton && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        duration: 0.5,
        ease: "elastic.out(1, 0.8)"
      });
      
      // Micro-bounce for the active button icon
      gsap.fromTo(`#persona-${persona} svg`, 
        { scale: 0.8 }, 
        { scale: 1.1, duration: 0.4, yoyo: true, repeat: 1, ease: "back.out" }
      );
    }
  }, [persona]);

  // View transition (Login vs Forgot)
  useEffect(() => {
    if (formContainerRef.current) {
      const elements = formContainerRef.current.querySelectorAll('.view-stagger');
      gsap.killTweensOf(elements);
      gsap.fromTo(elements,
        { opacity: 0, x: view === 'login' ? -20 : 20, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.05, ease: "power3.out" }
      );
    }
  }, [view]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Feedback animation for the button
    gsap.to(".login-btn", { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 });
    
    setTimeout(() => {
      setIsSubmitting(false);
      // PERSISTENCE LOGIC: If remember me is checked, save a dummy session token
      if (rememberMe) {
        localStorage.setItem('acadlog_session', JSON.stringify({
          token: 'mock_jwt_token_2025',
          persona: persona,
          timestamp: Date.now()
        }));
      }
      
      // Redirect to dashboard (Super Admin is used for demo purposes)
      onNavigate('super-admin-dashboard');
    }, 1500);
  };

  const handleResetRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setView('login');
    }, 2000);
  };

  const getPersonaText = () => {
    switch(persona) {
      case 'student': return { title: 'Student Portal', hint: 'Use your institutional PRN/ID' };
      case 'faculty': return { title: 'Faculty Command', hint: 'Login with staff credentials' };
      case 'admin': return { title: 'Institutional Admin', hint: 'Authorized access only' };
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      {/* Left Panel - Branding & Trust */}
      <div 
        ref={leftPanelRef}
        className="hidden lg:flex w-1/2 bg-blue-800 dark:bg-blue-900 relative flex-col justify-between p-16 text-white overflow-hidden"
      >
        {/* Animated Background Decoration */}
        <div ref={particlesRef} className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-blue-400/20 rounded-full blur-[100px]" />
          <div className="absolute top-[40%] right-[20%] w-32 h-32 border border-white/20 rounded-3xl rotate-12" />
          <div className="absolute bottom-[40%] left-[10%] w-24 h-24 border border-blue-300/20 rounded-full" />
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="relative z-10 flex items-center gap-3 text-white/80 hover:text-white transition-colors font-space font-bold uppercase tracking-widest text-xs group"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Website
        </button>

        <div className="relative z-10 space-y-12">
          <div className="space-y-6">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-blue-800 font-black text-3xl shadow-2xl hover:scale-110 transition-transform cursor-pointer">A</div>
             <h1 className="text-6xl font-black font-space tracking-tighter leading-[0.9] text-balance">
               The future of <br /> 
               <span className="text-blue-300">Indian Campuses.</span>
             </h1>
             <p className="text-xl text-blue-100/70 font-light max-w-md leading-relaxed">
               Trusted by 120,000+ students and premier institutions for seamless academic excellence.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
             {[
               { icon: <ShieldCheckIcon />, text: 'Bank-Grade Security' },
               { icon: <GlobeAltIcon />, text: 'Data Sovereignty' },
               { icon: <AcademicCapIcon />, text: 'NAAC Compliance' },
               { icon: <CheckCircleIcon />, text: '99.9% Uptime SLA' }
             ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-3 text-sm font-bold text-blue-100/80 hover:text-white transition-colors cursor-default">
                 <div className="w-5 h-5 text-blue-400">{item.icon}</div>
                 {item.text}
               </div>
             ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300/50">
          <span>© 2025 ACADLOG EDUTECH</span>
          <span>ISO 27001 CERTIFIED</span>
        </div>
      </div>

      {/* Right Panel - Auth Container */}
      <div 
        ref={rightPanelRef}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 relative bg-slate-50 dark:bg-slate-950"
      >
        <div ref={formContainerRef} className="w-full max-w-md space-y-10">
          {view === 'login' ? (
            <div className="space-y-10">
              <div className="space-y-4 view-stagger">
                <h2 className="text-4xl font-black text-slate-900 dark:text-white font-space tracking-tight">Welcome back</h2>
                <p className="text-slate-500 dark:text-slate-400 font-light">Select your role to access the personalized dashboard.</p>
              </div>

              {/* Persona Selector */}
              <div className="relative bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl flex items-center border border-slate-200 dark:border-white/5 view-stagger">
                <div 
                  ref={indicatorRef}
                  className="absolute h-[calc(100%-12px)] bg-white dark:bg-slate-800 rounded-xl shadow-md z-0 pointer-events-none"
                />
                {[
                  { id: 'student', label: 'Student', icon: <AcademicCapIcon className="w-4 h-4" /> },
                  { id: 'faculty', label: 'Faculty', icon: <BriefcaseIcon className="w-4 h-4" /> },
                  { id: 'admin', label: 'Admin', icon: <KeyIcon className="w-4 h-4" /> }
                ].map((p) => (
                  <button
                    key={p.id}
                    id={`persona-${p.id}`}
                    onClick={() => setPersona(p.id as LoginPersona)}
                    className={`flex-1 relative z-10 py-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                      persona === p.id ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'
                    }`}
                  >
                    {p.icon}
                    {p.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleLogin} className="space-y-6 view-stagger">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-space">
                      {persona === 'student' ? 'Student ID / Enrollment' : 'Institutional Email'}
                    </label>
                    <input 
                      required 
                      type="text" 
                      placeholder={persona === 'student' ? 'e.g. 2025NITD001' : 'admin@college.edu.in'}
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" 
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-space">Password</label>
                      <button 
                        type="button" 
                        onClick={() => setView('forgot')}
                        className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Forgot?
                      </button>
                    </div>
                    <input 
                      required 
                      type="password" 
                      placeholder="••••••••"
                      className="w-full px-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" 
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer" 
                  />
                  <label htmlFor="remember" className="text-sm text-slate-600 dark:text-slate-400 font-medium cursor-pointer">Keep me logged in on this device</label>
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="login-btn w-full py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Log into {getPersonaText().title}
                      <CheckCircleIcon className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="relative view-stagger">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-white/10"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] font-black text-slate-400">
                  <span className="bg-slate-50 dark:bg-slate-950 px-4">Or sign in with</span>
                </div>
              </div>

              <button className="view-stagger w-full py-4 border border-slate-200 dark:border-white/10 rounded-xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all active:scale-95 text-slate-700 dark:text-slate-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                </svg>
                Institutional Google Workspace
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="space-y-4 view-stagger">
                <button 
                  onClick={() => setView('login')}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 hover:gap-3 transition-all group"
                >
                  <ChevronLeftIcon className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                  Back to Login
                </button>
                <h2 className="text-4xl font-black text-slate-900 dark:text-white font-space tracking-tight">Reset Password</h2>
                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  Enter your institutional email address associated with your <span className="font-bold text-blue-600">{persona.charAt(0).toUpperCase() + persona.slice(1)}</span> account.
                </p>
              </div>

              <form onSubmit={handleResetRequest} className="space-y-6 view-stagger">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 font-space">
                    Institutional Email / ID
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      required 
                      type="email" 
                      placeholder="e.g. yourname@college.edu.in"
                      className="w-full pl-14 pr-5 py-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium" 
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                  <strong>Note:</strong> Password reset instructions will be sent to your primary institutional email. If you don't receive an email, please contact your department administrator.
                </div>

                <button 
                  disabled={isSubmitting}
                  type="submit" 
                  className="w-full py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Reset Instructions
                      <ArrowLeftIcon className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="pt-4 text-center view-stagger">
                <p className="text-xs text-slate-500 font-medium">
                  Need immediate help? <a href="#" className="text-blue-600 font-bold hover:underline">Contact Support</a>
                </p>
              </div>
            </div>
          )}

          <p className="text-center text-xs text-slate-500 font-medium leading-relaxed auth-stagger">
            By logging in, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <br className="hidden sm:block" /> 
            affirm you are an authorized member of your institution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
