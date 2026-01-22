import React from 'react';

interface ProposalDetailsViewProps {
  onBack: () => void;
}

const ProposalDetailsView: React.FC<ProposalDetailsViewProps> = ({ onBack }) => {
  return (
    <div className="flex-grow px-6 lg:px-12 py-10 flex flex-col gap-8 max-w-[1400px] mx-auto w-full relative z-10 font-sans">
      {/* Background Effects */}
      <div className="grid-bg"></div>
      <div className="fixed inset-0 pointer-events-none z-[-1] bg-gradient-radial from-neon-cyan/5 to-transparent opacity-40"></div>
      <div className="neural-line top-[20%]"></div>
      <div className="neural-line top-[60%] opacity-30"></div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-secondary font-mono">
        <span className="hover:text-neon-cyan transition-colors cursor-pointer" onClick={onBack}>Governance</span>
        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        <span className="text-white">Proposal #082</span>
      </div>

      <section className="flex flex-col gap-6 pb-8 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 max-w-4xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-neon-cyan/10 text-neon-cyan px-3 py-1.5 rounded-full text-xs font-bold border border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.15)] uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span>
                </span>
                Active Voting
              </div>
              <span className="text-text-secondary text-sm font-mono border border-white/10 px-2 py-0.5 rounded">ID: #082</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-display leading-tight">Increase Validator Emission Cap for Subnet 12</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-neon-cyan">person</span>
                <span>Proposer: <a className="text-white font-mono hover:text-neon-cyan transition-colors border-b border-white/20 hover:border-neon-cyan" href="#">0x7a8...9F21</a></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-text-secondary">calendar_month</span>
                <span>Submitted: Oct 20, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-text-secondary">open_in_new</span>
                <a className="hover:text-white transition-colors" href="#">View on Chain</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <article className="holo-card p-8 rounded-2xl relative">
            <div className="prose prose-invert prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Abstract</h3>
              <p className="text-text-secondary leading-relaxed font-light mb-6">
                This proposal suggests increasing the emission cap for Subnet 12 (Text-to-3D) to incentivize higher quality model contributions. Currently, the subnet is hitting limits that discourage new miners from joining the ecosystem. By adjusting the curve, we anticipate a 40% increase in compute power dedicated to 3D generation tasks.
              </p>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Motivation</h3>
              <p className="text-text-secondary leading-relaxed font-light mb-6">
                Subnet 12 has shown remarkable growth in the last epoch. The current <code className="bg-black/40 px-1 py-0.5 rounded border border-white/10 text-neon-cyan font-mono text-sm">emission_cap</code> is set at 2,000 MTN/day. With the influx of 15 new high-performance validators, the rewards per validator have diluted to a point where operational costs are barely covered.
              </p>
              <p className="text-text-secondary leading-relaxed font-light mb-6">
                We propose a temporary lift to 3,500 MTN/day for a period of 12 epochs to stabilize the incentive structure.
              </p>
              <h3 className="text-2xl font-bold text-white mb-4 font-display">Technical Specification</h3>
              <ul className="list-disc list-inside text-text-secondary space-y-2 mb-6 font-light">
                <li>Modify <code className="text-white font-mono">GlobalParam.Subnet12.MaxEmission</code> from 2000 to 3500.</li>
                <li>Adjust difficulty adjustment algorithm (DAA) sensitivity by -5%.</li>
                <li>Effective from Block #455,000.</li>
              </ul>
              <div className="bg-neon-cyan/5 border-l-2 border-neon-cyan p-4 rounded-r-lg my-6">
                <p className="text-sm text-white"><span className="font-bold text-neon-cyan">Note:</span> This change does not affect the global emission cap of the ModernTensor network; it reallocates from the reserve pool.</p>
              </div>
            </div>
          </article>
          
          <div className="holo-card p-6 rounded-2xl flex flex-col gap-4">
            <h3 className="text-lg font-bold text-white mb-2 font-display">Discussion & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all group" href="#">
                <span className="material-symbols-outlined text-text-secondary group-hover:text-neon-cyan">forum</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white group-hover:text-neon-cyan">Commonwealth Forum</span>
                  <span className="text-xs text-text-secondary">Read the RFC thread</span>
                </div>
              </a>
              <a className="flex items-center gap-3 p-3 rounded-lg bg-black/20 border border-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group" href="#">
                <span className="material-symbols-outlined text-text-secondary group-hover:text-indigo-400">chat</span>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white group-hover:text-indigo-400">Discord Channel</span>
                  <span className="text-xs text-text-secondary">#governance-general</span>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1 space-y-6">
          <div className="holo-card active-border rounded-2xl overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-neon-cyan/10 to-transparent p-6 border-b border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-neon-cyan uppercase tracking-widest">Voting Period Ends In</span>
                <span className="material-symbols-outlined text-neon-cyan animate-pulse">timer</span>
              </div>
              <div className="text-4xl font-mono font-bold text-white tracking-widest glitch-text">
                2d 14h 32m
              </div>
            </div>
            <div className="p-6 space-y-8">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Current Results</h4>
                <div className="relative group">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold text-neon-cyan">Yes</span>
                    <span className="text-white font-mono">65% <span className="text-text-secondary">(890k MTN)</span></span>
                  </div>
                  <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-white/10 shadow-inner">
                    <div className="h-full progress-cyan rounded-full transition-all duration-1000" style={{ width: '65%' }}></div>
                  </div>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-neon-cyan/30 text-neon-cyan text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    420 Addresses
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold text-neon-red">No</span>
                    <span className="text-white font-mono">25% <span className="text-text-secondary">(342k MTN)</span></span>
                  </div>
                  <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-white/10 shadow-inner">
                    <div className="h-full progress-pink rounded-full transition-all duration-1000" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="font-bold text-text-secondary">Abstain</span>
                    <span className="text-white font-mono">10% <span className="text-text-secondary">(136k MTN)</span></span>
                  </div>
                  <div className="h-3 w-full bg-black rounded-full overflow-hidden border border-white/10 shadow-inner">
                    <div className="h-full progress-neutral rounded-full transition-all duration-1000" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div className="pt-2 text-right">
                  <p className="text-xs text-text-secondary">Quorum reached: <span className="text-neon-green font-bold">Yes (18% / 10%)</span></p>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Cast Your Vote</h4>
                <div className="grid grid-cols-3 gap-3">
                  <button className="vote-btn-yes py-3 rounded-lg font-bold text-sm transition-all flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined">thumb_up</span>
                    Yes
                  </button>
                  <button className="vote-btn-no py-3 rounded-lg font-bold text-sm transition-all flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined">thumb_down</span>
                    No
                  </button>
                  <button className="bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 py-3 rounded-lg font-bold text-sm transition-all flex flex-col items-center gap-1">
                    <span className="material-symbols-outlined">remove_circle_outline</span>
                    Abstain
                  </button>
                </div>
                <p className="text-[10px] text-text-secondary text-center mt-3 opacity-60">Voting requires locking MTN tokens for the duration of the proposal.</p>
              </div>
            </div>
          </div>
          
          <div className="holo-card p-6 rounded-xl space-y-4 text-sm">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-text-secondary">Start Date</span>
              <span className="text-white font-mono">Oct 20, 2024</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-text-secondary">End Date</span>
              <span className="text-white font-mono">Oct 23, 2024</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Snapshot Block</span>
              <span className="text-neon-cyan font-mono cursor-pointer hover:underline">#452,102</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetailsView;