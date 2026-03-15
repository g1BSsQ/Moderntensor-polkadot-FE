import React, { useMemo } from 'react';
import { useDataBridge } from '../hooks/useDataBridge';
import { BridgeAccount } from '../types';

interface AccountViewProps {
  onBack: () => void;
  accountId: string | null;
  onSelectTransaction?: (hash: string) => void;
  onViewHistory?: () => void;
}

const AccountView: React.FC<AccountViewProps> = ({ onBack, accountId, onSelectTransaction, onViewHistory }) => {
  const { data: bridgeData } = useDataBridge();
  
  const displayAddress = accountId || '5Hh9...2kL';
  const fullAddress = accountId ? `${accountId.substring(0, 8)}...${accountId.substring(accountId.length - 8)}` : '5Hh9ks...8j2L';

  const accountInfo = useMemo(() => {
    if (!bridgeData?.accounts) return null;
    
    // Explicitly check for the default demo address if no ID provided
    const lookupAddr = accountId || '5Hh9ksks88j2Lp';
    
    // Try exact match or find by partial match if needed
    let info: BridgeAccount | undefined = bridgeData.accounts[lookupAddr];
    
    if (!info) {
        // Fallback: try to find an account that contains the lookup address string
        const addrKey = Object.keys(bridgeData.accounts).find(k => 
            k.toLowerCase().includes(lookupAddr.toLowerCase().substring(0, 10))
        );
        if (addrKey) info = bridgeData.accounts[addrKey];
    }
    
    // Final fallback: just take the first account that isn't empty if we still have nothing
    if (!info) {
        const accounts = Object.values(bridgeData.accounts) as BridgeAccount[];
        info = accounts.find(a => a.balance > 0) || accounts[0];
    }
    
    return info || null;
  }, [bridgeData, accountId]);

  const stats = useMemo(() => ({
    block: bridgeData?.network?.block || 0,
    marketCap: bridgeData?.network?.market_cap ? `$${(bridgeData.network.market_cap / 1_000_000_000).toFixed(1)}B` : 'N/A',
    balance: accountInfo?.balance ?? 0.0,
    staked: accountInfo?.staked ?? 0.0,
    rewards: accountInfo?.rewards ?? 0.0,
    total: accountInfo?.total ?? 0.0,
    isDemo: !accountInfo || accountInfo.is_simulated || accountInfo.label.includes('Simulated')
  }), [bridgeData, accountInfo]);

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen">
      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HUB</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="hover:text-neon-cyan transition-colors cursor-pointer">ACCOUNTS</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">{displayAddress}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-end gap-6 pb-6 border-b border-white/5 relative">
          <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-neon-pink to-transparent"></div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-cover bg-center ring-2 ring-neon-cyan/50 shadow-[0_0_20px_rgba(0,243,255,0.2)]" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAc0VkbuVAj1TklE56lBP-mFnjJI3O2asvF4uMqCmreqc9yxUF5GVBAlWh6y3ckJ1TMrmdMzqnZXIZBR2wt7fbNcuTHHxBtZHWNpSN0TcceKgUxOKPZxaaOPJ8ekUL-6enYePpWBJh3j7O65BpvVHjUYoTvGZ5K4nxkBfkLkXXIu7C4_oVocE04lVK-hpDQGZnTHq6lk7mhrxJOZPEHAWA9snSxjsBvAGQ3sIfPOyXZKEmIyccUJUkHncOjKyjVvCovLo2p5rlfMg")' }}></div>
              <div className="absolute -bottom-2 -right-2 bg-black/80 backdrop-blur border border-neon-cyan/30 text-neon-cyan rounded p-1">
                <span className="material-symbols-outlined text-sm">fingerprint</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
              </div>
              <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase glitch-effect flex items-center gap-3" data-text={fullAddress}>
                {fullAddress}
                <button className="text-slate-500 hover:text-neon-cyan transition-colors" title="Copy Address" onClick={() => (window as any).copyToClipboard(accountId || 'ModernTensor_Foundation_Address')}>
                  <span className="material-symbols-outlined text-2xl">content_copy</span>
                </button>
              </h1>
              <p className="text-slate-400 text-sm font-mono max-w-2xl flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
                Identity: <span className="text-white">{accountInfo?.label || "ModernTensor Foundation"}</span>
                <span className="material-symbols-outlined text-sm text-blue-400" title="Verified">verified</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <span className="px-4 py-1.5 bg-black/50 text-neon-cyan font-mono text-xs border border-neon-cyan/30 flex items-center shadow-[inset_0_0_10px_rgba(0,243,255,0.1)] rounded">
               BLOCK: #{stats.block.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-cyan relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Available Balance</p>
              <span className="material-symbols-outlined text-neon-cyan/70 text-2xl drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">account_balance</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none glow-text">
                {stats.balance.toLocaleString()} 
                {stats.isDemo && <span className="text-xs text-neon-cyan font-mono ml-1 uppercase opacity-60">Demo</span>}
              </p>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-pink relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-pink/5 rounded-full blur-3xl group-hover:bg-neon-pink/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Staked Balance</p>
              <span className="material-symbols-outlined text-neon-pink/70 text-2xl drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">lock_clock</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none glow-text-pink">
                {stats.staked.toLocaleString()}
                {stats.isDemo && <span className="text-xs text-neon-pink font-mono ml-1 uppercase opacity-60">Demo</span>}
              </p>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-cyan relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-blue/5 rounded-full blur-3xl group-hover:bg-neon-blue/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Free Balance</p>
              <span className="material-symbols-outlined text-neon-blue/70 text-2xl drop-shadow-[0_0_5px_rgba(19,91,236,0.5)]">wallet</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none">
                {stats.balance.toLocaleString()}
                {stats.isDemo && <span className="text-xs text-text-secondary font-mono ml-1 uppercase opacity-40">Demo</span>}
              </p>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-pink relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-purple/5 rounded-full blur-3xl group-hover:bg-neon-purple/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Lifetime Rewards</p>
              <span className="material-symbols-outlined text-neon-purple/70 text-2xl drop-shadow-[0_0_5px_rgba(188,19,254,0.5)]">emoji_events</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none glow-text-pink">
                {stats.rewards.toLocaleString()}
                {stats.isDemo && <span className="text-xs text-neon-purple font-mono ml-1 uppercase opacity-60">Demo</span>}
              </p>
            </div>
          </div>
        </div>


        {/* Content Columns */}
        <div className="flex flex-col gap-8 mt-4">
          <div className="w-full flex flex-col gap-8">
            <div className="glass-panel p-6 rounded-xl border border-white/5 min-h-[400px] flex flex-col">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                   <span className="material-symbols-outlined text-neon-cyan text-xl">history</span>
                   Recent Transactions
                 </h3>
                 <button 
                  onClick={onViewHistory}
                  className="px-4 py-1.5 rounded-lg bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 text-[10px] uppercase font-black hover:bg-neon-cyan hover:text-black transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)]"
                 >
                   View All History
                 </button>
               </div>

               {(!bridgeData?.transactions || !accountId || !bridgeData.transactions[accountId.toLowerCase()]) ? (
                 <div className="flex-grow flex flex-col items-center justify-center text-center opacity-60">
                   <span className="material-symbols-outlined text-5xl mb-4">query_stats</span>
                   <p className="text-slate-500 text-xs font-mono max-w-xs uppercase">No transactions found for this account on the current metagraph segment.</p>
                 </div>
               ) : (
                 <div className="flex flex-col gap-3">
                   {bridgeData.transactions[accountId.toLowerCase()].slice(0, 5).map((tx, idx) => (
                     <div 
                      key={idx} 
                      onClick={() => onSelectTransaction?.(tx.hash)}
                      className="group flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-neon-cyan/30 hover:bg-white/[0.08] transition-all cursor-pointer"
                     >
                       <div className="flex items-center gap-4">
                         <div className={`p-2 rounded-lg ${tx.type === 'Transfer' ? 'bg-blue-500/10 text-blue-400' : 'bg-neon-purple/10 text-neon-purple'}`}>
                           <span className="material-symbols-outlined">{tx.type === 'Transfer' ? 'compare_arrows' : 'account_balance_wallet'}</span>
                         </div>
                         <div className="flex flex-col">
                           <span className="text-white text-sm font-bold capitalize">{tx.method}</span>
                           <span className="text-slate-500 text-[10px] font-mono">{tx.hash.substring(0, 10)}...</span>
                         </div>
                       </div>
                       <div className="flex flex-col items-end">
                         <span className={`text-sm font-bold font-mono ${tx.from.toLowerCase() === accountId.toLowerCase() ? 'text-neon-pink' : 'text-green-400'}`}>
                           {tx.from.toLowerCase() === accountId.toLowerCase() ? '-' : '+'}{tx.amount.toFixed(2)} MTN
                         </span>
                         <span className="text-slate-500 text-[10px] font-mono">Block #{tx.block}</span>
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountView;