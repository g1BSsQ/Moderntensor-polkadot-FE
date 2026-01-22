import React from 'react';

interface CreateProposalViewProps {
  onBack: () => void;
}

const CreateProposalView: React.FC<CreateProposalViewProps> = ({ onBack }) => {
  return (
    <div className="flex-grow px-6 lg:px-12 py-10 max-w-[1200px] mx-auto w-full relative z-10 font-sans">
        <div className="mb-10">
            <button 
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-neon-cyan transition-colors mb-4 group"
            >
                <span className="material-symbols-outlined text-base group-hover:-translate-x-1 transition-transform">arrow_back</span>
                Back to Governance
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-display glitch-text">Create Proposal</h1>
            <p className="text-text-secondary mt-2 text-lg font-light">Draft and submit a new proposal to the ModernTensor Senate.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                {/* Stepper */}
                <div className="holo-card p-6 rounded-xl flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -z-10 -translate-y-1/2 mx-10"></div>
                    
                    <div className="flex flex-col items-center gap-2 relative z-10 step-active">
                        <div className="step-dot w-8 h-8 rounded-full border-2 border-white/20 bg-card-dark flex items-center justify-center text-xs font-bold transition-all">1</div>
                        <span className="step-text text-xs uppercase font-bold tracking-wider">Basics</span>
                    </div>
                    <div className="flex-1 h-0.5 step-line-active mx-2"></div>
                    
                    <div className="flex flex-col items-center gap-2 relative z-10 step-active">
                        <div className="step-dot w-8 h-8 rounded-full border-2 border-white/20 bg-card-dark flex items-center justify-center text-xs font-bold transition-all">2</div>
                        <span className="step-text text-xs uppercase font-bold tracking-wider">Details</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-white/10 mx-2"></div>
                    
                    <div className="flex flex-col items-center gap-2 relative z-10 text-text-secondary">
                        <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-card-dark flex items-center justify-center text-xs font-bold">3</div>
                        <span className="text-xs uppercase font-bold tracking-wider">Actions</span>
                    </div>
                    <div className="flex-1 h-0.5 bg-white/10 mx-2"></div>
                    
                    <div className="flex flex-col items-center gap-2 relative z-10 text-text-secondary">
                        <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-card-dark flex items-center justify-center text-xs font-bold">4</div>
                        <span className="text-xs uppercase font-bold tracking-wider">Review</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="holo-card p-8 rounded-2xl space-y-6">
                        <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-4">
                            <span className="material-symbols-outlined text-neon-cyan">edit_document</span>
                            <h3 className="text-xl font-bold text-white">Proposal Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">Proposal Title</label>
                                <input className="holo-input w-full px-4 py-3 rounded-lg text-white placeholder-white/20 focus:ring-0" placeholder="E.g. Increase Validator Emission Cap" type="text"/>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">Category</label>
                                <div className="relative">
                                    <select className="holo-input w-full px-4 py-3 rounded-lg appearance-none cursor-pointer focus:ring-0">
                                        <option>Core Upgrade</option>
                                        <option>Parameter Change</option>
                                        <option>Subnet Registration</option>
                                        <option>Treasury Allocation</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">expand_more</span>
                                </div>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-bold text-text-secondary mb-2 uppercase tracking-wide">Discussion Link (Optional)</label>
                                <input className="holo-input w-full px-4 py-3 rounded-lg text-white placeholder-white/20 focus:ring-0" placeholder="https://forum.moderntensor..." type="url"/>
                            </div>
                        </div>
                    </div>

                    <div className="holo-card p-8 rounded-2xl space-y-6">
                        <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-4">
                            <span className="material-symbols-outlined text-neon-pink">description</span>
                            <h3 className="text-xl font-bold text-white">Detailed Description</h3>
                        </div>
                        <div className="rounded-lg border border-white/10 overflow-hidden bg-black/20 focus-within:border-neon-cyan/50 focus-within:shadow-[0_0_15px_rgba(0,243,255,0.1)] transition-all">
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
                                <button className="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
                                <button className="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
                                <div className="w-px h-4 bg-white/10 mx-1"></div>
                                <button className="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">format_list_bulleted</span></button>
                                <button className="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">format_list_numbered</span></button>
                                <div className="w-px h-4 bg-white/10 mx-1"></div>
                                <button className="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">link</span></button>
                                <button className="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">code</span></button>
                                <button className="p-1.5 hover:bg-white/10 rounded text-text-secondary hover:text-white transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">image</span></button>
                            </div>
                            <textarea className="w-full bg-transparent p-4 text-white placeholder-white/20 focus:outline-none resize-y font-mono text-sm" placeholder="Provide a detailed explanation of your proposal using Markdown..." rows={12}></textarea>
                        </div>
                    </div>

                    <div className="holo-card p-8 rounded-2xl space-y-6">
                        <div className="flex items-center gap-3 mb-2 border-b border-white/5 pb-4">
                            <span className="material-symbols-outlined text-neon-green">tune</span>
                            <h3 className="text-xl font-bold text-white">On-chain Actions</h3>
                        </div>
                        <div className="bg-black/30 rounded-lg p-4 border border-white/10 border-dashed flex flex-col items-center justify-center gap-3 text-center py-8">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                                <span className="material-symbols-outlined text-text-secondary">add_link</span>
                            </div>
                            <p className="text-text-secondary text-sm">No actions added yet.</p>
                            <button className="text-neon-cyan text-sm font-bold hover:text-white hover:text-glow transition-all flex items-center gap-1" type="button">
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add Parameter Change
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                        <button className="px-6 py-3 rounded-lg border border-white/10 text-text-secondary font-bold hover:text-white hover:border-white/30 transition-all flex items-center gap-2" type="button">
                            <span className="material-symbols-outlined">visibility</span>
                            Preview
                        </button>
                        <button className="shimmer-btn px-8 py-3 rounded-lg font-bold text-black shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:scale-105 transition-all flex items-center gap-2" type="submit">
                            <span>Submit Proposal</span>
                            <span className="material-symbols-outlined">send</span>
                        </button>
                    </div>
                </form>
            </div>

            <aside className="lg:col-span-1 space-y-6 sticky top-28">
                <div className="holo-card p-6 rounded-xl border-l-4 border-l-neon-pink">
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">Submission Cost</h4>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-3xl font-bold text-white tracking-tighter">100</span>
                        <span className="text-xl font-bold text-neon-pink mb-1">MTN</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4">
                        This amount will be burned upon submission to prevent spam. Ensure you have sufficient balance.
                    </p>
                    <div className="flex justify-between items-center bg-black/40 p-3 rounded border border-white/5">
                        <span className="text-xs text-text-secondary">Your Balance:</span>
                        <span className="text-sm font-mono text-white">4,250.05 MTN</span>
                    </div>
                </div>

                <div className="holo-card p-6 rounded-xl border-l-4 border-l-neon-cyan">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-neon-cyan">policy</span>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Governance Guidelines</h4>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-sm text-text-secondary">
                            <span className="material-symbols-outlined text-neon-cyan text-[18px] shrink-0">check_small</span>
                            <span>Proposals must have a clear, actionable title.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-text-secondary">
                            <span className="material-symbols-outlined text-neon-cyan text-[18px] shrink-0">check_small</span>
                            <span>Provide comprehensive technical details for parameter changes.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-text-secondary">
                            <span className="material-symbols-outlined text-neon-cyan text-[18px] shrink-0">check_small</span>
                            <span>Discuss on the forum for at least 3 days before submitting.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-text-secondary">
                            <span className="material-symbols-outlined text-neon-cyan text-[18px] shrink-0">check_small</span>
                            <span>Malicious proposals will result in slashing.</span>
                        </li>
                    </ul>
                    <a className="inline-block mt-6 text-xs text-neon-cyan font-bold hover:text-white hover:text-glow transition-all uppercase tracking-wide border-b border-neon-cyan/30 pb-0.5" href="#">
                        Read Full Documentation
                    </a>
                </div>

                <div className="p-6 rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <h4 className="text-white font-bold mb-2">Need Assistance?</h4>
                    <p className="text-text-secondary text-sm mb-4">Join our Discord server to get help from the community or governance moderators.</p>
                    <button className="w-full py-2 rounded bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-colors border border-white/10">
                        Join Discord
                    </button>
                </div>
            </aside>
        </div>
    </div>
  );
};

export default CreateProposalView;