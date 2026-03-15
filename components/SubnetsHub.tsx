import React, { useState, useMemo } from 'react';
import SpotlightCard from './ui/SpotlightCard';
import { useDataBridge } from '../hooks/useDataBridge';

interface SubnetsHubProps {
  onSelect: (subnetId: string, netuid: number) => void;
}

interface SubnetInfo {
  id: string;
  netuid: number;
  title: string;
  subtitle: string;
  emission: string;
  desc: string;
  miners: string;
  validators: string;
  unique_validators: string;
  tempo: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  hoverText: string;
  shadow: string;
  hex: string;
  sparklineType: 'curve' | 'sharp';
}

// Skeleton Card Component
const SubnetSkeleton = () => (
    <div className="glass-panel rounded-xl p-6 flex flex-col gap-5 border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] -skew-x-12"></div>
        <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-white/10"></div>
                <div className="flex flex-col gap-2">
                    <div className="h-5 w-32 bg-white/10 rounded"></div>
                    <div className="h-3 w-20 bg-white/10 rounded"></div>
                </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="h-4 w-12 bg-white/10 rounded"></div>
                <div className="h-3 w-16 bg-white/10 rounded"></div>
            </div>
        </div>
        <div className="h-14 w-full bg-white/5 rounded mt-1"></div>
        <div className="flex flex-col gap-2">
            <div className="h-3 w-full bg-white/10 rounded"></div>
            <div className="h-3 w-3/4 bg-white/10 rounded"></div>
        </div>
        <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
            <div className="flex flex-col gap-1">
                <div className="h-2 w-10 bg-white/10 rounded"></div>
                <div className="h-4 w-8 bg-white/10 rounded"></div>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="flex flex-col gap-1">
                <div className="h-2 w-10 bg-white/10 rounded"></div>
                <div className="h-4 w-8 bg-white/10 rounded"></div>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="flex flex-col items-end gap-1">
                <div className="h-2 w-10 bg-white/10 rounded"></div>
                <div className="h-4 w-12 bg-white/10 rounded"></div>
            </div>
        </div>
    </div>
);

const SubnetsHub: React.FC<SubnetsHubProps> = ({ onSelect }) => {
  const { data, loading: isBridgeLoading, error: bridgeError } = useDataBridge();
  const [searchQuery, setSearchQuery] = useState('');

  // Map bridge subnets to SubnetInfo format
  const filteredSubnets = useMemo(() => {
    if (!data?.subnets) return [];
    
    const bridgeSubnets: SubnetInfo[] = data.subnets.map(s => ({
      id: s.id,
      netuid: s.netuid,
      title: s.title,
      subtitle: s.subtitle,
      emission: s.emission,
      desc: s.desc,
      miners: s.miners,
      validators: s.validators,
      unique_validators: s.unique_validators || '0',
      tempo: s.tempo,
      textColor: 'text-neon-cyan', 
      bgColor: 'bg-neon-cyan/10',
      borderColor: 'border-neon-cyan/30',
      hoverText: 'group-hover:text-neon-cyan',
      shadow: 'shadow-[0_0_10px_rgba(0,243,255,0.2)]',
      hex: '#00f3ff',
      sparklineType: 'curve'
    }));

    if (!searchQuery) return bridgeSubnets;
    
    return bridgeSubnets.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const stats = {
    activeSubnets: data?.subnets?.length || 0,
    totalStaked: data?.network?.total_staked ? `${(data.network.total_staked / 1000000).toFixed(1)}M` : '0.0M',
    marketCap: data?.network?.market_cap ? `$${(data.network.market_cap / 1000000000).toFixed(1)}B` : '0.0 P',
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center py-10 px-4 lg:px-12">
        {/* Background Effects for this view */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="neural-flow-line from-neon-cyan/0 via-neon-cyan/20 to-neon-cyan/0 h-[1px] w-full top-1/4 animate-pulse duration-[3s]"></div>
            <div className="neural-flow-line from-neon-pink/0 via-neon-pink/20 to-neon-pink/0 h-[1px] w-full top-3/4 animate-pulse duration-[4s] delay-1000"></div>
            <div className="absolute top-0 left-1/3 w-1/3 h-1/2 bg-neon-blue/5 rounded-full blur-[150px]"></div>
            <div className="absolute bottom-0 right-1/4 w-1/4 h-1/3 bg-neon-purple/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="w-full max-w-[1400px] flex flex-col gap-10 relative z-10">
            <div className="flex flex-col items-center text-center gap-2 mb-4">
                <h1 className="text-white text-5xl lg:text-7xl font-black leading-tight tracking-tight uppercase glitch-effect glow-text font-display" data-text="Subnets Hub">Subnets Hub</h1>
                <p className="text-slate-300 text-xl font-normal tracking-wide max-w-3xl">
                    Explore active neural networks. Monitor emissions, mining difficulty, and participation across the ModernTensor ecosystem.
                </p>
                <div className="mt-6 w-full max-w-lg relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-cyan transition-colors">search</span>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Subnets by Name, ID or Tag..." 
                        className="w-full bg-black/40 border border-white/10 rounded-full px-12 py-3 text-white focus:outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30 transition-all placeholder:text-slate-500 text-sm font-mono backdrop-blur-md shadow-lg"
                    />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-6 rounded-xl neon-border-cyan relative overflow-hidden group">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-neon-cyan/10 rounded-full blur-3xl group-hover:bg-neon-cyan/20 transition-colors duration-500"></div>
                    <div className="flex justify-between items-start z-10 relative">
                        <div>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Active Subnets</p>
                            <h3 className="text-white text-5xl font-black glow-text font-display">{stats.activeSubnets}</h3>
                        </div>
                        <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
                            <span className="material-symbols-outlined text-neon-cyan text-3xl">hub</span>
                        </div>
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl neon-border-pink relative overflow-hidden group">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-neon-pink/10 rounded-full blur-3xl group-hover:bg-neon-pink/20 transition-colors duration-500"></div>
                    <div className="flex justify-between items-start z-10 relative">
                        <div>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Global Difficulty</p>
                            <h3 className="text-white text-5xl font-black glow-text-pink font-display">{stats.marketCap}</h3>
                        </div>
                        <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/20">
                            <span className="material-symbols-outlined text-neon-pink text-3xl">ssid_chart</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-400 font-mono">
                        <span className="material-symbols-outlined text-base">trending_up</span>
                        +5.2%
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl border-t-2 border-t-neon-purple shadow-[inset_0_10px_20px_-10px_rgba(188,19,254,0.1)] relative overflow-hidden group">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl group-hover:bg-neon-purple/20 transition-colors duration-500"></div>
                    <div className="flex justify-between items-start z-10 relative">
                        <div>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Locked MTN</p>
                            <h3 className="text-white text-5xl font-black font-display" style={{ textShadow: '0 0 10px rgba(188,19,254,0.5)' }}>{stats.totalStaked} <span className="text-2xl text-neon-purple align-top">M</span></h3>
                        </div>
                        <div className="p-3 bg-neon-purple/10 rounded-lg border border-neon-purple/20">
                            <span className="material-symbols-outlined text-neon-purple text-3xl">lock</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-400 font-mono">
                        <span className="text-white font-bold">82%</span> OF TOTAL SUPPLY
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 py-2 border-b border-white/5">
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                    <span className="text-white">Sort By:</span>
                    <button className="text-neon-cyan hover:text-white px-3 py-1.5 bg-neon-cyan/10 rounded border border-neon-cyan/30 transition-colors">Emission</button>
                    <button className="hover:text-neon-cyan px-3 py-1.5 transition-colors">Registration</button>
                    <button className="hover:text-neon-cyan px-3 py-1.5 transition-colors">Name</button>
                </div>
            </div>

            {isBridgeLoading && filteredSubnets.length === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <SubnetSkeleton />
                    <SubnetSkeleton />
                    <SubnetSkeleton />
                    <SubnetSkeleton />
                </div>
            ) : filteredSubnets.length === 0 ? (
                <div className="glass-panel p-12 text-center rounded-xl border border-white/5 flex flex-col items-center gap-4">
                    <span className="material-symbols-outlined text-6xl text-slate-600">search_off</span>
                    <h3 className="text-xl font-bold text-white">No Subnets Found</h3>
                    <p className="text-slate-400">Try searching for a different keyword or ID.</p>
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-2 px-6 py-2 bg-neon-cyan/10 text-neon-cyan rounded border border-neon-cyan/30 hover:bg-neon-cyan/20 transition-all font-bold uppercase text-xs tracking-wider"
                    >
                        Clear Search
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredSubnets.map((subnet, index) => (
                        <SpotlightCard 
                            key={subnet.id} 
                            onClick={() => onSelect(subnet.id, subnet.netuid)} 
                            className="p-6 flex flex-col gap-5 group cursor-pointer animate-in fade-in zoom-in duration-500"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${subnet.bgColor} border ${subnet.borderColor} ${subnet.textColor} font-mono font-bold text-base ${subnet.shadow}`}>
                                        {subnet.id}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className={`text-white font-bold text-xl leading-tight ${subnet.hoverText} transition-colors`}>{subnet.title}</h3>
                                        <span className="text-sm text-slate-400 uppercase tracking-widest font-bold">{subnet.subtitle}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className={`text-sm font-mono ${subnet.textColor} drop-shadow-[0_0_5px_currentColor]`}>{subnet.emission}</span>
                                    <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Emission</span>
                                </div>
                            </div>
                            <div className="h-14 w-full mt-1 relative">
                                <div className={`absolute inset-0 bg-gradient-to-t from-${subnet.hex === '#00f3ff' ? 'neon-cyan' : 'white'}/5 to-transparent`}></div>
                                <svg className="w-full h-full overflow-visible sparkline-glow" preserveAspectRatio="none" viewBox="0 0 100 30" style={{ filter: `drop-shadow(0 0 3px ${subnet.hex})` }}>
                                    {subnet.sparklineType === 'curve' ? (
                                        <path d="M0 25 C 10 20, 20 28, 30 15 S 50 5, 60 12 S 80 20, 100 8" fill="none" stroke={subnet.hex} strokeLinecap="round" strokeWidth="2"></path>
                                    ) : (
                                        <path d="M0 15 L 20 15 L 30 5 L 40 25 L 60 15 L 80 15 L 100 15" fill="none" stroke={subnet.hex} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                    )}
                                </svg>
                            </div>
                            <p className="text-base text-slate-300 leading-relaxed line-clamp-2 h-12 font-normal">
                                {subnet.desc}
                            </p>
                            <div className="flex items-center justify-between pt-5 border-t border-white/5 mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Miners</span>
                                    <span className="text-base font-bold text-white">{subnet.miners}</span>
                                </div>
                                <div className="w-[1px] h-8 bg-white/10"></div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Validators</span>
                                    <span className="text-base font-bold text-white whitespace-nowrap">{subnet.unique_validators} <span className="text-[10px] text-slate-500 font-normal">({subnet.validators} Nodes)</span></span>
                                </div>
                                <div className="w-[1px] h-8 bg-white/10"></div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Epoch Tempo</span>
                                    <span className="text-base font-bold text-slate-200">{subnet.tempo}</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default SubnetsHub;