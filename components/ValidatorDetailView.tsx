import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useDataBridge } from '../hooks/useDataBridge';

interface ValidatorDetailViewProps {
  onBack: () => void;
  onSelectAccount?: (id: string) => void;
  onViewHistory?: () => void;
  validatorId: string | null;
}

const ValidatorDetailView: React.FC<ValidatorDetailViewProps> = ({ onBack, onSelectAccount, onViewHistory, validatorId }) => {
  const { data: bridgeData } = useDataBridge();
  const [metricTab, setMetricTab] = useState<'rewards' | 'trust' | 'incentive'>('rewards');

  const validatorInfo = useMemo(() => {
    if (!bridgeData?.validators || !validatorId) return null;
    return bridgeData.validators.find(v => v.address === validatorId) || 
           bridgeData.validators.find(v => v.id === validatorId);
  }, [bridgeData, validatorId]);

  // Find the validator node in any subnet to get performance history
  const nodeInfo = useMemo(() => {
    if (!bridgeData?.subnets || !validatorId) return null;
    for (const subnet of bridgeData.subnets) {
      const node = subnet.nodes.find(n => n.coldkey === validatorId);
      if (node) return node;
    }
    return null;
  }, [bridgeData, validatorId]);

  const stats = useMemo(() => {
    const rank = bridgeData?.validators?.findIndex(v => v.address === validatorId || v.id === validatorId) + 1 || 0;
    return {
      block: bridgeData?.network?.block || 0,
      totalStaked: bridgeData?.network?.total_staked || 0,
      nodeStake: validatorInfo?.stake ? parseFloat(validatorInfo.stake.replace(/,/g, '')) : 0,
      nodeYield: validatorInfo?.yield || '0.0',
      identity: validatorInfo?.name || 'ModernTensor Node',
      address: validatorInfo?.address || validatorId || '0x...',
      rank: rank > 0 ? `#${rank}` : 'N/A',
      rankPercent: rank > 0 ? Math.max(5, 100 - (rank * 2)) : 0,
      apy: validatorInfo?.apy || '0.0%',
      trust: nodeInfo?.trust || 0,
      incentive: nodeInfo?.incentive || 0,
    };
  }, [bridgeData, validatorInfo, validatorId, nodeInfo]);

  const performanceChartData = useMemo(() => {
    const history = nodeInfo?.performance_history || [];
    return history.map((val, idx) => ({
      name: `T-${history.length - idx}`,
      val: val
    }));
  }, [nodeInfo]);

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
              <div className="text-neon-cyan text-xs font-bold uppercase tracking-widest mb-2 font-mono">NODE STATUS</div>
              <h3 className="text-white font-display font-bold text-lg leading-tight mb-2">Block Height</h3>
              <p className="text-neon-cyan font-mono text-xl mb-4">#{stats.block.toLocaleString()}</p>
              <div className="w-full h-[1px] bg-neon-cyan/30 mb-4 shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
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
                                    <span className="font-display font-bold text-3xl text-white">{(stats.identity || 'VA').substring(0,2).toUpperCase()}</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 z-20 bg-[#0a0e17] rounded-full p-1 border border-white/10">
                                <span className="material-symbols-outlined text-neon-green text-2xl drop-shadow-[0_0_8px_rgba(0,255,163,0.8)]">verified_user</span>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-white drop-shadow-md">{stats.identity}</h1>
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-neon-green/10 text-neon-green border border-neon-green/20">Active</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-text-secondary mb-3">
                                <span className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded border border-white/5 hover:border-neon-cyan/30 transition-colors cursor-pointer group">
                                    <span className="material-symbols-outlined text-sm">key</span>
                                    {stats.address.substring(0, 8)}...{stats.address.substring(stats.address.length - 4)}
                                    <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100 transition-opacity">content_copy</span>
                                </span>
                                <span className="flex items-center gap-1.5 uppercase text-[10px] tracking-widest text-neon-cyan">
                                    <span className="material-symbols-outlined text-sm">network_check</span>
                                    Live Bridge Connected
                                </span>
                            </div>
                            <p className="text-text-secondary text-sm max-w-xl border-l-2 border-neon-cyan/30 pl-3">
                                Tier-1 validator specializing in high-throughput AI platforms. 99.9% uptime guaranteed with redundant infrastructure.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <button className="relative h-12 px-8 rounded-lg border border-neon-cyan/50 text-white font-bold uppercase tracking-widest overflow-hidden group shadow-[0_0_20px_rgba(0,243,255,0.2)] bg-gradient-to-r from-neon-cyan/10 to-neon-cyan/5 hover:from-neon-cyan/20 hover:to-neon-cyan/10 transition-all">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Delegate Stake
                                <span className="material-symbols-outlined animate-pulse">bolt</span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-cyan/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Network Total Stake</span>
                <div className="text-2xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                    {(stats.totalStaked / 1_000_000).toFixed(2)}M <span className="text-xs text-text-secondary font-mono font-normal">M</span>
                </div>
                <div className="text-neon-cyan text-[10px] font-mono mt-1 opacity-50 uppercase tracking-tighter">LIVE NETWORK STAKE</div>
            </div>
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-cyan/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Node Stake</span>
                <div className="text-2xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">
                    {stats.nodeStake > 1000 ? (stats.nodeStake / 1000).toFixed(1) + 'K' : stats.nodeStake.toLocaleString()} <span className="text-xs text-text-secondary font-mono font-normal">M</span>
                </div>
                <div className="text-neon-cyan text-[10px] font-mono mt-1 opacity-50 uppercase tracking-tighter">OWN STAKE</div>
            </div>
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-green/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">APY</span>
                <div className="text-2xl font-display font-bold text-neon-green shadow-[0_0_10px_rgba(0,255,163,0.2)]">{stats.apy}</div>
                <div className="text-text-secondary text-[10px] mt-1 font-mono opacity-50 uppercase">CURRENT YIELD</div>
            </div>
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-pink/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Rank</span>
                <div className="text-2xl font-display font-bold text-white group-hover:text-neon-pink transition-colors">{stats.rank}</div>
                <div className="w-full bg-[#0a0e17] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-neon-cyan to-neon-pink h-full transition-all duration-1000" style={{ width: `${stats.rankPercent}%` }}></div>
                </div>
            </div>
            <div className="bg-[#0a0e17]/40 backdrop-blur border border-white/10 p-5 rounded-xl flex flex-col gap-1 hover:border-neon-cyan/30 transition-all group">
                <span className="text-text-secondary text-[10px] uppercase tracking-widest font-bold">Trust</span>
                <div className="text-2xl font-display font-bold text-white group-hover:text-neon-cyan transition-colors">{(stats.trust * 100).toFixed(1)}%</div>
                <div className="text-neon-green text-[10px] font-mono mt-1 uppercase">Reliable</div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-panel rounded-xl p-6 border border-white/10 relative overflow-hidden flex flex-col min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 font-display uppercase tracking-wider">
                        <span className="material-symbols-outlined text-neon-cyan">show_chart</span> 
                        Performance Analytics
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={() => setMetricTab('rewards')} className={`text-[10px] font-mono px-2 py-1 rounded transition-all ${metricTab === 'rewards' ? 'bg-neon-cyan text-black' : 'bg-white/5 text-slate-400'}`}>REWARDS</button>
                        <button onClick={() => setMetricTab('trust')} className={`text-[10px] font-mono px-2 py-1 rounded transition-all ${metricTab === 'trust' ? 'bg-neon-pink text-black' : 'bg-white/5 text-slate-400'}`}>TRUST</button>
                    </div>
                </div>
                
                <div className="flex-1 w-full h-[300px]">
                    {performanceChartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceChartData}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={metricTab === 'rewards' ? '#00f3ff' : '#ff00ff'} stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor={metricTab === 'rewards' ? '#00f3ff' : '#ff00ff'} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#ffffff30" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0a0e17', border: '1px solid #ffffff10', borderRadius: '8px' }}
                                    itemStyle={{ color: '#00f3ff' }}
                                />
                                <Area type="monotone" dataKey="val" stroke={metricTab === 'rewards' ? '#00f3ff' : '#ff00ff'} fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-white/5 rounded-lg bg-black/20 h-full">
                            <span className="material-symbols-outlined text-slate-700 text-5xl mb-4">monitoring</span>
                            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Historical data pending synchronization</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="glass-panel rounded-xl p-6 border border-white/10 flex flex-col">
                <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 font-display uppercase tracking-wider">
                    <span className="material-symbols-outlined text-neon-green">bar_chart</span> 
                    Active Benchmarks
                </h3>
                <div className="flex-1 flex flex-col gap-4">
                   {[
                     { label: 'Trust Score', value: `${(stats.trust * 100).toFixed(1)}%`, color: 'bg-neon-cyan', width: `${stats.trust * 100}%` },
                     { label: 'Incentive', value: stats.incentive.toFixed(4), color: 'bg-neon-pink', width: `${Math.min(stats.incentive * 1000, 100)}%` },
                     { label: 'Success Rate', value: '100%', color: 'bg-neon-green', width: '100%' },
                   ].map(item => (
                     <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-text-secondary uppercase">
                           <span>{item.label}</span>
                           <span className="text-white">{item.value}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: item.width }}></div>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="mt-8 p-4 bg-neon-cyan/5 rounded border border-neon-cyan/20">
                   <p className="text-[10px] text-neon-cyan font-mono uppercase leading-relaxed">
                      Benchmarking metrics are updated every epoch.
                      This node is identified as a high-performance validator across all active subnets.
                   </p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatorDetailView;