import React, { useState, useMemo, useRef } from 'react';

interface SubnetsHubProps {
  onSelect: (subnetId: string) => void;
}

interface SubnetInfo {
  id: string;
  title: string;
  subtitle: string;
  emission: string;
  desc: string;
  miners: string;
  validators: string;
  tempo: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  hoverText: string;
  shadow: string;
  hex: string;
  sparklineType: 'curve' | 'sharp';
}

const initialSubnets: SubnetInfo[] = [
  { 
    id: 'SN1', title: 'Text Gen', subtitle: 'Prompting', emission: '18.5%', 
    desc: 'Decentralized text generation and large language model fine-tuning network.', 
    miners: '1,024', validators: '64', tempo: '360 blk', 
    textColor: 'text-neon-cyan', bgColor: 'bg-neon-cyan/10', borderColor: 'border-neon-cyan/30', 
    hoverText: 'group-hover:text-neon-cyan', shadow: 'shadow-[0_0_10px_rgba(0,243,255,0.2)]', hex: '#00f3ff', sparklineType: 'curve'
  },
  { 
    id: 'SN2', title: 'Image Gen', subtitle: 'Diffusion', emission: '12.2%', 
    desc: 'Distributed stable diffusion inference and model training network.', 
    miners: '850', validators: '42', tempo: '100 blk', 
    textColor: 'text-neon-pink', bgColor: 'bg-neon-pink/10', borderColor: 'border-neon-pink/30', 
    hoverText: 'group-hover:text-neon-pink', shadow: 'shadow-[0_0_10px_rgba(255,0,255,0.2)]', hex: '#ff00ff', sparklineType: 'curve'
  },
  { 
    id: 'SN3', title: 'Fin. Data', subtitle: 'Time Series', emission: '8.7%', 
    desc: 'Predictive financial modeling and real-time market data analysis.', 
    miners: '512', validators: '30', tempo: '360 blk', 
    textColor: 'text-neon-purple', bgColor: 'bg-neon-purple/10', borderColor: 'border-neon-purple/30', 
    hoverText: 'group-hover:text-neon-purple', shadow: 'shadow-[0_0_10px_rgba(188,19,254,0.2)]', hex: '#bc13fe', sparklineType: 'curve'
  },
  { 
    id: 'SN4', title: 'Storage', subtitle: 'Files', emission: '5.1%', 
    desc: 'Distributed file storage with cryptographic proof of retrievability.', 
    miners: '2,400', validators: '128', tempo: '100 blk', 
    textColor: 'text-teal-400', bgColor: 'bg-teal-400/10', borderColor: 'border-teal-400/30', 
    hoverText: 'group-hover:text-teal-400', shadow: 'shadow-[0_0_10px_rgba(45,212,191,0.2)]', hex: '#2dd4bf', sparklineType: 'curve'
  },
  { 
    id: 'SN5', title: 'Scraping', subtitle: 'Data', emission: '4.5%', 
    desc: 'Automated web scraping and data aggregation for AI training datasets.', 
    miners: '450', validators: '25', tempo: '360 blk', 
    textColor: 'text-orange-500', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30', 
    hoverText: 'group-hover:text-orange-500', shadow: 'shadow-[0_0_10px_rgba(249,115,22,0.2)]', hex: '#f97316', sparklineType: 'sharp'
  },
  { 
    id: 'SN6', title: 'Audio Gen', subtitle: 'Sound', emission: '3.8%', 
    desc: 'Text-to-speech and music generation subnet powered by transformers.', 
    miners: '320', validators: '18', tempo: '100 blk', 
    textColor: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30', 
    hoverText: 'group-hover:text-blue-500', shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.2)]', hex: '#3b82f6', sparklineType: 'curve'
  },
  { 
    id: 'SN7', title: 'Translate', subtitle: 'Language', emission: '3.2%', 
    desc: 'High-fidelity multi-language translation and localization services.', 
    miners: '280', validators: '16', tempo: '360 blk', 
    textColor: 'text-indigo-500', bgColor: 'bg-indigo-500/10', borderColor: 'border-indigo-500/30', 
    hoverText: 'group-hover:text-indigo-500', shadow: 'shadow-[0_0_10px_rgba(99,102,241,0.2)]', hex: '#6366f1', sparklineType: 'sharp'
  },
  { 
    id: 'SN8', title: 'Pretraining', subtitle: 'Base', emission: '2.5%', 
    desc: 'Distributed pretraining of foundational models from scratch.', 
    miners: '600', validators: '35', tempo: '100 blk', 
    textColor: 'text-emerald-500', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30', 
    hoverText: 'group-hover:text-emerald-500', shadow: 'shadow-[0_0_10px_rgba(16,185,129,0.2)]', hex: '#10b981', sparklineType: 'curve'
  },
];

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

// New Interactive Card Component with Spotlight Effect
interface SpotlightCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, onClick, className = "", style = {} }) => {
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
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-panel-dark transition-all duration-300 ${className}`}
      style={style}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0, 243, 255, 0.1), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

const SubnetsHub: React.FC<SubnetsHubProps> = ({ onSelect }) => {
  const [subnets, setSubnets] = useState<SubnetInfo[]>(initialSubnets);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
        const nextId = subnets.length + 1;
        const newSubnets: SubnetInfo[] = [
            {
                id: `SN${nextId}`, title: 'Video Gen', subtitle: 'Synthesis', emission: '1.8%',
                desc: 'High-fidelity video generation and temporal consistency validation.',
                miners: '1,200', validators: '12', tempo: '720 blk',
                textColor: 'text-neon-red', bgColor: 'bg-neon-red/10', borderColor: 'border-neon-red/30',
                hoverText: 'group-hover:text-neon-red', shadow: 'shadow-[0_0_10px_rgba(255,0,85,0.2)]', hex: '#ff0055', sparklineType: 'curve'
            },
            {
                id: `SN${nextId+1}`, title: 'Biology', subtitle: 'Folding', emission: '1.5%',
                desc: 'Protein folding simulations and molecular discovery network.',
                miners: '85', validators: '10', tempo: '360 blk',
                textColor: 'text-neon-green', bgColor: 'bg-neon-green/10', borderColor: 'border-neon-green/30',
                hoverText: 'group-hover:text-neon-green', shadow: 'shadow-[0_0_10px_rgba(0,255,163,0.2)]', hex: '#00ffa3', sparklineType: 'sharp'
            },
            {
                id: `SN${nextId+2}`, title: 'Gaming', subtitle: 'Assets', emission: '1.1%',
                desc: 'Procedural 3D asset generation for metaverse applications.',
                miners: '240', validators: '18', tempo: '100 blk',
                textColor: 'text-yellow-400', bgColor: 'bg-yellow-400/10', borderColor: 'border-yellow-400/30',
                hoverText: 'group-hover:text-yellow-400', shadow: 'shadow-[0_0_10px_rgba(250,204,21,0.2)]', hex: '#facc15', sparklineType: 'curve'
            },
            {
                id: `SN${nextId+3}`, title: 'Compute', subtitle: 'Training', emission: '0.9%',
                desc: 'Decentralized compute resource allocation for model training.',
                miners: '1,500', validators: '50', tempo: '100 blk',
                textColor: 'text-slate-300', bgColor: 'bg-slate-500/10', borderColor: 'border-slate-500/30',
                hoverText: 'group-hover:text-white', shadow: 'shadow-[0_0_10px_rgba(148,163,184,0.2)]', hex: '#cbd5e1', sparklineType: 'sharp'
            }
        ];
        setSubnets(prev => [...prev, ...newSubnets]);
        setIsLoading(false);
    }, 2000); // Increased delay to show off the skeleton
  };

  const filteredSubnets = useMemo(() => {
    if (!searchQuery) return subnets;
    return subnets.filter(s => 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [subnets, searchQuery]);

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
                            <h3 className="text-white text-5xl font-black glow-text font-display">{subnets.length}</h3>
                        </div>
                        <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
                            <span className="material-symbols-outlined text-neon-cyan text-3xl">hub</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-slate-400 font-mono">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]"></span>
                        SYSTEM OPTIMAL
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl neon-border-pink relative overflow-hidden group">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-neon-pink/10 rounded-full blur-3xl group-hover:bg-neon-pink/20 transition-colors duration-500"></div>
                    <div className="flex justify-between items-start z-10 relative">
                        <div>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Global Difficulty</p>
                            <h3 className="text-white text-5xl font-black glow-text-pink font-display">142.5 P</h3>
                        </div>
                        <div className="p-3 bg-neon-pink/10 rounded-lg border border-neon-pink/20">
                            <span className="material-symbols-outlined text-neon-pink text-3xl">ssid_chart</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-400 font-mono">
                        <span className="material-symbols-outlined text-base">trending_up</span>
                        +5.2% INCREASE (24H)
                    </div>
                </div>
                <div className="glass-panel p-6 rounded-xl border-t-2 border-t-neon-purple shadow-[inset_0_10px_20px_-10px_rgba(188,19,254,0.1)] relative overflow-hidden group">
                    <div className="absolute -right-12 -top-12 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl group-hover:bg-neon-purple/20 transition-colors duration-500"></div>
                    <div className="flex justify-between items-start z-10 relative">
                        <div>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Total Locked MTN</p>
                            <h3 className="text-white text-5xl font-black font-display" style={{ textShadow: '0 0 10px rgba(188,19,254,0.5)' }}>4.2M <span className="text-2xl text-neon-purple align-top">M</span></h3>
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
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-mono text-green-400">LIVE FEED CONNECTED</span>
                </div>
            </div>

            {filteredSubnets.length === 0 ? (
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
                            onClick={() => onSelect(subnet.id)} 
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
                                    <span className="text-base font-bold text-white">{subnet.validators}</span>
                                </div>
                                <div className="w-[1px] h-8 bg-white/10"></div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tempo</span>
                                    <span className="text-base font-bold text-slate-200">{subnet.tempo}</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                    {isLoading && (
                        <>
                            <SubnetSkeleton />
                            <SubnetSkeleton />
                            <SubnetSkeleton />
                            <SubnetSkeleton />
                        </>
                    )}
                </div>
            )}

            <div className="flex justify-center mt-8">
                <button 
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="px-10 py-4 bg-white/5 hover:bg-neon-cyan/20 text-slate-200 hover:text-neon-cyan border border-white/10 hover:border-neon-cyan/50 rounded-full transition-all duration-300 flex items-center gap-3 font-bold uppercase tracking-widest text-sm group shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,243,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            Loading Data...
                        </>
                    ) : (
                        <>
                            Load More Subnets
                            <span className="material-symbols-outlined text-lg group-hover:translate-y-0.5 transition-transform">expand_more</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
  );
};

export default SubnetsHub;