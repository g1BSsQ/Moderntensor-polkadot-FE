import React from 'react';

interface AllTransactionsViewProps {
  onBack: () => void;
  onSelectTransaction?: (hash: string) => void;
  onSelectAccount?: (id: string) => void;
}

const AllTransactionsView: React.FC<AllTransactionsViewProps> = ({ onBack, onSelectTransaction, onSelectAccount }) => {
  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen font-sans">
      <style>{`
        .cyber-input {
            box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
        }
        .cyber-input:focus {
            box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
        }
        .table-row-glow:hover {
            box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.05);
        }
        .badge-method {
            padding: 2px 8px;
            border-radius: 0.25rem;
            font-size: 0.75rem;
            font-weight: 700;
            font-family: monospace;
            border-width: 1px;
            text-transform: uppercase;
            letter-spacing: 0.025em;
        }
      `}</style>
      <div className="w-full max-w-[1400px] flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center text-xs text-slate-500 font-mono gap-2 mb-2">
            <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>Home</span>
            <span className="text-slate-700">/</span>
            <span className="text-neon-cyan">Transactions</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wider glow-text flex items-center gap-3">
              <span className="material-symbols-outlined text-neon-pink text-4xl">swap_horiz</span>
              All Transactions
            </h1>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="size-2 rounded-full bg-green-400 animate-pulse"></span>
              Live updates enabled
            </div>
          </div>
        </div>

        <div className="w-full glass-panel rounded-lg p-2 flex flex-col md:flex-row items-center justify-between gap-4 border border-white/5">
          <div className="flex items-center overflow-x-auto gap-2 w-full md:w-auto custom-scrollbar pb-1 md:pb-0">
            <button className="px-4 py-2 rounded-md bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40 text-xs font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(0,243,255,0.2)]">
              All
            </button>
            <button className="px-4 py-2 rounded-md bg-white/5 text-slate-400 border border-transparent hover:border-white/20 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider">
              Transfers
            </button>
            <button className="px-4 py-2 rounded-md bg-white/5 text-slate-400 border border-transparent hover:border-white/20 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider">
              Staking
            </button>
            <button className="px-4 py-2 rounded-md bg-white/5 text-slate-400 border border-transparent hover:border-white/20 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider">
              Delegate
            </button>
            <button className="px-4 py-2 rounded-md bg-white/5 text-slate-400 border border-transparent hover:border-white/20 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider">
              Register
            </button>
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-500 text-sm">search</span>
            </div>
            <input className="w-full bg-[#0a1120] border border-white/10 rounded px-3 pl-9 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-neon-cyan/40 cyber-input transition-all text-xs font-mono" placeholder="Filter by hash..." type="text"/>
          </div>
        </div>

        <div className="glass-panel rounded-lg overflow-hidden border border-white/5 flex flex-col relative z-20 min-h-[600px]">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-slate-400 font-bold">
                  <th className="px-6 py-4 w-48">Transaction Hash</th>
                  <th className="px-6 py-4 w-40">Method</th>
                  <th className="px-6 py-4">From</th>
                  <th className="px-6 py-4">To / Subnet</th>
                  <th className="px-6 py-4 text-right">Amount (MTN)</th>
                  <th className="px-6 py-4 text-center w-24">Status</th>
                  <th className="px-6 py-4 text-right w-40">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5 font-mono">
                <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span 
                      className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer"
                      onClick={() => onSelectTransaction && onSelectTransaction('0x9a8f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01')}
                      title="0x9a8f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01"
                    >
                      0x9a8f...9f01
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-method bg-blue-500/10 text-blue-400 border-blue-500/30">Transfer</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Gj8...9kL')}
                      >
                        5Gj8...9kL
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Hm2...1pQ')}
                      >
                        5Hm2...1pQ
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-bold">142.50</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center size-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">10 secs ago</td>
                </tr>
                <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span 
                      className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer"
                      onClick={() => onSelectTransaction && onSelectTransaction('0x2b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c')}
                      title="0x2b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c"
                    >
                      0x2b4c...3b4c
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-method bg-purple-500/10 text-purple-400 border-purple-500/30">Delegate</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Kp9...3mN')}
                      >
                        5Kp9...3mN
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="material-symbols-outlined text-neon-pink text-sm">hub</span>
                      <span className="text-slate-400 italic">Subnet 4 Pool</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-bold">1,200.00</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center size-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">15 secs ago</td>
                </tr>
                <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span 
                      className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer"
                      onClick={() => onSelectTransaction && onSelectTransaction('0x1d7e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e')}
                      title="0x1d7e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e"
                    >
                      0x1d7e...1d2e
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-method bg-blue-500/10 text-blue-400 border-blue-500/30">Transfer</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-500 to-slate-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Xr1...7tY')}
                      >
                        5Xr1...7tY
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Ab2...8cZ')}
                      >
                        5Ab2...8cZ
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-bold">50.00</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center size-6 rounded-full bg-red-500/10 text-red-400 border border-red-500/30" title="Insufficient Balance">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">22 secs ago</td>
                </tr>
                <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span 
                      className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer"
                      onClick={() => onSelectTransaction && onSelectTransaction('0x5g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l')}
                      title="0x5g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l"
                    >
                      0x5g8h...7k8l
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-method bg-pink-500/10 text-pink-400 border-pink-500/30">Register</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Lm3...2kP')}
                      >
                        5Lm3...2kP
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="material-symbols-outlined text-neon-cyan text-sm">dns</span>
                      <span className="text-slate-300">Subnet 12</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-bold">100.00</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center size-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">35 secs ago</td>
                </tr>
                <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span 
                      className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer"
                      onClick={() => onSelectTransaction && onSelectTransaction('0x3f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a')}
                      title="0x3f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a"
                    >
                      0x3f6a...5f6a
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-method bg-teal-500/10 text-teal-400 border-teal-500/30">SetWeights</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-pink-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Pt4...9uV')}
                      >
                        5Pt4...9uV
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500 text-xs italic">System</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-slate-500 font-bold">0.00</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center size-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">42 secs ago</td>
                </tr>
                <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span 
                      className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer"
                      onClick={() => onSelectTransaction && onSelectTransaction('0x8k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2')}
                      title="0x8k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2"
                    >
                      0x8k2l...1o2
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-method bg-blue-500/10 text-blue-400 border-blue-500/30">Transfer</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Yt7...2wQ')}
                      >
                        5Yt7...2wQ
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Hj4...1nB')}
                      >
                        5Hj4...1nB
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-bold">12,500.00</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center size-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">55 secs ago</td>
                </tr>
                <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span 
                      className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer"
                      onClick={() => onSelectTransaction && onSelectTransaction('0x4j5n6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5')}
                      title="0x4j5n6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5"
                    >
                      0x4j5n...4r5
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-method bg-purple-500/10 text-purple-400 border-purple-500/30">Undelegate</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-500"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Mn2...8vC')}
                      >
                        5Mn2...8vC
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="material-symbols-outlined text-neon-pink text-sm">hub</span>
                      <span className="text-slate-400 italic">Subnet 1 Pool</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-white font-bold">500.00</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center size-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">1 min ago</td>
                </tr>
                <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <span 
                      className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer"
                      onClick={() => onSelectTransaction && onSelectTransaction('0x1q2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7j8k9l0z1x2c3v4b5n6m7q8w9e0r1')}
                      title="0x1q2w3e4r5t6y7u8i9o0p1a2s3d4f5g6h7j8k9l0z1x2c3v4b5n6m7q8w9e0r1"
                    >
                      0x1q2w...e0r1
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-method bg-amber-500/10 text-amber-400 border-amber-500/30">RootAdd</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-white to-gray-400"></div>
                      <span 
                        className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer"
                        onClick={() => onSelectAccount && onSelectAccount('5Admin...Root')}
                      >
                        5Admin...Root
                      </span>
                      <button className="text-slate-600 hover:text-white material-symbols-outlined text-[14px]">content_copy</button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-slate-500 text-xs italic">Network</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-slate-500 font-bold">0.00</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center justify-center size-6 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">1 min ago</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/20">
            <div className="text-xs text-slate-500">
              Showing <span className="text-white font-bold">1-8</span> of <span className="text-white font-bold">2.4M</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded bg-white/5 text-slate-500 text-xs border border-white/5 hover:bg-white/10 hover:text-white disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="px-3 py-1 rounded bg-neon-cyan/20 text-neon-cyan text-xs border border-neon-cyan/40 font-bold">1</button>
              <button className="px-3 py-1 rounded bg-white/5 text-slate-400 text-xs border border-white/5 hover:bg-white/10 hover:text-white transition-colors">2</button>
              <button className="px-3 py-1 rounded bg-white/5 text-slate-400 text-xs border border-white/5 hover:bg-white/10 hover:text-white transition-colors">3</button>
              <span className="text-slate-600 text-xs">...</span>
              <button className="px-3 py-1 rounded bg-white/5 text-slate-500 text-xs border border-white/5 hover:bg-white/10 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTransactionsView;