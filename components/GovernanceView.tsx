import React from 'react';
import { Proposal } from '../types';

const proposals: Proposal[] = [
  { id: '#082', title: 'Increase Validator Emission Cap for Subnet 12', description: 'This proposal suggests increasing the emission cap for Subnet 12 (Text-to-3D) to incentivize higher quality model contributions.', status: 'active', votes: { yes: 65, no: 25, abstain: 10 }, proposer: '0x7a...9F', endsIn: '2d 14h', totalVotes: '1.4M' },
  { id: '#081', title: 'Register New Subnet: Bioinformatics Alpha', description: 'A proposal to register a new subnet dedicated to protein folding simulations. Requires a lock of 10,000 MTN and community approval.', status: 'active', votes: { yes: 92, no: 5, abstain: 3 }, proposer: 'BioLab_DAO', endsIn: '5d 08h', totalVotes: '1.2M' },
  { id: '#080', title: 'Reduce Registration Fee to 200 MTN', description: 'Proposal to lower the barrier for entry for new miners by reducing the registration burn fee.', status: 'passed', votes: { yes: 88, no: 12, abstain: 0 }, proposer: '', endedDate: 'Oct 24, 2024', totalVotes: '2M' },
  { id: '#079', title: 'Emergency Pause on Subnet 4', description: 'Proposal to temporarily pause Subnet 4 due to suspected exploit. Community consensus deemed evidence insufficient.', status: 'rejected', votes: { yes: 24, no: 76, abstain: 0 }, proposer: '', endedDate: 'Oct 12, 2024', totalVotes: '980K' },
];

interface GovernanceViewProps {
  onSelectProposal?: (id: string) => void;
  onCreateProposal?: () => void;
}

const GovernanceView: React.FC<GovernanceViewProps> = ({ onSelectProposal, onCreateProposal }) => {
  return (
    <div className="flex flex-col gap-10 py-10 px-6 lg:px-12 w-full max-w-[1200px] mx-auto font-sans">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-8 border-b border-white/10 relative">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-neon-purple to-transparent opacity-30"></div>
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 uppercase tracking-widest shadow-[0_0_10px_rgba(0,243,255,0.2)]">Senate Chamber</span>
            <span className="text-text-secondary text-sm font-mono tracking-wide">Block #452,102</span>
          </div>
          <h1 className="text-5xl font-bold text-white tracking-tight font-display relative inline-block">
             Governance Portal
             <span className="absolute -top-2 -right-2 flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-purple"></span>
             </span>
          </h1>
          <p className="text-text-secondary max-w-xl text-lg font-light leading-relaxed">
             Shape the <span className="text-white font-medium">Neural Architecture</span>. Vote on upgrades, subnet allocations, and parameter shifts in the ModernTensor network.
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-6">
           <div className="glass-panel px-6 py-4 rounded-lg flex items-center gap-8 border border-white/10 bg-black/40">
             <div>
                <p className="text-text-secondary text-[10px] uppercase font-bold tracking-widest mb-1">Total Voted Power</p>
                <p className="text-3xl font-bold text-white tracking-tighter">2.8M <span className="text-neon-cyan text-2xl">MTN</span></p>
             </div>
             <div className="h-10 w-px bg-white/10"></div>
             <div>
                <p className="text-text-secondary text-[10px] uppercase font-bold tracking-widest mb-1">Active Proposals</p>
                <p className="text-3xl font-bold text-white tracking-tighter">4</p>
             </div>
           </div>
           <button 
             onClick={onCreateProposal}
             className="flex items-center gap-3 px-6 py-3 rounded-lg font-bold text-black bg-gradient-to-r from-neon-cyan to-blue-500 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] transition-all uppercase tracking-wide"
           >
             <span className="material-symbols-outlined text-[20px]">add_circle</span>
             Create Proposal
           </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-4">
        <button className="bg-neon-cyan/20 text-neon-cyan border border-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.2)] px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all hover:bg-neon-cyan/30">All Proposals</button>
        <button className="bg-panel-dark text-text-secondary border border-white/5 hover:border-neon-cyan/50 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap">Active Voting</button>
        <button className="bg-panel-dark text-text-secondary border border-white/5 hover:border-neon-green/50 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap">Passed</button>
        <button className="bg-panel-dark text-text-secondary border border-white/5 hover:border-neon-red/50 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap">Rejected</button>
      </div>

      {/* Proposals List */}
      <div className="space-y-6">
        {proposals.map((p) => {
           const isVoting = p.status === 'active';
           return (
             <article key={p.id} className={`glass-panel p-6 rounded-2xl relative group transition-all duration-300 hover:transform hover:-translate-y-1 ${isVoting ? 'border border-neon-cyan/50 shadow-[0_0_20px_rgba(0,243,255,0.1)]' : 'border border-white/10 opacity-80 hover:opacity-100 hover:border-white/30'}`}>
                {/* Header Badge */}
                <div className="flex justify-between items-start mb-4">
                   <div className="flex items-center gap-3">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                        isVoting ? 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30' : 
                        p.status === 'passed' ? 'bg-neon-green/10 text-neon-green border-neon-green/30' : 
                        'bg-neon-red/10 text-neon-red border-neon-red/30'
                      }`}>
                         {isVoting && <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan"></span></span>}
                         {isVoting ? 'Active Voting' : p.status === 'passed' ? 'Passed' : 'Rejected'}
                      </div>
                      <div className="text-text-secondary text-xs font-mono bg-black/40 px-2 py-1 rounded border border-white/10">ID: {p.id}</div>
                   </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                   <div className="flex-1">
                      <h3 
                        className={`text-2xl font-bold text-white mb-2 ${isVoting ? 'group-hover:text-neon-cyan' : ''} transition-colors cursor-pointer font-display`}
                        onClick={() => isVoting && onSelectProposal && onSelectProposal(p.id)}
                      >
                          {p.title}
                      </h3>
                      <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-2xl font-light">{p.description}</p>
                      
                      <div className="flex items-center gap-6 text-xs text-text-secondary">
                         {p.proposer && (
                            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                               <span className="material-symbols-outlined text-[16px] text-neon-cyan">person</span>
                               <span>Proposer: <span className="text-white font-mono hover:text-neon-cyan cursor-pointer transition-colors">{p.proposer}</span></span>
                            </div>
                         )}
                         <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                            <span className="material-symbols-outlined text-[16px] text-neon-pink">schedule</span>
                            <span>{isVoting ? 'Ends in:' : 'Ended:'} <span className="text-white font-bold">{isVoting ? p.endsIn : p.endedDate}</span></span>
                         </div>
                      </div>
                   </div>

                   {/* Voting Bars */}
                   <div className="w-full md:w-80 flex flex-col justify-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                      {isVoting ? (
                         <>
                            {[
                               { label: 'Yes', val: p.votes.yes, color: 'bg-gradient-to-r from-blue-500 to-neon-cyan', text: 'text-neon-cyan', shadow: 'shadow-[0_0_8px_rgba(0,243,255,0.6)]' },
                               { label: 'No', val: p.votes.no, color: 'bg-gradient-to-r from-red-800 to-neon-red', text: 'text-neon-red', shadow: 'shadow-[0_0_8px_rgba(255,0,85,0.6)]' },
                               { label: 'Abstain', val: p.votes.abstain, color: 'bg-gray-600', text: 'text-slate-400', shadow: '' }
                            ].map((opt) => (
                               <div key={opt.label}>
                                  <div className="flex justify-between text-xs mb-1.5">
                                     <span className={`font-bold uppercase tracking-wider ${opt.text}`}>{opt.label}</span>
                                     <span className="text-white font-mono">{opt.val}%</span>
                                  </div>
                                  <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/10">
                                     <div className={`h-full rounded-full ${opt.color} ${opt.shadow}`} style={{ width: `${opt.val}%` }}></div>
                                  </div>
                               </div>
                            ))}
                         </>
                      ) : (
                         <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-bold w-8 uppercase ${p.status === 'passed' ? 'text-neon-green' : 'text-neon-red'}`}>{p.status === 'passed' ? 'Yes' : 'No'}</span>
                            <div className="h-2 flex-1 bg-black rounded-full overflow-hidden border border-white/10">
                               <div className={`h-full rounded-full ${p.status === 'passed' ? 'bg-neon-green shadow-[0_0_8px_rgba(0,255,163,0.6)]' : 'bg-neon-red shadow-[0_0_8px_rgba(255,0,85,0.6)]'}`} style={{ width: p.status === 'passed' ? '88%' : '76%' }}></div>
                            </div>
                            <span className="text-xs text-white font-mono">{p.status === 'passed' ? '88%' : '76%'}</span>
                         </div>
                      )}
                   </div>
                </div>

                {isVoting && (
                   <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                      <button 
                        onClick={() => onSelectProposal && onSelectProposal(p.id)}
                        className="text-sm font-bold text-neon-cyan hover:text-white transition-all flex items-center gap-1 group/btn uppercase tracking-wider"
                      >
                         View Full Details
                         <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                   </div>
                )}
             </article>
           );
        })}
      </div>
    </div>
  );
};

export default GovernanceView;