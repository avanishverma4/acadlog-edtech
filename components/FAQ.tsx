
import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

interface FAQItemProps {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onClick }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && innerRef.current) {
      if (isOpen) {
        // Slide down and fade in
        gsap.to(contentRef.current, {
          height: innerRef.current.offsetHeight,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            // Set to auto for responsiveness if window resizes
            if (contentRef.current) gsap.set(contentRef.current, { height: 'auto' });
          }
        });
      } else {
        // Slide up and fade out
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });
      }
    }
  }, [isOpen]);

  return (
    <div 
      className={`border rounded-2xl transition-all duration-500 overflow-hidden ${
        isOpen 
        ? 'border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-900/10 shadow-lg shadow-blue-500/5' 
        : 'border-slate-100 dark:border-white/5 bg-transparent'
      }`}
    >
      <button 
        onClick={onClick}
        className="group w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none transition-colors"
      >
        <span className={`font-bold transition-colors duration-300 ${isOpen ? 'text-blue-700 dark:text-blue-400' : 'text-slate-900 dark:text-white group-hover:text-blue-600'}`}>
          {faq.question}
        </span>
        <div className={`p-1 rounded-full transition-transform duration-500 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600'}`}>
          {isOpen ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
        </div>
      </button>
      
      <div 
        ref={contentRef} 
        className="overflow-hidden h-0 opacity-0"
      >
        <div ref={innerRef} className="px-6 pb-6">
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm lg:text-base pt-2 border-t border-blue-100/50 dark:border-blue-900/30">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Is Acadlog compliant with Indian University norms?",
      answer: "Yes, Acadlog is built specifically keeping UGC and NAAC guidelines in mind. Our reporting modules generate data in formats that make accreditation documentation seamless."
    },
    {
      question: "How secure is the student data?",
      answer: "We use AES-256 encryption for data at rest and TLS for data in transit. Your institution's data is stored in AWS Mumbai region servers ensuring data residency compliance."
    },
    {
      question: "Can we integrate with our existing fee payment gateway?",
      answer: "Absolutely. We support integrations with all major Indian gateways like Razorpay, Cashfree, and CCAvenue out of the box."
    },
    {
      question: "Do you offer training for our faculty?",
      answer: "Yes, every implementation comes with a 1-week intensive hybrid training program for faculty and administrative staff, along with dedicated support managers."
    }
  ];

  return (
    <section id="faq" className="py-24 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] font-space border border-blue-100 dark:border-blue-900">
            Support Center
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
            Common Questions
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light">
            Everything you need to know about implementing Acadlog in your campus.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem 
              key={idx}
              faq={faq}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-slate-900 dark:bg-slate-900 border border-slate-800 text-center space-y-4">
          <p className="text-slate-400 text-sm">Still have more questions?</p>
          <button className="text-white font-bold hover:text-blue-400 transition-colors inline-flex items-center gap-2">
            Contact our implementation team
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;