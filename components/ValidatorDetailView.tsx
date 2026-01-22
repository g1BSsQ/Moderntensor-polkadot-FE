import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ValidatorDetailViewProps {
  onBack: () => void;
  onSelectAccount?: (id: string) => void;
  onViewHistory?: () => void;
}

const performanceData = [
  { day: 'Mon', rewards: 850, uptime: 99.9, latency: 45 },
  { day: 'Tue', rewards: 920, uptime: 99.8, latency: 42 },
  { day: 'Wed', rewards: 890, uptime: 100.0, latency: 48 },
  { day: 'Thu', rewards: 950, uptime: 99.9, latency: 40 },
  { day: 'Fri', rewards: 1100, uptime: 99.9, latency: 38 },
  { day: 'Sat', rewards: 1050, uptime: 99.7, latency: 55 },
  { day: 'Sun', rewards: 1240, uptime: 100.0, latency: 41 },
];

const ValidatorDetailView: React.FC<ValidatorDetailViewProps> = ({ onBack, onSelectAccount, onViewHistory }) => {
  const [metricTab, setMetricTab] = useState<'rewards' | 'uptime' | 'latency'>('rewards');

  return (
    <div className="flex-grow px-6 lg:px-8 py-8 max-w-[1920px] mx-auto w-full flex flex-col lg:flex-row gap-8 relative min-h-screen">
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 perspective-grid opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            backgroundPosition: 'center top'
          }}></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent"></div>
      </div>

      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-28 space-y-8">
          <div className="glass-panel rounded-xl p-1 relative">
            {/* Prism Border Effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/40 via-neon-pink/40 to-neon-green/40 opacity-50 pointer-events-none"></div>
            <div className="bg-[#0a0e17] rounded-xl p-4 relative z-10 h-full">
                <h2 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm cursor-pointer hover:text-white" onClick={onBack}>arrow_back</span>
                    Navigation
                </h2>
                <nav className="space-y-1">
                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all bg-neon-cyan/10 border-l-2 border-neon-cyan text-neon-cyan shadow-[0_0_8px_rgba(0,243,255,0.4)]">
                        <span className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px]">account_circle</span>
                            Profile Detail
                        </span>
                    </button>
                    <button 
                      onClick={onViewHistory}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all group"
                    >
                        <span className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px] opacity-70 group-hover:opacity-100">history</span>
                            History
                        </span>
                    </button>
                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-all group">
                        <span className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[18px] opacity-70 group-hover:opacity-100">groups</span>
                            Delegators
                        </span>
                        <span className="text-text-secondary text-[10px]">1,204</span>
                    </button>
                    <div className="pt-4 mt-4 border-t border-white/10">
                        <button onClick={onBack} className="flex items-center gap-2 text-text-secondary hover:text-neon-cyan text-xs transition-colors">
                            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Validators
                        </button>
                    </div>
                </nav>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl p-5 border border-neon-cyan/30 group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-bg-dark to-neon-pink/20 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-neon-cyan text-xs font-bold uppercase tracking-widest mb-2">Advertisement</div>
              <h3 className="text-white font-display font-bold text-lg leading-tight mb-2">Secure Your Stake</h3>
              <p className="text-text-secondary text-xs mb-4">Hardware wallet integration now live for enhanced security.</p>
              <button className="w-full py-2 bg-white/10 hover:bg-neon-cyan hover:text-black text-white text-xs font-bold uppercase tracking-wider rounded border border-white/20 transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                Check Support
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col gap-8 min-w-0">
        <div className="glass-panel rounded-xl p-1 relative overflow-hidden">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan/30 via-transparent to-neon-pink/30 opacity-50 pointer-events-none"></div>
            <div className="bg-[#0a0e17]/90 rounded-xl p-8 relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/5 via-transparent to-neon-pink/5 opacity-50"></div>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-neon-cyan/20 rounded-full blur-[100px] animate-pulse"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                            <div className="size-28 relative z-10 rounded-full p-[3px] bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                                <div className="w-full h-full rounded-full bg-[#0a0e17] flex items-center justify-center overflow-hidden">
                                    <span className="font-display font-bold text-3xl text-white">TF</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 z-20 bg-[#0a0e17] rounded-full p-1 border border-white/10">
                                <span className="material-symbols-outlined text-neon-green text-2xl drop-shadow-[0_0_8px_rgba(0,255,163,0.8)]">verified_user</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-md">TensorFoundry</h1>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neon-green/10 text-neon-green border border-neon-green/20">Active</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-secondary mb-3">
                                <span className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded border border-white/5 hover:border-neon-cyan/30 transition-colors cursor-pointer group">
                                    <span className="material-symbols-outlined text-sm">key</span>
                                    5H9s...k2Lp
                                    <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">content_copy</span>
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm text-text-secondary">schedule</span>
                                    Registered 248 days ago
                                </span>
                            </div>
                            <p className="text-text-secondary text-sm max-w-xl border-l-2 border-neon-cyan/30 pl-3">
                                Tier-1 validator specializing in high-throughput AI inference and LLM fine-tuning subnets. 99.9% uptime guaranteed with redundant infrastructure.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <button className="relative h-12 px-8 rounded-lg border border-neon-cyan/50 text-white font-bold uppercase tracking-widest overflow-hidden group shadow-[0_0_20px_rgba(0,243,255,0.2)] bg-gradient-to-r from-neon-cyan/10 to-neon-cyan/5 hover:from-neon-cyan/20 hover:to-neon-cyan/10 transition-all">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Delegate Now 
                                <span className="material-symbols-outlined animate-pulse">bolt</span>
                            </span>
                        </button>
                        <div className="flex gap-2 justify-center">
                            <button className="flex-1 py-2 px-4 rounded border border-white/10 bg-[#0a0e17]/50 hover:bg-white/5 text-text-secondary hover:text-white text-xs font-semibold transition-all">
                                Website
                            </button>
                            <button className="flex-1 py-2 px-4 rounded border border-white/10 bg-[#0a0e17]/50 hover:bg-white/5 text-text-secondary hover:text-white text-xs font-semibold transition-all">
                                Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-cyan/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Total Staked</span>
                <div className="text-2xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">1.24M <span className="text-xs text-text-secondary font-mono font-normal">M</span></div>
                <div className="text-neon-green text-xs flex items-center gap-1 mt-1"><span className="material-symbols-outlined text-[12px]">trending_up</span> +2.4%</div>
            </div>
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-cyan/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Own Stake</span>
                <div className="text-2xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">50.2K <span className="text-xs text-text-secondary font-mono font-normal">M</span></div>
                <div className="text-text-secondary text-xs mt-1">4.05% of total</div>
            </div>
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-green/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Real APR</span>
                <div className="text-2xl font-display font-bold text-neon-green shadow-[0_0_10px_rgba(0,255,163,0.2)]">15.2%</div>
                <div className="text-text-secondary text-xs mt-1">Daily avg</div>
            </div>
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-pink/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Trust Score</span>
                <div className="text-2xl font-display font-bold text-white group-hover:text-neon-pink transition-colors">98.5</div>
                <div className="w-full bg-[#0a0e17] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-neon-cyan to-neon-pink h-full w-[98.5%]"></div>
                </div>
            </div>
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-cyan/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Consensus</span>
                <div className="text-2xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">#12</div>
                <div className="text-text-secondary text-xs mt-1">Top 1%</div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-panel rounded-xl p-6 border border-white/10 relative overflow-hidden flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
                        <span className="material-symbols-outlined text-neon-cyan">show_chart</span> 
                        Performance Metrics
                    </h3>
                    <div className="flex bg-[#0a0e17] rounded border border-white/10 p-0.5 ml-2">
                        <button 
                          onClick={() => setMetricTab('rewards')}
                          className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition-all ${metricTab === 'rewards' ? 'bg-neon-cyan text-black' : 'text-slate-400 hover:text-white'}`}
                        >
                          Rewards
                        </button>
                        <button 
                          onClick={() => setMetricTab('uptime')}
                          className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition-all ${metricTab === 'uptime' ? 'bg-neon-pink text-black' : 'text-slate-400 hover:text-white'}`}
                        >
                          Uptime
                        </button>
                        <button 
                          onClick={() => setMetricTab('latency')}
                          className={`px-3 py-1 rounded text-[10px] uppercase font-bold transition-all ${metricTab === 'latency' ? 'bg-neon-purple text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                          Latency
                        </button>
                    </div>
                </div>
                
                {/* Fixed height chart container to prevent re-render warnings */}
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="colorRewards" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorUptime" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ff00ff" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#ff00ff" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#bc13fe" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#bc13fe" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1f293a" vertical={false} />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0a0e17', border: '1px solid #1f293a', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                labelStyle={{ color: '#94a3b8', marginBottom: '5px' }}
                            />
                            {metricTab === 'rewards' && (
                                <Area 
                                    type="monotone" 
                                    dataKey="rewards" 
                                    stroke="#00f3ff" 
                                    strokeWidth={3} 
                                    fill="url(#colorRewards)" 
                                    animationDuration={1500}
                                />
                            )}
                            {metricTab === 'uptime' && (
                                <Area 
                                    type="step" 
                                    dataKey="uptime" 
                                    stroke="#ff00ff" 
                                    strokeWidth={3} 
                                    fill="url(#colorUptime)" 
                                    animationDuration={1500}
                                />
                            )}
                            {metricTab === 'latency' && (
                                <Area 
                                    type="monotone" 
                                    dataKey="latency" 
                                    stroke="#bc13fe" 
                                    strokeWidth={3} 
                                    fill="url(#colorLatency)" 
                                    animationDuration={1500}
                                />
                            )}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="glass-panel rounded-xl p-6 border border-white/10 flex flex-col">
                <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 font-display uppercase tracking-wider">
                    <span className="material-symbols-outlined text-neon-green">bar_chart</span> 
                    Subnet Weights
                </h3>
                <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2 border-b border-white/10 relative">
                    <div className="w-full bg-[#0a0e17] rounded-t-sm relative group cursor-pointer hover:brightness-125 transition-all" style={{ height: '45%' }}>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-neon-cyan/20 to-neon-cyan h-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">SN1: 15%</div>
                    </div>
                    <div className="w-full bg-[#0a0e17] rounded-t-sm relative group cursor-pointer hover:brightness-125 transition-all" style={{ height: '80%' }}>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-neon-pink/20 to-neon-pink h-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">SN8: 28%</div>
                    </div>
                    <div className="w-full bg-[#0a0e17] rounded-t-sm relative group cursor-pointer hover:brightness-125 transition-all" style={{ height: '30%' }}>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-neon-green/20 to-neon-green h-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">SN12: 10%</div>
                    </div>
                    <div className="w-full bg-[#0a0e17] rounded-t-sm relative group cursor-pointer hover:brightness-125 transition-all" style={{ height: '60%' }}>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-neon-purple/20 to-neon-purple h-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">SN19: 20%</div>
                    </div>
                    <div className="w-full bg-[#0a0e17] rounded-t-sm relative group cursor-pointer hover:brightness-125 transition-all" style={{ height: '25%' }}>
                        <div className="absolute bottom-0 w-full bg-gradient-to-t from-orange-500/20 to-orange-500 h-full rounded-t-sm opacity-80 group-hover:opacity-100 transition-all"></div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">Others: 8%</div>
                    </div>
                </div>
                <div className="flex justify-between px-2 pt-2 text-[10px] font-mono text-text-secondary uppercase">
                    <span>SN1</span>
                    <span>SN8</span>
                    <span>SN12</span>
                    <span>SN19</span>
                    <span>Etc</span>
                </div>
            </div>
        </div>

        <div className="glass-panel rounded-xl flex flex-col flex-1 relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/20 via-transparent to-neon-pink/20 opacity-30 pointer-events-none"></div>
            <div className="p-5 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0a0e17]/50 z-10 relative">
                <h3 className="text-white text-lg font-bold flex items-center gap-2 font-display uppercase tracking-widest">
                    <span className="material-symbols-outlined text-neon-cyan text-2xl animate-pulse">groups</span>
                    Recent Delegations
                </h3>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary text-sm">search</span>
                        <input className="bg-black/40 border border-white/10 rounded-lg text-xs pl-9 pr-3 py-2 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan w-full transition-all placeholder:text-text-secondary font-mono" placeholder="Search delegator address..." type="text"/>
                    </div>
                    <button className="bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 p-2 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto z-10 relative bg-[#0a0e17]/30">
                <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-[#0a0e17]/90 border-b border-white/10 text-[10px] uppercase tracking-wider text-text-secondary font-semibold backdrop-blur-md sticky top-0 z-20">
                        <tr>
                            <th className="px-6 py-4 font-mono">Address</th>
                            <th className="px-6 py-4 text-right">Amount Staked (M)</th>
                            <th className="px-6 py-4 text-center">Since</th>
                            <th className="px-6 py-4 text-right">Rewards Earned</th>
                            <th className="px-6 py-4 text-right">Value (USD)</th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-xs">
                        <tr className="group hover:bg-neon-cyan/5 transition-colors cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('5F3s...9L1p')}>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">Ox</div>
                                    <span className="text-white font-mono group-hover:text-neon-cyan transition-colors">5F3s...9L1p</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-white text-sm">12,500 <span className="text-text-secondary text-xs">M</span></td>
                            <td className="px-6 py-4 text-center text-text-secondary">2h ago</td>
                            <td className="px-6 py-4 text-right font-mono text-neon-green">+0.045 M</td>
                            <td className="px-6 py-4 text-right text-text-secondary">$5,293.75</td>
                            <td className="px-6 py-4 text-center">
                                <button className="text-text-secondary hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                                </button>
                            </td>
                        </tr>
                        <tr className="group hover:bg-neon-cyan/5 transition-colors cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('1K9m...2R5t')}>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xs font-bold">K2</div>
                                    <span className="text-white font-mono group-hover:text-neon-cyan transition-colors">1K9m...2R5t</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-white text-sm">8,240 <span className="text-text-secondary text-xs">M</span></td>
                            <td className="px-6 py-4 text-center text-text-secondary">5h ago</td>
                            <td className="px-6 py-4 text-right font-mono text-neon-green">+1.204 M</td>
                            <td className="px-6 py-4 text-right text-text-secondary">$3,489.64</td>
                            <td className="px-6 py-4 text-center">
                                <button className="text-text-secondary hover:text-white transition-colors">
                                    <span className="material-symbols-outlined text-lg">open_in_new</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-white/10 bg-[#0a0e17]/50 flex items-center justify-center relative z-10">
                <button className="text-xs text-neon-cyan hover:text-white transition-colors font-bold uppercase tracking-wider flex items-center gap-2">
                    View All Delegators <span className="material-symbols-outlined text-sm">arrow_downward</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatorDetailView;