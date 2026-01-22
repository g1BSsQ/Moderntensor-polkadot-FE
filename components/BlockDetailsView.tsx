import React from 'react';

interface BlockDetailsViewProps {
  onBack: () => void;
  blockHeight?: string | null;
  onSelectTransaction?: (hash: string) => void;
  onSelectAccount?: (id: string) => void;
}

const BlockDetailsView: React.FC<BlockDetailsViewProps> = ({ onBack, blockHeight, onSelectTransaction, onSelectAccount }) => {
  const displayBlock = blockHeight || '2,481,920';

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full">
      <style>{`
        .table-row-glow:hover {
            box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.05);
        }
        .glow-text {
            text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
        }
        .cyber-input {
            box-shadow: 0 0 10px rgba(0, 243, 255, 0.1);
        }
        .cyber-input:focus {
            box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
        }
      `}</style>
      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
            <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>Home</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-white">Block Details</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-neon-cyan">#{displayBlock}</span>
          </div>
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-neon-cyan/50 text-sm">search</span>
            </div>
            <input className="w-full bg-[#0a1120]/80 border border-neon-cyan/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-neon-cyan/60 cyber-input transition-all text-xs font-mono" placeholder="Search by Block, Hash, Extrinsic..." type="text"/>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-xl border-l-4 border-neon-cyan relative overflow-hidden">
          <div className="absolute right-0 -top-10 opacity-[0.03] pointer-events-none">
            <span className="text-[200px] font-bold font-mono">BLOCK</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 mb-1">
                <span className="material-symbols-outlined text-neon-cyan text-3xl">deployed_code</span>
                <h1 className="text-4xl md:text-5xl font-bold text-white glow-text font-mono">#{displayBlock}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Finalized
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono bg-black/20 px-3 py-1 rounded border border-white/5">
                  <span>Hash:</span>
                  <span className="text-white">0x8a91b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01</span>
                  <button className="hover:text-neon-cyan transition-colors">
                    <span className="material-symbols-outlined text-sm">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-2 transition-all hover:border-neon-cyan/30">
                <span className="material-symbols-outlined text-sm">arrow_back</span> Prev
              </button>
              <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm font-mono flex items-center gap-2 transition-all hover:border-neon-cyan/30">
                Next <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-lg border-t-2 border-neon-purple group hover:bg-surface-dark/60 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Timestamp</p>
              <span className="material-symbols-outlined text-neon-purple opacity-50">schedule</span>
            </div>
            <h3 className="text-xl font-bold text-white font-mono">2 seconds ago</h3>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">Nov 14, 2024 10:42:15 AM +UTC</p>
          </div>
          <div className="glass-panel p-6 rounded-lg border-t-2 border-neon-blue group hover:bg-surface-dark/60 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Parent Hash</p>
              <span className="material-symbols-outlined text-neon-blue opacity-50">link</span>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-neon-cyan font-mono truncate w-full block hover:underline cursor-pointer" title="0x7b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2">
                0x7b2c...a1b2
              </h3>
              <button className="text-slate-500 hover:text-white transition-colors">
                <span className="material-symbols-outlined text-sm">content_copy</span>
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">Block #{Number(displayBlock.replace(/,/g, '')) - 1}</p>
          </div>
          <div className="glass-panel p-6 rounded-lg border-t-2 border-neon-pink group hover:bg-surface-dark/60 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Validator</p>
              <span className="material-symbols-outlined text-neon-pink opacity-50">dns</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-surface-dark border border-white/10"></div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-mono hover:text-neon-pink cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('5F7j...9k2P')}>Dao_Validator_1</h3>
                <p className="text-[10px] text-slate-500">5F7j...9k2P</p>
              </div>
            </div>
          </div>
          <div className="glass-panel p-6 rounded-lg border-t-2 border-neon-cyan group hover:bg-surface-dark/60 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Activity</p>
              <span className="material-symbols-outlined text-neon-cyan opacity-50">data_usage</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-bold text-white font-mono">42</h3>
                <p className="text-[10px] text-slate-500 font-mono uppercase">Extrinsics</p>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-white font-mono">156</h3>
                <p className="text-[10px] text-slate-500 font-mono uppercase">Events</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-4">
              <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-neon-cyan">code_blocks</span> Extrinsics
              </h3>
              <span className="px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 text-xs font-mono">42 Total</span>
            </div>
            <div className="flex gap-2">
              <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors border border-white/10 px-3 py-1 rounded hover:bg-white/5 active:bg-neon-cyan/20 active:border-neon-cyan active:text-neon-cyan">All</button>
              <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors border border-white/10 px-3 py-1 rounded hover:bg-white/5">Signed</button>
              <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition-colors border border-white/10 px-3 py-1 rounded hover:bg-white/5">Unsigned</button>
            </div>
          </div>
          <div className="glass-panel rounded-lg overflow-hidden border border-white/5 flex flex-col min-h-[500px]">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-widest text-slate-400 font-bold">
                    <th className="px-6 py-4 w-24">ID</th>
                    <th className="px-6 py-4 w-24">Hash</th>
                    <th className="px-6 py-4">Call</th>
                    <th className="px-6 py-4">Signer</th>
                    <th className="px-6 py-4 w-32">Events</th>
                    <th className="px-6 py-4 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5 font-mono">
                  <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-slate-500">2481920-2</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-neon-cyan hover:underline cursor-pointer truncate w-24 block" 
                          onClick={() => onSelectTransaction && onSelectTransaction('0x3f2a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a')}
                          title="0x3f2a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a"
                        >
                          0x3f2a5b...3f4a
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white">
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-white">Balances.transfer</span>
                        <span className="text-[10px] text-slate-500">Transfer 142.50 τ to 5Hm2...1pQ</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                        <span className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('5Gj8...9kL')}>5Gj8...9kL</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400" title="Balances.Transfer">BT</div>
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400" title="System.ExtrinsicSuccess">SE</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">check</span> Success
                      </span>
                    </td>
                  </tr>
                  <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-slate-500">2481920-3</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-neon-cyan hover:underline cursor-pointer truncate w-24 block" 
                          onClick={() => onSelectTransaction && onSelectTransaction('0x8d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i')}
                          title="0x8d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i"
                        >
                          0x8d1e2f...0h1i
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white">
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-white">Subnets.set_weights</span>
                        <span className="text-[10px] text-slate-500">Set weights for netuid 1</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
                        <span className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('5Kp9...3mN')}>5Kp9...3mN</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400">SW</div>
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400">SE</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">check</span> Success
                      </span>
                    </td>
                  </tr>
                  <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-slate-500">2481920-4</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-neon-cyan hover:underline cursor-pointer truncate w-24 block" 
                          onClick={() => onSelectTransaction && onSelectTransaction('0x1a7f9b3c5d7e8f0a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a')}
                          title="0x1a7f9b3c5d7e8f0a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a"
                        >
                          0x1a7f9b...5f7a
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white">
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-white">Staking.add_stake</span>
                        <span className="text-[10px] text-slate-500">Add 500.00 τ to hotkey 5Ab2...</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-red-400"></div>
                        <span className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('5Xr1...7tY')}>5Xr1...7tY</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400">SA</div>
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400">SE</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">check</span> Success
                      </span>
                    </td>
                  </tr>
                  <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-slate-500">2481920-5</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-neon-cyan hover:underline cursor-pointer truncate w-24 block" 
                          onClick={() => onSelectTransaction && onSelectTransaction('0x9c4d2e8f0a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d')}
                          title="0x9c4d2e8f0a1b3c5d7e9f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7a9b1c3d"
                        >
                          0x9c4d2e...1c3d
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white">
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-white">Subnets.register</span>
                        <span className="text-[10px] text-slate-500">Register new subnet</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-400 to-slate-400"></div>
                        <span className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer" onClick={() => onSelectAccount && onSelectAccount('5Lm3...2kP')}>5Lm3...2kP</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400">SF</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">close</span> Failed
                      </span>
                    </td>
                  </tr>
                  <tr className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-slate-500">2481920-6</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-neon-cyan hover:underline cursor-pointer truncate w-24 block" 
                          onClick={() => onSelectTransaction && onSelectTransaction('0x5h3j8k1l2m4n6o8p0q2r4s6t8u0v2w4x6y8z0a2b4c6d8e0f2g4h6i8j0k2l4m6n')}
                          title="0x5h3j8k1l2m4n6o8p0q2r4s6t8u0v2w4x6y8z0a2b4c6d8e0f2g4h6i8j0k2l4m6n"
                        >
                          0x5h3j8k...4m6n
                        </span>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-white">
                          <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-white">Timestamp.set</span>
                        <span className="text-[10px] text-slate-500">Set block timestamp</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-500 italic text-xs">Unsigned</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2 overflow-hidden">
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400">TS</div>
                        <div className="w-6 h-6 rounded-full bg-surface-dark border border-white/10 flex items-center justify-center text-[10px] text-slate-400">SE</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold">
                        <span className="material-symbols-outlined text-[14px]">check</span> Success
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
              <p className="text-xs text-slate-500">Showing 1-5 of 42 extrinsics</p>
              <div className="flex gap-2">
                <button className="p-1 rounded hover:bg-white/10 text-slate-400 disabled:opacity-50">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="p-1 rounded hover:bg-white/10 text-slate-400">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockDetailsView;