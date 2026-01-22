import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SubnetWeightsViewProps {
  onBack: () => void;
}

// Simulated data for weight distribution bell curve
const weightDistributionData = [
    { range: '0.0', count: 12 }, { range: '0.1', count: 25 }, { range: '0.2', count: 45 },
    { range: '0.3', count: 80 }, { range: '0.4', count: 120 }, { range: '0.5', count: 150 },
    { range: '0.6', count: 110 }, { range: '0.7', count: 70 }, { range: '0.8', count: 40 },
    { range: '0.9', count: 20 }, { range: '1.0', count: 8 },
];

const SubnetWeightsView: React.FC<SubnetWeightsViewProps> = ({ onBack }) => {
  const validatorsList = [
    { name: 'TensorStats_Val', color: 'text-slate-400' },
    { name: 'Foundry_Main', color: 'text-neon-cyan' },
    { name: 'RoundTable', color: 'text-slate-400' },
    { name: 'ModernTensor', color: 'text-slate-400' },
    { name: 'Corcel_API', color: 'text-slate-400' },
    { name: 'TensorPlex', color: 'text-slate-400' },
    { name: 'Datura', color: 'text-slate-400' },
    { name: 'Calculus', color: 'text-slate-400' },
    { name: 'Pr1me', color: 'text-slate-400' },
    { name: 'Nakamoto', color: 'text-slate-400' },
    { name: 'Tensor_Validator', color: 'text-slate-400' },
    { name: 'Synapse', color: 'text-slate-400' },
    { name: 'Neural_Inference', color: 'text-slate-400' },
    { name: 'Alpha_Omega', color: 'text-slate-400' },
    { name: 'First_Tensor', color: 'text-slate-400' },
  ];

  const minerUids = Array.from({ length: 20 }, (_, i) => String(i + 1).padStart(3, '0'));
  
  // Dummy score data generator
  const getScoreClass = () => {
      const scores = ['score-0', 'score-10', 'score-30', 'score-50', 'score-70', 'score-90', 'score-100'];
      const rand = Math.random();
      if (rand > 0.8) return scores[0]; // Mostly empty for realism
      return scores[Math.floor(Math.random() * scores.length)];
  };

  return (
    <div className="flex justify-center py-8 px-4 lg:px-8 relative z-10 w-full min-h-screen">
        <div className="w-full max-w-[1600px] flex flex-col gap-6">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
                <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SUBNETS</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SN1: TEXT PROMPTING</span>
                <span className="material-symbols-outlined text-xs">chevron_right</span>
                <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">MINER WEIGHTS</span>
            </div>

            {/* Header */}
            <div className="flex flex-wrap justify-between items-end gap-6 pb-2 border-b border-white/5 relative">
                <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
                <div className="flex flex-col gap-1">
                    <h1 className="text-white text-3xl lg:text-4xl font-black leading-tight tracking-tight uppercase glitch-effect" data-text="Weight Scoring Matrix">Weight Scoring Matrix</h1>
                    <p className="text-slate-400 text-sm font-light">Analysis of Validator consensus and miner distribution.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4 stat-card-glow transition-all">
                    <div className="p-3 bg-neon-blue/10 rounded border border-neon-blue/30 text-neon-blue">
                        <span className="material-symbols-outlined">groups</span>
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">Total Miners</div>
                        <div className="text-white text-2xl font-bold font-display">1,024 <span className="text-xs text-slate-500 font-normal">UIDs</span></div>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4 stat-card-glow transition-all">
                    <div className="p-3 bg-neon-pink/10 rounded border border-neon-pink/30 text-neon-pink">
                        <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">Active Validators</div>
                        <div className="text-white text-2xl font-bold font-display">64 <span className="text-xs text-slate-500 font-normal">Keys</span></div>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4 stat-card-glow transition-all">
                    <div className="p-3 bg-neon-purple/10 rounded border border-neon-purple/30 text-neon-purple">
                        <span className="material-symbols-outlined">scale</span>
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">Average Weight</div>
                        <div className="text-white text-2xl font-bold font-display">0.421 <span className="text-xs text-slate-500 font-normal">M</span></div>
                    </div>
                </div>
                <div className="glass-panel p-4 rounded-lg flex items-center gap-4 stat-card-glow transition-all">
                    <div className="p-3 bg-neon-cyan/10 rounded border border-neon-cyan/30 text-neon-cyan">
                        <span className="material-symbols-outlined">history</span>
                    </div>
                    <div>
                        <div className="text-slate-400 text-xs font-mono uppercase tracking-widest">Last Update</div>
                        <div className="text-white text-2xl font-bold font-display">#3,492,104</div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-9 flex flex-col gap-6">
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
                                            <div className="w-3 h-3 bg-[#2e0249]" title="Low"></div>
                                            <div className="w-3 h-3 bg-[#8910d4]" title="Mid"></div>
                                            <div className="w-3 h-3 bg-[#00f3ff]" title="High"></div>
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
                                    <div className="grid grid-cols-[140px_1fr]">
                                        {/* Y-Axis: Validators */}
                                        <div className="sticky left-0 z-20 bg-[#0a1120] border-r border-white/10 shadow-[4px_0_10px_rgba(0,0,0,0.5)]">
                                            <div className="h-10 border-b border-white/10 flex items-center px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest bg-[#0f172a]">
                                                Validators
                                            </div>
                                            <div className="flex flex-col text-xs font-mono text-slate-400">
                                                {validatorsList.map((val, idx) => (
                                                    <div key={idx} className={`h-8 flex items-center px-3 border-b border-white/5 hover:text-white hover:bg-white/5 cursor-pointer truncate ${val.color}`}>
                                                        {val.name}
                                                    </div>
                                                ))}
                                                {Array.from({length: 40}).map((_, i) => (
                                                    <div key={`extra-${i}`} className="h-8 flex items-center px-3 border-b border-white/5 hover:text-white hover:bg-white/5 cursor-pointer truncate">
                                                        Validator_{i+16}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Matrix Grid */}
                                        <div className="flex flex-col">
                                            {/* X-Axis Header */}
                                            <div className="sticky top-0 z-10 flex h-10 border-b border-white/10 bg-[#0f172a]">
                                                <div className="flex">
                                                    {minerUids.map((uid, idx) => (
                                                        <div key={idx} className={`w-8 flex items-center justify-center text-[10px] font-mono text-slate-500 border-r border-white/5 shrink-0 ${idx === 2 ? 'text-neon-cyan' : ''}`}>
                                                            {uid}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Matrix Cells */}
                                            {/* We match the number of rows to validators */}
                                            {Array.from({ length: 55 }).map((_, rowIdx) => (
                                                <div key={rowIdx} className="h-8 flex items-center border-b border-white/5 hover:bg-white/5">
                                                    {Array.from({ length: 20 }).map((_, colIdx) => (
                                                        <div key={colIdx} className="w-8 h-full flex items-center justify-center border-r border-white/5">
                                                            <div className={`matrix-cell ${getScoreClass()}`}></div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="glass-panel p-4 rounded-lg flex flex-col gap-4">
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2 flex items-center justify-between">
                            <span>Subnet Statistics</span>
                            <span className="material-symbols-outlined text-neon-pink text-sm">show_chart</span>
                        </h3>
                        <div className="h-40 relative w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weightDistributionData}>
                                    <defs>
                                        <linearGradient id="gradientWeight" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#bc13fe" stopOpacity={0.6}/>
                                            <stop offset="95%" stopColor="#bc13fe" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Tooltip 
                                        cursor={{stroke: '#fff', strokeWidth: 1, strokeDasharray: '3 3'}} 
                                        contentStyle={{ backgroundColor: '#0a0e17', border: '1px solid #1f293a', fontSize: '12px' }} 
                                        labelStyle={{ color: '#94a3b8' }}
                                        itemStyle={{ color: '#bc13fe' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="count" 
                                        stroke="#bc13fe" 
                                        strokeWidth={2} 
                                        fill="url(#gradientWeight)" 
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                            <div className="absolute top-2 right-2 text-[10px] font-mono text-neon-purple font-bold">Weight Distribution</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                            <div className="bg-white/5 p-2 rounded">
                                <div className="text-slate-500">Median</div>
                                <div className="text-white font-bold">0.45</div>
                            </div>
                            <div className="bg-white/5 p-2 rounded">
                                <div className="text-slate-500">Variance</div>
                                <div className="text-white font-bold">0.02</div>
                            </div>
                        </div>
                    </div>

                    <div className="console-panel rounded-lg p-4 h-[400px] flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan"></div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-xs uppercase font-bold text-slate-400">System Log</h4>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-xs space-y-2 p-2 bg-black/40 rounded border border-white/5">
                            <div className="text-slate-500"><span className="text-neon-blue">[10:42:01]</span> Connected to Subnet 1</div>
                            <div className="text-slate-400"><span className="text-neon-cyan">[10:42:05]</span> Metagraph synced.</div>
                            <div className="text-slate-300"><span className="text-green-500">[10:42:12]</span> 256 UIDs updated.</div>
                            <div className="text-slate-500"><span className="text-neon-blue">[10:45:30]</span> Matrix view initialized.</div>
                            <div className="text-white bg-white/5 p-1 rounded"><span className="text-neon-pink">&gt;</span> New Block: #3492105</div>
                            <div className="text-slate-500"><span className="text-neon-blue">[10:46:00]</span> Fetching validator scores...</div>
                            <div className="text-slate-400"><span className="text-neon-cyan">[10:46:02]</span> Received 64 responses.</div>
                            <div className="text-slate-500"><span className="text-neon-blue">[10:46:05]</span> Rendering grid...</div>
                            <div className="text-slate-300"><span className="text-green-500">[10:46:10]</span> Live feed active.</div>
                            <div className="animate-pulse text-neon-cyan">_</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 rounded transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                            <span className="material-symbols-outlined text-lg">download</span>
                            <span className="font-bold uppercase text-xs">Export CSV</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-neon-purple/10 hover:bg-neon-purple/20 text-neon-purple border border-neon-purple/50 rounded transition-all shadow-[0_0_15px_rgba(188,19,254,0.1)] hover:shadow-[0_0_20px_rgba(188,19,254,0.2)]">
                            <span className="material-symbols-outlined text-lg">api</span>
                            <span className="font-bold uppercase text-xs">API Access</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Validator Details Table */}
            <div className="glass-panel p-6 rounded-lg flex flex-col gap-4">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                        <span className="material-symbols-outlined text-neon-purple">search</span> Validator Weight Details
                    </h3>
                    <div className="relative w-full md:w-64">
                        <input className="w-full bg-[#0a1120] border border-white/10 rounded px-4 py-2 pl-10 text-sm text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan placeholder-slate-600 font-mono" placeholder="Search Hotkey..." type="text"/>
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-500 text-sm">search</span>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-xs font-mono uppercase tracking-wider text-slate-500 border-b border-white/10">
                                <th className="py-3 px-4 font-normal">Validator Hotkey</th>
                                <th className="py-3 px-4 font-normal text-right">Trust Score</th>
                                <th className="py-3 px-4 font-normal text-right">Consensus</th>
                                <th className="py-3 px-4 font-normal text-right">Weight</th>
                                <th className="py-3 px-4 font-normal text-right">Updated</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-mono text-slate-300">
                            <tr className="border-b border-white/5 hover:bg-white/5 group cursor-pointer transition-colors">
                                <td className="py-3 px-4 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="group-hover:text-neon-cyan transition-colors">5Hh9...2kL</span>
                                </td>
                                <td className="py-3 px-4 text-right">0.992</td>
                                <td className="py-3 px-4 text-right text-neon-cyan">98.4%</td>
                                <td className="py-3 px-4 text-right font-bold text-white">0.1245</td>
                                <td className="py-3 px-4 text-right text-slate-500">12s ago</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 group cursor-pointer transition-colors">
                                <td className="py-3 px-4 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="group-hover:text-neon-cyan transition-colors">7Jk2...9mP</span>
                                </td>
                                <td className="py-3 px-4 text-right">0.954</td>
                                <td className="py-3 px-4 text-right text-neon-cyan">95.1%</td>
                                <td className="py-3 px-4 text-right font-bold text-white">0.0912</td>
                                <td className="py-3 px-4 text-right text-slate-500">45s ago</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 group cursor-pointer transition-colors">
                                <td className="py-3 px-4 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <span className="group-hover:text-neon-cyan transition-colors">3Xy8...1qR</span>
                                </td>
                                <td className="py-3 px-4 text-right">0.782</td>
                                <td className="py-3 px-4 text-right text-neon-purple">72.3%</td>
                                <td className="py-3 px-4 text-right font-bold text-white">0.0850</td>
                                <td className="py-3 px-4 text-right text-slate-500">1m ago</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 group cursor-pointer transition-colors">
                                <td className="py-3 px-4 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span className="group-hover:text-neon-cyan transition-colors">9Lm4...6vN</span>
                                </td>
                                <td className="py-3 px-4 text-right">0.910</td>
                                <td className="py-3 px-4 text-right text-neon-cyan">90.5%</td>
                                <td className="py-3 px-4 text-right font-bold text-white">0.0762</td>
                                <td className="py-3 px-4 text-right text-slate-500">2m ago</td>
                            </tr>
                            <tr className="border-b border-white/5 hover:bg-white/5 group cursor-pointer transition-colors">
                                <td className="py-3 px-4 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <span className="group-hover:text-neon-cyan transition-colors">2Kp1...5jD</span>
                                </td>
                                <td className="py-3 px-4 text-right text-red-400">0.115</td>
                                <td className="py-3 px-4 text-right text-red-500">10.2%</td>
                                <td className="py-3 px-4 text-right font-bold text-slate-500">0.0000</td>
                                <td className="py-3 px-4 text-right text-slate-500">1h ago</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SubnetWeightsView;