import React from 'react';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

interface AccountSelectorModalProps {
  accounts: InjectedAccountWithMeta[];
  onSelect: (address: string) => void;
  onClose: () => void;
}

const AccountSelectorModal: React.FC<AccountSelectorModalProps> = ({ accounts, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center px-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-[#0a0e17] border border-neon-cyan/30 rounded-xl shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-neon-cyan/5 to-transparent">
          <div>
            <h3 className="text-white font-bold text-lg uppercase tracking-tight">Select Account</h3>
            <p className="text-slate-400 text-xs mt-1">Found {accounts.length} available accounts</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Account List */}
        <div className="p-4 flex flex-col gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
          {accounts.map((account) => (
            <button
              key={account.address}
              onClick={() => onSelect(account.address)}
              className="w-full flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-neon-cyan/10 border border-white/5 hover:border-neon-cyan/30 transition-all group text-left"
            >
              <div className="size-10 rounded-full bg-slate-800 ring-1 ring-white/20 flex items-center justify-center font-bold text-sm text-neon-cyan group-hover:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all">
                {account.meta.name?.substring(0, 2).toUpperCase() || '??'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold truncate group-hover:text-neon-cyan transition-colors">
                  {account.meta.name || 'Unnamed Account'}
                </p>
                <p className="text-xs text-slate-500 font-mono truncate">
                  {account.address}
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-600 group-hover:text-neon-cyan transition-colors">chevron_right</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 text-[10px] text-slate-500 text-center uppercase tracking-widest font-bold">
          SECURE CONNECTION VIA POLKADOT EXTENSION
        </div>
      </div>
    </div>
  );
};

export default AccountSelectorModal;
