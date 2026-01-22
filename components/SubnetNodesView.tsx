import React from 'react';

interface SubnetNodesViewProps {
  onBack: () => void;
  onSelectAccount?: (id: string) => void;
}

const SubnetNodesView: React.FC<SubnetNodesViewProps> = ({ onBack, onSelectAccount }) => {
  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen">
        <div className="w-full max-w-[1600px] flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
                <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SUBNETS</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">SN1: NODES LIST</span>
            </div>

            {/* Header */}
            <div className="flex flex-wrap justify-between items-end gap-6 pb-6 border-b border-white/5 relative">
                <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-neon-pink to-transparent"></div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight uppercase glitch-effect" data-text="Full Nodes Explorer">Full Nodes Explorer</h1>
                        <span className="px-3 py-1 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/40 uppercase tracking-widest shadow-[0_0_10px_rgba(74,222,128,0.2)] flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live Sync
                        </span>
                    </div>
                    <p className="text-slate-400 text-lg font-light max-w-2xl">
                        Real-time inspection of all miners and validators operating on Subnet 1.
                        <span className="mx-3 text-white/20">|</span>
                        <span className="font-mono text-sm text-neon-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">Network: MAINNET</span>
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-panel flex flex-col gap-2 p-5 rounded-lg neon-border-cyan relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Nodes</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-2xl font-bold leading-none glow-text">1,024</p>
                        <span className="text-slate-500 text-xs font-mono">/ 1,024 MAX</span>
                    </div>
                </div>
                <div className="glass-panel flex flex-col gap-2 p-5 rounded-lg neon-border-pink relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-pink/5 rounded-full blur-3xl group-hover:bg-neon-pink/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Stake</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-2xl font-bold leading-none glow-text-pink">4.2M <span className="text-sm text-neon-pink">M</span></p>
                    </div>
                </div>
                <div className="glass-panel flex flex-col gap-2 p-5 rounded-lg neon-border-cyan relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Daily Emission</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-2xl font-bold leading-none glow-text">7,200 <span className="text-sm text-neon-cyan">M</span></p>
                    </div>
                </div>
                <div className="glass-panel flex flex-col gap-2 p-5 rounded-lg neon-border-pink relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-pink/5 rounded-full blur-3xl group-hover:bg-neon-pink/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Median Trust</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-2xl font-bold leading-none glow-text-pink">0.895</p>
                        <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden mb-1">
                            <div className="h-full bg-neon-pink cyber-progress-pink w-[89%]"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-surface-dark/60 border border-white/5 p-4 rounded-xl backdrop-blur-md">
                <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                    <div className="relative w-full md:w-80 group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-neon-cyan transition-colors">search</span>
                        <input className="w-full bg-[#050b14]/50 text-white border border-white/10 rounded-lg px-4 py-2.5 pl-10 focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan placeholder:text-slate-600 text-sm transition-all shadow-inner outline-none" placeholder="Search by Coldkey or Hotkey..." type="text"/>
                    </div>
                    <div className="flex items-center bg-[#050b14]/50 p-1 rounded-lg border border-white/5">
                        <button className="px-4 py-1.5 rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)] text-xs font-bold uppercase whitespace-nowrap tracking-wider transition-all">All Nodes</button>
                        <button className="px-4 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase whitespace-nowrap tracking-wider">Miners</button>
                        <button className="px-4 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase whitespace-nowrap tracking-wider">Validators</button>
                        <button className="px-4 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase whitespace-nowrap tracking-wider hidden sm:block">Top 100</button>
                    </div>
                </div>
                <div className="flex gap-3 w-full lg:w-auto justify-end">
                    <button className="holographic-btn px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-neon-pink border-white/10">
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        Refresh
                    </button>
                    <button className="holographic-btn px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-neon-cyan border-white/10">
                        <span className="material-symbols-outlined text-sm">download</span>
                        Export Data
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="glass-panel rounded-xl overflow-hidden flex flex-col border border-white/5 min-h-[600px] relative">
                <div className="absolute top-1/4 left-1/2 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="overflow-x-auto z-10">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-slate-400 font-bold backdrop-blur-xl sticky top-0 z-20">
                                <th className="px-6 py-4 w-16 text-center text-neon-cyan/70">Rank</th>
                                <th className="px-6 py-4 min-w-[300px]">Identity (Coldkey / Hotkey)</th>
                                <th className="px-6 py-4 text-right cursor-pointer hover:text-white transition-colors group">
                                    Total Stake (M) <span className="material-symbols-outlined text-xs align-middle opacity-50 group-hover:opacity-100">unfold_more</span>
                                </th>
                                <th className="px-6 py-4 w-48 cursor-pointer hover:text-white transition-colors group">
                                    Trust Score <span className="material-symbols-outlined text-xs align-middle opacity-50 group-hover:opacity-100">unfold_more</span>
                                </th>
                                <th className="px-6 py-4 w-48 cursor-pointer hover:text-white transition-colors group">
                                    Incentive <span className="material-symbols-outlined text-xs align-middle opacity-50 group-hover:opacity-100">unfold_more</span>
                                </th>
                                <th className="px-6 py-4 w-48 cursor-pointer hover:text-white transition-colors group">
                                    V-Trust <span className="material-symbols-outlined text-xs align-middle opacity-50 group-hover:opacity-100">unfold_more</span>
                                </th>
                                <th className="px-6 py-4 text-right">Emission (24h)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-white/5">
                            {/* Row 1 */}
                            <tr className="group hover:bg-neon-cyan/5 transition-colors duration-300">
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-block w-8 h-8 leading-8 rounded-full bg-neon-cyan/10 text-neon-cyan font-bold font-mono border border-neon-cyan/30">1</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center shadow-[0_0_10px_rgba(0,243,255,0.3)] z-10 bg-slate-800 flex items-center justify-center font-bold text-xs text-neon-cyan">OF</div>
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center opacity-70 grayscale group-hover:grayscale-0 transition-all bg-slate-700"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold tracking-wide group-hover:text-neon-cyan transition-colors cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('5Hh9...2kL')}>ModernTensor Fdn</span>
                                            <div className="flex gap-2 text-xs font-mono text-slate-500">
                                                <span className="flex items-center gap-1 cursor-pointer hover:text-neon-cyan transition-colors" onClick={() => onSelectAccount && onSelectAccount('5Hh9...2kL')}><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> 5Hh9...2kL</span>
                                                <span className="text-slate-700">|</span>
                                                <span className="flex items-center gap-1 text-neon-cyan/70 cursor-pointer hover:text-neon-cyan transition-colors" onClick={() => onSelectAccount && onSelectAccount('7Kj1...9mP')}><span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span> 7Kj1...9mP</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-white tracking-wide">
                                    1,245,320.00 <span className="text-slate-500 text-xs ml-1">M</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>High</span>
                                            <span className="text-neon-cyan">0.98</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-cyan cyber-progress-cyan w-[98%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Max</span>
                                            <span className="text-neon-pink">0.85</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-pink cyber-progress-pink w-[85%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Secure</span>
                                            <span className="text-neon-purple">0.99</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-purple cyber-progress-purple w-[99%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-green-400 font-mono font-bold">+125.40</span>
                                        <div className="h-6 w-12">
                                            <svg className="w-full h-full overflow-visible" viewBox="0 0 40 20">
                                                <path d="M0 15 L 10 10 L 20 18 L 30 5 L 40 10" fill="none" stroke="#4ade80" strokeLinecap="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            
                            {/* Row 2 */}
                            <tr className="group hover:bg-neon-pink/5 transition-colors duration-300">
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-block w-8 h-8 leading-8 rounded-full bg-white/5 text-slate-400 font-bold font-mono group-hover:text-white transition-colors">2</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center shadow-[0_0_10px_rgba(255,0,255,0.3)] z-10 bg-slate-800 flex items-center justify-center font-bold text-xs text-neon-pink">TS</div>
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center opacity-70 grayscale group-hover:grayscale-0 transition-all bg-slate-700"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold tracking-wide group-hover:text-neon-pink transition-colors cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('3Xy8...1qR')}>TensorStats</span>
                                            <div className="flex gap-2 text-xs font-mono text-slate-500">
                                                <span className="flex items-center gap-1 cursor-pointer hover:text-neon-pink transition-colors" onClick={() => onSelectAccount && onSelectAccount('3Xy8...1qR')}><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> 3Xy8...1qR</span>
                                                <span className="text-slate-700">|</span>
                                                <span className="flex items-center gap-1 text-neon-pink/70 cursor-pointer hover:text-neon-pink transition-colors" onClick={() => onSelectAccount && onSelectAccount('9Lp2...4kN')}><span className="w-1.5 h-1.5 rounded-full bg-neon-pink"></span> 9Lp2...4kN</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-white tracking-wide">
                                    890,123.50 <span className="text-slate-500 text-xs ml-1">M</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Good</span>
                                            <span className="text-neon-cyan">0.82</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-cyan cyber-progress-cyan w-[82%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>High</span>
                                            <span className="text-neon-pink">0.91</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-pink cyber-progress-pink w-[91%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Stable</span>
                                            <span className="text-neon-purple">0.76</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-purple cyber-progress-purple w-[76%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-green-400 font-mono font-bold">+89.20</span>
                                        <div className="h-6 w-12">
                                            <svg className="w-full h-full overflow-visible" viewBox="0 0 40 20">
                                                <path d="M0 10 L 10 15 L 20 8 L 30 18 L 40 12" fill="none" stroke="#4ade80" strokeLinecap="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 3 */}
                            <tr className="group hover:bg-neon-purple/5 transition-colors duration-300">
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-block w-8 h-8 leading-8 rounded-full bg-white/5 text-slate-400 font-bold font-mono group-hover:text-white transition-colors">3</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center shadow-[0_0_10px_rgba(188,19,254,0.3)] z-10 bg-slate-800 flex items-center justify-center font-bold text-xs text-neon-purple">NI</div>
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center opacity-70 grayscale group-hover:grayscale-0 transition-all bg-slate-700"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold tracking-wide group-hover:text-neon-purple transition-colors cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('9Km4...6vN')}>Neural Interlink</span>
                                            <div className="flex gap-2 text-xs font-mono text-slate-500">
                                                <span className="flex items-center gap-1 cursor-pointer hover:text-neon-purple transition-colors" onClick={() => onSelectAccount && onSelectAccount('9Km4...6vN')}><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> 9Km4...6vN</span>
                                                <span className="text-slate-700">|</span>
                                                <span className="flex items-center gap-1 text-neon-purple/70 cursor-pointer hover:text-neon-purple transition-colors" onClick={() => onSelectAccount && onSelectAccount('2Kp1...5jD')}><span className="w-1.5 h-1.5 rounded-full bg-neon-purple"></span> 2Kp1...5jD</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-white tracking-wide">
                                    450,880.00 <span className="text-slate-500 text-xs ml-1">M</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Good</span>
                                            <span className="text-neon-cyan">0.78</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-cyan cyber-progress-cyan w-[78%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Avg</span>
                                            <span className="text-neon-pink">0.65</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-pink cyber-progress-pink w-[65%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Trust</span>
                                            <span className="text-neon-purple">0.82</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-purple cyber-progress-purple w-[82%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-green-400 font-mono font-bold">+45.12</span>
                                        <div className="h-6 w-12">
                                            <svg className="w-full h-full overflow-visible" viewBox="0 0 40 20">
                                                <path d="M0 18 L 10 12 L 20 15 L 30 8 L 40 5" fill="none" stroke="#4ade80" strokeLinecap="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 4 */}
                            <tr className="group hover:bg-neon-cyan/5 transition-colors duration-300">
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-block w-8 h-8 leading-8 rounded-full bg-white/5 text-slate-400 font-bold font-mono group-hover:text-white transition-colors">4</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center shadow-[0_0_10px_rgba(45,212,191,0.3)] z-10 bg-slate-800 flex items-center justify-center font-bold text-xs text-teal-400">SN</div>
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center opacity-70 grayscale group-hover:grayscale-0 transition-all bg-slate-700"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold tracking-wide group-hover:text-teal-400 transition-colors cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('2Kp1...5jD')}>Sigma Node</span>
                                            <div className="flex gap-2 text-xs font-mono text-slate-500">
                                                <span className="flex items-center gap-1 cursor-pointer hover:text-teal-400 transition-colors" onClick={() => onSelectAccount && onSelectAccount('2Kp1...5jD')}><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> 2Kp1...5jD</span>
                                                <span className="text-slate-700">|</span>
                                                <span className="flex items-center gap-1 text-teal-400/70 cursor-pointer hover:text-teal-400 transition-colors" onClick={() => onSelectAccount && onSelectAccount('8Xq9...3mN')}><span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span> 8Xq9...3mN</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-white tracking-wide">
                                    210,440.00 <span className="text-slate-500 text-xs ml-1">M</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Fair</span>
                                            <span className="text-neon-cyan">0.55</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-cyan cyber-progress-cyan w-[55%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>High</span>
                                            <span className="text-neon-pink">0.95</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-pink cyber-progress-pink w-[95%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Low</span>
                                            <span className="text-neon-purple">0.32</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-purple cyber-progress-purple w-[32%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-green-400 font-mono font-bold">+22.80</span>
                                        <div className="h-6 w-12">
                                            <svg className="w-full h-full overflow-visible" viewBox="0 0 40 20">
                                                <path d="M0 12 L 10 12 L 20 8 L 30 10 L 40 5" fill="none" stroke="#4ade80" strokeLinecap="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                            {/* Row 5 */}
                            <tr className="group hover:bg-neon-pink/5 transition-colors duration-300">
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-block w-8 h-8 leading-8 rounded-full bg-white/5 text-slate-400 font-bold font-mono group-hover:text-white transition-colors">5</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative flex -space-x-3">
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center shadow-[0_0_10px_rgba(249,115,22,0.3)] z-10 bg-slate-800 flex items-center justify-center font-bold text-xs text-orange-500">QF</div>
                                            <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center opacity-70 grayscale group-hover:grayscale-0 transition-all bg-slate-700"></div>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold tracking-wide group-hover:text-orange-500 transition-colors cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('4Lk9...1wQ')}>Quantum Flow</span>
                                            <div className="flex gap-2 text-xs font-mono text-slate-500">
                                                <span className="flex items-center gap-1 cursor-pointer hover:text-orange-500 transition-colors" onClick={() => onSelectAccount && onSelectAccount('4Lk9...1wQ')}><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> 4Lk9...1wQ</span>
                                                <span className="text-slate-700">|</span>
                                                <span className="flex items-center gap-1 text-orange-500/70 cursor-pointer hover:text-orange-500 transition-colors" onClick={() => onSelectAccount && onSelectAccount('6Jm2...8xK')}><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> 6Jm2...8xK</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right font-bold text-white tracking-wide">
                                    150,220.75 <span className="text-slate-500 text-xs ml-1">M</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Max</span>
                                            <span className="text-neon-cyan">1.00</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-cyan cyber-progress-cyan w-[100%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Low</span>
                                            <span className="text-neon-pink">0.24</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-pink cyber-progress-pink w-[24%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                            <span>Mid</span>
                                            <span className="text-neon-purple">0.50</span>
                                        </div>
                                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-neon-purple cyber-progress-purple w-[50%]"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-green-400 font-mono font-bold">+15.50</span>
                                        <div className="h-6 w-12">
                                            <svg className="w-full h-full overflow-visible" viewBox="0 0 40 20">
                                                <path d="M0 15 L 10 15 L 20 15 L 30 5 L 40 10" fill="none" stroke="#4ade80" strokeLinecap="round" strokeWidth="2"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-6 border-t border-white/10 flex justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer z-10 relative">
                    <button className="holographic-btn px-8 py-3 rounded text-xs font-bold text-neon-cyan hover:text-white uppercase tracking-widest flex items-center gap-3 transition-colors shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                        Load More Data <span className="material-symbols-outlined text-base animate-bounce">expand_more</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SubnetNodesView;