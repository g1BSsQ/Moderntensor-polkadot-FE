import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface SubnetDistributionViewProps {
  onBack: () => void;
}

interface Stakeholder {
  rank: number;
  name: string;
  address: string;
  avatarUrl?: string;
  avatarFallback: string;
  stake: string;
  share: string;
  shareColor: string;
  change: string;
  changeDir: 'up' | 'down' | 'neutral';
  reward: string;
  rankColor: string;
}

const initialStakeholders: Stakeholder[] = [
  { 
    rank: 1, name: 'ModernTensor Foundation', address: '5Hh9...2kL', 
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAc0VkbuVAj1TklE56lBP-mFnjJI3O2asvF4uMqCmreqc9yxUF5GVBAlWh6y3ckJ1TMrmdMzqnZXIZBR2wt7fbNcuTHHxBtZHWNpSN0TcceKgUxOKPZxaaOPJ8ekUL-6enYePpWBJh3j7O65BpvVHjUYoTvGZ5K4nxkBfkLkXXIu7C4_oVocE04lVK-hpDQGZnTHq6lk7mhrxJOZPEHAWA9snSxjsBvAGQ3sIfPOyXZKEmIyccUJUkHncOjKyjVvCovLo2p5rlfMg', 
    avatarFallback: 'MF',
    stake: '1,450,230.00', share: '45.2%', shareColor: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10',
    change: '2.4%', changeDir: 'up', reward: '3,405 M', rankColor: 'text-neon-cyan'
  },
  { 
    rank: 2, name: 'TensorStats Validator', address: '7Jk2...9mP', 
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDK_uN5hYuQZRuYLSpyy-F57p5gaWF5SIdCDq3Hcr7xKtD1ZREnshtPVPVQNdvJjck_ODN-ZJYcVV21YKcSQ_sXy_0dHS4idHRG7SEtY7zMZY5N_RTdUD1RdM6smxyUWpgNByUDMMZX1buLQeCABC7Bn8ifkavN-IAE5cVrWXVhPTR5Wywbr2aj_n6YCqb8cvwQv4gPCJNoo8aT8_Echi6DKbwaIMMZsxQ_H8jxgM95T2TDYiC7ZG_G4HUeelOA9jJ1yIYpC3tgKg', 
    avatarFallback: 'TS',
    stake: '892,450.45', share: '27.8%', shareColor: 'text-neon-pink border-neon-pink/30 bg-neon-pink/10',
    change: '1.1%', changeDir: 'up', reward: '1,890 M', rankColor: 'text-neon-pink'
  },
  { 
    rank: 3, name: 'Neural Interlink', address: '3Xy8...1qR', 
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp1MPMoT2UNuugWIeP__aSjYtYkXVGvHqamw09VYRht83LxZ9rr3bqNtOxlRmL8moh8dWqqS3lfIT2HJlUcCCXX4yudRveVv55lM41-nW2H-LorpNJ-rP7Co1XAfa1K6McAedpGSSoQy3bIdwrtpzvJfuG-GUN7z1BPSMi01-zVJcspDsEDhNVSjb29C4UxzGo_I9gFtbQe6JmdzFIQw2qVlnrrYYKQ1E4ljpfI0cU-YiZpV24_7sETBTRBjjkbhdZ5gAbLeGFLw', 
    avatarFallback: 'NI',
    stake: '450,120.12', share: '14.0%', shareColor: 'text-neon-purple border-neon-purple/30 bg-neon-purple/10',
    change: '0.0%', changeDir: 'neutral', reward: '950 M', rankColor: 'text-neon-purple'
  },
  { 
    rank: 4, name: 'Sigma Cluster', address: '9Lm4...6vN', 
    avatarFallback: 'SC',
    stake: '125,000.80', share: '3.9%', shareColor: 'text-slate-400 border-white/10 bg-slate-800',
    change: '0.5%', changeDir: 'down', reward: '240 M', rankColor: 'text-slate-500'
  },
  { 
    rank: 5, name: 'DeepMind (Unofficial)', address: '2Kp1...5jD', 
    avatarFallback: 'DM',
    stake: '98,150.25', share: '3.1%', shareColor: 'text-slate-400 border-white/10 bg-slate-800',
    change: '5.2%', changeDir: 'up', reward: '185 M', rankColor: 'text-slate-500'
  },
];

const distributionChartData = [
  { name: 'Foundation', value: 45, color: '#00f3ff' },
  { name: 'Validators', value: 30, color: '#ff00ff' },
  { name: 'Miners', value: 15, color: '#bc13fe' },
  { name: 'Delegators', value: 10, color: '#135bec' },
];

const SubnetDistributionView: React.FC<SubnetDistributionViewProps> = ({ onBack }) => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(initialStakeholders);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
        const nextRank = stakeholders.length + 1;
        const newStakeholders: Stakeholder[] = [
            { 
              rank: nextRank, name: 'Foundry', address: '8Qx2...9aB', 
              avatarFallback: 'FD',
              stake: '75,000.00', share: '2.4%', shareColor: 'text-slate-400 border-white/10 bg-slate-800',
              change: '0.8%', changeDir: 'up', reward: '140 M', rankColor: 'text-slate-600'
            },
            { 
              rank: nextRank + 1, name: 'Rogue Tensor', address: '4Wm9...2zX', 
              avatarFallback: 'RT',
              stake: '60,000.00', share: '1.9%', shareColor: 'text-slate-400 border-white/10 bg-slate-800',
              change: '1.2%', changeDir: 'up', reward: '110 M', rankColor: 'text-slate-600'
            },
            { 
              rank: nextRank + 2, name: 'Datura', address: '6Yn1...4pL', 
              avatarFallback: 'DA',
              stake: '45,000.00', share: '1.4%', shareColor: 'text-slate-400 border-white/10 bg-slate-800',
              change: '0.2%', changeDir: 'down', reward: '85 M', rankColor: 'text-slate-600'
            },
            { 
              rank: nextRank + 3, name: 'Calculus', address: '1Za3...7kM', 
              avatarFallback: 'CL',
              stake: '32,500.50', share: '1.0%', shareColor: 'text-slate-400 border-white/10 bg-slate-800',
              change: '0.0%', changeDir: 'neutral', reward: '62 M', rankColor: 'text-slate-600'
            }
        ];
        setStakeholders(prev => [...prev, ...newStakeholders]);
        setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen">
        <div className="w-full max-w-[1400px] flex flex-col gap-10">
            <div className="flex flex-col gap-8">
                <div className="flex flex-wrap gap-2 items-center text-base font-mono tracking-wide text-slate-300">
                    <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SUBNETS</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                    <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">SN1: DISTRIBUTION</span>
                </div>
                <div className="flex flex-wrap justify-between items-end gap-6 pb-6 border-b border-white/5 relative">
                    <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-neon-pink to-transparent"></div>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-white text-5xl lg:text-6xl font-black leading-tight tracking-tight uppercase glitch-effect" data-text="Subnet 1 Distribution">Subnet 1 Distribution</h1>
                        <p className="text-slate-300 text-xl font-normal max-w-3xl">
                            Real-time analysis of stake concentration and emission weights.
                            <span className="mx-3 text-white/20">|</span>
                            <span className="font-mono text-base text-neon-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">NETWORK: MAIN</span>
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 flex flex-col gap-6">
                    <div className="glass-panel p-8 rounded-xl border border-neon-cyan/30 shadow-[0_0_15px_-5px_rgba(0,243,255,0.3)] relative overflow-hidden h-full">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-9xl text-neon-cyan">pie_chart</span>
                        </div>
                        <h3 className="text-white font-bold text-xl uppercase tracking-wider mb-8 flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-neon-cyan shadow-[0_0_8px_#00f3ff]"></span>
                            Stake Distribution
                        </h3>
                        <div className="flex flex-col items-center justify-center gap-10">
                            <div className="relative w-72 h-72 group">
                                {/* Rotating HUD Rings */}
                                <div className="absolute inset-[-20px] border border-dashed border-neon-cyan/30 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none"></div>
                                <div className="absolute inset-[-40px] border border-dotted border-neon-cyan/10 rounded-full animate-[spin_15s_linear_infinite_reverse] pointer-events-none"></div>
                                
                                <div className="absolute inset-0 bg-neon-cyan/5 rounded-full blur-2xl group-hover:bg-neon-cyan/10 transition-colors pointer-events-none"></div>
                                
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={distributionChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={80}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {distributionChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" className="hover:opacity-80 transition-opacity cursor-pointer" />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0a0e17', border: '1px solid #1f293a', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                                            itemStyle={{ color: '#fff', fontWeight: 'bold', fontFamily: 'monospace' }}
                                            formatter={(value: number) => [`${value}%`, 'Share']}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-4xl font-bold text-white glow-text">3.2M</span>
                                    <span className="text-xs text-slate-300 uppercase tracking-widest font-mono mt-1">Total Stake</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full">
                                {distributionChartData.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                        <div className="w-4 h-4 rounded-sm shadow-[0_0_8px_currentColor]" style={{ backgroundColor: item.color, color: item.color }}></div>
                                        <div className="flex flex-col">
                                            <span className="text-sm text-slate-300 uppercase">{item.name}</span>
                                            <span className="text-base font-bold text-white">{item.value}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="glass-panel p-8 rounded-xl border border-neon-pink/30 shadow-[0_0_15px_-5px_rgba(255,0,255,0.3)] relative overflow-hidden h-full flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <span className="material-symbols-outlined text-9xl text-neon-pink">account_tree</span>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
                                <span className="w-1.5 h-8 bg-neon-pink shadow-[0_0_8px_#ff00ff]"></span>
                                Emissions Distribution
                            </h3>
                            <div className="flex gap-2">
                                <span className="px-3 py-1.5 text-xs font-bold uppercase bg-white/5 border border-white/10 rounded text-slate-400">TreeMap</span>
                                <span className="px-3 py-1.5 text-xs font-bold uppercase hover:bg-white/5 border border-transparent hover:border-white/10 rounded text-slate-600 cursor-pointer transition-colors">HeatMap</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 grid-rows-4 gap-4 flex-grow min-h-[350px]">
                            <div className="col-span-2 row-span-2 bg-gradient-to-br from-neon-pink/20 to-neon-pink/5 border border-neon-pink/30 rounded-lg p-5 relative group overflow-hidden cursor-pointer hover:border-neon-pink/60 transition-all">
                                <div className="absolute inset-0 bg-neon-pink/0 group-hover:bg-neon-pink/10 transition-colors"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <span className="font-bold text-white tracking-wide text-base">Top Miner A</span>
                                        <span className="material-symbols-outlined text-neon-pink text-lg">trending_up</span>
                                    </div>
                                    <div>
                                        <span className="text-3xl font-bold text-neon-pink drop-shadow-[0_0_5px_#ff00ff]">12.4%</span>
                                        <span className="block text-sm text-slate-300 font-mono mt-1">1,240 M / day</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2 row-span-1 bg-gradient-to-br from-neon-purple/20 to-neon-purple/5 border border-neon-purple/30 rounded-lg p-5 relative group overflow-hidden cursor-pointer hover:border-neon-purple/60 transition-all">
                                <div className="absolute inset-0 bg-neon-purple/0 group-hover:bg-neon-purple/10 transition-colors"></div>
                                <div className="relative z-10 h-full flex flex-col justify-center">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-white text-base">Neural Net B</span>
                                        <span className="text-xl font-bold text-neon-purple">8.1%</span>
                                    </div>
                                    <span className="block text-sm text-slate-300 font-mono">810 M / day</span>
                                </div>
                            </div>
                            <div className="col-span-1 row-span-2 bg-gradient-to-br from-neon-cyan/20 to-neon-cyan/5 border border-neon-cyan/30 rounded-lg p-4 relative group overflow-hidden cursor-pointer hover:border-neon-cyan/60 transition-all">
                                <div className="absolute inset-0 bg-neon-cyan/0 group-hover:bg-neon-cyan/10 transition-colors"></div>
                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <span className="font-bold text-white text-sm truncate">Tensor C</span>
                                    <div>
                                        <span className="text-xl font-bold text-neon-cyan">6.5%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1 row-span-1 bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 border border-neon-blue/30 rounded-lg p-4 relative group overflow-hidden cursor-pointer hover:border-neon-blue/60 transition-all">
                                <div className="relative z-10 flex justify-between items-center h-full">
                                    <span className="font-bold text-white text-sm">Node D</span>
                                    <span className="text-sm font-bold text-neon-blue">4.2%</span>
                                </div>
                            </div>
                            <div className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors flex flex-col justify-center">
                                <span className="text-xs text-slate-300">Miner E</span>
                                <span className="text-sm font-bold text-slate-200">3.8%</span>
                            </div>
                            <div className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors flex flex-col justify-center">
                                <span className="text-xs text-slate-300">Miner F</span>
                                <span className="text-sm font-bold text-slate-200">3.1%</span>
                            </div>
                            <div className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors flex flex-col justify-center">
                                <span className="text-xs text-slate-300">Miner G</span>
                                <span className="text-sm font-bold text-slate-200">2.9%</span>
                            </div>
                            <div className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors flex flex-col justify-center">
                                <span className="text-xs text-slate-300">Miner H</span>
                                <span className="text-sm font-bold text-slate-200">2.4%</span>
                            </div>
                            <div className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors flex flex-col justify-center">
                                <span className="text-xs text-slate-300">Miner I</span>
                                <span className="text-sm font-bold text-slate-200">1.8%</span>
                            </div>
                            <div className="col-span-1 row-span-1 bg-white/5 border border-white/10 rounded-lg p-3 hover:bg-white/10 transition-colors flex flex-col justify-center">
                                <span className="text-xs text-slate-300">Other</span>
                                <span className="text-sm font-bold text-slate-200">~15%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col gap-6">
                <div className="glass-panel p-4 rounded-lg flex flex-col sm:flex-row gap-4 justify-between items-center border border-white/5">
                    <div className="relative w-full sm:w-auto sm:flex-1 max-w-md group">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-neon-cyan transition-colors text-xl">search</span>
                        <input className="w-full bg-[#050b14]/50 text-white border border-white/10 rounded px-4 pl-10 py-3 focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan placeholder:text-slate-500 text-base transition-all outline-none" placeholder="Search stakeholders..." type="text"/>
                    </div>
                    <div className="flex items-center gap-2 bg-[#050b14]/50 p-2 rounded w-full sm:w-auto overflow-x-auto border border-white/5">
                        <button className="px-6 py-2 rounded bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.2)] text-sm font-bold uppercase whitespace-nowrap tracking-wider">All</button>
                        <button className="px-6 py-2 rounded text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold uppercase whitespace-nowrap tracking-wider">Whales</button>
                        <button className="px-6 py-2 rounded text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-bold uppercase whitespace-nowrap tracking-wider">Delegators</button>
                    </div>
                </div>
                <div className="glass-panel rounded-lg overflow-hidden flex flex-col border border-white/5">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-sm uppercase tracking-widest text-slate-400 font-bold">
                                    <th className="px-6 py-6 w-20 text-center">Rank</th>
                                    <th className="px-6 py-6">Identity</th>
                                    <th className="px-6 py-6 text-right">Total Stake (M)</th>
                                    <th className="px-6 py-6 text-right">% Share</th>
                                    <th className="px-6 py-6 text-center">24h Change</th>
                                    <th className="px-6 py-6 text-right">Daily Reward</th>
                                </tr>
                            </thead>
                            <tbody className="text-base divide-y divide-white/5">
                                {stakeholders.map((holder) => (
                                    <tr key={holder.rank} className={`group hover:bg-${holder.rankColor.replace('text-', '')}/5 transition-colors duration-300`}>
                                        <td className={`px-6 py-6 text-center ${holder.rankColor} font-bold font-mono text-xl`}>{String(holder.rank).padStart(2, '0')}</td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                {holder.avatarUrl ? (
                                                    <div className={`w-10 h-10 rounded-full bg-cover bg-center border ${holder.rankColor.replace('text', 'border')}/50 shadow-[0_0_5px_rgba(0,0,0,0.5)]`} style={{ backgroundImage: `url("${holder.avatarUrl}")` }}></div>
                                                ) : (
                                                    <div className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 border border-white/10`}>{holder.avatarFallback}</div>
                                                )}
                                                <div className="flex flex-col">
                                                    <span className={`font-bold text-white text-lg group-hover:${holder.rankColor} transition-colors`}>{holder.name}</span>
                                                    <span className="font-mono text-sm text-slate-500">{holder.address}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-right font-bold text-white tracking-wide text-lg">{holder.stake}</td>
                                        <td className="px-6 py-6 text-right">
                                            <div className={`inline-block px-3 py-1.5 ${holder.shareColor} border rounded font-bold text-sm`}>{holder.share}</div>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <span className={`${holder.changeDir === 'up' ? 'text-green-400' : holder.changeDir === 'down' ? 'text-red-400' : 'text-slate-400'} text-sm font-bold flex items-center justify-center gap-1`}>
                                                <span className="material-symbols-outlined text-base">
                                                    {holder.changeDir === 'up' ? 'arrow_upward' : holder.changeDir === 'down' ? 'arrow_downward' : 'remove'}
                                                </span> 
                                                {holder.change}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-right font-mono text-slate-300 text-lg">{holder.reward}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 border-t border-white/10 flex justify-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer">
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
                                    Load More Stakeholders <span className="material-symbols-outlined text-lg">expand_more</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SubnetDistributionView;