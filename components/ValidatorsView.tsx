import React, { useState, useMemo } from 'react';
import { Validator } from '../types';

interface ValidatorsViewProps {
  onBack: () => void;
  onSelectValidator: (id: string) => void;
}

const mockValidators: Validator[] = [
  { rank: 1, identity: 'ModernTensor Fdn', address: '5Hh9...2kL', stake: '1,245,320', stakeUsd: '$5.2M', fee: 18, apy: 18.2, yield24h: '420.5', verified: true, avatarColor: 'bg-neon-cyan' },
  { rank: 2, identity: 'TensorStats', address: '7Jk2...9mP', stake: '892,100', stakeUsd: '$3.7M', fee: 18, apy: 19.5, yield24h: '380.2', verified: true, avatarColor: 'bg-neon-pink' },
  { rank: 3, identity: 'Neural Interlink', address: '3Xy8...1qR', stake: '650,450', stakeUsd: '$2.7M', fee: 18, apy: 17.8, yield24h: '210.4', verified: true, avatarColor: 'bg-neon-purple' },
  { rank: 4, identity: 'Sigma Cluster', address: '9Lm4...6vN', stake: '420,000', stakeUsd: '$1.7M', fee: 12, apy: 16.5, yield24h: '180.1', verified: true, avatarColor: 'bg-teal-400' },
  { rank: 5, identity: 'DeepMind (Unofficial)', address: '2Kp1...5jD', stake: '380,200', stakeUsd: '$1.6M', fee: 10, apy: 18.9, yield24h: '165.8', verified: false, avatarColor: 'bg-orange-500' },
  { rank: 6, identity: 'Foundry', address: '8Qx2...9aB', stake: '310,500', stakeUsd: '$1.3M', fee: 18, apy: 18.0, yield24h: '140.2', verified: true, avatarColor: 'bg-blue-500' },
  { rank: 7, identity: 'Rogue Tensor', address: '4Wm9...2zX', stake: '290,100', stakeUsd: '$1.2M', fee: 15, apy: 17.2, yield24h: '125.5', verified: true, avatarColor: 'bg-red-500' },
  { rank: 8, identity: 'Datura', address: '6Yn1...4pL', stake: '150,000', stakeUsd: '$630K', fee: 18, apy: 18.5, yield24h: '65.2', verified: true, avatarColor: 'bg-indigo-500' },
];

const ValidatorsView: React.FC<ValidatorsViewProps> = ({ onBack, onSelectValidator }) => {
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Validator | null, direction: 'asc' | 'desc' }>({ key: 'rank', direction: 'asc' });
  const avgApy = 0.182; // 18.2%

  const calculateReturn = (amount: number, period: 'daily' | 'monthly' | 'yearly') => {
    const yearlyReturn = amount * avgApy;
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
      let sortableItems = [...mockValidators];
      if (sortConfig.key !== null) {
          sortableItems.sort((a, b) => {
              // Handle numeric string conversion for sorting
              let aValue: any = a[sortConfig.key!];
              let bValue: any = b[sortConfig.key!];

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
  }, [sortConfig]);

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
                        <span className="px-3 py-1 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/40 uppercase tracking-widest shadow-[0_0_10px_rgba(74,222,128,0.2)] flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Consensus Active
                        </span>
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
                        <p className="text-white text-3xl font-bold leading-none glow-text">64 <span className="text-sm text-slate-500 font-normal">/ 128</span></p>
                    </div>
                </div>
                <div className="glass-panel p-5 rounded-lg neon-border-pink relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-pink/5 rounded-full blur-3xl group-hover:bg-neon-pink/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Staked</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-3xl font-bold leading-none glow-text-pink">4.2M <span className="text-lg text-neon-pink">M</span></p>
                    </div>
                </div>
                <div className="glass-panel p-5 rounded-lg border-l-2 border-l-neon-purple shadow-[inset_10px_0_20px_-10px_rgba(188,19,254,0.1)] relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-neon-purple/5 rounded-full blur-3xl group-hover:bg-neon-purple/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Median APY</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-3xl font-bold leading-none text-neon-purple drop-shadow-[0_0_5px_rgba(188,19,254,0.5)]">18.2%</p>
                    </div>
                </div>
                <div className="glass-panel p-5 rounded-lg border-l-2 border-l-green-500 shadow-[inset_10px_0_20px_-10px_rgba(34,197,94,0.1)] relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-24 h-24 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Network Trust</p>
                    <div className="flex items-end gap-3 mt-1 z-10">
                        <p className="text-white text-3xl font-bold leading-none text-green-400">99.9%</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Main Table */}
                <div className="xl:col-span-8 flex flex-col gap-6">
                    <div className="glass-panel p-4 rounded-xl flex flex-col sm:flex-row gap-4 justify-between items-center border border-white/5">
                        <div className="relative w-full sm:flex-1 max-w-md group">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-neon-cyan transition-colors">search</span>
                            <input className="w-full bg-[#050b14]/50 text-white border border-white/10 rounded-lg px-4 py-2.5 pl-10 focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan placeholder:text-slate-600 text-sm transition-all outline-none" placeholder="Search validators..." type="text"/>
                        </div>
                        <div className="flex items-center gap-2 bg-[#050b14]/50 p-1 rounded-lg border border-white/5">
                            <button className="px-4 py-1.5 rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_10px_rgba(0,243,255,0.1)] text-xs font-bold uppercase whitespace-nowrap tracking-wider">All</button>
                            <button className="px-4 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase whitespace-nowrap tracking-wider">Verified</button>
                            <button className="px-4 py-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-xs font-bold uppercase whitespace-nowrap tracking-wider">Low Fee</button>
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
                                            <div className="flex items-center justify-end gap-1">Total Stake {getSortIcon('stake')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('fee')}>
                                            <div className="flex items-center justify-end gap-1">Fee {getSortIcon('fee')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-right cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('apy')}>
                                            <div className="flex items-center justify-end gap-1">APY {getSortIcon('apy')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-right font-mono cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('yield24h')}>
                                            <div className="flex items-center justify-end gap-1">24h Yield {getSortIcon('yield24h')}</div>
                                        </th>
                                        <th className="px-6 py-5 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-white/5">
                                    {sortedValidators.map((val) => (
                                        <tr key={val.rank} onClick={() => onSelectValidator(val.address)} className="group hover:bg-neon-cyan/5 transition-colors duration-300 cursor-pointer scan-row">
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
                                                +{val.yield24h} M
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
                        <div className="p-4 border-t border-white/10 flex justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer">
                            <button className="text-xs font-bold text-neon-cyan hover:text-white uppercase tracking-widest flex items-center gap-2 transition-colors">
                                Load More Validators <span className="material-symbols-outlined text-base">expand_more</span>
                            </button>
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
                                *Projections based on 18.2% APY. Network difficulty varies.
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