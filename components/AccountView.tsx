import React from 'react';

interface AccountViewProps {
  onBack: () => void;
  accountId: string | null;
  onViewHistory?: () => void;
}

const AccountView: React.FC<AccountViewProps> = ({ onBack, accountId, onViewHistory }) => {
  const displayAddress = accountId || '5Hh9...2kL';
  const fullAddress = accountId ? `${accountId.substring(0, 6)}...${accountId.substring(accountId.length - 4)}` : '5Hh9ks...8j2L';

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen">
      <div className="w-full max-w-[1400px] flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
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
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neon-purple/10 text-neon-purple border border-neon-purple/40 uppercase tracking-widest shadow-[0_0_10px_rgba(188,19,254,0.2)]">
                  Coldkey
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/40 uppercase tracking-widest">
                  Active
                </span>
              </div>
              <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase glitch-effect flex items-center gap-3" data-text={fullAddress}>
                {fullAddress}
                <button className="text-slate-500 hover:text-neon-cyan transition-colors" title="Copy Address">
                  <span className="material-symbols-outlined text-2xl">content_copy</span>
                </button>
              </h1>
              <p className="text-slate-400 text-sm font-mono max-w-2xl flex items-center gap-2">
                <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
                Identity: <span className="text-white">ModernTensor Foundation</span>
                <span className="material-symbols-outlined text-sm text-blue-400" title="Verified">verified</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none group flex items-center justify-center gap-2 px-6 py-3 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 hover:border-neon-cyan rounded-none clip-path-polygon transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)] hover:shadow-[0_0_25px_rgba(0,243,255,0.3)]">
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              <span className="font-bold tracking-wider uppercase">Stake</span>
            </button>
            <button className="flex-1 md:flex-none group flex items-center justify-center gap-2 px-6 py-3 bg-transparent hover:bg-white/5 text-slate-300 border border-white/20 hover:border-white/50 rounded-none transition-all">
              <span className="material-symbols-outlined text-xl">send</span>
              <span className="font-medium tracking-wider uppercase">Transfer</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-cyan relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Balance</p>
              <span className="material-symbols-outlined text-neon-cyan/70 text-2xl drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">account_balance</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none glow-text">15,240 <span className="text-lg text-neon-cyan">M</span></p>
              <span className="flex items-center text-green-400 text-xs font-bold bg-green-900/30 border border-green-500/30 px-2 py-1 rounded backdrop-blur-sm">
                <span className="material-symbols-outlined text-xs mr-0.5">arrow_upward</span> $450k
              </span>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-pink relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-pink/5 rounded-full blur-3xl group-hover:bg-neon-pink/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Staked Balance</p>
              <span className="material-symbols-outlined text-neon-pink/70 text-2xl drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">lock_clock</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none glow-text-pink">12,000 <span className="text-lg text-neon-pink">M</span></p>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden max-w-[60px] mb-1.5">
                <div className="h-full bg-neon-pink w-[78%] cyber-progress-pink"></div>
              </div>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-cyan relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-blue/5 rounded-full blur-3xl group-hover:bg-neon-blue/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Free Balance</p>
              <span className="material-symbols-outlined text-neon-blue/70 text-2xl drop-shadow-[0_0_5px_rgba(19,91,236,0.5)]">wallet</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none">3,240 <span className="text-lg text-neon-blue">M</span></p>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-pink relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-purple/5 rounded-full blur-3xl group-hover:bg-neon-purple/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Lifetime Rewards</p>
              <span className="material-symbols-outlined text-neon-purple/70 text-2xl drop-shadow-[0_0_5px_rgba(188,19,254,0.5)]">emoji_events</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none glow-text-pink">450.5 <span className="text-lg text-neon-purple">M</span></p>
              <div className="h-8 w-16">
                <svg className="w-full h-full overflow-visible sparkline-glow" viewBox="0 0 100 30">
                  <path d="M0 25 L 20 20 L 40 22 L 60 10 L 80 15 L 100 5" fill="none" stroke="#bc13fe" strokeLinecap="round" strokeWidth="2"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Content Columns */}
        <div className="flex flex-col lg:flex-row gap-8 mt-4">
          <div className="flex-1 flex flex-col gap-8">
            {/* Subnet Participation */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-cyan">hub</span> Subnet Participation
                </h3>
              </div>
              <div className="glass-panel rounded-lg overflow-hidden border border-white/5">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                  {/* Subnet 1 Card */}
                  <div className="p-4 hover:bg-white/5 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-neon-cyan/20 flex items-center justify-center text-neon-cyan font-bold border border-neon-cyan/50">1</div>
                        <div>
                          <p className="text-white font-bold group-hover:text-neon-cyan transition-colors">Text Prompting</p>
                          <p className="text-xs text-slate-400 font-mono">SN1</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300 font-mono border border-slate-700">Rank #4</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <div className="flex-1">
                        <p className="text-slate-500 uppercase text-[10px] mb-1">Daily Reward</p>
                        <p className="text-white font-mono font-bold">145.2 M</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-500 uppercase text-[10px] mb-1">Incentive</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="bg-neon-cyan h-full w-[85%] cyber-progress-cyan"></div>
                          </div>
                          <span className="text-neon-cyan font-bold">85%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subnet 2 Card */}
                  <div className="p-4 hover:bg-white/5 transition-colors group cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-neon-pink/20 flex items-center justify-center text-neon-pink font-bold border border-neon-pink/50">2</div>
                        <div>
                          <p className="text-white font-bold group-hover:text-neon-pink transition-colors">Image Gen</p>
                          <p className="text-xs text-slate-400 font-mono">SN2</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-1 rounded bg-slate-800 text-xs text-slate-300 font-mono border border-slate-700">Rank #12</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs">
                      <div className="flex-1">
                        <p className="text-slate-500 uppercase text-[10px] mb-1">Daily Reward</p>
                        <p className="text-white font-mono font-bold">89.5 M</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-500 uppercase text-[10px] mb-1">Incentive</p>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div className="bg-neon-pink h-full w-[62%] cyber-progress-pink"></div>
                          </div>
                          <span className="text-neon-pink font-bold">62%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Mini-List */}
            <div className="flex flex-col gap-4">
               <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-purple">history</span> Recent Activity
               </h3>
               <div className="glass-panel rounded-lg overflow-hidden border border-white/5 p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={onViewHistory}>
                     <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-green-500/10 text-green-400 flex items-center justify-center border border-green-500/30">
                           <span className="material-symbols-outlined text-sm">arrow_downward</span>
                        </div>
                        <div>
                           <p className="text-white text-sm font-bold">Received Transfer</p>
                           <p className="text-xs text-slate-500 truncate w-32" title="0x7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8">From: 0x7a8b...6d7e</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-green-400 font-mono font-bold">+1,200.00 M</p>
                        <p className="text-xs text-slate-500">2 mins ago</p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={onViewHistory}>
                     <div className="flex items-center gap-3">
                        <div className="size-8 rounded bg-neon-cyan/10 text-neon-cyan flex items-center justify-center border border-neon-cyan/30">
                           <span className="material-symbols-outlined text-sm">account_balance</span>
                        </div>
                        <div>
                           <p className="text-white text-sm font-bold">Staked to Validator</p>
                           <p className="text-xs text-slate-500">To: TensorStats</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-white font-mono font-bold">-500.00 M</p>
                        <p className="text-xs text-slate-500">1 hour ago</p>
                     </div>
                  </div>
                  <button onClick={onViewHistory} className="w-full py-2 text-xs text-center text-slate-400 hover:text-white uppercase tracking-widest font-bold border-t border-white/5 mt-1 pt-3">
                     View Full History
                  </button>
               </div>
            </div>
          </div>

          <div className="lg:w-80 flex flex-col gap-6">
             <div className="glass-panel p-6 rounded-xl border-l-2 border-l-neon-green relative overflow-hidden">
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Portfolio Distribution</h4>
                <div className="flex items-center justify-center py-4 relative">
                   <div className="size-40 rounded-full border-4 border-slate-800 relative flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-neon-cyan border-t-transparent border-l-transparent rotate-45"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-neon-pink border-b-transparent border-r-transparent -rotate-12"></div>
                      <div className="text-center">
                         <p className="text-2xl font-bold text-white">15.2K</p>
                         <p className="text-[10px] text-slate-500 uppercase">Total M</p>
                      </div>
                   </div>
                </div>
                <div className="space-y-3 mt-2">
                   <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300"><span className="size-2 rounded-full bg-neon-pink"></span> Staked</span>
                      <span className="font-mono text-white">78%</span>
                   </div>
                   <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300"><span className="size-2 rounded-full bg-neon-cyan"></span> Free</span>
                      <span className="font-mono text-white">21%</span>
                   </div>
                   <div className="flex justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300"><span className="size-2 rounded-full bg-neon-purple"></span> Locked</span>
                      <span className="font-mono text-white">1%</span>
                   </div>
                </div>
             </div>

             <div className="glass-panel p-6 rounded-xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm flex items-center gap-2">
                   <span className="material-symbols-outlined text-neon-blue">qr_code_2</span> Wallet QR
                </h4>
                <div className="bg-white p-4 rounded-lg flex items-center justify-center mb-4">
                   {/* Placeholder for QR Code */}
                   <div className="size-32 bg-black opacity-10"></div>
                </div>
                <p className="text-[10px] text-center text-slate-400 font-mono break-all">{displayAddress}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountView;