
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Stats: React.FC = () => {
  const { t } = useLanguage();
  const stats = [
    { label: t('stats.colleges'), value: '50+' },
    { label: t('stats.students'), value: '120k+' },
    { label: t('stats.classes'), value: '1.2M+' },
    { label: t('stats.rating'), value: '4.9/5' },
  ];

  return (
    <section className="bg-blue-800 dark:bg-blue-950 py-16 px-4 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                {stat.value}
              </div>
              <div className="text-blue-200 dark:text-blue-400 text-sm md:text-base font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
