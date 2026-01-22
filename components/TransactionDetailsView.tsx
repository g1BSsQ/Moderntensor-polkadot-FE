import React from 'react';

interface TransactionDetailsViewProps {
  onBack: () => void;
  transactionHash?: string | null;
  onSelectBlock?: (height: string) => void;
  onSelectAccount?: (id: string) => void;
}

const TransactionDetailsView: React.FC<TransactionDetailsViewProps> = ({ onBack, transactionHash, onSelectBlock, onSelectAccount }) => {
  // Use a proper 32-byte hash length (66 chars including 0x) as default
  const displayHash = transactionHash || '0x9a8f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01';

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full">
      <style>{`
        .neon-border-green {
            border-left: 2px solid #00ffa3;
            box-shadow: inset 10px 0 20px -10px rgba(0,255,157,0.1);
        }
        .glow-text-green {
            text-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
        }
        .code-block {
            font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', monospace;
            font-size: 0.75rem;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 0.5rem;
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 1rem;
            overflow-x: auto;
        }
        .json-key { color: #00f3ff; }
        .json-string { color: #ff00ff; }
        .json-number { color: #bc13fe; }
        .json-bool { color: #00ffa3; }
      `}</style>
      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>SCANNER</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>EXTRINSICS</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)] font-mono truncate max-w-[200px] md:max-w-none" title={displayHash}>
            {displayHash}
          </span>
        </div>

        <div className="flex flex-col gap-6 pb-8 border-b border-white/5 relative">
          <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.15)] flex-shrink-0">
                <span className="material-symbols-outlined text-3xl">receipt_long</span>
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Transaction Hash</span>
                <div className="flex items-center gap-3 mt-1">
                    <h1 className="text-white text-lg md:text-2xl lg:text-3xl font-mono font-bold tracking-tight break-all leading-tight" title={displayHash}>
                        {displayHash}
                    </h1>
                    <button 
                        className="text-slate-500 hover:text-neon-cyan transition-colors flex-shrink-0" 
                        title="Copy Hash"
                        onClick={() => (window as any).copyToClipboard && (window as any).copyToClipboard(displayHash)}
                    >
                        <span className="material-symbols-outlined text-xl">content_copy</span>
                    </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0 self-start md:self-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded bg-neon-green/10 border border-neon-green/40 text-neon-green shadow-[0_0_15px_rgba(0,255,157,0.15)]">
                <span className="material-symbols-outlined fill-1">check_circle</span>
                <span className="font-bold uppercase tracking-wider text-sm glow-text-green">Success</span>
              </div>
              <span className="text-slate-500 text-sm font-mono">Finalized</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-lg neon-border-cyan overflow-hidden relative">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
             <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Block</span>
                   <span 
                     className="text-lg text-neon-cyan font-mono hover:underline cursor-pointer"
                     onClick={() => onSelectBlock && onSelectBlock('2481920')}
                   >
                     2,481,920
                   </span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Timestamp</span>
                   <span className="text-lg text-white font-mono">10 secs ago <span className="text-slate-500 text-sm">(Nov 14, 2024 10:42:15 AM)</span></span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">From</span>
                   <div 
                     className="flex items-center gap-2 group cursor-pointer hover:bg-white/5 p-1 -ml-1 rounded transition-colors"
                     onClick={() => onSelectAccount && onSelectAccount('5Gj8...9kL')}
                   >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:scale-110 transition-transform"></div>
                      <span className="text-lg text-white font-mono group-hover:text-neon-cyan transition-colors">5Gj8...9kL</span>
                   </div>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">To</span>
                   <div 
                     className="flex items-center gap-2 group cursor-pointer hover:bg-white/5 p-1 -ml-1 rounded transition-colors"
                     onClick={() => onSelectAccount && onSelectAccount('5Hm2...1pQ')}
                   >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 group-hover:scale-110 transition-transform"></div>
                      <span className="text-lg text-white font-mono group-hover:text-neon-pink transition-colors">5Hm2...1pQ</span>
                   </div>
                </div>
             </div>
             <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Value</span>
                   <span className="text-2xl text-white font-bold font-mono">142.50 <span className="text-neon-cyan text-lg">MTN</span></span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fee</span>
                   <span className="text-lg text-white font-mono">0.00045 <span className="text-slate-500 text-sm">MTN</span></span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Extrinsic Index</span>
                   <span className="text-lg text-white font-mono">2481920-2</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Module</span>
                   <span className="text-lg text-white font-mono">balances.transfer</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
           <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-neon-purple">data_object</span> Params
           </h3>
           <div className="code-block">
              <div className="text-slate-300 font-mono text-sm leading-relaxed">
                 <span className="json-key">"dest"</span>: <span className="json-string">"5Hm2...1pQ"</span>,<br/>
                 <span className="json-key">"value"</span>: <span className="json-number">142500000000</span>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-4">
           <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-neon-pink">event_list</span> Events
           </h3>
           <div className="glass-panel rounded-lg overflow-hidden border border-white/5">
              <table className="w-full text-left">
                 <thead className="bg-white/5 text-xs text-slate-400 font-bold uppercase tracking-widest border-b border-white/5">
                    <tr>
                       <th className="px-6 py-3 w-48">Module.Event</th>
                       <th className="px-6 py-3">Details</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 text-sm font-mono">
                    <tr>
                       <td className="px-6 py-4 text-neon-cyan">Balances.Transfer</td>
                       <td className="px-6 py-4 text-slate-300">
                          Transfer(<span className="text-white hover:text-neon-cyan cursor-pointer hover:underline" onClick={() => onSelectAccount && onSelectAccount('5Gj8...9kL')}>5Gj8...9kL</span>, <span className="text-white hover:text-neon-pink cursor-pointer hover:underline" onClick={() => onSelectAccount && onSelectAccount('5Hm2...1pQ')}>5Hm2...1pQ</span>, <span className="text-white">142.50 MTN</span>)
                       </td>
                    </tr>
                    <tr>
                       <td className="px-6 py-4 text-neon-cyan">System.ExtrinsicSuccess</td>
                       <td className="px-6 py-4 text-slate-300">
                          DispatchInfo(weight: 145000000, class: Normal, paysFee: Yes)
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default TransactionDetailsView;