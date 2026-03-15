import React, { useState } from 'react';
import { useDataBridge } from '../hooks/useDataBridge';

export interface AccountHistoryViewProps {
  onBack: () => void;
  accountId: string | null;
  onSelectTransaction?: (hash: string) => void;
}

const AccountHistoryView: React.FC<AccountHistoryViewProps> = ({ onBack, accountId, onSelectTransaction }) => {
  const { data: bridgeData } = useDataBridge();
  const [filter, setFilter] = useState<'All' | 'Transfer' | 'Stake' | 'Reward'>('All');

  const displayAddress = accountId || '5Hh9...2kL';
  const fullAddress = accountId 
    ? `${accountId.substring(0, 10)}...${accountId.substring(accountId.length - 8)}` 
    : 'Connecting...';

  const transactions = (bridgeData?.transactions && accountId && bridgeData.transactions[accountId.toLowerCase()]) || [];
  
  const filteredTransactions = transactions.filter(tx => {
    if (filter === 'All') return true;
    return tx.type === filter;
  }).sort((a, b) => b.block - a.block);

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
              {[
                { id: 'All', label: 'All Events' },
                { id: 'Reward', label: 'Rewards' },
                { id: 'Stake', label: 'Stakes' },
                { id: 'Transfer', label: 'Transfers' }
              ].map((f) => (
                <button 
                  key={f.id}
                  onClick={() => setFilter(f.id as any)}
                  className={`px-5 py-2 text-sm font-bold transition-all whitespace-nowrap rounded ${
                    filter === f.id 
                      ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 shadow-[0_0_10px_rgba(0,243,255,0.2)]' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {f.label}
                </button>
              ))}
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
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-slate-500 font-mono uppercase tracking-widest opacity-50">
                      No matching events found in this segment
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx, idx) => (
                    <tr key={idx} className="group hover:bg-white/[0.02] hover:shadow-[inset_0_0_20px_rgba(0,243,255,0.05)] transition-all duration-200">
                      <td className="px-6 py-4 text-center">
                        <span className={`material-symbols-outlined ${tx.status === 'Success' ? 'text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]' : 'text-red-400'}`} title={tx.status}>
                          {tx.status === 'Success' ? 'check_circle' : 'cancel'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span 
                            className="font-mono text-neon-cyan hover:underline hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)] transition-all cursor-pointer truncate w-32 block" 
                            title={tx.hash}
                            onClick={() => onSelectTransaction?.(tx.hash)}
                          >
                            {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 4)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-800/50 border border-slate-700 text-xs font-mono text-slate-300">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            tx.type === 'Transfer' ? 'bg-green-500' : 
                            tx.type === 'Stake' ? 'bg-neon-purple' : 'bg-neon-cyan'
                          }`}></span>
                          {tx.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-neon-blue hover:text-white transition-colors font-mono cursor-pointer">#{tx.block}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold tracking-wide font-mono ${
                          tx.from.toLowerCase() === accountId?.toLowerCase() ? 'text-neon-pink' : 'text-green-400'
                        }`}>
                          {tx.from.toLowerCase() === accountId?.toLowerCase() ? '-' : '+'}{tx.amount.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 text-xs">
                        <span className="flex items-center justify-end gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {new Date(tx.timestamp).toLocaleTimeString()}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#050b14]/50 backdrop-blur-sm">
            <span className="text-sm text-slate-400 font-mono">Showing {filteredTransactions.length} events from recent blocks</span>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded border border-white/10 bg-white/5 text-slate-500 text-sm font-bold uppercase tracking-wider cursor-not-allowed opacity-50">
                Previous
              </button>
              <div className="flex gap-1 mx-2">
                <button className="w-8 h-8 flex items-center justify-center rounded bg-neon-cyan text-black font-bold text-sm shadow-[0_0_10px_rgba(0,243,255,0.5)]">1</button>
              </div>
              <button className="px-4 py-2 rounded border border-white/10 bg-white/5 text-slate-500 text-sm font-bold uppercase tracking-wider cursor-not-allowed opacity-50">
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