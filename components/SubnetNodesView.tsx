import React, { useMemo } from 'react';
import { useDataBridge } from '../hooks/useDataBridge';
import { LineChart, Line } from 'recharts';

interface SubnetNodesViewProps {
  onBack: () => void;
  onSelectAccount?: (id: string) => void;
  netuid?: number;
}

const SubnetNodesView: React.FC<SubnetNodesViewProps> = ({ onBack, onSelectAccount, netuid = 1 }) => {
  const { data: bridgeData } = useDataBridge();
  const [filter, setFilter] = React.useState<'All' | 'Miners' | 'Validators'>('All');
  const [search, setSearch] = React.useState('');
  
  const activeSubnet = useMemo(() => {
    return bridgeData?.subnets?.find(s => s.netuid === netuid);
  }, [bridgeData, netuid]);

  const stats = useMemo(() => {
    return {
      activeNodes: (parseInt(activeSubnet?.miners || '0') + parseInt(activeSubnet?.validators || '0')).toString() || '1,024',
      totalStake: activeSubnet?.total_stake ? (activeSubnet.total_stake / 1000000).toFixed(1) + 'M' : '4.2M',
      emission: activeSubnet?.emission || '18.42%',
      unique_validators: activeSubnet?.unique_validators || '0'
    };
  }, [activeSubnet]);

  const displayNodes = useMemo(() => {
    let nodes = [];
    if (!activeSubnet?.nodes || activeSubnet.nodes.length === 0) {
        // Fallback to top validators if subnet nodes not found (legacy behavior)
        if (!bridgeData?.validators) return [];
        nodes = bridgeData.validators.map((v, i) => ({
          rank: i + 1,
          name: v.name,
          address: v.address,
          stake: v.stake,
          trust: 0.0,
          incentive: 0.0,
          vtrust: 0.0,
          emission: v.yield,
          color: 'bg-slate-800',
          type: 'Validator'
        }));
    } else {
        nodes = activeSubnet.nodes.map((n, i) => ({
          rank: i + 1,
          name: n.type === 'Validator' ? `Validator ${n.uid}` : `Miner ${n.uid}`,
          address: n.coldkey,
          stake: n.stake >= 1000 ? (n.stake / 1000).toFixed(1) + 'K' : n.stake.toFixed(1),
          trust: n.trust,
          incentive: n.incentive,
          vtrust: n.trust, // Simulating vtrust with trust for now
          emission: n.emission.toFixed(2),
          performance_history: n.performance_history,
          color: n.type === 'Validator' ? 'bg-neon-cyan' : 'bg-neon-pink',
          type: n.type
        }));
    }

    return nodes.filter(n => {
        const matchesFilter = filter === 'All' || 
                             (filter === 'Miners' && n.name.toLowerCase().startsWith('miner')) || 
                             (filter === 'Validators' && n.name.toLowerCase().startsWith('validator'));
        const matchesSearch = n.name.toLowerCase().includes(search.toLowerCase()) || 
                             n.address.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });
  }, [activeSubnet, bridgeData, filter, search]);

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
                        <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight uppercase glitch-effect" data-text="Subnet Nodes">Subnet Nodes</h1>
                    <p className="text-slate-400 text-lg font-light max-w-2xl">
                        Detailed inspection of all miners and validators operating on Subnet 1.
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
                        <p className="text-white text-2xl font-bold leading-none glow-text">{stats.activeNodes}</p>
                        <span className="text-slate-500 text-xs font-mono">/ {stats.unique_validators} Operators</span>
                    </div>
                </div>
                <div className="glass-panel flex flex-col gap-2 p-5 rounded-lg neon-border-pink relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-pink/5 rounded-full blur-3xl group-hover:bg-neon-pink/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Stake</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-2xl font-bold leading-none glow-text-pink">{stats.totalStake} <span className="text-sm text-neon-pink">M</span></p>
                    </div>
                </div>
                <div className="glass-panel flex flex-col gap-2 p-5 rounded-lg neon-border-cyan relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Daily Emission</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-2xl font-bold leading-none glow-text">{stats.emission} <span className="text-sm text-neon-cyan">%</span></p>
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
                        <input 
                            className="w-full bg-[#050b14]/50 text-white border border-white/10 rounded-lg px-4 py-2.5 pl-10 focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan placeholder:text-slate-600 text-sm transition-all shadow-inner outline-none" 
                            placeholder="Search by Coldkey or Hotkey..." 
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center bg-[#050b14]/50 p-1 rounded-lg border border-white/5">
                        <button 
                            onClick={() => setFilter('All')}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'All' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            All Nodes
                        </button>
                        <button 
                            onClick={() => setFilter('Miners')}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'Miners' ? 'bg-neon-pink/10 text-neon-pink border border-neon-pink/20 shadow-[0_0_10px_rgba(255,0,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Miners
                        </button>
                        <button 
                            onClick={() => setFilter('Validators')}
                            className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'Validators' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                        >
                            Validators
                        </button>
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
                                <th className="px-6 py-4 text-center w-32">24h Perf</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-white/5">
                            {displayNodes.map((node) => (
                                <tr key={node.rank} className="group hover:bg-neon-cyan/5 transition-colors duration-300">
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-block w-8 h-8 leading-8 rounded-full bg-neon-cyan/10 text-neon-cyan font-bold font-mono border border-neon-cyan/30">{node.rank}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative flex -space-x-3">
                                                <div className="w-10 h-10 rounded-full border-2 border-background-dark bg-cover bg-center shadow-[0_0_10px_rgba(0,243,255,0.3)] z-10 bg-slate-800 flex items-center justify-center font-bold text-xs text-neon-cyan">{node.name.substring(0,2).toUpperCase()}</div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-white font-bold tracking-wide group-hover:text-neon-cyan transition-colors cursor-pointer" onClick={() => onSelectAccount && onSelectAccount(node.address)}>{node.name}</span>
                                                <div className="flex gap-2 text-xs font-mono text-slate-500">
                                                    <span className="flex items-center gap-1 cursor-pointer hover:text-neon-cyan transition-colors" onClick={() => onSelectAccount && onSelectAccount(node.address)}><span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span> {node.address.substring(0,8)}...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-white tracking-wide">
                                        {node.stake} <span className="text-slate-500 text-xs ml-1">M</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                                <span>Trust</span>
                                                <span className="text-neon-cyan">{node.trust.toFixed(2)}</span>
                                            </div>
                                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-neon-cyan cyber-progress-cyan" style={{ width: `${node.trust * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                                <span>Incentive</span>
                                                <span className="text-neon-pink">{node.incentive.toFixed(2)}</span>
                                            </div>
                                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-neon-pink cyber-progress-pink" style={{ width: `${node.incentive * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between text-[10px] text-slate-400 uppercase font-bold">
                                                <span>V-Trust</span>
                                                <span className="text-neon-purple">{node.vtrust.toFixed(2)}</span>
                                            </div>
                                            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-neon-purple cyber-progress-purple" style={{ width: `${node.vtrust * 100}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="h-8 w-24">
                                                <LineChart width={96} height={32} data={node.performance_history?.map(val => ({ val })) || []}>
                                                    <Line 
                                                        type="monotone" 
                                                        dataKey="val" 
                                                        stroke={node.type === 'Validator' ? "#00f3ff" : "#ff00ff"} 
                                                        strokeWidth={2} 
                                                        dot={false} 
                                                        isAnimationActive={false} 
                                                    />
                                                </LineChart>
                                            </div>
                                            <span className="text-green-400 font-mono font-bold text-[10px]">{node.emission}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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