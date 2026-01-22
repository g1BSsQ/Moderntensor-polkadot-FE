import React from 'react';

interface AllBlocksViewProps {
  onBack: () => void;
  onSelectBlock?: (height: string) => void;
  onSelectAccount?: (id: string) => void;
}

const AllBlocksView: React.FC<AllBlocksViewProps> = ({ onBack, onSelectBlock, onSelectAccount }) => {
  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen">
      <style>{`
        .table-row-glow:hover {
            box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.05);
        }
        .glow-text {
            text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
        }
        .glow-text-pink {
            text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
        }
        .cyber-input {
            box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
        }
        .cyber-input:focus {
            box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
        }
      `}</style>
      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="relative w-full max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-neon-cyan/50">search</span>
            </div>
            <input 
              className="w-full bg-[#0a1120]/80 border border-neon-cyan/20 rounded-lg pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan/60 cyber-input transition-all text-sm font-mono" 
              placeholder="Search by Block, Hash, Extrinsic or Account Address..." 
              type="text"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              <span className="px-2 py-1 text-[10px] bg-white/5 rounded text-slate-500 font-mono border border-white/5">CMD+K</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="glass-panel p-6 rounded-lg border-l-2 border-neon-cyan relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-neon-cyan">layers</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Total Blocks</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-white glow-text font-mono">#2,481,920</h3>
              </div>
              <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-cyan w-[60%] animate-pulse"></div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono">Latest: 2s ago</p>
            </div>
            
            <div className="glass-panel p-6 rounded-lg border-l-2 border-neon-pink relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-neon-pink">timelapse</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Avg Block Time</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-white glow-text-pink font-mono">12.0s</h3>
                <span className="text-xs text-green-400 font-bold">-0.1s</span>
              </div>
              <div className="h-8 w-full mt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30">
                  <path d="M0 15 Q 25 25 50 5 T 100 15" fill="none" stroke="#ff00ff" strokeLinecap="round" strokeWidth="2"></path>
                </svg>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 font-mono">Target: 12.0s</p>
            </div>
            
            <div className="glass-panel p-6 rounded-lg border-l-2 border-neon-blue relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl text-neon-blue">verified_user</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Last Finalized Block</p>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-bold text-white font-mono">#2,481,918</h3>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-blue w-[98%]"></div>
                </div>
                <span className="text-xs text-neon-blue font-bold">Safe</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 font-mono">2 blocks behind head</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-neon-cyan">view_module</span> All Blocks
            </h3>
            <div className="flex gap-2">
              <button className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-sm">refresh</span>
              </button>
              <button className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-sm">filter_list</span>
              </button>
            </div>
          </div>
          <div className="glass-panel rounded-lg overflow-hidden border border-white/5 flex flex-col">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-slate-400 font-bold">
                    <th className="px-6 py-4">Block Height</th>
                    <th className="px-6 py-4">Validator</th>
                    <th className="px-6 py-4 text-center">Extrinsics</th>
                    <th className="px-6 py-4 text-center">Events</th>
                    <th className="px-6 py-4">Block Hash</th>
                    <th className="px-6 py-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5 font-mono">
                  {[
                    { height: '2,481,920', validator: 'Dao_Validator_1', color: 'from-purple-500 to-pink-500', tx: 42, events: 156, hash: '0x9f8a...3b2c', time: '4 secs ago', isNew: true },
                    { height: '2,481,919', validator: 'TensorStats', color: 'from-blue-500 to-cyan-500', tx: 18, events: 45, hash: '0x3c2d...8e9f', time: '16 secs ago' },
                    { height: '2,481,918', validator: 'Foundry', color: 'from-green-500 to-emerald-500', tx: 156, events: 320, hash: '0x7a8b...1c4d', time: '28 secs ago' },
                    { height: '2,481,917', validator: 'ModernTensor', color: 'from-orange-500 to-red-500', tx: 89, events: 112, hash: '0x5e6f...2a3b', time: '40 secs ago' },
                    { height: '2,481,916', validator: 'RoundTable', color: 'from-indigo-500 to-violet-500', tx: 23, events: 56, hash: '0x1b2c...9d0e', time: '52 secs ago' },
                    { height: '2,481,915', validator: 'NorthTensor', color: 'from-yellow-500 to-amber-600', tx: 67, events: 98, hash: '0x8a9b...4e5f', time: '1 min ago' },
                    { height: '2,481,914', validator: 'AlphaOmega', color: 'from-pink-500 to-rose-600', tx: 12, events: 28, hash: '0x2c3d...7a8b', time: '1 min 12s ago' },
                    { height: '2,481,913', validator: 'NeuralNet', color: 'from-teal-500 to-cyan-400', tx: 104, events: 210, hash: '0x6e7f...1b2c', time: '1 min 24s ago' },
                    { height: '2,481,912', validator: 'Cosmos_Validator', color: 'from-fuchsia-600 to-purple-600', tx: 5, events: 11, hash: '0x4a5b...9c0d', time: '1 min 36s ago' },
                    { height: '2,481,911', validator: 'Anonymous', color: 'from-gray-500 to-slate-400', tx: 78, events: 144, hash: '0x0d1e...5f6a', time: '1 min 48s ago' },
                  ].map((block, i) => (
                    <tr key={i} className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className="text-neon-cyan font-bold hover:underline hover:text-white flex items-center gap-2 cursor-pointer"
                          onClick={() => onSelectBlock && onSelectBlock(block.height.replace(/,/g, ''))}
                        >
                          {block.height}
                          {block.isNew && <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse-slow ml-1" title="New"></span>}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${block.color} border border-white/10`}></div>
                          <span 
                            className="text-slate-300 hover:text-neon-pink transition-colors font-medium cursor-pointer"
                            onClick={() => onSelectAccount && onSelectAccount(block.validator)}
                          >
                            {block.validator}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10 text-xs font-bold hover:border-neon-cyan/50 transition-colors">{block.tx}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded bg-white/5 text-slate-300 border border-white/10 text-xs font-bold hover:border-neon-pink/50 transition-colors">{block.events}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 group/hash cursor-pointer">
                          <span className="text-slate-400 group-hover/hash:text-white transition-colors truncate w-32 block">{block.hash}</span>
                          <span className="material-symbols-outlined text-[10px] text-slate-600 group-hover/hash:text-neon-cyan opacity-0 group-hover/hash:opacity-100 transition-all">content_copy</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 text-xs">{block.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-slate-500 font-mono">Showing <span className="text-white font-bold">1</span> to <span className="text-white font-bold">10</span> of <span className="text-white font-bold">2.4M</span> blocks</p>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider text-slate-500 bg-white/5 cursor-not-allowed opacity-50">Prev</button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-black bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.4)]">1</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-colors">2</button>
                  <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-colors">3</button>
                  <span className="text-slate-600 px-1">...</span>
                  <button className="w-8 h-8 rounded flex items-center justify-center text-xs font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-colors">24k</button>
                </div>
                <button className="px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-neon-cyan/20 hover:text-neon-cyan transition-colors border border-transparent hover:border-neon-cyan/30">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlocksView;