import React from 'react';

interface ExplorerViewProps {
  onSelectTransaction?: (hash: string) => void;
  onSelectAccount?: (id: string) => void;
  onSelectBlock?: (height: string) => void;
  onViewAllTransactions?: () => void;
  onViewAllBlocks?: () => void;
}

const ExplorerView: React.FC<ExplorerViewProps> = ({ onSelectTransaction, onSelectAccount, onSelectBlock, onViewAllTransactions, onViewAllBlocks }) => {
  
  const handleCopy = (e: React.MouseEvent, text: string) => {
      e.stopPropagation();
      if ((window as any).copyToClipboard) {
          (window as any).copyToClipboard(text);
      }
  };

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full font-sans">
      <style>{`
        .cyber-input-container {
            position: relative;
            overflow: hidden;
        }
        .cyber-input-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.1), transparent);
            animation: scan-input 3s linear infinite;
            pointer-events: none;
        }
        @keyframes scan-input {
            0% { left: -100%; }
            50% { left: 100%; }
            100% { left: 100%; }
        }
        .cyber-input {
            background: rgba(10, 17, 32, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .cyber-input:focus {
            border-color: #00f3ff;
            box-shadow: 0 0 20px rgba(0, 243, 255, 0.2), inset 0 0 10px rgba(0, 243, 255, 0.1);
        }
        .stat-card-hover {
            transition: all 0.3s;
        }
        .stat-card-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px -10px rgba(0, 243, 255, 0.15);
            border-color: rgba(0, 243, 255, 0.3);
        }
      `}</style>
      <div className="w-full max-w-[1400px] flex flex-col gap-10">
        
        {/* Header & Search */}
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight font-display glitch-effect" data-text="Network Explorer">
            Network Explorer
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg font-light">
            Navigate the immutable ledger. Inspect blocks, extrinsics, events, and account states in real-time.
          </p>
          
          <div className="relative w-full max-w-3xl mx-auto cyber-input-container rounded-full group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
              <span className="material-symbols-outlined text-slate-500 group-focus-within:text-neon-cyan transition-colors">search</span>
            </div>
            <input 
              className="w-full cyber-input rounded-full pl-14 pr-32 py-4 text-white placeholder-slate-500 focus:outline-none text-base font-mono backdrop-blur-md" 
              placeholder="Search Block / Hash / Account / Subnet..." 
              type="text"
            />
            <div className="absolute inset-y-0 right-2 flex items-center">
              <span className="px-3 py-1.5 text-[10px] font-bold bg-white/5 rounded-full text-slate-400 border border-white/10">CMD + K</span>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: 'Block Height', val: '#2,481,920', sub: '2s ago', icon: 'layers', color: 'text-neon-cyan', border: 'border-neon-cyan' },
                { label: 'Network TPS', val: '142.5', sub: '+12% peak', icon: 'speed', color: 'text-neon-pink', border: 'border-neon-pink' },
                { label: 'Avg Gas', val: '0.004', unit: 'M', sub: '12 Gwei Base', icon: 'local_gas_station', color: 'text-neon-blue', border: 'border-neon-blue' },
                { label: 'Active Accounts', val: '84,201', sub: '+24 this hour', icon: 'groups', color: 'text-neon-purple', border: 'border-neon-purple' }
            ].map((stat, i) => (
                <div key={i} className={`glass-panel p-6 rounded-xl border border-white/5 relative overflow-hidden group stat-card-hover`}>
                    <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-${stat.color.replace('text-', '')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                    <div className="flex justify-between items-start mb-4">
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
                        <span className={`material-symbols-outlined ${stat.color} text-2xl opacity-80`}>{stat.icon}</span>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-3xl font-bold text-white font-display tracking-tight">
                            {stat.val} <span className="text-lg text-slate-500 font-normal">{stat.unit}</span>
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                            {i === 0 && <span className="relative flex h-2 w-2 mr-1"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>}
                            <p className={`text-xs font-mono font-bold ${i === 1 ? 'text-green-400' : 'text-slate-500'}`}>{stat.sub}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          
          {/* Latest Blocks */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-neon-cyan">view_in_ar</span> Latest Blocks
              </h3>
              <button onClick={onViewAllBlocks} className="text-xs font-bold text-neon-cyan hover:text-white uppercase tracking-widest transition-colors border border-neon-cyan/30 px-3 py-1 rounded hover:bg-neon-cyan/10">View All</button>
            </div>
            
            <div className="glass-panel rounded-xl overflow-hidden border border-white/5 flex flex-col relative">
               {/* Decorative background grid */}
               <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBWMHNMNDAgNDBWNDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
               
               <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#050b14]/80 backdrop-blur">
                    <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-slate-400 font-bold">
                      <th className="px-6 py-4">Height</th>
                      <th className="px-6 py-4">Validator</th>
                      <th className="px-6 py-4 text-center">Extrinsics</th>
                      <th className="px-6 py-4 text-right">Age</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-mono divide-y divide-white/5">
                    {[
                      { height: '2,481,920', validator: 'Core_Valid...', color: 'from-purple-500 to-pink-500', tx: 42, time: '2s' },
                      { height: '2,481,919', validator: 'TensorStats', color: 'from-blue-500 to-cyan-500', tx: 18, time: '14s' },
                      { height: '2,481,918', validator: 'Foundry', color: 'from-green-500 to-emerald-500', tx: 156, time: '26s' },
                      { height: '2,481,917', validator: 'ModernTens...', color: 'from-orange-500 to-red-500', tx: 89, time: '38s' },
                      { height: '2,481,916', validator: 'RoundTable', color: 'from-indigo-500 to-violet-500', tx: 23, time: '50s' },
                    ].map((block, i) => (
                      <tr key={i} className="group hover:bg-white/[0.04] transition-all duration-200">
                        <td className="px-6 py-4">
                          <span 
                            className="text-neon-cyan font-bold hover:underline cursor-pointer flex items-center gap-2" 
                            onClick={() => onSelectBlock && onSelectBlock(block.height)}
                          >
                            <span className="material-symbols-outlined text-[14px] opacity-0 group-hover:opacity-100 transition-opacity -ml-6">chevron_right</span>
                            {block.height}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-sm bg-gradient-to-tr ${block.color}`}></div>
                            <span className="text-slate-300 truncate w-24 block opacity-80 group-hover:opacity-100">{block.validator}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block w-8 text-center rounded bg-white/5 border border-white/5 text-xs text-white">{block.tx}</span>
                        </td>
                        <td className="px-6 py-4 text-right text-slate-500 text-xs">{block.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Latest Transactions */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-neon-pink">swap_horiz</span> Transactions
              </h3>
              <button onClick={onViewAllTransactions} className="text-xs font-bold text-neon-pink hover:text-white uppercase tracking-widest transition-colors border border-neon-pink/30 px-3 py-1 rounded hover:bg-neon-pink/10">View All</button>
            </div>
            
            <div className="glass-panel rounded-xl overflow-hidden border border-white/5 flex flex-col relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBWMHNMNDAgNDBWNDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgZmlsbD0ibm9uZSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30 pointer-events-none"></div>
              
              <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-[#050b14]/80 backdrop-blur">
                    <tr className="border-b border-white/10 text-xs uppercase tracking-widest text-slate-400 font-bold">
                      <th className="px-6 py-4">Hash</th>
                      <th className="px-6 py-4">From / To</th>
                      <th className="px-6 py-4 text-right">Value</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-mono divide-y divide-white/5">
                    {[
                      { hash: '0x9a8f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01', from: '5Gj8...9kL', to: '5Hm2...1pQ', val: '142.50', time: '10s' },
                      { hash: '0x2b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c', from: '5Kp9...3mN', to: 'Subnet 4 Pool', val: '0.05', time: '15s', toClass: 'text-slate-400 italic' },
                      { hash: '0x1d7e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e', from: '5Xr1...7tY', to: '5Ab2...8cZ', val: '1,200.00', time: '22s' },
                      { hash: '0x5g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l', from: '5Lm3...2kP', to: '5Qn6...4rS', val: '45.00', time: '35s' },
                      { hash: '0x3f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a', from: '5Pt4...9uV', to: '5Wy2...3xR', val: '890.15', time: '42s' },
                    ].map((tx, i) => (
                      <tr key={i} className="group hover:bg-white/[0.04] transition-all duration-200 cursor-pointer" onClick={() => onSelectTransaction && onSelectTransaction(tx.hash)}>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-neon-pink font-bold hover:underline transition-colors w-28 truncate block" title={tx.hash}>
                                {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 6)}
                            </span>
                            <span className="text-[10px] text-slate-500">{tx.time} ago</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-slate-500 w-8">From</span>
                              <span className="text-white hover:text-neon-cyan transition-colors truncate w-24 block" onClick={(e) => { e.stopPropagation(); onSelectAccount && onSelectAccount(tx.from); }}>{tx.from}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-slate-500 w-8">To</span>
                              <span className={`truncate w-24 block ${tx.toClass ? tx.toClass : 'text-white hover:text-neon-cyan transition-colors'}`} onClick={(e) => { e.stopPropagation(); !tx.toClass && onSelectAccount && onSelectAccount(tx.to); }}>{tx.to}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-bold text-white bg-white/5 px-2 py-1 rounded border border-white/5">{tx.val} M</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorerView;