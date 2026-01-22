import React from 'react';

interface AccountHistoryViewProps {
  onBack: () => void;
  accountId: string | null;
  onSelectTransaction?: (hash: string) => void;
}

const AccountHistoryView: React.FC<AccountHistoryViewProps> = ({ onBack, accountId, onSelectTransaction }) => {
  const displayAddress = accountId || '5Hh9...2kL';
  const fullAddress = accountId ? `${accountId.substring(0, 6)}...${accountId.substring(accountId.length - 4)}` : '5Hh9ks...8j2L';

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen">
      <div className="w-full max-w-[1400px] flex flex-col gap-6">
        <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80 mb-2">
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
          <span className="material-symbols-outlined text-xs text-slate-600">chevron_right</span>
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>ACCOUNTS</span>
          <span className="material-symbols-outlined text-xs text-slate-600">chevron_right</span>
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>{displayAddress}</span>
          <span className="material-symbols-outlined text-xs text-slate-600">chevron_right</span>
          <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">HISTORY</span>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 pb-6 border-b border-white/5 relative">
          <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-neon-pink to-transparent"></div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 uppercase tracking-widest">
                Ledger
              </span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight uppercase flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <span className="glow-text">Transaction History</span>
              <span className="text-slate-500 text-lg md:text-2xl font-normal">for</span>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded border border-white/10 hover:border-neon-cyan/50 transition-colors group">
                <div className="size-6 rounded-full bg-cover bg-center ring-1 ring-neon-cyan/50" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAc0VkbuVAj1TklE56lBP-mFnjJI3O2asvF4uMqCmreqc9yxUF5GVBAlWh6y3ckJ1TMrmdMzqnZXIZBR2wt7fbNcuTHHxBtZHWNpSN0TcceKgUxOKPZxaaOPJ8ekUL-6enYePpWBJh3j7O65BpvVHjUYoTvGZ5K4nxkBfkLkXXIu7C4_oVocE04lVK-hpDQGZnTHq6lk7mhrxJOZPEHAWA9snSxjsBvAGQ3sIfPOyXZKEmIyccUJUkHncOjKyjVvCovLo2p5rlfMg")' }}></div>
                <span className="text-neon-cyan font-mono text-base md:text-xl group-hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.5)] transition-all">{fullAddress}</span>
                <button className="text-slate-500 hover:text-white transition-colors ml-1" title="Copy Address">
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
            </h1>
          </div>
          <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0">
            <div className="flex p-1 bg-[#050b14] border border-white/10 rounded-lg backdrop-blur-sm">
              <button className="px-5 py-2 text-sm font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 rounded shadow-[0_0_10px_rgba(0,243,255,0.2)] whitespace-nowrap transition-all">
                All Events
              </button>
              <button className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded border border-transparent transition-all whitespace-nowrap">
                Rewards
              </button>
              <button className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded border border-transparent transition-all whitespace-nowrap">
                Stakes
              </button>
              <button className="px-5 py-2 text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 rounded border border-transparent transition-all whitespace-nowrap">
                Transfers
              </button>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-lg overflow-hidden flex flex-col border border-white/5 relative min-h-[600px]">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="overflow-x-auto custom-scrollbar flex-grow">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-slate-400 font-bold">
                  <th className="px-6 py-5 w-24 text-center">Status</th>
                  <th className="px-6 py-5">Tx Hash</th>
                  <th className="px-6 py-5">Extrinsic Method</th>
                  <th className="px-6 py-5">Block Height</th>
                  <th className="px-6 py-5 text-right">Amount (τ)</th>
                  <th className="px-6 py-5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                <tr className="group hover:bg-white/[0.02] hover:shadow-[inset_0_0_20px_rgba(0,243,255,0.05)] transition-all duration-200">
                  <td className="px-6 py-4 text-center">
                    <span className="material-symbols-outlined text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" title="Success">check_circle</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-mono text-neon-cyan hover:underline hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] transition-all cursor-pointer truncate w-32 block" 
                        title="0x9a8f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01"
                        onClick={() => onSelectTransaction && onSelectTransaction('0x9a8f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01')}
                      >
                        0x9a8f...9f01
                      </span>
                      <button className="text-slate-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-sm">content_copy</span></button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      balances.transfer
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neon-blue hover:text-white transition-colors font-mono cursor-pointer">#1,420,551</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-green-400 tracking-wide font-mono">+145.20</span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 text-xs">
                    <span className="flex items-center justify-end gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 2 mins ago</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] hover:shadow-[inset_0_0_20px_rgba(188,19,254,0.05)] transition-all duration-200">
                  <td className="px-6 py-4 text-center">
                    <span className="material-symbols-outlined text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" title="Success">check_circle</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-mono text-neon-cyan hover:underline hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] transition-all cursor-pointer truncate w-32 block" 
                        title="0x2b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c"
                        onClick={() => onSelectTransaction && onSelectTransaction('0x2b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c')}
                      >
                        0x2b4c...3b4c
                      </span>
                      <button className="text-slate-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-sm">content_copy</span></button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-purple"></span>
                      subtensorModule.add_stake
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neon-blue hover:text-white transition-colors font-mono cursor-pointer">#1,420,548</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-neon-pink tracking-wide font-mono">-500.00</span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 text-xs">
                    <span className="flex items-center justify-end gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 4 hrs ago</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] hover:shadow-[inset_0_0_20px_rgba(0,243,255,0.05)] transition-all duration-200">
                  <td className="px-6 py-4 text-center">
                    <span className="material-symbols-outlined text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" title="Success">check_circle</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-mono text-neon-cyan hover:underline hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] transition-all cursor-pointer truncate w-32 block" 
                        title="0x1d7e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e"
                        onClick={() => onSelectTransaction && onSelectTransaction('0x1d7e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e')}
                      >
                        0x1d7e...1d2e
                      </span>
                      <button className="text-slate-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-sm">content_copy</span></button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      balances.transferKeepAlive
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neon-blue hover:text-white transition-colors font-mono cursor-pointer">#1,420,102</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-white tracking-wide font-mono">-1,200.00</span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 text-xs">
                    <span className="flex items-center justify-end gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 1 day ago</span>
                  </td>
                </tr>
                <tr className="group hover:bg-red-500/[0.02] hover:shadow-[inset_0_0_20px_rgba(239,68,68,0.05)] transition-all duration-200">
                  <td className="px-6 py-4 text-center">
                    <span className="material-symbols-outlined text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" title="Failed">cancel</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-mono text-slate-400 hover:text-white hover:underline transition-all cursor-pointer truncate w-32 block" 
                        title="0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e"
                        onClick={() => onSelectTransaction && onSelectTransaction('0x3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e')}
                      >
                        0x3d4e...3d4e
                      </span>
                      <button className="text-slate-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-sm">content_copy</span></button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-900/10 border border-red-500/20 text-xs font-mono text-red-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      utility.batch
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neon-blue hover:text-white transition-colors font-mono cursor-pointer">#1,419,888</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-slate-500 tracking-wide font-mono">0.00</span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 text-xs">
                    <span className="flex items-center justify-end gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 1 day ago</span>
                  </td>
                </tr>
                <tr className="group hover:bg-white/[0.02] hover:shadow-[inset_0_0_20px_rgba(0,243,255,0.05)] transition-all duration-200">
                  <td className="px-6 py-4 text-center">
                    <span className="material-symbols-outlined text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]" title="Success">check_circle</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className="font-mono text-neon-cyan hover:underline hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] transition-all cursor-pointer truncate w-32 block" 
                        title="0x7f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a"
                        onClick={() => onSelectTransaction && onSelectTransaction('0x7f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a')}
                      >
                        0x7f2a...1f2a
                      </span>
                      <button className="text-slate-600 hover:text-white transition-colors"><span className="material-symbols-outlined text-sm">content_copy</span></button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      balances.transfer
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neon-blue hover:text-white transition-colors font-mono cursor-pointer">#1,419,500</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-green-400 tracking-wide font-mono">+138.45</span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 text-xs">
                    <span className="flex items-center justify-end gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 2 days ago</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#050b14]/50 backdrop-blur-sm">
            <span className="text-sm text-slate-400 font-mono">Showing 1-8 of 1,240 events</span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded border border-white/10 bg-white/5 text-slate-500 text-sm font-bold uppercase tracking-wider cursor-not-allowed opacity-50">
                Previous
              </button>
              <div className="flex gap-1 mx-2">
                <button className="w-8 h-8 flex items-center justify-center rounded bg-neon-cyan text-black font-bold text-sm shadow-[0_0_10px_rgba(0,243,255,0.5)]">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-slate-400 font-bold text-sm transition-colors">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-slate-400 font-bold text-sm transition-colors">3</button>
                <span className="w-8 h-8 flex items-center justify-center text-slate-600">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 text-slate-400 font-bold text-sm transition-colors">50</button>
              </div>
              <button className="px-4 py-2 rounded border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-black text-sm font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHistoryView;