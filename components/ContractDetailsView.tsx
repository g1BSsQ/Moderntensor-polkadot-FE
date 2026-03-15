import React from 'react';

interface ContractDetailsViewProps {
  onBack: () => void;
  contractAddress?: string | null;
}

const ContractDetailsView: React.FC<ContractDetailsViewProps> = ({ onBack, contractAddress }) => {
  const displayAddress = contractAddress || '0x7f2c...9k1M';

  return (
    <div className="flex justify-center py-8 px-4 lg:px-12 relative z-10 w-full min-h-screen font-sans">
      <style>{`
        .neon-border-green {
            border-bottom: 2px solid #0aff68;
            box-shadow: inset 0 -10px 20px -10px rgba(10,255,104,0.1);
        }
        .code-syntax-keyword { color: #ff7b72; }
        .code-syntax-entity { color: #d2a8ff; }
        .code-syntax-string { color: #a5d6ff; }
        .code-syntax-func { color: #00f3ff; }
        .glitch-effect {
            position: relative;
        }
        .glitch-effect::before,
        .glitch-effect::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #050b14;
        }
        .glitch-effect::before {
            left: 2px;
            text-shadow: -1px 0 #ff00c1;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
        }
        .glitch-effect::after {
            left: -2px;
            text-shadow: -1px 0 #00fff9;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
            0% { clip: rect(35px, 9999px, 36px, 0); }
            20% { clip: rect(69px, 9999px, 86px, 0); }
            40% { clip: rect(2px, 9999px, 88px, 0); }
            60% { clip: rect(51px, 9999px, 12px, 0); }
            80% { clip: rect(10px, 9999px, 80px, 0); }
            100% { clip: rect(93px, 9999px, 50px, 0); }
        }
        @keyframes glitch-anim2 {
            0% { clip: rect(19px, 9999px, 90px, 0); }
            20% { clip: rect(32px, 9999px, 11px, 0); }
            40% { clip: rect(89px, 9999px, 2px, 0); }
            60% { clip: rect(13px, 9999px, 5px, 0); }
            80% { clip: rect(76px, 9999px, 63px, 0); }
            100% { clip: rect(2px, 9999px, 35px, 0); }
        }
        .line-numbers {
            counter-reset: line;
        }
        .line-number::before {
            counter-increment: line;
            content: counter(line);
            display: inline-block;
            width: 2rem;
            margin-right: 1rem;
            text-align: right;
            color: #475569;
            user-select: none;
        }
      `}</style>
      <div className="w-full max-w-[1400px] flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 items-center text-sm font-mono tracking-wide text-slate-400/80">
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>HOME</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>CONTRACTS</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-neon-cyan drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">{displayAddress}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-end gap-6 pb-6 border-b border-white/5 relative">
          <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-gradient-to-r from-neon-cyan to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-neon-pink to-transparent"></div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-[#0d1117] border border-white/10 flex items-center justify-center ring-2 ring-green-500/50 shadow-[0_0_20px_rgba(10,255,104,0.2)]">
                <span className="material-symbols-outlined text-5xl text-green-500">code_blocks</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-black/80 backdrop-blur border border-green-500/30 text-green-500 rounded p-1">
                <span className="material-symbols-outlined text-sm">verified_user</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neon-purple/10 text-neon-purple border border-neon-purple/40 uppercase tracking-widest shadow-[0_0_10px_rgba(188,19,254,0.2)]">
                  Protocol Contract
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/40 uppercase tracking-widest shadow-[0_0_10px_rgba(10,255,104,0.2)] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[10px]">check_circle</span> Verified
                </span>
              </div>
              <h1 className="text-white text-3xl md:text-5xl font-black leading-tight tracking-tight uppercase glitch-effect flex items-center gap-3 font-mono" data-text={displayAddress}>
                {displayAddress}
                <button className="text-slate-500 hover:text-neon-cyan transition-colors" title="Copy Address">
                  <span className="material-symbols-outlined text-2xl">content_copy</span>
                </button>
              </h1>
              <p className="text-slate-400 text-sm font-mono max-w-2xl flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
                Contract Name: <span className="text-white font-bold">N/A</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none group flex items-center justify-center gap-2 px-6 py-3 bg-white/5 cursor-not-allowed text-slate-500 border border-white/10 rounded-none clip-path-polygon transition-all">
              <span className="material-symbols-outlined text-xl">play_circle</span>
              <span className="font-bold tracking-wider uppercase">Interact</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-2">
          <button className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-neon-cyan border-b-2 border-neon-cyan bg-white/5 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">dashboard</span> Overview
          </button>
          <button className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-white border-b-2 border-transparent hover:border-white/20 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">code</span> Code
          </button>
          <button className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-white border-b-2 border-transparent hover:border-white/20 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">event_list</span> Events
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-cyan relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-cyan/5 rounded-full blur-3xl group-hover:bg-neon-cyan/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Creator</p>
              <span className="material-symbols-outlined text-neon-cyan/70 text-2xl drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">engineering</span>
            </div>
            <div className="flex flex-col gap-1 mt-2 z-10">
              <span className="text-white text-lg font-mono font-bold leading-none truncate">N/A</span>
              <span className="text-xs text-slate-500">Deployer Address</span>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg border-l-2 border-l-white/20 relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Creation Block</p>
              <span className="material-symbols-outlined text-white/50 text-2xl">deployed_code</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-2xl font-bold leading-none font-mono">N/A</p>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-pink relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-neon-pink/5 rounded-full blur-3xl group-hover:bg-neon-pink/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Interactions</p>
              <span className="material-symbols-outlined text-neon-pink/70 text-2xl drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">hub</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none glow-text-pink">N/A</p>
            </div>
          </div>
          <div className="glass-panel flex flex-col gap-2 p-6 rounded-lg neon-border-green relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
            <div className="flex justify-between items-start z-10">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Contract Balance</p>
              <span className="material-symbols-outlined text-green-500/70 text-2xl drop-shadow-[0_0_5px_rgba(10,255,104,0.5)]">account_balance_wallet</span>
            </div>
            <div className="flex items-end gap-3 mt-2 z-10">
              <p className="text-white text-3xl font-bold leading-none">N/A</p>
            </div>
          </div>
        </div>

        {/* Source Code & Interaction */}
        <div className="flex flex-col xl:flex-row gap-6 mt-2 min-h-[500px]">
          {/* Source Code */}
          <div className="flex-grow xl:w-2/3 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-neon-cyan">terminal</span> Smart Contract Source
              </h3>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">lib.rs</span>
                <span className="px-2 py-1 rounded bg-slate-800/50 text-slate-600 border border-slate-800 font-mono">Cargo.toml</span>
              </div>
            </div>
            <div className="glass-panel rounded-lg overflow-hidden border border-white/10 flex flex-col h-full bg-[#0d1117] relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-xs text-slate-500 font-mono">Read-Only View</div>
              </div>
              <div className="p-4 overflow-auto custom-scrollbar font-mono text-sm leading-6 h-[500px]">
                <div className="line-numbers text-slate-300">
                  <span className="line-number"></span><span className="code-syntax-keyword">use</span> ink_lang::contract;
                  <br/>
                  <span className="line-number"></span><span className="code-syntax-keyword">#[ink::contract]</span>
                  <br/>
                  <span className="line-number"></span><span className="code-syntax-keyword">mod</span> <span className="code-syntax-entity">quantum_bridge</span> {'{'}
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">use</span> ink_storage::collections::HashMap <span className="code-syntax-keyword">as</span> StorageHashMap;
                  <br/>
                  <span className="line-number"></span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">#[ink(storage)]</span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">pub struct</span> <span className="code-syntax-entity">Bridge</span> {'{'}
                  <br/>
                  <span className="line-number"></span>        admin: <span className="code-syntax-entity">AccountId</span>,
                  <br/>
                  <span className="line-number"></span>        locked_tokens: <span className="code-syntax-entity">Balance</span>,
                  <br/>
                  <span className="line-number"></span>        processed_txs: <span className="code-syntax-entity">StorageHashMap</span>&lt;<span className="code-syntax-entity">Hash</span>, <span className="code-syntax-entity">bool</span>&gt;,
                  <br/>
                  <span className="line-number"></span>    {'}'}
                  <br/>
                  <span className="line-number"></span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">impl</span> <span className="code-syntax-entity">Bridge</span> {'{'}
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">#[ink(constructor)]</span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">pub fn</span> <span className="code-syntax-func">new</span>(initial_supply: <span className="code-syntax-entity">Balance</span>) -&gt; <span className="code-syntax-keyword">Self</span> {'{'}
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">let</span> caller = <span className="code-syntax-keyword">Self</span>::env().caller();
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">Self</span> {'{'}
                  <br/>
                  <span className="line-number"></span>                admin: caller,
                  <br/>
                  <span className="line-number"></span>                locked_tokens: initial_supply,
                  <br/>
                  <span className="line-number"></span>                processed_txs: <span className="code-syntax-entity">StorageHashMap</span>::new(),
                  <br/>
                  <span className="line-number"></span>            {'}'}
                  <br/>
                  <span className="line-number"></span>        {'}'}
                  <br/>
                  <span className="line-number"></span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">#[ink(message, payable)]</span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">pub fn</span> <span className="code-syntax-func">bridge_transfer</span>(&amp;<span className="code-syntax-keyword">mut self</span>, destination: <span className="code-syntax-entity">AccountId</span>) {'{'}
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">let</span> transferred_val = <span className="code-syntax-keyword">self</span>.env().transferred_value();
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">assert!</span>(transferred_val &gt; <span className="code-syntax-entity">0</span>, <span className="code-syntax-string">"Transfer value must be &gt; 0"</span>);
                  <br/>
                  <span className="line-number"></span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">self</span>.locked_tokens += transferred_val;
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">self</span>.env().emit_event(<span className="code-syntax-entity">BridgeTransfer</span> {'{'}
                  <br/>
                  <span className="line-number"></span>                from: <span className="code-syntax-keyword">self</span>.env().caller(),
                  <br/>
                  <span className="line-number"></span>                to: destination,
                  <br/>
                  <span className="line-number"></span>                value: transferred_val,
                  <br/>
                  <span className="line-number"></span>            {'}'});
                  <br/>
                  <span className="line-number"></span>        {'}'}
                  <br/>
                  <span className="line-number"></span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">#[ink(message)]</span>
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">pub fn</span> <span className="code-syntax-func">get_locked_amount</span>(&amp;<span className="code-syntax-keyword">self</span>) -&gt; <span className="code-syntax-entity">Balance</span> {'{'}
                  <br/>
                  <span className="line-number"></span> <span className="code-syntax-keyword">self</span>.locked_tokens
                  <br/>
                  <span className="line-number"></span>        {'}'}
                  <br/>
                  <span className="line-number"></span>    {'}'}
                  <br/>
                  <span className="line-number"></span>{'}'}
                </div>
              </div>
            </div>
          </div>

          {/* Interaction Panel */}
          <div className="xl:w-1/3 flex flex-col gap-4">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-neon-pink">touch_app</span> Interaction Panel
            </h3>
            <div className="glass-panel rounded-lg overflow-hidden border border-white/5 flex flex-col h-full bg-[#0d1117]">
              <div className="p-4 border-b border-white/10 bg-white/5">
                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-xs font-bold rounded bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 shadow-[0_0_10px_rgba(0,243,255,0.2)]">Read Contract</button>
                  <button className="flex-1 py-2 text-xs font-bold rounded bg-transparent text-slate-500 border border-transparent hover:text-white hover:bg-white/5 transition-colors">Write Contract</button>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col gap-2 p-3 rounded border border-white/10 bg-white/[0.02]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono text-white font-bold">1. get_locked_amount</span>
                    <span className="material-symbols-outlined text-slate-500 text-sm">arrow_forward</span>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className="text-slate-500">Result (Balance):</span>
                    <span className="block mt-1 font-mono text-green-500">2,500,000,000,000</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded border border-white/10 bg-white/[0.02]">
                  <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 p-1 -m-1 rounded transition-colors">
                    <span className="text-sm font-mono text-white font-bold">2. get_admin</span>
                    <span className="material-symbols-outlined text-slate-500 text-sm">expand_more</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded border border-white/10 bg-white/[0.02]">
                  <div className="flex justify-between items-center cursor-pointer hover:bg-white/5 p-1 -m-1 rounded transition-colors">
                    <span className="text-sm font-mono text-white font-bold">3. processed_txs</span>
                    <span className="material-symbols-outlined text-slate-500 text-sm">expand_more</span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <input className="w-full bg-[#050b14] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:border-neon-cyan focus:ring-0 placeholder:text-slate-600 outline-none" placeholder="Hash (bytes32)" type="text"/>
                    <button className="bg-white/10 hover:bg-neon-cyan hover:text-black text-white rounded px-3 transition-colors">
                      <span className="material-symbols-outlined text-sm">search</span>
                    </button>
                  </div>
                </div>
                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#0d1117] px-2 text-xs text-slate-500 uppercase">Write Functions</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-3 rounded border border-neon-pink/30 bg-neon-pink/[0.02]">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono text-neon-pink font-bold">4. bridge_transfer</span>
                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-neon-pink/20 text-neon-pink border border-neon-pink/40">PAYABLE</span>
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <input className="w-full bg-[#050b14] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:border-neon-pink focus:ring-0 placeholder:text-slate-600 outline-none" placeholder="destination (AccountId)" type="text"/>
                    <input className="w-full bg-[#050b14] border border-white/10 rounded px-3 py-2 text-xs font-mono text-white focus:border-neon-pink focus:ring-0 placeholder:text-slate-600 outline-none" placeholder="Amount (Balance)" type="text"/>
                    <button className="w-full py-2 mt-1 text-xs font-bold uppercase rounded bg-neon-pink/10 hover:bg-neon-pink text-neon-pink hover:text-black border border-neon-pink/50 transition-colors">
                      Execute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailsView;