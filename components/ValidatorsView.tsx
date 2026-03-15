import React, { useState, useMemo } from 'react';
import { Validator } from '../types';
import { useDataBridge } from '../hooks/useDataBridge';

interface ValidatorsViewProps {
  onBack: () => void;
  onSelectValidator: (id: string) => void;
}

const ValidatorsView: React.FC<ValidatorsViewProps> = ({ onBack, onSelectValidator }) => {
  const { data: bridgeData } = useDataBridge();
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const [filter, setFilter] = useState<'All' | 'Verified' | 'LowFee'>('All');
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Validator | null, direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });

  // Calculate real network stats
  const bridgeValidators = useMemo(() => {
    return bridgeData?.validators.map((v, idx) => ({
      rank: idx + 1,
      identity: v.name,
      address: v.address,
      stake: v.stake,
      stakeUsd: v.stakeVal,
      fee: parseInt(v.fee) || 18,
      apy: parseFloat(v.apy) || 0,
      yield24h: v.yield,
      voterPower: v.voter_power,
      verified: true,
      avatarColor: 'bg-neon-cyan'
    })) || [];
  }, [bridgeData]);

  const stats = useMemo(() => {
    const totalStaked = bridgeData?.network?.total_staked || 0;
    const validatorList = bridgeValidators;
    
    // Calculate median APY
    const apys = validatorList.map(v => v.apy).sort((a,b) => a-b);
    const medianApy = apys.length > 0 ? (apys.length % 2 === 0 ? (apys[apys.length/2 - 1] + apys[apys.length/2]) / 2 : apys[Math.floor(apys.length/2)]) : 0;
    
    // Calculate average trust
    const subnets = bridgeData?.subnets || [];
    const allNodes = subnets.flatMap(s => s.nodes);
    const avgTrust = allNodes.length > 0 ? (allNodes.reduce((acc, n) => acc + n.trust, 0) / allNodes.length) * 100 : 99.9;

    return {
      total_staked: totalStaked,
      active_validators: validatorList.length,
      median_apy: medianApy || 18.2,
      avg_trust: avgTrust
    };
  }, [bridgeData, bridgeValidators]);

  const displayValidators = useMemo(() => {
    return bridgeValidators.filter(v => {
        const matchesFilter = filter === 'All' || 
                             (filter === 'Verified' && v.verified) || 
                             (filter === 'LowFee' && v.fee <= 12);
        const matchesSearch = v.identity.toLowerCase().includes(search.toLowerCase()) || 
                             v.address.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });
  }, [bridgeValidators, filter, search]);

  const calculateReturn = (amount: number, period: 'daily' | 'monthly' | 'yearly') => {
    const apyDecimal = stats.median_apy / 100;
    const yearlyReturn = amount * apyDecimal;
    if (period === 'daily') return (yearlyReturn / 365).toFixed(2);
    if (period === 'monthly') return (yearlyReturn / 12).toFixed(2);
    return yearlyReturn.toFixed(2);
  };

  const handleSort = (key: keyof Validator) => {
      let direction: 'asc' | 'desc' = 'desc';
      if (sortConfig.key === key && sortConfig.direction === 'desc') {
          direction = 'asc';
      }
      setSortConfig({ key, direction });
  };

  const sortedValidators = useMemo(() => {
      let sortableItems = [...displayValidators];
      if (sortConfig.key !== null) {
          sortableItems.sort((a, b) => {
              const key = sortConfig.key as keyof Validator;
              let aValue: any = a[key];
              let bValue: any = b[key];

              if (typeof aValue === 'string' && !isNaN(parseFloat(aValue.replace(/,/g, '')))) {
                  aValue = parseFloat(aValue.replace(/,/g, ''));
                  bValue = parseFloat(bValue.replace(/,/g, ''));
              }

              if (aValue < bValue) {
                  return sortConfig.direction === 'asc' ? -1 : 1;
              }
              if (aValue > bValue) {
                  return sortConfig.direction === 'asc' ? 1 : -1;
              }
              return 0;
          });
      }
      return sortableItems;
  }, [sortConfig, displayValidators]);

  const getSortIcon = (key: keyof Validator) => {
      if (sortConfig.key !== key) return <span className="material-symbols-outlined text-[10px] text-slate-600 opacity-50">unfold_more</span>;
      return <span className="material-symbols-outlined text-[10px] text-neon-cyan">{sortConfig.direction === 'asc' ? 'expand_less' : 'expand_more'}</span>;
  };

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full">
        <style>{`
            .scan-row {
                position: relative;
                overflow: hidden;
            }
            .scan-row::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.05), transparent);
                z-index: 1;
                pointer-events: none;
                transition: left 0.5s;
            }
            .scan-row:hover::after {
                animation: scan-once 1s ease-in-out;
            }
            @keyframes scan-once {
                0% { left: -100%; }
                100% { left: 100%; }
            }
        `}</style>
        <div className="w-full max-w-[1600px] flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
                <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">VALIDATORS</span>
            </div>

            {/* Header */}
            <div className="flex flex-wrap justify-between items-end gap-6 pb-6 border-b border-white/5 relative">
                <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-neon-pink to-transparent"></div>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-4">
                        <h1 className="text-white text-4xl lg:text-5xl font-black leading-tight tracking-tight uppercase glitch-effect" data-text="Network Validators">Network Validators</h1>
                    </div>
                    <p className="text-slate-400 text-lg font-light max-w-2xl">
                        Secure the network by delegating your stake to trusted validators.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-panel p-5 rounded-lg neon-border-cyan relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Validators</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-3xl font-bold leading-none glow-text">{stats.active_validators} <span className="text-base text-slate-500 font-normal"> Operators</span></p>
                    </div>
                </div>
                <div className="glass-panel p-5 rounded-lg neon-border-pink relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-pink/5 rounded-full blur-3xl group-hover:bg-neon-pink/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Staked</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-3xl font-bold leading-none glow-text-pink">{stats.total_staked > 1000000 ? (stats.total_staked / 1000000).toFixed(1) + 'M' : stats.total_staked.toLocaleString()} <span className="text-lg text-neon-pink">M</span></p>
                    </div>
                </div>
                <div className="glass-panel p-5 rounded-lg border-l-2 border-l-neon-purple shadow-[inset_10px_0_20px_-10px_rgba(188,19,254,0.1)] relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-purple/5 rounded-full blur-3xl group-hover:bg-neon-purple/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Median APY</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-3xl font-bold leading-none text-neon-purple drop-shadow-[0_0_5px_rgba(188,19,254,0.5)]">{stats.median_apy.toFixed(1)}%</p>
                    </div>
                </div>
                <div className="glass-panel p-5 rounded-lg border-l-2 border-l-green-500 shadow-[inset_10px_0_20px_-10px_rgba(34,197,94,0.1)] relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Network Trust</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-3xl font-bold leading-none text-green-400">{stats.avg_trust.toFixed(1)}%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Main Table */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                    <div className="glass-panel p-4 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center border border-white/5">
                        <div className="relative w-full sm:flex-1 max-w-md group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-neon-cyan transition-colors">search</span>
                            <input 
                                className="w-full bg-[#050b14]/50 text-white border border-white/10 rounded-lg px-4 py-2.5 pl-10 focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan placeholder:text-slate-600 text-sm transition-all outline-none" 
                                placeholder="Search validators..." 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 bg-[#050b14]/50 p-1 rounded-lg border border-white/5">
                            <button 
                                onClick={() => setFilter('All')}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'All' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                All
                            </button>
                            <button 
                                onClick={() => setFilter('Verified')}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'Verified' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                Verified
                            </button>
                            <button 
                                onClick={() => setFilter('LowFee')}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase whitespace-nowrap tracking-wider transition-all ${filter === 'LowFee' ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)]' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                Low Fee
                            </button>
                        </div>
                    </div>

                    <div className="glass-panel rounded-xl overflow-hidden flex flex-col border border-white/5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-slate-400 font-bold">
                                        <th className="px-6 py-5 w-16 text-center text-neon-cyan/70 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('rank')}>
                                            <div className="flex items-center justify-center gap-1">Rank {getSortIcon('rank')}</div>
                                        </th>
                                        <th className="px-6 py-5 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('identity')}>
                                            <div className="flex items-center gap-1">Validator Identity {getSortIcon('identity')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('stake')}>
                                            <div className="flex items-center justify-end gap-1">On-Chain Stake {getSortIcon('stake')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('fee')}>
                                            <div className="flex items-center justify-end gap-1">Fee {getSortIcon('fee')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('apy')}>
                                            <div className="flex items-center justify-end gap-1">Est. Yield % {getSortIcon('apy')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-right font-mono cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('yield24h')}>
                                            <div className="flex items-center justify-end gap-1">Pending Rewards {getSortIcon('yield24h')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('voterPower')}>
                                            <div className="flex items-center justify-end gap-1">Voter Power {getSortIcon('voterPower')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-white/5">
                                    {sortedValidators.map((val) => (
                                        <tr key={val.address} onClick={() => onSelectValidator(val.address)} className="group hover:bg-neon-cyan/5 transition-colors duration-300 cursor-pointer scan-row">
                                            <td className="px-6 py-5 text-center text-slate-500 group-hover:text-neon-cyan font-mono font-bold">{val.rank}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-lg ${val.avatarColor} p-[1px] shadow-[0_0_10px_rgba(0,0,0,0.3)]`}>
                                                        <div className="w-full h-full bg-slate-900 rounded-[7px] flex items-center justify-center font-bold text-white text-xs">
                                                            {val.identity.substring(0,2).toUpperCase()}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-white group-hover:text-neon-cyan transition-colors">{val.identity}</span>
                                                            {val.verified && <span className="material-symbols-outlined text-[14px] text-neon-cyan" title="Verified">verified</span>}
                                                        </div>
                                                        <span className="font-mono text-xs text-slate-500">{val.address}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="font-bold text-white tracking-wide">{val.stake} <span className="text-xs text-slate-500">M</span></div>
                                                <div className="text-xs text-slate-500">{val.stakeUsd}</div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <span className="bg-white/5 px-2 py-1 rounded text-xs text-slate-300 font-mono">{val.fee}%</span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <span className="text-neon-green font-bold font-mono">{val.apy}%</span>
                                            </td>
                                            <td className="px-6 py-5 text-right font-mono text-slate-300">
                                                {parseFloat(val.yield24h.replace(/,/g, '')) > 0 ? '+' : ''}{val.yield24h} M
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-neon-pink font-bold font-mono">{val.voterPower}</span>
                                                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Quadratic Power</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <button className="px-4 py-1.5 rounded-md border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,243,255,0.1)] hover:shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                                                    Delegate
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="xl:col-span-4 flex flex-col gap-6">
                    {/* Holographic Staking Calculator */}
                    <div className="glass-panel p-6 rounded-xl border-t border-l border-neon-pink/50 relative overflow-hidden shadow-[0_0_30px_rgba(255,0,255,0.1)]">
                        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
                            <span className="material-symbols-outlined text-8xl text-neon-pink animate-pulse-slow">calculate</span>
                        </div>
                        {/* Decorative HUD Elements */}
                        <div className="absolute top-2 left-2 w-2 h-2 bg-neon-pink"></div>
                        <div className="absolute bottom-2 right-2 w-2 h-2 bg-neon-pink"></div>
                        <div className="absolute top-2 right-2 w-8 h-[1px] bg-neon-pink/50"></div>
                        <div className="absolute bottom-2 left-2 w-8 h-[1px] bg-neon-pink/50"></div>

                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2 relative z-10 font-display uppercase tracking-wider">
                            <span className="material-symbols-outlined text-neon-pink">payments</span>
                            Yield Simulator
                        </h3>
                        
                        <div className="flex flex-col gap-6 relative z-10">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs text-slate-400 uppercase font-bold tracking-wider">Stake Amount (M)</label>
                                <div className="relative group">
                                    <input 
                                        type="number" 
                                        value={stakeAmount}
                                        onChange={(e) => setStakeAmount(Number(e.target.value))}
                                        className="w-full bg-[#050b14] border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:border-neon-pink focus:ring-1 focus:ring-neon-pink outline-none transition-all shadow-inner"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neon-pink text-xs font-bold group-focus-within:animate-pulse">MTN</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="100" 
                                    max="50000" 
                                    step="100"
                                    value={stakeAmount}
                                    onChange={(e) => setStakeAmount(Number(e.target.value))}
                                    className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-neon-pink mt-2"
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex justify-between items-center relative overflow-hidden">
                                    <div className="absolute left-0 top-0 h-full w-1 bg-neon-pink"></div>
                                    <span className="text-xs text-slate-400 uppercase tracking-wide">Daily Return</span>
                                    <span className="text-neon-pink font-mono font-bold text-lg">{calculateReturn(stakeAmount, 'daily')} M</span>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex justify-between items-center relative overflow-hidden">
                                    <div className="absolute left-0 top-0 h-full w-1 bg-neon-purple"></div>
                                    <span className="text-xs text-slate-400 uppercase tracking-wide">Monthly Return</span>
                                    <span className="text-neon-purple font-mono font-bold text-lg">{calculateReturn(stakeAmount, 'monthly')} M</span>
                                </div>
                                <div className="bg-white/5 rounded-lg p-3 border border-white/5 flex justify-between items-center relative overflow-hidden">
                                    <div className="absolute left-0 top-0 h-full w-1 bg-neon-green"></div>
                                    <span className="text-xs text-slate-400 uppercase tracking-wide">Yearly Return</span>
                                    <span className="text-neon-green font-mono font-bold text-lg">{calculateReturn(stakeAmount, 'yearly')} M</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10 text-[10px] text-slate-500 text-center font-mono">
                                *Projections based on {stats.median_apy.toFixed(1)}% APY. Network difficulty varies.
                            </div>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="glass-panel p-6 rounded-xl border border-white/5 bg-gradient-to-br from-[#050b14] to-[#0f172a]">
                        <h4 className="text-white font-bold mb-4 font-display uppercase tracking-wider text-sm">For Validators</h4>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group border border-transparent hover:border-white/10">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-neon-cyan transition-colors">description</span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-200 group-hover:text-white">Documentation</span>
                                    <span className="text-xs text-slate-500">Setup guides & requirements</span>
                                </div>
                            </a>
                            <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group border border-transparent hover:border-white/10">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-neon-purple transition-colors">code</span>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-200 group-hover:text-white">GitHub</span>
                                    <span className="text-xs text-slate-500">Node codebase & updates</span>
                                </div>
                            </a>
                        </div>
                        <button className="w-full mt-6 py-3 bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple border border-neon-purple/50 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(188,19,254,0.3)]">
                            Become a Validator
                            <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ValidatorsView;