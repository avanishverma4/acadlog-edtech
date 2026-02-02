
import React, { useState, useEffect, useRef } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  SunIcon, 
  MoonIcon, 
  BoltIcon, 
  CreditCardIcon, 
  QuestionMarkCircleIcon,
  PlayIcon,
  HeartIcon,
  LanguageIcon,
  KeyIcon
} from '@heroicons/react/24/outline';
import { useLanguage, Language } from '../../context/LanguageContext';
import gsap from 'gsap';

interface NavbarProps {
  onNavigate: (page: 'home' | 'features' | 'pricing' | 'demo' | 'login') => void;
  currentPage: 'home' | 'features' | 'pricing' | 'demo' | 'login';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (langMenuRef.current) {
      if (isLangMenuOpen) {
        gsap.fromTo(langMenuRef.current,
          { opacity: 0, y: 10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  }, [isLangMenuOpen]);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const navLinks = [
    { label: t('nav.features'), id: 'features' as const, icon: <BoltIcon className="w-4 h-4" /> },
    { label: t('nav.pricing'), id: 'pricing' as const, icon: <CreditCardIcon className="w-4 h-4" /> },
    { label: t('nav.stories'), id: 'testimonials' as const, icon: <HeartIcon className="w-4 h-4" />, type: 'scroll' },
    { label: t('nav.faq'), id: 'faq' as const, icon: <QuestionMarkCircleIcon className="w-4 h-4" />, type: 'scroll' },
  ];

  const handlePageClick = (id: 'home' | 'features' | 'pricing' | 'demo' | 'login' | 'faq' | 'testimonials') => {
    setIsMenuOpen(false);
    if (id === 'faq' || id === 'testimonials') {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    onNavigate(id as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center px-4 pt-4 md:pt-6">
      <nav className={`transition-all duration-500 ease-in-out flex items-center justify-between rounded-full border shadow-2xl relative backdrop-blur-xl ${
        isScrolled 
          ? 'bg-white/70 dark:bg-slate-900/70 py-2 px-4 w-full max-w-5xl border-slate-200 dark:border-white/15' 
          : 'bg-white/50 dark:bg-slate-900/50 py-3 px-6 w-full max-w-6xl border-slate-200/60 dark:border-white/10'
      }`}>
        
        <button 
          onClick={() => handlePageClick('home')}
          className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg tracking-tighter shrink-0 shadow-lg shadow-blue-800/20">
            A
          </div>
          <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase font-space">
            ACADLOG
          </span>
        </button>
        
        <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest font-space">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handlePageClick(link.id as any)}
              className={`transition-all hover:text-blue-800 dark:hover:text-blue-400 flex items-center gap-1.5 relative group ${
                (currentPage === link.id) ? 'text-blue-800 dark:text-blue-400' : ''
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="p-2.5 text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-white/10 flex items-center gap-1"
              aria-label="Change Language"
            >
              <LanguageIcon className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-tighter">{language}</span>
            </button>

            {isLangMenuOpen && (
              <div 
                ref={langMenuRef}
                className="absolute top-full right-0 mt-3 w-40 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 rounded-2xl shadow-2xl p-2 z-[100] backdrop-blur-xl"
              >
                {[
                  { id: 'en', label: 'English' },
                  { id: 'hi', label: 'हिन्दी' }
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => handleLanguageSelect(l.id as Language)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      language === l.id 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={toggleDarkMode}
            className="p-2.5 text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-all active:scale-90 border border-transparent hover:border-slate-200 dark:hover:border-white/10"
          >
            {isDarkMode ? <SunIcon className="w-5 h-5 text-orange-400" /> : <MoonIcon className="w-5 h-5" />}
          </button>

          <button 
            onClick={() => handlePageClick('login')}
            className="hidden sm:block text-[13px] font-bold text-slate-800 dark:text-white hover:text-blue-800 dark:hover:text-blue-400 px-2 py-1 transition-colors uppercase tracking-widest font-space"
          >
            {t('nav.login')}
          </button>
          
          <button 
            onClick={() => handlePageClick('demo')}
            className={`hidden sm:flex px-6 py-2.5 rounded-full text-[13px] font-bold transition-all uppercase tracking-widest font-space items-center gap-2 ${
              currentPage === 'demo' ? 'bg-orange-600 text-white shadow-orange-600/20' : 'bg-blue-800 text-white hover:bg-blue-700 shadow-blue-800/20'
            } shadow-lg`}
          >
            <PlayIcon className="w-3.5 h-3.5 fill-current" />
            {t('nav.demo')}
          </button>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-full transition-colors border border-transparent hover:border-slate-200"
          >
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`w-full max-w-6xl mt-4 transition-all duration-500 transform origin-top md:hidden ${
        isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/15 rounded-[2.5rem] shadow-2xl p-4 space-y-2">
          {navLinks.map((link) => (
            <button 
              key={link.id} 
              onClick={() => handlePageClick(link.id as any)}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-[1.5rem] transition-all duration-300 border border-transparent ${
                currentPage === link.id 
                  ? 'bg-blue-600 text-white shadow-lg border-blue-500' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              <div className={`p-2 rounded-xl shadow-sm ${currentPage === link.id ? 'bg-white/20' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5'}`}>
                {link.icon}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest font-space">{link.label}</span>
            </button>
          ))}
          <button 
            onClick={() => handlePageClick('login')}
            className={`w-full text-left flex items-center gap-4 p-4 rounded-[1.5rem] transition-all duration-300 border border-transparent ${
                currentPage === 'login' 
                  ? 'bg-blue-600 text-white shadow-lg border-blue-500' 
                  : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/5'
              }`}
          >
             <div className={`p-2 rounded-xl shadow-sm ${currentPage === 'login' ? 'bg-white/20' : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/5'}`}>
                <KeyIcon className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest font-space">{t('nav.login')}</span>
          </button>
          <button 
            onClick={() => handlePageClick('demo')}
            className={`w-full text-left flex items-center gap-4 p-4 rounded-[1.5rem] transition-all duration-300 border border-transparent ${
                currentPage === 'demo' 
                  ? 'bg-orange-600 text-white shadow-lg border-orange-500' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
             <div className="p-2 rounded-xl bg-white/20 shadow-sm">
                <PlayIcon className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest font-space">{t('nav.demo')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
