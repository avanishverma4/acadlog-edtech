
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  BuildingOfficeIcon, 
  UsersIcon, 
  PlusIcon, 
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  ChartPieIcon,
  PowerIcon,
  UserPlusIcon,
  MapPinIcon,
  XMarkIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  ArrowUpRightIcon,
  InformationCircleIcon,
  ChevronLeftIcon as ChevronLeftMini,
  ChevronRightIcon as ChevronRightMini,
  BellIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import gsap from 'gsap';
import { Institution } from '../../types';

// Mock Data
const INITIAL_INSTITUTIONS: Institution[] = [
  { id: '1', name: 'IIT Delhi', location: 'New Delhi, Delhi', adminName: 'Dr. Rahul Mehta', adminEmail: 'admin@iitd.ac.in', status: 'active', studentCount: 12000, tier: 'university' },
  { id: '2', name: 'BITS Pilani', location: 'Pilani, Rajasthan', adminName: 'Prof. S. Kumar', adminEmail: 'registrar@bits-pilani.ac.in', status: 'active', studentCount: 8500, tier: 'university' },
  { id: '3', name: 'St. Xavier\'s College', location: 'Mumbai, Maharashtra', adminName: 'Father Joseph', adminEmail: 'principal@xaviers.edu', status: 'active', studentCount: 3200, tier: 'pro' },
  { id: '4', name: 'Amity University', location: 'Noida, UP', adminName: 'Pending Appointment', adminEmail: '', status: 'pending', studentCount: 0, tier: 'pro' },
  { id: '5', name: 'VIT Vellore', location: 'Vellore, TN', adminName: 'Dr. G. Viswanathan', adminEmail: 'admin@vit.ac.in', status: 'active', studentCount: 25000, tier: 'university' },
];

const INITIAL_ADMINS = [
  { id: 'a1', name: 'Dr. Rahul Mehta', email: 'admin@iitd.ac.in', institution: 'IIT Delhi', phone: '+91 99887 76655', role: 'Main Admin', lastActive: '2 mins ago', clearances: [true, true, true] },
  { id: 'a2', name: 'Prof. S. Kumar', email: 'registrar@bits-pilani.ac.in', institution: 'BITS Pilani', phone: '+91 98765 43210', role: 'Registrar', lastActive: '1 hour ago', clearances: [true, true, false] },
  { id: 'a3', name: 'Father Joseph', email: 'principal@xaviers.edu', institution: "St. Xavier's", phone: '+91 91234 56789', role: 'Principal', lastActive: 'Yesterday', clearances: [true, false, false] },
  { id: 'a4', name: 'Dr. G. Viswanathan', email: 'admin@vit.ac.in', institution: 'VIT Vellore', phone: '+91 94444 33221', role: 'Chancellor', lastActive: '4 hours ago', clearances: [true, true, true] },
];

const ANALYTICS_TRENDS = [
  { month: 'Jan', revenue: 8.5, growth: 12 },
  { month: 'Feb', revenue: 9.2, growth: 15 },
  { month: 'Mar', revenue: 11.4, growth: 22 },
  { month: 'Apr', revenue: 12.8, growth: 18 },
  { month: 'May', revenue: 14.2, growth: 25 },
];

// Precomputed bar heights to avoid inline styles (percent of max 15)
const ANALYTICS_BAR_HEIGHTS = ['h-[57%]', 'h-[61%]', 'h-[76%]', 'h-[85%]', 'h-[95%]'];

const MOCK_EVENTS = [
  { id: 1, title: 'Mid-Term Exams Start', date: 12, type: 'exam', college: 'All Institutions' },
  { id: 2, title: 'Institutional Holiday', date: 15, type: 'holiday', college: 'Global' },
  { id: 3, title: 'Placement Drive Week', date: 22, type: 'academic', college: 'IIT Delhi' },
  { id: 4, title: 'Compliance Deadline', date: 28, type: 'admin', college: 'VIT Vellore' },
];

const ADMIN_SCHEDULE = [
  { id: 'as1', title: 'Admins Monthly Sync', date: 12, time: '10:00 AM' },
  { id: 'as2', title: 'Verification Audit', date: 18, time: '02:00 PM' },
  { id: 'as3', title: 'New Registrar Onboarding', date: 24, time: '11:30 AM' },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface SuperAdminDashboardProps {
  onLogout: () => void;
}

type TabType = 'Overview' | 'Institutions' | 'Admins' | 'Analytics' | 'Calendar';

const ClearanceIndicator: React.FC<{ type: 'verified' | 'trained' | 'root', active: boolean }> = ({ type, active }) => {
  const data = {
    verified: {
      color: 'bg-green-500',
      shadow: 'shadow-[0_0_8px_rgba(34,197,94,0.6)]',
      title: 'Identity Verified',
      desc: 'Mandatory KYC & Aadhar link completed. Individual is legally verifiable.'
    },
    trained: {
      color: 'bg-blue-500',
      shadow: 'shadow-[0_0_8px_rgba(59,130,246,0.6)]',
      title: 'Platform Mastery',
      desc: 'Successfully completed the 3-day hybrid Acadlog Certification program.'
    },
    root: {
      color: 'bg-slate-400 dark:bg-slate-500',
      shadow: 'shadow-[0_0_8px_rgba(148,163,184,0.6)]',
      title: 'Authority Scope',
      desc: 'Granted Full System Root permissions. Authorized for global configuration.'
    }
  };

  const current = data[type];

  return (
    <div className="relative group/clearance">
      <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${active ? `${current.color} ${current.shadow}` : 'bg-slate-200 dark:bg-slate-800 shadow-none grayscale'}`} />
      
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 opacity-0 pointer-events-none group-hover/clearance:opacity-100 group-hover/clearance:translate-y-[-4px] transition-all duration-300 z-[110]">
        <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-4 rounded-2xl shadow-2xl border border-white/10 dark:border-slate-200 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${active ? current.color : 'bg-slate-500'}`} />
            <p className="text-[10px] font-black uppercase tracking-widest font-space">{current.title}</p>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400 dark:text-slate-600 font-medium">
            {active ? current.desc : `Awaiting completion: ${current.title.toLowerCase()} required for full root access.`}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-4 h-2 overflow-hidden">
            <div className="w-2.5 h-2.5 bg-slate-900 dark:bg-white rotate-45 transform origin-center -translate-y-1/2 mx-auto shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Overview');
  const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarPopoverOpen, setIsCalendarPopoverOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'appoint'>('create');
  const [selectedInstId, setSelectedInstId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Real-time Calendar State
  const realTimeNow = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState(new Date());

  const dashboardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const calendarPopoverRef = useRef<HTMLDivElement>(null);
  const calendarTriggerRef = useRef<HTMLButtonElement>(null);

  // Helper to change month
  const changeMonth = (offset: number) => {
    setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
  };

  const calendarData = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const isCurrentMonth = year === realTimeNow.getFullYear() && month === realTimeNow.getMonth();
    const today = realTimeNow.getDate();

    return { year, month, daysInMonth, firstDayOfMonth, isCurrentMonth, today };
  }, [viewDate, realTimeNow]);

  const [createForm, setCreateForm] = useState({
    name: '',
    location: '',
    tier: 'pro' as Institution['tier'],
    studentCount: 0
  });

  const [appointForm, setAppointForm] = useState({
    adminName: '',
    adminEmail: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dash-sidebar", { x: -100, opacity: 0, duration: 1, ease: "power4.out" });
      gsap.from(".dash-topbar", { y: -50, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2 });
    }, dashboardRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (contentAreaRef.current) {
      gsap.fromTo(contentAreaRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [activeTab]);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [isModalOpen]);

  // Popover Animation
  useEffect(() => {
    if (calendarPopoverRef.current) {
      if (isCalendarPopoverOpen) {
        gsap.fromTo(calendarPopoverRef.current, 
          { opacity: 0, y: 15, scale: 0.95, transformOrigin: 'top right' },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power4.out" }
        );
      }
    }
  }, [isCalendarPopoverOpen]);

  // Click Outside to close Popover
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarPopoverRef.current && 
        !calendarPopoverRef.current.contains(event.target as Node) &&
        calendarTriggerRef.current &&
        !calendarTriggerRef.current.contains(event.target as Node)
      ) {
        setIsCalendarPopoverOpen(false);
      }
    };

    if (isCalendarPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCalendarPopoverOpen]);

  const toggleModal = (type: 'create' | 'appoint', instId?: string) => {
    if (!isModalOpen) {
      setModalType(type);
      setSelectedInstId(instId || null);
      if (type === 'create') {
        setCreateForm({ name: '', location: '', tier: 'pro', studentCount: 0 });
      } else {
        setAppointForm({ adminName: '', adminEmail: '' });
      }
      setIsModalOpen(true);
    } else {
      gsap.to(modalRef.current, { scale: 0.9, opacity: 0, y: 20, duration: 0.3, onComplete: () => setIsModalOpen(false) });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  const handleCreateInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    const newInst: Institution = {
      id: Math.random().toString(36).substr(2, 9),
      name: createForm.name,
      location: createForm.location,
      tier: createForm.tier,
      studentCount: createForm.studentCount,
      adminName: 'Pending Appointment',
      adminEmail: '',
      status: 'pending'
    };
    setInstitutions(prev => [newInst, ...prev]);
    toggleModal('create');
  };

  const handleAppointAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInstId) return;

    setInstitutions(prev => prev.map(inst => 
      inst.id === selectedInstId 
        ? { ...inst, adminName: appointForm.adminName, adminEmail: appointForm.adminEmail, status: 'active' }
        : inst
    ));
    toggleModal('appoint');
  };

  const filteredInstitutions = institutions.filter(inst => 
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    inst.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdmins = INITIAL_ADMINS.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    admin.institution.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderOverview = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Institutions', value: institutions.length, icon: <BuildingOfficeIcon />, color: 'blue' },
          { label: 'Active Students', value: institutions.reduce((acc, curr) => acc + curr.studentCount, 0).toLocaleString(), icon: <UsersIcon />, color: 'orange' },
          { label: 'System Uptime', value: '99.9%', icon: <ShieldCheckIcon />, color: 'green' },
          { label: 'Revenue (MTD)', value: '₹14.2L', icon: <ArrowTrendingUpIcon />, color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="stat-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600`}>
                {React.cloneElement(stat.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
              </div>
              <span className={`text-xs font-bold ${stat.color === 'orange' ? 'text-orange-500' : 'text-green-500'}`}>+12%</span>
            </div>
            <p className="text-2xl font-black text-slate-900 dark:text-white font-space">{stat.value}</p>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 dark:text-white">Active Growth</h3>
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">Last 5 Months</span>
          </div>
          <div className="flex items-end justify-between h-40 gap-2">
            {ANALYTICS_TRENDS.map((t, idx) => (
              <div key={idx} className="flex-1 group flex flex-col items-center gap-2">
                <div 
                  className={`w-full bg-orange-600 dark:bg-orange-500 rounded-t-lg transition-all duration-500 group-hover:bg-orange-400 ${ANALYTICS_BAR_HEIGHTS[idx] || ''}`}
                />
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{t.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between">
           <div className="space-y-6">
             <h3 className="font-bold text-slate-900 dark:text-white">Recent Activity</h3>
             <div className="space-y-4">
                {[
                  { user: 'IIT Delhi', action: 'Requested data migration', time: '12 mins ago' },
                  { user: 'BITS Pilani', action: 'Renewed University tier', time: '1 hour ago' },
                  { user: 'St. Xavier\'s', action: 'New staff member added', time: '3 hours ago' },
                ].map((act, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-white/5 last:border-0">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{act.user}</p>
                      <p className="text-xs text-slate-500">{act.action}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{act.time}</span>
                  </div>
                ))}
             </div>
           </div>
           <button className="w-full py-3 mt-4 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-xl transition-all">View Audit Logs</button>
        </div>
      </div>
    </div>
  );

  const renderInstitutions = () => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
        <h2 className="font-bold text-slate-900 dark:text-white">Management Table</h2>
        <div className="flex gap-2">
           <button 
             aria-label="Search institutions"
             title="Search institutions"
             className="p-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-slate-400">
             <MagnifyingGlassIcon className="w-4 h-4" />
           </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              <th className="py-4 px-6">Institution Name</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6">Tier</th>
              <th className="py-4 px-6">Students</th>
              <th className="py-4 px-6 text-center">Status</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {filteredInstitutions.map((inst) => (
              <tr key={inst.id} className="inst-row hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                <td className="py-5 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">
                      {inst.name[0]}
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{inst.name}</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-xs text-slate-500">
                   <MapPinIcon className="w-3.5 h-3.5 inline mr-1 text-orange-500" />
                   {inst.location}
                </td>
                <td className="py-5 px-6">
                   <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                     inst.tier === 'university' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                     inst.tier === 'pro' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                   }`}>
                     {inst.tier}
                   </span>
                </td>
                <td className="py-5 px-6">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{inst.studentCount.toLocaleString()}</span>
                </td>
                <td className="py-5 px-6 text-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    inst.status === 'active' ? 'bg-green-100 text-green-700' :
                    inst.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${inst.status === 'active' ? 'bg-green-500' : inst.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'}`} />
                    {inst.status}
                  </span>
                </td>
                <td className="py-5 px-6 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        aria-label="More options"
                        title="More options"
                        className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAdmins = () => (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <div className="xl:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-200 dark:border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">Institutional Controllers</h2>
            <div className="group/info relative cursor-help">
              <InformationCircleIcon className="w-4 h-4 text-orange-500" />
              <div className="absolute bottom-full left-0 mb-3 w-64 opacity-0 pointer-events-none group-hover/info:opacity-100 transition-opacity z-[120]">
                <div className="bg-slate-800 text-white p-4 rounded-2xl text-xs leading-relaxed shadow-2xl border border-white/10">
                  <p className="font-bold mb-2 uppercase tracking-widest text-[10px] text-blue-400">Security Clearance Legend</p>
                  <div className="space-y-2">
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Identity Verified (KYC)</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Platform Mastery (Trained)</p>
                     <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Authority Scope (Root)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
            <UserPlusIcon className="w-4 h-4" />
            Provision Access
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <th className="py-4 px-8">Administrator</th>
                <th className="py-4 px-4">Institution</th>
                <th className="py-4 px-4 text-center whitespace-nowrap">Clearance Status</th>
                <th className="py-4 px-8">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border-2 border-slate-100 dark:border-white/5 overflow-hidden group-hover:scale-110 transition-transform">
                        <img src={`https://i.pravatar.cc/100?u=${admin.id}`} className="w-full h-full object-cover" alt={admin.name} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{admin.name}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{admin.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-4">
                     <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300">
                       <BuildingOfficeIcon className="w-3.5 h-3.5" />
                       {admin.institution}
                     </div>
                  </td>
                  <td className="py-5 px-4">
                     <div className="flex justify-center gap-3">
                        <ClearanceIndicator type="verified" active={admin.clearances[0]} />
                        <ClearanceIndicator type="trained" active={admin.clearances[1]} />
                        <ClearanceIndicator type="root" active={admin.clearances[2]} />
                     </div>
                  </td>
                  <td className="py-5 px-8">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{admin.lastActive}</span>
                        <button 
                          aria-label="More admin options"
                          title="More admin options"
                          className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all">
                          <EllipsisVerticalIcon className="w-5 h-5" />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="xl:col-span-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">Admin Schedule</h3>
              <div className="flex items-center gap-1">
                 <button 
                   onClick={() => changeMonth(-1)} 
                   aria-label="Previous month"
                   title="Previous month"
                   className="p-1 hover:bg-slate-100 rounded-md transition-colors"><ChevronLeftMini className="w-4 h-4 text-slate-400" /></button>
                 <button 
                   onClick={() => changeMonth(1)} 
                   aria-label="Next month"
                   title="Next month"
                   className="p-1 hover:bg-slate-100 rounded-md transition-colors"><ChevronRightMini className="w-4 h-4 text-slate-400" /></button>
              </div>
           </div>
           
           <div className="grid grid-cols-7 gap-1 mb-4">
             {['S','M','T','W','T','F','S'].map(d => (
               <div key={d} className="text-center text-[10px] font-black text-slate-400 uppercase">{d}</div>
             ))}
           </div>
           
           <div className="grid grid-cols-7 gap-1">
             {Array.from({ length: 42 }).map((_, i) => {
                const day = i - calendarData.firstDayOfMonth + 1;
                const isCurrentDay = calendarData.isCurrentMonth && day === calendarData.today;
                const hasEvent = ADMIN_SCHEDULE.some(e => e.date === day);
                
                return (
                  <div key={i} className={`aspect-square flex items-center justify-center rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                    day < 1 || day > calendarData.daysInMonth ? 'opacity-0 pointer-events-none' : 
                    isCurrentDay ? 'bg-blue-600 text-white shadow-lg' : 
                    'text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                  }`}>
                    {day > 0 && day <= calendarData.daysInMonth && day}
                    {hasEvent && !isCurrentDay && <div className="absolute bottom-1 w-1 h-1 rounded-full bg-orange-500" />}
                  </div>
                );
             })}
           </div>

           <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/5 space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scheduled Actions</p>
              {ADMIN_SCHEDULE.map(item => (
                <div key={item.id} className="flex gap-4 group cursor-pointer">
                  <div className="text-[10px] font-black text-blue-600 dark:text-blue-400 w-12">{item.time}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{item.title}</p>
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest">{MONTH_NAMES[calendarData.month]} {item.date}, {calendarData.year}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 space-y-4">
           <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600">
             <BellIcon className="w-6 h-6" />
           </div>
           <h4 className="font-bold text-slate-900 dark:text-white">Security Alerts</h4>
           <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">3 administrators are reaching their KYC renewal deadline. Automated notifications have been dispatched.</p>
           <button className="w-full py-3 bg-white dark:bg-slate-800 rounded-xl border border-orange-200 text-[10px] font-black uppercase tracking-widest text-orange-600 hover:bg-orange-50 transition-all">Review Controllers</button>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm space-y-6 text-orange-600">
             <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                   <CurrencyRupeeIcon className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded-full">+22% YoY</div>
             </div>
             <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Projected ARR</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white font-space">₹1.84Cr</p>
             </div>
             <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-orange-600" />
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
             <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                   <UsersIcon className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full">High Cap</div>
             </div>
             <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Student Saturation</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white font-space">88.4%</p>
             </div>
             <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="w-[88%] h-full bg-blue-500" />
             </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
             <div className="flex items-center justify-between">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400">
                   <CheckCircleIcon className="w-6 h-6" />
                </div>
                <div className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-black uppercase tracking-widest rounded-full">Healthy</div>
             </div>
             <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Churn Probability</p>
                <p className="text-4xl font-black text-slate-900 dark:text-white font-space">1.2%</p>
             </div>
             <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="w-[1.2%] h-full bg-purple-600" />
             </div>
          </div>
       </div>

       <div className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                <h3 className="text-4xl font-black font-space tracking-tighter leading-none">Market Share <br /> Analysis.</h3>
                <p className="text-slate-400 text-lg font-light leading-relaxed">Acadlog is currently serving 12% of the private institutional market in Northern India. Expansion to Southern hubs Vit/Nit is currently overperforming projections.</p>
                <button className="flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">
                  Download Full Q3 Report <ArrowUpRightIcon className="w-4 h-4 text-orange-500" />
                </button>
             </div>
             <div className="relative h-64 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border-[16px] border-white/5 flex items-center justify-center relative">
                   <div className="absolute inset-0 rounded-full border-[16px] border-orange-500 border-t-transparent -rotate-45" />
                   <div className="text-center">
                      <p className="text-3xl font-black font-space">12%</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Market Share</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2" />
       </div>
    </div>
  );

  const renderCalendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm flex flex-col">
          <div className="p-8 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-space tracking-tight">
                {MONTH_NAMES[calendarData.month]} {calendarData.year}
              </h2>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => changeMonth(-1)} 
                   aria-label="Previous month"
                   title="Previous month"
                   className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-500 transition-all"><ChevronLeftMini className="w-5 h-5" /></button>
                 <button 
                   onClick={() => changeMonth(1)} 
                   aria-label="Next month"
                   title="Next month"
                   className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-500 transition-all"><ChevronRightMini className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-slate-200">Month</button>
              <button className="px-4 py-2 text-slate-400 rounded-xl text-xs font-bold transition-all hover:bg-slate-50 dark:hover:bg-white/5">Week</button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-7 border-b border-slate-100 dark:border-white/5">
              {daysOfWeek.map(day => (
                <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-100 dark:border-white/5 last:border-0">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 auto-rows-[120px]">
              {Array.from({ length: calendarData.firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="border-r border-b border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-slate-950/20" />
              ))}
              
              {Array.from({ length: calendarData.daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dayEvents = MOCK_EVENTS.filter(e => e.date === day);
                const isToday = calendarData.isCurrentMonth && day === calendarData.today;

                return (
                  <div key={day} className="p-3 border-r border-b border-slate-100 dark:border-white/5 relative group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer">
                    <div className={`text-sm font-bold mb-2 flex items-center justify-center w-7 h-7 rounded-full transition-all ${
                      isToday ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {day}
                    </div>
                    
                    <div className="space-y-1 overflow-hidden">
                      {dayEvents.map(event => (
                        <div key={event.id} className={`px-2 py-1 rounded-md text-[9px] font-bold truncate transition-all ${
                          event.type === 'exam' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                          event.type === 'holiday' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                          event.type === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' :
                          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {event.title}
                        </div>
                      ))}
                    </div>

                    {isToday && (
                      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-orange-600 animate-ping" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-8 h-full">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Today's Agenda</h3>
                 <BellIcon className="w-5 h-5 text-slate-400" />
              </div>
              <div className="space-y-6">
                 {[
                   { time: '10:00 AM', title: 'System Migration Sync', status: 'In Progress', icon: <ClockIcon /> },
                   { time: '02:30 PM', title: 'New Admin Briefing', status: 'Upcoming', icon: <UserPlusIcon /> },
                   { time: '04:00 PM', title: 'Audit Report Review', status: 'Queued', icon: <ShieldCheckIcon /> }
                 ].map((agenda, i) => (
                   <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="text-[10px] font-black text-slate-400 w-16 uppercase pt-1">{agenda.time}</div>
                      <div className="flex-1 pb-6 border-l border-slate-100 dark:border-white/5 pl-6 relative">
                         <div className="absolute top-1 -left-[5px] w-2.5 h-2.5 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-600" />
                         <p className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 transition-colors">{agenda.title}</p>
                         <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">{agenda.status}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 mt-4 border-2 border-orange-100 dark:border-orange-900/30 rounded-2xl text-[10px] font-black uppercase tracking-widest text-orange-600 hover:bg-orange-50 transition-all">Add Daily Task</button>
           </div>

           <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-blue-600/20">
              <div className="relative z-10 space-y-4">
                 <CalendarDaysIcon className="w-8 h-8 text-blue-200" />
                 <h3 className="text-xl font-bold font-space">Upcoming Exams</h3>
                 <p className="text-sm text-blue-100 leading-relaxed font-light">Mid-term cycle across 12 institutions begins in 3 days. Automated proctoring enabled for Pro tiers.</p>
                 <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20 transition-all">View Exam Matrix</button>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
           </div>
        </div>
      </div>
    );
  };

  const renderCalendarPopover = () => {
    return (
      <div 
        ref={calendarPopoverRef}
        className="absolute top-full right-0 mt-4 w-80 bg-white dark:bg-slate-900 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 z-[999] overflow-hidden"
      >
        <div className="p-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
           <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white font-space">
                {MONTH_NAMES[calendarData.month]} {calendarData.year}
              </span>
              <div className="flex gap-2">
                 <button 
                   onClick={() => changeMonth(-1)} 
                   aria-label="Previous month"
                   title="Previous month"
                   className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"><ChevronLeftMini className="w-4 h-4 text-slate-500" /></button>
                 <button 
                   onClick={() => changeMonth(1)} 
                   aria-label="Next month"
                   title="Next month"
                   className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"><ChevronRightMini className="w-4 h-4 text-slate-500" /></button>
              </div>
           </div>
           
           <div className="grid grid-cols-7 gap-1">
              {['S','M','T','W','T','F','S'].map(d => (
                <span key={d} className="text-[10px] font-black text-slate-400 text-center mb-2">{d}</span>
              ))}
              {Array.from({ length: 42 }).map((_, i) => {
                const day = i - calendarData.firstDayOfMonth + 1;
                const isToday = calendarData.isCurrentMonth && day === calendarData.today;
                const hasEvent = MOCK_EVENTS.some(e => e.date === day);
                
                return (
                  <div key={i} className={`aspect-square flex items-center justify-center text-[12px] font-bold rounded-xl relative cursor-pointer transition-all ${
                    day < 1 || day > calendarData.daysInMonth ? 'opacity-0' :
                    isToday ? 'bg-orange-600 text-white shadow-xl scale-110' : 
                    'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}>
                    {day > 0 && day <= calendarData.daysInMonth && day}
                    {hasEvent && !isToday && <div className="absolute bottom-1.5 w-1 h-1 bg-blue-500 rounded-full" />}
                  </div>
                );
              })}
           </div>
        </div>

        <div className="p-6 space-y-4">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Events Today</p>
           {MOCK_EVENTS.filter(e => e.date === calendarData.today).map(event => (
             <div key={event.id} className="flex items-center gap-4 group cursor-pointer bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-transparent hover:border-blue-200 transition-all">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                   event.type === 'exam' ? 'bg-blue-500' : 'bg-orange-500'
                }`} />
                <div className="flex-1 overflow-hidden">
                   <p className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600">{event.title}</p>
                   <p className="text-[10px] text-slate-400 uppercase tracking-tighter mt-0.5">{event.college}</p>
                </div>
             </div>
           ))}
           <button 
             onClick={() => {
                setIsCalendarPopoverOpen(false);
                setActiveTab('Calendar');
             }}
             className="w-full py-4 mt-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
           >
             Open Full Calendar
           </button>
        </div>
      </div>
    );
  };

  return (
    <div ref={dashboardRef} className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors duration-500">
      {/* Sidebar */}
      <aside className="dash-sidebar w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 flex flex-col hidden lg:flex">
        <div className="p-10 border-b border-slate-200 dark:border-white/5 flex items-center gap-3 shrink-0">
          <div className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20">A</div>
          <div>
             <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase font-space block leading-none">Acadlog</span>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1 block">Super Admin</span>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-3 mt-6">
          {[
            { name: 'Overview', icon: <ChartPieIcon className="w-5 h-5" /> },
            { name: 'Institutions', icon: <BuildingOfficeIcon className="w-5 h-5" /> },
            { name: 'Admins', icon: <ShieldCheckIcon className="w-5 h-5" /> },
            { name: 'Analytics', icon: <ArrowTrendingUpIcon className="w-5 h-5" /> },
            { name: 'Calendar', icon: <CalendarDaysIcon className="w-5 h-5" /> },
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={() => {
                setActiveTab(item.name as TabType);
                // Reset view date when entering calendar tab
                if (item.name === 'Calendar') setViewDate(new Date());
              }}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === item.name 
                ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30 active-tab-scale' 
                : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              {React.cloneElement(item.icon as React.ReactElement<any>, { className: `w-5 h-5 ${item.name === 'Analytics' ? 'text-orange-500' : ''}` })}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-200 dark:border-white/5">
           <div className="mb-6 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-white/5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Cloud Storage</p>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mb-2">
                 <div className="w-3/4 h-full bg-orange-600 rounded-full" />
              </div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300">75% capacity utilized</p>
           </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all border border-transparent hover:border-red-100"
          >
            <PowerIcon className="w-5 h-5" />
            System Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Topbar */}
        <header className="dash-topbar h-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-10 shrink-0 relative z-40">
          <div className="flex items-center gap-6 bg-slate-50 dark:bg-slate-800/80 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/5 w-full max-w-xl shadow-sm focus-within:shadow-md focus-within:border-blue-500 transition-all">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab.toLowerCase()}...`} 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-900 dark:text-white placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-[10px] font-black rounded-lg text-slate-500 uppercase tracking-widest">⌘K</div>
          </div>

          <div className="flex items-center gap-8 relative">
            <div className="relative">
              <button 
                ref={calendarTriggerRef}
                onClick={() => setIsCalendarPopoverOpen(!isCalendarPopoverOpen)}
                className={`relative p-2.5 rounded-xl transition-all duration-300 ${isCalendarPopoverOpen ? 'bg-orange-100 dark:bg-orange-950/40 text-orange-600' : 'bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-blue-600'}`}
              >
                <CalendarDaysIcon className={`w-6 h-6 ${isCalendarPopoverOpen ? 'text-orange-600' : 'text-orange-500'}`} />
                {!isCalendarPopoverOpen && (
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-600 border-2 border-white dark:border-slate-900 rounded-full animate-pulse" />
                )}
              </button>
              
              {isCalendarPopoverOpen && renderCalendarPopover()}
            </div>

            <div className="flex items-center gap-4 border-l border-slate-200 dark:border-white/10 pl-8">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Admin Root</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Mumbai Cluster</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600 p-0.5 shadow-lg shadow-blue-600/20 overflow-hidden">
                 <img src="https://i.pravatar.cc/100?img=33" alt="Admin" className="w-full h-full object-cover rounded-[14px]" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-10 overflow-y-auto overflow-x-hidden bg-slate-50 dark:bg-slate-950 scroll-smooth relative z-10">
          <div ref={contentAreaRef} className="max-w-7xl mx-auto space-y-12 pb-12 h-full">
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
              <div>
                <div className="flex items-center gap-3 mb-2">
                   <h1 className="text-4xl font-black text-slate-900 dark:text-white font-space tracking-tight">{activeTab}</h1>
                   <div className="px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-orange-100 dark:border-orange-900/50">Production v4.2</div>
                </div>
                <p className="text-slate-500 font-light">Global management system for the Acadlog Educational Cloud.</p>
              </div>
              <div className="flex items-center gap-3">
                 <button 
                  onClick={() => toggleModal('create')}
                  className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 active:scale-95 group"
                >
                  <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                  New Institution
                </button>
              </div>
            </div>

            {/* Sub-Views Based on Tab */}
            {activeTab === 'Overview' && renderOverview()}
            {activeTab === 'Institutions' && renderInstitutions()}
            {activeTab === 'Admins' && renderAdmins()}
            {activeTab === 'Analytics' && renderAnalytics()}
            {activeTab === 'Calendar' && renderCalendar()}
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div 
            ref={overlayRef}
            onClick={() => toggleModal('create')}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
          />
          <div 
            ref={modalRef}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10"
          >
            <div className="p-8 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white font-space tracking-tight">
                  {modalType === 'create' ? 'Onboard Institution' : 'Appoint Root Admin'}
                </h3>
                <p className="text-slate-500 text-sm">
                  {modalType === 'create' ? 'Expand the educational network.' : 'Provision system access keys.'}
                </p>
              </div>
              <button 
                onClick={() => toggleModal('create')} 
                aria-label="Close modal"
                title="Close modal"
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400">
                <XMarkIcon className="w-6 h-6 text-orange-500" />
              </button>
            </div>

            <div className="p-10 space-y-6">
              {modalType === 'create' ? (
                <form onSubmit={handleCreateInstitution} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-space">College Formal Name</label>
                      <input 
                        required
                        type="text" 
                        value={createForm.name}
                        onChange={e => setCreateForm({...createForm, name: e.target.value})}
                        placeholder="e.g. National Institute of Technology" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-space">Primary Hub</label>
                        <input 
                          required
                          type="text" 
                          value={createForm.location}
                          onChange={e => setCreateForm({...createForm, location: e.target.value})}
                          placeholder="e.g. Pune" 
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="licensing-tier" className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-space">Licensing Tier</label>
                        <select 
                          id="licensing-tier"
                          name="licensing-tier"
                          aria-label="Licensing Tier"
                          title="Licensing Tier"
                          value={createForm.tier}
                          onChange={e => setCreateForm({...createForm, tier: e.target.value as Institution['tier']})}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none cursor-pointer"
                        >
                          <option value="pro">Campus Pro</option>
                          <option value="university">University Hub</option>
                          <option value="starter">Dept Starter</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-space">Projected Capacity</label>
                      <input 
                        required
                        type="number" 
                        value={createForm.studentCount}
                        onChange={e => setCreateForm({...createForm, studentCount: parseInt(e.target.value) || 0})}
                        placeholder="e.g. 500" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30">
                    Verify & Create Environment
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAppointAdmin} className="space-y-6">
                  <div className="space-y-6">
                    <div className="p-6 rounded-3xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black">
                         {institutions.find(i => i.id === selectedInstId)?.name[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-blue-900 dark:text-blue-300">Target Environment</p>
                        <p className="text-lg font-bold text-blue-600">
                          {institutions.find(i => i.id === selectedInstId)?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-space">Full Legal Name</label>
                      <input 
                        required
                        type="text" 
                        value={appointForm.adminName}
                        onChange={e => setAppointForm({...appointForm, adminName: e.target.value})}
                        placeholder="Dr. S. K. Singh" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-space">Root Admin Email</label>
                      <input 
                        required
                        type="email" 
                        value={appointForm.adminEmail}
                        onChange={e => setAppointForm({...appointForm, adminEmail: e.target.value})}
                        placeholder="admin@institution.edu" 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-600/30">
                    Provision Root Access
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
