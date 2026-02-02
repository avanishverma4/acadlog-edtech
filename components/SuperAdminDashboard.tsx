
import React, { useState, useEffect, useRef } from 'react';
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
  XMarkIcon
} from '@heroicons/react/24/outline';
import gsap from 'gsap';
import { Institution } from '../types';

const INITIAL_INSTITUTIONS: Institution[] = [
  { id: '1', name: 'IIT Delhi', location: 'New Delhi, Delhi', adminName: 'Dr. Rahul Mehta', adminEmail: 'admin@iitd.ac.in', status: 'active', studentCount: 12000, tier: 'university' },
  { id: '2', name: 'BITS Pilani', location: 'Pilani, Rajasthan', adminName: 'Prof. S. Kumar', adminEmail: 'registrar@bits-pilani.ac.in', status: 'active', studentCount: 8500, tier: 'university' },
  { id: '3', name: 'St. Xavier\'s College', location: 'Mumbai, Maharashtra', adminName: 'Father Joseph', adminEmail: 'principal@xaviers.edu', status: 'active', studentCount: 3200, tier: 'pro' },
  { id: '4', name: 'Amity University', location: 'Noida, UP', adminName: 'Pending Appointment', adminEmail: '', status: 'pending', studentCount: 0, tier: 'pro' },
];

interface SuperAdminDashboardProps {
  onLogout: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onLogout }) => {
  const [institutions, setInstitutions] = useState<Institution[]>(INITIAL_INSTITUTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'appoint'>('create');
  const [selectedInstId, setSelectedInstId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form States
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

  const dashboardRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".dash-sidebar", { x: -100, opacity: 0, duration: 1, ease: "power4.out" });
      gsap.from(".dash-topbar", { y: -50, opacity: 0, duration: 1, ease: "power4.out", delay: 0.2 });
      gsap.from(".stat-card", { 
        y: 30, 
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "back.out(1.4)",
        delay: 0.4 
      });
      gsap.from(".inst-row", { 
        opacity: 0, 
        x: -20, 
        duration: 0.6, 
        stagger: 0.05, 
        delay: 0.8,
        ease: "power2.out" 
      });
    }, dashboardRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(modalRef.current, 
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [isModalOpen]);

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

  return (
    <div ref={dashboardRef} className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors duration-500">
      {/* Sidebar */}
      <aside className="dash-sidebar w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-white/5 flex flex-col hidden lg:flex">
        <div className="p-8 border-b border-slate-200 dark:border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-800 rounded-xl flex items-center justify-center text-white font-black shadow-lg">A</div>
          <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase font-space">Acadlog</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {[
            { name: 'Overview', icon: <ChartPieIcon className="w-5 h-5" />, active: true },
            { name: 'Institutions', icon: <BuildingOfficeIcon className="w-5 h-5" />, active: false },
            { name: 'Admins', icon: <ShieldCheckIcon className="w-5 h-5" />, active: false },
            { name: 'Analytics', icon: <ArrowTrendingUpIcon className="w-5 h-5" />, active: false },
          ].map((item) => (
            <button key={item.name} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              item.active 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}>
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
          >
            <PowerIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="dash-topbar h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-white/5 w-full max-w-md">
            <MagnifyingGlassIcon className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search institutions, locations..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-900 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-white">Super Admin</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">System Root</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-white/10 overflow-hidden">
               <img src="https://i.pravatar.cc/100?img=33" alt="Admin" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-10">
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-black text-slate-900 dark:text-white font-space tracking-tight">Institutional Dashboard</h1>
                <p className="text-slate-500 text-sm">Welcome back, here's what's happening across the ecosystem.</p>
              </div>
              <button 
                onClick={() => toggleModal('create')}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                <PlusIcon className="w-5 h-5" />
                Add New Institution
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Institutions', value: institutions.length, icon: <BuildingOfficeIcon />, color: 'blue' },
                { label: 'Active Students', value: institutions.reduce((acc, curr) => acc + curr.studentCount, 0).toLocaleString(), icon: <UsersIcon />, color: 'orange' },
                { label: 'System Uptime', value: '99.9%', icon: <ShieldCheckIcon />, color: 'green' },
                { label: 'Revenue (MTD)', value: '₹14.2L', icon: <ArrowTrendingUpIcon />, color: 'purple' },
              ].map((stat, i) => (
                <div key={i} className="stat-card p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600`}>
                      {React.cloneElement(stat.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                    </div>
                    <span className="text-xs font-bold text-green-500">+12%</span>
                  </div>
                  <p className="text-2xl font-black text-slate-900 dark:text-white font-space">{stat.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Institutions Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
                <h2 className="font-bold text-slate-900 dark:text-white">Recent Institutions</h2>
                <button className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                      <th className="py-4 px-6">Institution Name</th>
                      <th className="py-4 px-6">Location</th>
                      <th className="py-4 px-6">Admin Contact</th>
                      <th className="py-4 px-6">Students</th>
                      <th className="py-4 px-6">Tier</th>
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
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPinIcon className="w-3.5 h-3.5" />
                            {inst.location}
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{inst.adminName}</p>
                            <p className="text-[10px] text-slate-400">{inst.adminEmail}</p>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{inst.studentCount.toLocaleString()}</span>
                        </td>
                        <td className="py-5 px-6">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                            inst.tier === 'university' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                            inst.tier === 'pro' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}>
                            {inst.tier}
                          </span>
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
                            {inst.status === 'pending' && (
                              <button 
                                onClick={() => toggleModal('appoint', inst.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Appoint Admin"
                              >
                                <UserPlusIcon className="w-5 h-5" />
                              </button>
                            )}
                            <button
                              className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors"
                              title="More actions"
                              aria-label="More actions"
                            >
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
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
                  {modalType === 'create' ? 'Create Institution' : 'Appoint Admin'}
                </h3>
                <p className="text-slate-500 text-sm">
                  {modalType === 'create' ? 'Onboard a new educational campus.' : 'Assign institutional authority.'}
                </p>
              </div>
              <button
                onClick={() => toggleModal('create')}
                className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400"
                title="Close modal"
                aria-label="Close modal"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {modalType === 'create' ? (
                <form onSubmit={handleCreateInstitution} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">College Name</label>
                      <input 
                        required
                        type="text" 
                        value={createForm.name}
                        onChange={e => setCreateForm({...createForm, name: e.target.value})}
                        placeholder="e.g. National Institute of Technology" 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Location</label>
                        <input 
                          required
                          type="text" 
                          value={createForm.location}
                          onChange={e => setCreateForm({...createForm, location: e.target.value})}
                          placeholder="e.g. Pune" 
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="initial-tier"
                          className="text-[10px] font-black uppercase tracking-widest text-slate-500"
                        >
                          Initial Tier
                        </label>
                        <select
                          id="initial-tier"
                          value={createForm.tier}
                          onChange={e => setCreateForm({ ...createForm, tier: e.target.value as Institution['tier'] })}
                          className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all appearance-none"
                          aria-label="Initial Tier"
                        >
                          <option value="pro">Campus Pro</option>
                          <option value="university">University Hub</option>
                          <option value="starter">Dept Starter</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Initial Student Count</label>
                      <input 
                        required
                        type="number" 
                        value={createForm.studentCount}
                        onChange={e => setCreateForm({...createForm, studentCount: parseInt(e.target.value) || 0})}
                        placeholder="e.g. 500" 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                    Verify & Create Institution
                  </button>
                </form>
              ) : (
                <form onSubmit={handleAppointAdmin} className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 flex items-center gap-3">
                      <BuildingOfficeIcon className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-xs font-bold text-blue-900 dark:text-blue-300">Target Institution</p>
                        <p className="text-sm font-bold text-blue-600">
                          {institutions.find(i => i.id === selectedInstId)?.name || 'Unknown'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Admin Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={appointForm.adminName}
                        onChange={e => setAppointForm({...appointForm, adminName: e.target.value})}
                        placeholder="Dr. S. K. Singh" 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Institutional Email</label>
                      <input 
                        required
                        type="email" 
                        value={appointForm.adminEmail}
                        onChange={e => setAppointForm({...appointForm, adminEmail: e.target.value})}
                        placeholder="admin@amity.edu" 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all" 
                      />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20">
                    Appoint & Send Credentials
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
