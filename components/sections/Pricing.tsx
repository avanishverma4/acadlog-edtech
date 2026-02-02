
import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';

interface PricingProps {
  onNavigate?: (page: 'home' | 'features' | 'pricing') => void;
}

const Pricing: React.FC<PricingProps> = ({ onNavigate }) => {
  const tiers = [
    {
      name: 'Department',
      price: '₹9,999',
      duration: '/month',
      description: 'Perfect for individual departments or coaching centers.',
      features: ['Up to 500 Students', 'Online Attendance', 'Test Management', 'Basic Analytics', 'Email Support'],
      cta: 'Start with Dept',
      featured: false
    },
    {
      name: 'College',
      price: '₹24,999',
      duration: '/month',
      description: 'The standard choice for full-campus automation.',
      features: ['Unlimited Students', 'Full Admin Controls', 'AI-Generated Tests', 'Fee Management', 'Priority Support', 'Custom Branding'],
      cta: 'Most Popular',
      featured: true
    },
    {
      name: 'University',
      price: 'Custom',
      duration: '',
      description: 'Tailored for multi-college chains and large universities.',
      features: ['Centralized Hub', 'Cross-College Analytics', 'Dedicated Manager', 'API Access', 'On-Premise Option', '24/7 Phone Support'],
      cta: 'Contact Sales',
      featured: false
    }
  ];

  const handleCtaClick = () => {
    if (onNavigate) {
      onNavigate('pricing');
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">Transparent Pricing</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Scalable solutions designed for institutions of all sizes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                tier.featured 
                ? 'bg-white dark:bg-slate-950 border-blue-600 dark:border-blue-500 shadow-2xl scale-105 z-10 border-2' 
                : 'bg-white/50 dark:bg-slate-950/50 border-slate-200 dark:border-white/10 hover:border-orange-400 dark:hover:border-orange-500/50'
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg shadow-blue-600/20">
                  Recommended
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{tier.price}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{tier.duration}</span>
                </div>
                <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{tier.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {tier.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                      <CheckIcon className="w-3 h-3" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={handleCtaClick}
                className={`w-full py-4 rounded-xl font-bold transition-all border ${
                tier.featured 
                ? 'bg-blue-800 text-white border-blue-700 hover:bg-blue-700 shadow-lg shadow-blue-800/20' 
                : 'bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800/50 hover:bg-orange-100 dark:hover:bg-orange-900/40'
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
