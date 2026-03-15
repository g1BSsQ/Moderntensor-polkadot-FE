import React, { useMemo } from 'react';
import { useDataBridge } from '../hooks/useDataBridge';

interface SubnetWeightsViewProps {
  onBack: () => void;
  netuid?: number;
}

const SubnetWeightsView: React.FC<SubnetWeightsViewProps> = ({ onBack, netuid = 1 }) => {
  const { data: bridgeData } = useDataBridge();
  
  const currentSubnet = useMemo(() => {
    return bridgeData?.subnets?.find(s => s.netuid === netuid) || bridgeData?.subnets?.[0];
  }, [bridgeData, netuid]);

  const stats = useMemo(() => ({
    block: bridgeData?.network?.block || 0,
    activeAccounts: bridgeData?.network?.active_accounts || 0,
    minerCount: currentSubnet?.miners || '0',
    validatorCount: currentSubnet?.validators || '0',
    totalStake: currentSubnet?.total_stake || 0
  }), [bridgeData, currentSubnet]);

  const subnetValidators = useMemo(() => 
    currentSubnet?.nodes?.filter(n => n.type === 'Validator') || [], 
    [currentSubnet]
  );
  
  const subnetMiners = useMemo(() => 
    currentSubnet?.nodes?.filter(n => n.type === 'Miner') || [], 
    [currentSubnet]
  );

  const validatorsList = useMemo(() => {
    if (!subnetValidators.length) return [];
    return subnetValidators.map(v => ({
      name: `Validator ${v.uid}`,
      color: 'text-neon-cyan',
      uid: v.uid,
      stake: v.stake,
      trust: v.trust
    }));
  }, [subnetValidators]);

  const minerUids = useMemo(() => 
    subnetMiners.map(m => String(m.uid).padStart(3, '0')),
    [subnetMiners]
  );
  
  const getWeight = (valUid: number, minerUid: number) => {
    if (!currentSubnet?.weights) return 0;
    const valWeights = currentSubnet.weights[String(valUid)];
    if (!valWeights) return 0;
    return valWeights[String(minerUid)] || 0;
  };

  const getScoreClass = (weight: number) => {
      if (weight <= 0) return 'score-0';
      if (weight < 1000) return 'score-10';
      if (weight < 2500) return 'score-30';
      if (weight < 5000) return 'score-50';
      if (weight < 7500) return 'score-70';
      if (weight < 9000) return 'score-90';
      return 'score-100';
  };

  return (
    <div className="flex justify-center py-8 px-4 lg:px-8 relative z-10 w-full min-h-screen">
        <div className="w-full max-w-[1600px] flex flex-col gap-6">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
                <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HUB</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SUBNETS</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)] uppercase tracking-tighter">Miner Scoring Matrix</span>
            </div>

            {/* Header */}
            <div className="flex flex-wrap justify-between items-end gap-6 pb-2 border-b border-white/5 relative">
                <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-3xl lg:text-4xl font-black leading-tight tracking-tight uppercase glitch-effect" data-text="Weight Scoring Matrix">Weight Scoring Matrix</h1>
                    <p className="text-slate-400 text-sm font-light">Analysis of Validator consensus and miner distribution on SN{currentSubnet?.netuid || 1}.</p>
                </div>
                <div className="flex gap-3 pb-2">
                    <span className="px-4 py-1 bg-black/50 text-neon-cyan font-mono text-xs border border-neon-cyan/30 flex items-center shadow-[inset_0_0_10px_rgba(0,243,255,0.1)] rounded">
                       BLOCK: #{stats.block.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4 stat-card-glow transition-all">
                    <div className="p-3 bg-neon-blue/10 rounded border border-neon-blue/30 text-neon-blue">
                        <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">Available UIDs</div>
                        <div className="text-white text-2xl font-bold font-display">{stats.minerCount}</div>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4 stat-card-glow transition-all">
                    <div className="p-3 bg-neon-pink/10 rounded border border-neon-pink/30 text-neon-pink">
                        <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">Validator Keys</div>
                        <div className="text-white text-2xl font-bold font-display">{stats.validatorCount}</div>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4 stat-card-glow transition-all">
                    <div className="p-3 bg-neon-purple/10 rounded border border-neon-purple/30 text-neon-purple">
                        <span className="material-symbols-outlined">scale</span>
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">Subnet Stake</div>
                        <div className="text-white text-2xl font-bold font-display">{(stats.totalStake / 1000).toFixed(1)}K</div>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4 stat-card-glow transition-all">
                    <div className="p-3 bg-neon-cyan/10 rounded border border-neon-cyan/30 text-neon-cyan">
                        <span className="material-symbols-outlined">history</span>
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">Meta Synchronicity</div>
                        <div className="text-white text-2xl font-bold font-display">100%</div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-12 flex flex-col gap-6">
                    {/* Matrix */}
                    <div className="glass-panel p-1 rounded-lg border border-white/10 flex flex-col h-[600px] relative">
                        <div className="bg-[#0a1120] flex-1 rounded p-1 flex flex-col overflow-hidden">
                            <div className="flex justify-between items-center px-4 py-3 border-b border-white/5 bg-[#080d1a]">
                                <h3 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                                    <span className="material-symbols-outlined text-neon-cyan text-lg">grid_on</span>
                                    Miner Scoring Matrix
                                </h3>
                                <div className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <span>Weight Scale:</span>
                                        <div className="flex gap-1">
                                            <div className="w-3 h-3 bg-[#2e0249]" title="Zero/Low"></div>
                                            <div className="w-3 h-3 bg-[#8910d4]" title="Medium"></div>
                                            <div className="w-3 h-3 bg-[#00f3ff]" title="High/Max"></div>
                                        </div>
                                    </div>
                                    <div className="hidden sm:flex gap-4">
                                        <span>Y: VALIDATORS</span>
                                        <span>X: MINER UIDS</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 overflow-auto custom-scrollbar bg-[#050b14] relative">
                                <div className="inline-block min-w-full">
                                    <div className="grid grid-cols-[160px_1fr]">
                                        {/* Y-Axis: Validators */}
                                        <div className="sticky left-0 z-20 bg-[#0a1120] border-r border-white/10 shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
                                            <div className="h-10 border-b border-white/10 flex items-center px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-[#0f172a]">
                                                Validators
                                            </div>
                                            <div className="flex flex-col text-xs font-mono text-slate-400">
                                                {subnetValidators.length > 0 ? subnetValidators.map((val, idx) => (
                                                    <div key={idx} className={`h-8 flex items-center px-3 border-b border-white/5 hover:text-white hover:bg-white/5 cursor-pointer truncate text-neon-cyan`}>
                                                        Val {val.uid}
                                                    </div>
                                                )) : (
                                                    <div className="h-8 flex items-center px-3 border-b border-white/5 text-slate-600 italic">No Validators</div>
                                                )}
                                                {/* Fill extra space if list is short */}
                                                {subnetValidators.length < 15 && Array.from({length: 15 - subnetValidators.length}).map((_, i) => (
                                                    <div key={`extra-${i}`} className="h-8 flex items-center px-3 border-b border-white/5 text-slate-800 opacity-20">---</div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Matrix Grid */}
                                        <div className="flex flex-col">
                                            {/* X-Axis Header */}
                                            <div className="sticky top-0 z-10 flex h-10 border-b border-white/10 bg-[#0f172a]">
                                                <div className="flex">
                                                    {subnetMiners.map((miner, idx) => (
                                                        <div key={idx} className={`w-8 flex items-center justify-center text-[10px] font-mono text-slate-500 border-r border-white/5 shrink-0`}>
                                                            {String(miner.uid).padStart(2, '0')}
                                                        </div>
                                                    ))}
                                                    {/* Fill empty header space */}
                                                    {subnetMiners.length < 50 && Array.from({length: 50 - subnetMiners.length}).map((_, i) => (
                                                        <div key={`empty-h-${i}`} className="w-8 shrink-0"></div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Matrix Cells */}
                                            {subnetValidators.map((val, rowIdx) => (
                                                <div key={rowIdx} className="h-8 flex items-center border-b border-white/5 hover:bg-white/5">
                                                    {subnetMiners.map((miner, colIdx) => {
                                                        const weight = getWeight(val.uid, miner.uid);
                                                        return (
                                                            <div key={colIdx} className="w-8 h-full flex items-center justify-center border-r border-white/5">
                                                                <div 
                                                                    className={`matrix-cell ${getScoreClass(weight)}`}
                                                                    title={`Validator ${val.uid} -> Miner ${miner.uid}: ${weight}`}
                                                                ></div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Validator Details Table */}
            <div className="glass-panel rounded-lg overflow-hidden flex flex-col border border-white/10">
                <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-neon-purple">analytics</span> Nodes Benchmark Data
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-[10px] uppercase tracking-widest text-slate-500 font-bold bg-black/40">
                            <tr>
                                <th className="px-6 py-4">Node UID</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4 text-right">Stake</th>
                                <th className="px-6 py-4 text-right">Trust</th>
                                <th className="px-6 py-4 text-right">Incentive</th>
                                <th className="px-6 py-4 text-right">Rank</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm border-t border-white/5">
                            {currentSubnet?.nodes?.slice(0, 10).map((n, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                                    <td className="px-6 py-4 font-mono text-neon-cyan">#{n.uid}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${n.type === 'Validator' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20' : 'bg-neon-pink/10 text-neon-pink border border-neon-pink/20'}`}>
                                            {n.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-300">{n.stake.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-300">{n.trust.toFixed(4)}</td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-300">{n.incentive.toFixed(4)}</td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-300 text-neon-cyan">{n.rank.toFixed(4)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SubnetWeightsView;