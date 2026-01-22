import React, { useState, useRef } from 'react';
import { LineChart, Line } from 'recharts';
import { Validator } from '../types';

const sparklineData = [
  { val: 10 }, { val: 25 }, { val: 15 }, { val: 30 }, { val: 20 }, { val: 45 }, { val: 35 }
];

const initialValidators: Validator[] = [
  { rank: 1, identity: '5Hh9...2kL', address: '5Hh9...2kL', stake: '12,450.00', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.98', verified: true, avatarColor: 'bg-neon-cyan' },
  { rank: 2, identity: '7Jk2...9mP', address: '7Jk2...9mP', stake: '8,920.45', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.95', verified: true, avatarColor: 'bg-neon-pink' },
  { rank: 3, identity: '3Xy8...1qR', address: '3Xy8...1qR', stake: '6,550.12', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.88', verified: true, avatarColor: 'bg-neon-purple' },
  { rank: 4, identity: '9Lm4...6vN', address: '9Lm4...6vN', stake: '4,200.80', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.82', verified: true, avatarColor: 'bg-teal-400' },
  { rank: 5, identity: '2Kp1...5jD', address: '2Kp1...5jD', stake: '3,150.25', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.99', verified: true, avatarColor: 'bg-orange-500' },
];

// Reusable Spotlight Card for this View
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  borderColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "", style = {}, borderColor="rgba(255,255,255,0.1)" }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl bg-panel-dark transition-all duration-300 group ${className}`}
      style={{
          border: `1px solid ${borderColor}`,
          ...style
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

interface SubnetViewProps {
  onBack?: () => void;
  onViewAllNodes?: () => void;
  onRegister?: () => void;
  onViewDistribution?: () => void;
  onViewWeights?: () => void;
  onSelectAccount?: (id: string) => void;
}

const SubnetView: React.FC<SubnetViewProps> = ({ onBack, onViewAllNodes, onRegister, onViewDistribution, onViewWeights, onSelectAccount }) => {
  const [validatorsList, setValidatorsList] = useState<Validator[]>(initialValidators);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
        const nextRank = validatorsList.length + 1;
        const newValidators: Validator[] = [
            { rank: nextRank, identity: '8Qw3...1pZ', address: '8Qw3...1pZ', stake: '2,800.50', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.75', verified: true, avatarColor: 'bg-blue-500' },
            { rank: nextRank + 1, identity: '4Rt6...9mK', address: '4Rt6...9mK', stake: '2,100.00', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.68', verified: false, avatarColor: 'bg-indigo-500' },
            { rank: nextRank + 2, identity: '6Yh2...4nB', address: '6Yh2...4nB', stake: '1,950.20', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.65', verified: true, avatarColor: 'bg-green-500' },
            { rank: nextRank + 3, identity: '1Ui8...3vC', address: '1Ui8...3vC', stake: '1,500.10', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.55', verified: false, avatarColor: 'bg-yellow-500' },
            { rank: nextRank + 4, identity: '9Po5...7lX', address: '9Po5...7lX', stake: '1,200.00', stakeUsd: '', fee: 0, apy: 0, yield24h: '0.48', verified: true, avatarColor: 'bg-red-500' }
        ];
        setValidatorsList(prev => [...prev, ...newValidators]);
        setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 py-8 px-6 lg:px-12 w-full max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 items-center text-base font-mono tracking-wide text-slate-300">
        <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SUBNETS</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">SN1: TEXT PROMPTING</span>
      </div>

      {/* Hero Header */}
      <div className="flex flex-wrap justify-between items-end gap-6 pb-6 border-b border-white/5 relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-panel-dark to-black border border-white/10 group">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-neon-cyan/20 blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-neon-pink/20 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="flex flex-col gap-3 relative z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase relative drop-shadow-xl">
              Subnet 1: Text Prompting
            </h1>
            <span className="px-3 py-1 rounded text-sm font-bold bg-green-500/10 text-green-400 border border-green-500/40 uppercase tracking-widest shadow-[0_0_10px_rgba(74,222,128,0.2)]">
               <span className="animate-pulse mr-1">●</span> Active
            </span>
          </div>
          <p className="text-slate-300 text-xl font-normal max-w-3xl">
              Decentralized text generation and large language model fine-tuning network.
              <span className="mx-3 text-white/20">|</span>
              <span className="font-mono text-base text-neon-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">ID: SN1</span>
          </p>
        </div>
        <div className="flex gap-4 relative z-10">
          <button 
            onClick={onRegister}
            className="group flex items-center gap-2 px-8 py-4 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-cyan border border-neon-blue/50 hover:border-neon-cyan transition-all shadow-[0_0_15px_rgba(19,91,236,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] uppercase font-bold tracking-wider text-sm rounded-lg"
          >
             <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">rocket_launch</span>
             Register / Stake
          </button>
          <button 
            onClick={onViewDistribution}
            className="group flex items-center gap-2 px-8 py-4 bg-black/40 hover:bg-white/5 text-slate-200 border border-white/20 hover:border-white/50 transition-all uppercase font-medium tracking-wider text-sm rounded-lg backdrop-blur-md"
          >
             <span className="material-symbols-outlined text-2xl">pie_chart</span>
             Distribution
          </button>
          <button 
            onClick={onViewWeights}
            className="group flex items-center gap-2 px-8 py-4 bg-black/40 hover:bg-white/5 text-slate-200 border border-white/20 hover:border-white/50 transition-all uppercase font-medium tracking-wider text-sm rounded-lg backdrop-blur-md"
          >
             <span className="material-symbols-outlined text-2xl">grid_on</span>
             Weights
          </button>
        </div>
      </div>

      {/* Grid Cards with Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Difficulty', icon: 'landscape', val: '14.5T', change: '1.2%', color: 'text-neon-cyan', border: 'rgba(0, 243, 255, 0.3)' },
          { title: 'Current Reward', icon: 'payments', val: '1,400', unit: 'M', change: '0.0%', color: 'text-neon-pink', border: 'rgba(255, 0, 255, 0.3)' },
          { title: 'Recycling Fees', icon: 'recycling', val: '405', unit: 'M', change: '3.4%', color: 'text-neon-cyan', border: 'rgba(0, 243, 255, 0.3)' },
          { title: 'Current Block', icon: 'layers', val: '2,401,123', sub: '~12s ago', color: 'text-neon-pink', border: 'rgba(255, 0, 255, 0.3)' }
        ].map((card, i) => (
          <SpotlightCard key={i} className="flex flex-col gap-2 p-8" borderColor={card.border}>
             <div className="flex justify-between items-start z-10">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{card.title}</p>
                <span className={`material-symbols-outlined ${card.color.replace('text-', 'text-')}/70 text-3xl`}>{card.icon}</span>
             </div>
             <div className="flex items-end gap-3 mt-4 z-10">
                <p className={`text-white text-4xl font-bold leading-none ${card.color === 'text-neon-cyan' ? 'neon-text' : ''}`}>{card.val} <span className={`text-xl ${card.color}`}>{card.unit}</span></p>
                {card.sub ? (
                  <span className="text-sm text-neon-cyan font-mono mt-1">{card.sub}</span>
                ) : (
                  <span className={`flex items-center text-sm font-bold px-2 py-1 rounded backdrop-blur-sm ${card.change.includes('0.0') ? 'bg-slate-800/50 text-slate-400' : 'bg-green-900/30 text-green-400 border border-green-500/30'}`}>
                    {card.change}
                  </span>
                )}
             </div>
          </SpotlightCard>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        {/* Validators Table */}
        <div className="flex-1 flex flex-col gap-6">
            <div className="glass-panel p-4 rounded-lg flex flex-col sm:flex-row gap-4 justify-between items-center border border-white/5">
                <div className="relative w-full sm:w-auto sm:flex-1 max-w-md group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-cyan transition-colors text-xl">search</span>
                  <input className="w-full bg-bg-dark/50 text-white border border-white/10 rounded px-4 pl-10 py-3 focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan placeholder:text-slate-500 text-base transition-all outline-none" placeholder="Search by Coldkey or Hotkey..." type="text"/>
                </div>
                <div className="flex items-center gap-2 bg-bg-dark/50 p-2 rounded w-full sm:w-auto overflow-x-auto border border-white/5">
                  <button className="px-6 py-2 rounded bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.2)] text-sm font-bold uppercase whitespace-nowrap tracking-wider">All</button>
                  <button className="px-6 py-2 rounded text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold uppercase whitespace-nowrap tracking-wider">Miners</button>
                  <button className="px-6 py-2 rounded text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold uppercase whitespace-nowrap tracking-wider">Validators</button>
                </div>
            </div>

            <div className="glass-panel rounded-lg overflow-hidden flex flex-col border border-white/5 relative">
               {/* Decorative grid for table background */}
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBWMHNMNDAgNDBWNDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
               
               <div className="overflow-x-auto relative z-10">
                 <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="bg-[#050b14]/90 border-b border-white/10 text-sm uppercase tracking-widest text-slate-400 font-bold backdrop-blur-md">
                       <th className="px-6 py-6 w-20 text-center text-neon-cyan/70">#</th>
                       <th className="px-6 py-6">Identity</th>
                       <th className="px-6 py-6 text-right">Stake (M)</th>
                       <th className="px-6 py-6 w-36">Trust</th>
                       <th className="px-6 py-6 w-36">Incentive</th>
                       <th className="px-6 py-6 w-48 text-center">24h Perf</th>
                     </tr>
                   </thead>
                   <tbody className="text-base divide-y divide-white/5">
                     {validatorsList.map((v) => (
                       <tr key={v.rank} onClick={() => onSelectAccount && onSelectAccount(v.address)} className="group hover:bg-neon-cyan/5 transition-colors duration-300 cursor-pointer relative">
                         <td className="px-6 py-6 text-center text-slate-400 group-hover:text-neon-cyan font-mono">{v.rank}</td>
                         <td className="px-6 py-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-3 h-3 rounded-full ${v.avatarColor} shadow-[0_0_10px_currentColor]`}></div>
                              <span className={`font-mono text-slate-200 group-hover:text-${v.avatarColor.replace('bg-', '')} transition-colors tracking-wide`}>{v.identity}</span>
                            </div>
                         </td>
                         <td className="px-6 py-6 text-right font-bold text-white tracking-wide">{v.stake}</td>
                         <td className="px-6 py-6">
                            <div className="flex flex-col gap-1.5">
                               <span className="text-xs text-right text-slate-300">0.98</span>
                               <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-neon-cyan w-[98%] shadow-[0_0_10px_#00f3ff]"></div>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-6">
                            <div className="flex flex-col gap-1.5">
                               <span className="text-xs text-right text-slate-300">0.85</span>
                               <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-neon-pink w-[85%] shadow-[0_0_10px_#ff00ff]"></div>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-6">
                            <div className="h-10 w-28 mx-auto">
                              {/* Use fixed dimensions for sparklines to avoid ResizeObserver overhead in tables */}
                              <LineChart width={112} height={40} data={sparklineData}>
                                <Line type="monotone" dataKey="val" stroke={v.rank % 2 === 0 ? "#ff00ff" : "#00f3ff"} strokeWidth={2} dot={false} isAnimationActive={false} />
                              </LineChart>
                            </div>
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
               <div className="p-6 border-t border-white/10 flex justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer relative z-10">
                  <button 
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="text-sm font-bold text-neon-cyan hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {isLoading ? (
                       <>
                         <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                         Loading...
                       </>
                     ) : (
                       <>
                         Load More Data <span className="material-symbols-outlined text-lg">expand_more</span>
                       </>
                     )}
                  </button>
               </div>
            </div>
        </div>

        {/* Sidebar: Top Nodes */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
           <div className="glass-panel rounded-lg p-8 relative border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
             <div className="flex justify-between items-center mb-8 relative z-10">
               <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
                 <span className="material-symbols-outlined text-neon-cyan text-2xl">trophy</span> Top Nodes
               </h3>
               <button onClick={onViewAllNodes} className="text-sm text-neon-cyan hover:text-white uppercase font-bold tracking-wider">View All</button>
             </div>
             
             <div className="flex flex-col gap-5 relative z-10">
               {[
                 { name: 'ModernTensor Fdn', dom: '18.5%', id: '5Hh9...2kL', color: 'border-neon-cyan/30' },
                 { name: 'TensorStats', dom: '12.2%', id: '3Xy8...1qR', color: 'border-neon-pink/30' },
                 { name: 'Neural Interlink', dom: '8.7%', id: '9Lm4...6vN', color: 'border-neon-purple/30' },
                 { name: 'Sigma Cluster', dom: '5.1%', id: '2Kp1...5jD', color: 'border-white/20' }
               ].map((node, i) => (
                 <div key={i} onClick={() => onSelectAccount && onSelectAccount(node.id)} className={`group flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:${node.color} transition-all cursor-pointer`}>
                    <div className="relative">
                       <div className="size-12 rounded-full bg-slate-800 ring-1 ring-white/20 flex items-center justify-center font-bold text-sm">{node.name.substring(0,2)}</div>
                       <div className="absolute -top-1 -left-1 bg-neon-cyan text-black text-xs font-black w-5 h-5 flex items-center justify-center rounded-sm">{i+1}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-base font-bold text-white truncate group-hover:text-neon-cyan transition-colors">{node.name}</p>
                       <p className="text-xs text-slate-400 font-mono truncate">{node.id}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-base font-bold text-white">{node.dom}</p>
                       <p className="text-[10px] text-slate-500 uppercase tracking-widest">Dom</p>
                    </div>
                 </div>
               ))}
             </div>

             <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
               <div className="flex flex-col gap-3">
                 <div className="flex justify-between items-center">
                   <p className="text-sm text-slate-400 uppercase font-bold tracking-wider">Network Health</p>
                   <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></div>
                      <span className="text-sm text-green-400 font-mono font-bold">OPTIMAL</span>
                   </div>
                 </div>
                 <div className="w-full bg-white/5 h-2.5 rounded-full mt-1 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-300 h-full w-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                 </div>
                 <div className="flex justify-between text-xs text-slate-500 font-mono mt-1">
                    <span>UPTIME: 99.99%</span>
                    <span>LATENCY: 45ms</span>
                 </div>
               </div>
             </div>
           </div>

           <div className="rounded-lg p-8 relative overflow-hidden border border-neon-cyan/30 bg-gradient-to-br from-bg-dark to-panel-dark">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                 <span className="material-symbols-outlined text-7xl text-neon-cyan">hub</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-3 z-10 relative">Run a Validator</h3>
              <p className="text-slate-300 text-base mb-6 z-10 relative">Join the network and earn rewards by securing the subnet.</p>
              <button className="w-full py-3 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 hover:border-neon-cyan transition-all text-sm font-bold uppercase tracking-wider rounded z-10 relative shadow-[0_0_10px_rgba(0,243,255,0.1)]">
                 Start Guide
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SubnetView;