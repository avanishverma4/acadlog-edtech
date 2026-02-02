
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.stories': 'Success Stories',
    'nav.faq': 'FAQ',
    'nav.login': 'Login',
    'nav.demo': 'Demo',
    'hero.badge': 'Trusted by 50+ Premier Institutions',
    'hero.title1': 'Modernize your college',
    'hero.title2': 'beyond boundaries.',
    'hero.desc': 'Acadlog is the all-in-one digital operating system for Indian colleges. Automate attendance, streamline grading, and deliver world-class hybrid education.',
    'hero.cta.start': 'Get Started for Free',
    'hero.cta.tour': 'Watch Product Tour',
    'stats.colleges': 'Colleges Onboarded',
    'stats.students': 'Active Students',
    'stats.classes': 'Classes Conducted',
    'stats.rating': 'Feedback Rating',
  },
  hi: {
    'nav.features': 'विशेषताएं',
    'nav.pricing': 'कीमतें',
    'nav.stories': 'सफलता की कहानियां',
    'nav.faq': 'अक्सर पूछे जाने वाले प्रश्न',
    'nav.login': 'लॉगिन',
    'nav.demo': 'डेमो',
    'hero.badge': '५०+ प्रमुख संस्थानों द्वारा विश्वसनीय',
    'hero.title1': 'अपने कॉलेज का आधुनिकीकरण करें',
    'hero.title2': 'सीमाओं से परे।',
    'hero.desc': 'एकाडलॉग (Acadlog) भारतीय कॉलेजों के लिए ऑल-इन-वन डिजिटल ऑपरेटिंग सिस्टम है। उपस्थिति को स्वचालित करें, ग्रेडिंग को सुव्यवस्थित करें और विश्व स्तरीय हाइब्रिड शिक्षा प्रदान करें।',
    'hero.cta.start': 'मुफ्त में शुरू करें',
    'hero.cta.tour': 'प्रोडक्ट टूर देखें',
    'stats.colleges': 'ऑनबोर्ड कॉलेज',
    'stats.students': 'सक्रिय छात्र',
    'stats.classes': 'आयोजित कक्षाएं',
    'stats.rating': 'फीडबैक रेटिंग',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('acadlog_lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('acadlog_lang', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'hi' ? 'lang-hi' : 'lang-en'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
