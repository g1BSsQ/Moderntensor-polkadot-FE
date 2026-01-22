import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface SubnetRegistrationViewProps {
  onBack: () => void;
}

const costData = [
  { val: 180 }, { val: 175 }, { val: 185 }, { val: 190 }, { val: 182 }, { val: 195 }, { val: 200.5 }
];

const SubnetRegistrationView: React.FC<SubnetRegistrationViewProps> = ({ onBack }) => {
  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen">
      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SUBNETS</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SN1: TEXT PROMPTING</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">REGISTRATION</span>
        </div>

        {/* Header */}
        <div className="flex flex-wrap justify-between items-end gap-6 pb-6 border-b border-white/5 relative">
          <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-neon-pink to-transparent"></div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight uppercase glitch-effect" data-text="Subnet Registration">Subnet Registration</h1>
              <span className="px-3 py-1 rounded text-xs font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40 uppercase tracking-widest shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                <span className="animate-pulse mr-1">●</span> Open
              </span>
            </div>
            <p className="text-slate-400 text-lg font-light max-w-2xl">
              Secure your slot in the decentralized network. Register as a miner or validator to begin participation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Network Status Card */}
            <div className="glass-panel p-1 rounded-2xl neon-border-cyan relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[100px] group-hover:bg-neon-cyan/10 transition-colors"></div>
              <div className="bg-[#050b14]/60 backdrop-blur-xl p-8 rounded-xl h-full border border-white/5 relative z-10">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-neon-cyan animate-pulse">sensors</span>
                    Network Status
                  </h3>
                  <span className="text-xs font-mono text-slate-500">REALTIME: LIVE</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  <div className="flex flex-col gap-2 pt-4 md:pt-0">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Registration Cost</span>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black text-white glow-text">200.50</span>
                      <span className="text-sm font-bold text-neon-cyan mb-1.5">MTN</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-green-400">
                      <span className="material-symbols-outlined text-[14px]">trending_down</span> -2.4% vs 24h
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 md:pt-0 md:pl-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Difficulty</span>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black text-white">14.5</span>
                      <span className="text-sm font-bold text-neon-pink mb-1.5">T</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-neon-pink to-purple-600 h-full w-[75%] cyber-progress-pink"></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 md:pt-0 md:pl-8">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Burn Rate</span>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-black text-white">5.2</span>
                      <span className="text-sm font-bold text-neon-purple mb-1.5">MTN/Block</span>
                    </div>
                    <span className="text-xs text-slate-500">Recycling to pool</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button className="holographic-shimmer group relative overflow-hidden rounded-xl border border-neon-cyan/30 bg-gradient-to-br from-neon-cyan/10 to-transparent p-8 text-left transition-all hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="p-3 rounded-lg bg-neon-cyan/20 text-neon-cyan">
                      <span className="material-symbols-outlined text-3xl">memory</span>
                    </span>
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-neon-cyan transition-colors">arrow_forward</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">Register Miner</h3>
                    <p className="text-sm text-slate-400">Provide computational resources.</p>
                  </div>
                </div>
              </button>
              <button className="holographic-shimmer group relative overflow-hidden rounded-xl border border-neon-pink/30 bg-gradient-to-br from-neon-pink/10 to-transparent p-8 text-left transition-all hover:border-neon-pink hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]">
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="p-3 rounded-lg bg-neon-pink/20 text-neon-pink">
                      <span className="material-symbols-outlined text-3xl">verified_user</span>
                    </span>
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-neon-pink transition-colors">arrow_forward</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-neon-pink transition-colors">Register Validator</h3>
                    <p className="text-sm text-slate-400">Verify network integrity.</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Cost History Chart */}
            <div className="glass-panel rounded-xl p-6 border border-white/5 relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Registration Cost History (7d)</h3>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-[10px] font-bold bg-neon-cyan/20 text-neon-cyan rounded border border-neon-cyan/30">MTN</span>
                </div>
              </div>
              <div className="h-48 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={costData}>
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="val" stroke="#00f3ff" strokeWidth={2} fill="url(#chartGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
                <span>7 Days Ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="holographic-card rounded-xl p-1 relative">
              <div className="bg-[#0f172a]/80 backdrop-blur rounded-lg p-6 h-full">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-pink">checklist</span>
                  Prerequisites
                </h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex items-start gap-3 group">
                    <div className="mt-0.5 rounded-full bg-green-500/20 p-0.5 text-green-400 ring-1 ring-green-500/50">
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-200">Wallet Connected</p>
                      <p className="text-xs text-slate-500">Polkadot.js detected</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="mt-0.5 rounded-full bg-neon-cyan/20 p-0.5 text-neon-cyan ring-1 ring-neon-cyan/50 animate-pulse">
                      <span className="material-symbols-outlined text-sm font-bold">sync</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-200">Balance Check</p>
                      <p className="text-xs text-slate-500">Verifying MTN holdings...</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group opacity-60">
                    <div className="mt-0.5 rounded-full bg-slate-800 p-0.5 text-slate-500 ring-1 ring-slate-700">
                      <span className="material-symbols-outlined text-sm font-bold">radio_button_unchecked</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-200">Hardware Verify</p>
                      <p className="text-xs text-slate-500">Benchmark required</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 group opacity-60">
                    <div className="mt-0.5 rounded-full bg-slate-800 p-0.5 text-slate-500 ring-1 ring-slate-700">
                      <span className="material-symbols-outlined text-sm font-bold">radio_button_unchecked</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-200">Identity Set</p>
                      <p className="text-xs text-slate-500">On-chain identity</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-xl border-l-2 border-l-neon-purple relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 text-neon-purple/10">
                <span className="material-symbols-outlined text-9xl">help</span>
              </div>
              <h4 className="text-white font-bold mb-2 relative z-10">Need MTN?</h4>
              <p className="text-sm text-slate-400 mb-4 relative z-10">You need ModernTensor tokens to pay for the registration fee.</p>
              <button className="text-xs font-bold text-neon-purple hover:text-white uppercase tracking-wider flex items-center gap-1 transition-colors relative z-10">
                Get Tokens <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
            
            <div className="p-6 rounded-xl border border-dashed border-slate-700 hover:border-neon-cyan/50 transition-colors group cursor-pointer text-center">
              <span className="material-symbols-outlined text-slate-500 group-hover:text-neon-cyan text-3xl mb-2 transition-colors">menu_book</span>
              <h4 className="text-slate-300 font-bold text-sm group-hover:text-white transition-colors">Read Registration Guide</h4>
              <p className="text-xs text-slate-500 mt-1">Step-by-step tutorial for new miners.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubnetRegistrationView;