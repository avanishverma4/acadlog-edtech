
import React from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-4 bg-slate-900 dark:bg-slate-950 text-white overflow-hidden relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to transform your <br />
              <span className="text-blue-400">institution?</span>
            </h2>
            <p className="text-slate-400 dark:text-slate-500 text-lg max-w-md">
              Join the growing network of smart colleges. Book a personalized demo to see how Acadlog fits your specific academic workflow.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 dark:bg-slate-900 rounded-full flex items-center justify-center text-blue-400">
                  <EnvelopeIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Email us</p>
                  <p className="text-lg font-medium">admin@acadlog.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 dark:bg-slate-900 rounded-full flex items-center justify-center text-blue-400">
                  <PhoneIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Call us</p>
                  <p className="text-lg font-medium">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-800 dark:bg-slate-900 rounded-full flex items-center justify-center text-blue-400">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-widest">Visit us</p>
                  <p className="text-lg font-medium leading-tight">
                    c-18, Ashok Nagar, Vijay Singh yadav Path, 18, Saguna Khagaul Rd, Patna, Bihar 801105
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-3xl text-slate-900 dark:text-white shadow-2xl transition-colors">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">College Name</label>
                  <input type="text" placeholder="IIT Delhi" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Work Email</label>
                <input type="email" placeholder="admin@college.edu.in" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">How can we help?</label>
                <textarea rows={4} placeholder="I want to discuss full-campus automation..." className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-slate-600"></textarea>
              </div>
              <button className="w-full py-4 bg-blue-800 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-800/20 active:scale-95">
                Send Request
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-blue-600/10 dark:bg-blue-600/5 rounded-full blur-[120px] -z-0 translate-x-1/2 -translate-y-1/2"></div>
    </section>
  );
};

export default Contact;
