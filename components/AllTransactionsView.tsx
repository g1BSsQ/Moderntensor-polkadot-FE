import React, { useMemo, useState } from 'react';
import { useDataBridge } from '../hooks/useDataBridge';
import { BridgeTransaction } from '../types';

interface AllTransactionsViewProps {
  onBack: () => void;
  onSelectTransaction?: (hash: string) => void;
  onSelectAccount?: (id: string) => void;
}

const AllTransactionsView: React.FC<AllTransactionsViewProps> = ({ onBack, onSelectTransaction, onSelectAccount }) => {
  const { data: bridgeData } = useDataBridge();
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allTransactions = useMemo(() => {
    if (!bridgeData?.transactions) return [];
    
    // De-duplicate transactions (since they might be indexed by multiple addresses)
    const txMap = new Map<string, BridgeTransaction>();
    Object.values(bridgeData.transactions).forEach(txList => {
      txList.forEach(tx => {
        txMap.set(tx.hash, tx);
      });
    });
    
    return Array.from(txMap.values()).sort((a, b) => b.block - a.block);
  }, [bridgeData]);

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(tx => {
      const matchesType = filterType === 'All' || tx.type === filterType;
      const matchesSearch = tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tx.to.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [allTransactions, filterType, searchQuery]);

  const getRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const diff = Date.now() - date.getTime();
      const seconds = Math.floor(diff / 1000);
      if (seconds < 60) return `${seconds} secs ago`;
      const minutes = Math.floor(seconds / 60);
      return `${minutes} mins ago`;
    } catch {
      return 'Recent';
    }
  };

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
            {['All', 'Transfer', 'Stake', 'Register'].map((type) => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-md transition-all text-xs font-bold uppercase tracking-wider ${
                  filterType === type 
                    ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40 shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                    : 'bg-white/5 text-slate-400 border border-transparent hover:border-white/20 hover:text-white hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-500 text-sm">search</span>
            </div>
            <input 
              className="w-full bg-[#0a1120] border border-white/10 rounded px-3 pl-9 py-2 text-white placeholder-slate-600 focus:outline-none focus:border-neon-cyan/40 cyber-input transition-all text-xs font-mono" 
              placeholder="Filter by hash..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
                {filteredTransactions.length > 0 ? filteredTransactions.map((tx) => (
                  <tr key={tx.hash} className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                    <td className="px-6 py-4">
                      <span 
                        className="text-neon-cyan font-bold hover:text-white hover:underline truncate w-32 block transition-colors cursor-pointer text-xs"
                        onClick={() => onSelectTransaction?.(tx.hash)}
                        title={tx.hash}
                      >
                        {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 4)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge-method ${
                        tx.type === 'Transfer' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                        tx.type === 'Stake' ? 'bg-purple-500/10 text-purple-400 border-purple-500/30' :
                        'bg-pink-500/10 text-pink-400 border-pink-500/30'
                      }`}>{tx.method}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer text-xs"
                          onClick={() => onSelectAccount?.(tx.from)}
                        >
                          {tx.from.substring(0, 10)}...{tx.from.substring(tx.from.length - 4)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-slate-300 hover:text-neon-cyan truncate w-32 block cursor-pointer text-xs"
                          onClick={() => onSelectAccount?.(tx.to)}
                        >
                          {tx.to.length > 20 ? `${tx.to.substring(0, 10)}...${tx.to.substring(tx.to.length - 4)}` : tx.to}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-white font-bold">{tx.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className={`inline-flex items-center justify-center size-6 rounded-full ${tx.status === 'Success' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}>
                        <span className="material-symbols-outlined text-sm">{tx.status === 'Success' ? 'check' : 'close'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-500 text-xs">{getRelativeTime(tx.timestamp)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-20 text-center text-slate-600 italic">No transactions found in this segment</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/20">
            <div className="text-xs text-slate-500">
              Showing <span className="text-white font-bold">{filteredTransactions.length}</span> live transactions
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded bg-white/5 text-slate-500 text-xs border border-white/5 disabled:opacity-50" disabled>
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="px-3 py-1 rounded bg-neon-cyan/20 text-neon-cyan text-xs border border-neon-cyan/40 font-bold">1</button>
              <button className="px-3 py-1 rounded bg-white/5 text-slate-500 text-xs border border-white/5 disabled:opacity-50" disabled>
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