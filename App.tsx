
import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import ProgressBar from './components/layout/ProgressBar';
import ScrollToTop from './components/layout/ScrollToTop';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import TrustMarquee from './components/sections/TrustMarquee';
import FeaturesSection from './components/sections/FeaturesSection';
import Pricing from './components/sections/Pricing';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';
import Testimonials from './components/sections/Testimonials';
import FeaturesPage from './components/pages/FeaturesPage';
import PricingPage from './components/pages/PricingPage';
import DemoPage from './components/pages/DemoPage';
import LoginPage from './components/pages/LoginPage';
import SuperAdminDashboard from './components/pages/SuperAdminDashboard';
import { LanguageProvider } from './context/LanguageContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'features' | 'pricing' | 'demo' | 'login' | 'super-admin-dashboard'>('home');

  useEffect(() => {
    // Check for existing session on mount
    const session = localStorage.getItem('acadlog_session');
    if (session) {
      setCurrentPage('super-admin-dashboard');
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleScrollToId = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('acadlog_session');
    setCurrentPage('home');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'features':
        return <FeaturesPage onNavigate={setCurrentPage} />;
      case 'pricing':
        return <PricingPage />;
      case 'demo':
        return <DemoPage />;
      case 'login':
        return <LoginPage onNavigate={(page) => {
          if (page === 'home') setCurrentPage('home');
          else if (page === 'demo') setCurrentPage('demo');
          else setCurrentPage(page as any);
        }} />;
      case 'super-admin-dashboard':
        return <SuperAdminDashboard onLogout={handleLogout} />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Stats />
            <TrustMarquee />
            <FeaturesSection onNavigate={setCurrentPage} />
            <Testimonials />
            <Pricing onNavigate={setCurrentPage} />
            <FAQ />
            <Contact />
          </>
        );
    }
  };

  const isDashboard = currentPage === 'super-admin-dashboard';
  const isAuthPage = currentPage === 'login' || isDashboard;

  return (
    <main className="min-h-screen selection:bg-blue-100 selection:text-blue-900 bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <ProgressBar />
      {!isAuthPage && <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />}
      {renderContent()}
      {!isAuthPage && <ScrollToTop />}
      
      {!isAuthPage && (
        <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-white/5 pt-24 pb-12 px-8 transition-colors">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
              <div className="lg:col-span-2 space-y-6">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center text-white font-bold tracking-tighter shadow-lg shadow-blue-900/20">A</div>
                  <span className="text-2xl font-bold tracking-tighter text-white uppercase font-space">ACADLOG</span>
                </button>
                <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
                  The leading digital operating system for modern Indian campuses. Empowering institutions through seamless automation and deep academic insights.
                </p>
                <div className="flex items-center gap-4 text-slate-500">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition-all">
                    <span className="text-[10px] font-bold">X</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition-all">
                    <span className="text-[10px] font-bold">IN</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white cursor-pointer transition-all">
                    <span className="text-[10px] font-bold">YT</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-space font-bold uppercase tracking-widest text-xs">Product</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li><button onClick={() => setCurrentPage('features')} className="hover:text-blue-400 transition-colors">Features</button></li>
                  <li><button onClick={() => setCurrentPage('pricing')} className="hover:text-blue-400 transition-colors">Pricing</button></li>
                  <li><button onClick={() => setCurrentPage('demo')} className="hover:text-blue-400 transition-colors font-bold text-blue-500">Request Demo</button></li>
                  <li><button onClick={() => handleScrollToId('testimonials')} className="hover:text-blue-400 transition-colors">Success Stories</button></li>
                  <li><button onClick={() => setCurrentPage('super-admin-dashboard')} className="text-blue-400/80 hover:text-blue-400 transition-colors flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    Investor Portal
                  </button></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-space font-bold uppercase tracking-widest text-xs">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">API Documentation</a></li>
                  <li><button onClick={() => handleScrollToId('faq')} className="hover:text-blue-400 transition-colors">Help Center</button></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Community Forum</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Security Overview</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Integration Guide</a></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-white font-space font-bold uppercase tracking-widest text-xs">Legal</h4>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">Data Processing (DPA)</a></li>
                  <li><a href="#" className="hover:text-blue-400 transition-colors">UGC Compliance</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-4 text-slate-500 text-[11px] font-bold uppercase tracking-widest">
                <span>© 2025 Acadlog Edutech Pvt Ltd.</span>
                <span className="hidden md:inline text-slate-800">|</span>
                <span className="flex items-center gap-1.5">
                  Made with <span className="text-red-500">♥</span> for Indian Higher Education
                </span>
              </div>
              
              <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                <a href="#" className="hover:text-white transition-colors">System Status</a>
                <a href="#" className="hover:text-white transition-colors">Vulnerability Disclosure</a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </main>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
