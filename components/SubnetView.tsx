import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line } from 'recharts';
import { Validator } from '../types';
import { useDataBridge } from '../hooks/useDataBridge';
import SpotlightCard from './ui/SpotlightCard';

const SubnetView: React.FC<{
  onBack?: () => void;
  onViewAllNodes?: () => void;
  onViewWeights?: () => void;
  onViewRegistration?: () => void;
  onViewDistribution?: () => void;
  onSelectAccount?: (id: string) => void;
  netuid?: number;
}> = ({ onBack, onViewAllNodes, onViewWeights, onViewRegistration, onViewDistribution, onSelectAccount, netuid = 1 }) => {
  const { data: bridgeData } = useDataBridge();
  
  const activeSubnet = useMemo(() => {
    return bridgeData?.subnets?.find(s => s.netuid === netuid);
  }, [bridgeData, netuid]);

  const sn1 = activeSubnet || {
    id: `SN${netuid}`,
    netuid: netuid,
    title: "LOADING...",
    miners: "0",
    validators: "0",
    unique_validators: "0",
    tempo: "...",
    total_stake: 0,
    desc: "Fetching subnet data from metagraph..."
  };

  const bridgeValidators: Validator[] = useMemo(() => {
    if (!activeSubnet?.nodes) return [];
    return activeSubnet.nodes.map((n, idx) => ({
      rank: idx + 1,
      identity: n.type === 'Validator' ? `Validator ${n.uid}` : `Miner ${n.uid}`,
      address: n.coldkey,
      stake: n.stake >= 1000 ? (n.stake / 1000).toFixed(1) + 'K' : n.stake.toFixed(1),
      stakeUsd: `$${((n.stake * 423.5) / 1000).toFixed(1)}K`,
      fee: 18,
      apy: 18.2,
      yield24h: n.emission.toFixed(4),
      voterPower: Math.sqrt(n.stake).toFixed(1),
      verified: true,
      avatarColor: n.type === 'Validator' ? 'bg-neon-cyan' : 'bg-neon-pink',
      trust: n.trust,
      incentive: n.incentive,
      performance_history: n.performance_history
    }));
  }, [activeSubnet]);

  const [filter, setFilter] = useState<'All' | 'Miners' | 'Validators'>('All');
  const [search, setSearch] = useState('');

  const displayNodes = useMemo(() => {
    return bridgeValidators.filter(n => {
        const matchesFilter = filter === 'All' || 
                             (filter === 'Miners' && n.identity.toLowerCase().startsWith('miner')) || 
                             (filter === 'Validators' && n.identity.toLowerCase().startsWith('validator'));
        const matchesSearch = n.identity.toLowerCase().includes(search.toLowerCase()) || 
                             n.address.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });
  }, [bridgeValidators, filter, search]);

  return (
    <div className="flex flex-col gap-8 py-8 px-6 lg:px-12 w-full max-w-[1400px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 items-center text-base font-mono tracking-wide text-slate-300">
        <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SUBNETS</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">{sn1.id}: {sn1.title}</span>
      </div>

      {/* Hero Header */}
      <div className="flex flex-wrap justify-between items-end gap-6 pb-6 border-b border-white/5 relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-panel-dark to-black border border-white/10 group">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-neon-cyan/20 blur-[100px] animate-pulse-slow"></div>
            <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-neon-pink/20 blur-[100px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight uppercase relative">
              Subnet {sn1.netuid} : {sn1.title}
            </h1>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/40 uppercase tracking-widest flex items-center gap-1.5 h-fit mt-2">
               <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> {activeSubnet ? 'Active' : 'Offline'}
            </span>
          </div>
          <div className="flex items-center text-slate-400 text-sm font-medium">
              <p className="max-w-2xl">{sn1.desc}</p>
              <span className="mx-3 text-white/10">|</span>
              <span className="font-mono text-neon-pink text-xs uppercase font-bold tracking-widest">ID: {sn1.id}</span>
          </div>
        </div>
        <div className="flex gap-3 relative z-10 mb-2">
          <button onClick={onViewRegistration} className="group flex items-center gap-2 px-6 py-3 bg-[#0c1f3d] hover:bg-[#122b54] text-neon-cyan border border-neon-cyan/30 transition-all uppercase font-bold tracking-widest text-[11px] rounded-lg shadow-[0_0_20px_rgba(0,123,255,0.15)]">
             <span className="material-symbols-outlined text-[20px] font-bold">rocket_launch</span> Register / Stake
          </button>
          <button onClick={onViewDistribution} className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all uppercase font-bold tracking-widest text-[11px] rounded-lg">
             <span className="material-symbols-outlined text-[20px]">circle_notifications</span> Distribution
          </button>
          <button onClick={onViewWeights} className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all uppercase font-bold tracking-widest text-[11px] rounded-lg">
             <span className="material-symbols-outlined text-[20px]">grid_view</span> Weights
          </button>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Validators', icon: 'verified_user', val: activeSubnet?.unique_validators || sn1.unique_validators, unit: ` / ${activeSubnet?.validators || sn1.validators} Nodes`, color: 'text-neon-cyan', border: 'rgba(0, 243, 255, 0.3)' },
          { title: 'Miners', icon: 'precision_manufacturing', val: sn1.miners, unit: ` / ${activeSubnet?.max_nodes || 100}`, color: 'text-neon-cyan', border: 'rgba(0, 243, 255, 0.3)' },
          { title: 'Subnet Stake', icon: 'account_balance', val: sn1.total_stake.toLocaleString(), unit: 'M', color: 'text-neon-pink', border: 'rgba(255, 0, 255, 0.3)' },
          { title: 'Epoch Tempo', icon: 'timer', val: sn1.tempo ? sn1.tempo.split(' ')[0] : '...', unit: ' blocks', color: 'text-neon-cyan', border: 'rgba(0, 243, 255, 0.3)' },
        ].map((card, i) => (
          <SpotlightCard key={i} className="flex flex-col gap-2 p-8" style={{ borderColor: card.border }}>
             <div className="flex justify-between items-start z-10">
                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">{card.title}</p>
                <span className={`material-symbols-outlined ${card.color.replace('text-', 'text-')}/70 text-3xl`}>{card.icon}</span>
             </div>
             <div className="flex items-end gap-3 mt-4 z-10">
                <p className={`text-white text-4xl font-bold leading-none ${card.color === 'text-neon-cyan' ? 'neon-text' : ''}`}>{card.val} <span className={`text-xl ${card.color}`}>{card.unit}</span></p>
             </div>
          </SpotlightCard>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-4">
        <div className="flex-1 flex flex-col gap-6">
            <div className="glass-panel p-4 rounded-lg flex flex-col sm:flex-row gap-4 justify-between items-center border border-white/5">
                <div className="relative w-full sm:w-auto sm:flex-1 max-w-md group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-cyan transition-colors text-xl">search</span>
                  <input 
                    className="w-full bg-bg-dark/50 text-white border border-white/10 rounded px-4 pl-10 py-3 focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan placeholder:text-slate-500 text-base transition-all outline-none" 
                    placeholder="Search by Coldkey or Hotkey..." 
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2 bg-bg-dark/50 p-2 rounded w-full sm:w-auto overflow-x-auto border border-white/5">
                  <button 
                    onClick={() => setFilter('All')}
                    className={`px-6 py-2 rounded text-sm font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'All' ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setFilter('Miners')}
                    className={`px-6 py-2 rounded text-sm font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'Miners' ? 'bg-neon-pink/20 text-neon-pink border border-neon-pink/30 shadow-[0_0_10px_rgba(255,0,255,0.2)]' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                  >
                    Miners
                  </button>
                  <button 
                    onClick={() => setFilter('Validators')}
                    className={`px-6 py-2 rounded text-sm font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'Validators' ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                  >
                    Validators
                  </button>
                </div>
            </div>

            <div className="glass-panel rounded-lg overflow-hidden flex flex-col border border-white/5 relative">
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
                     {displayNodes.map((v) => {
                       const chartData = v.performance_history?.map(val => ({ val })) || [];
                       const isUp = chartData.length > 1 ? chartData[chartData.length-1].val >= chartData[0].val : true;
                       
                       return (
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
                                <span className="text-xs text-right text-slate-300">{v.trust?.toFixed(2) || '0.00'}</span>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                   <div className="h-full bg-neon-cyan shadow-[0_0_10px_#00f3ff]" style={{ width: `${(v.trust || 0) * 100}%` }}></div>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-6">
                             <div className="flex flex-col gap-1.5">
                                <span className="text-xs text-right text-slate-300">{v.incentive?.toFixed(4) || '0.0000'}</span>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                   <div className="h-full bg-neon-pink shadow-[0_0_10px_#ff00ff]" style={{ width: `${Math.min((v.incentive || 0) * 1000, 100)}%` }}></div>
                                </div>
                             </div>
                          </td>
                          <td className="px-6 py-6">
                             <div className="flex flex-col items-center gap-1">
                                <div className="h-8 w-24">
                                   <LineChart width={96} height={32} data={chartData}>
                                     <Line type="monotone" dataKey="val" stroke={isUp ? "#00f3ff" : "#ff00ff"} strokeWidth={2} dot={false} isAnimationActive={false} />
                                   </LineChart>
                                </div>
                                <span className={`text-[10px] font-bold font-mono ${parseFloat(v.yield24h) > 0 ? 'text-green-400' : 'text-slate-500'}`}>
                                   {parseFloat(v.yield24h) > 0 ? '+' : ''}{v.yield24h}
                                </span>
                             </div>
                          </td>
                        </tr>
                       );
                     })}
                   </tbody>
                 </table>
               </div>
            </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-96 flex flex-col gap-6">
           <div className="glass-panel rounded-lg p-8 relative border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
             <div className="flex justify-between items-center mb-8 relative z-10">
               <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
                 <span className="material-symbols-outlined text-neon-cyan text-2xl">trophy</span> Top Nodes
               </h3>
               <button onClick={onViewAllNodes} className="text-sm text-neon-cyan hover:text-white uppercase font-bold tracking-wider">View All</button>
             </div>
             
             <div className="flex flex-col gap-5 relative z-10">
               {bridgeValidators.slice(0, 4).map((node, i) => (
                 <div key={i} onClick={() => onSelectAccount && onSelectAccount(node.address)} className={`group flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-transparent hover:border-neon-cyan/30 transition-all cursor-pointer`}>
                    <div className="relative">
                       <div className="size-12 rounded-full bg-slate-800 ring-1 ring-white/20 flex items-center justify-center font-bold text-sm">{node.identity.substring(0,2)}</div>
                       <div className="absolute -top-1 -left-1 bg-neon-cyan text-black text-xs font-black w-5 h-5 flex items-center justify-center rounded-sm">{i+1}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-base font-bold text-white truncate group-hover:text-neon-cyan transition-colors">{node.identity}</p>
                       <p className="text-xs text-slate-400 font-mono truncate">{node.address}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-base font-bold text-white">{((parseFloat(node.stake.replace(/,/g, '')) / (sn1.total_stake || 1)) * 100).toFixed(1)}%</p>
                       <p className="text-[10px] text-slate-500 uppercase tracking-widest">Dom</p>
                    </div>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SubnetView;