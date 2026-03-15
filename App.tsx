import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from './types';
import SubnetsHub from './components/SubnetsHub';
import SubnetView from './components/SubnetView';
import SubnetNodesView from './components/SubnetNodesView';
import SubnetWeightsView from './components/SubnetWeightsView';
import SubnetRegistrationView from './components/SubnetRegistrationView';
import SubnetDistributionView from './components/SubnetDistributionView';
import TokenomicsView from './components/TokenomicsView';
import ValidatorsView from './components/ValidatorsView';
import ValidatorDetailView from './components/ValidatorDetailView';
import AccountView from './components/AccountView';
import TransactionDetailsView from './components/TransactionDetailsView';
import BlockDetailsView from './components/BlockDetailsView';
import AccountHistoryView from './components/AccountHistoryView';
import ContractDetailsView from './components/ContractDetailsView';
import AllTransactionsView from './components/AllTransactionsView';
import AllBlocksView from './components/AllBlocksView';
import { DataBridgeProvider } from './context/DataBridgeContext';
import { WalletProvider, WalletContext } from './context/WalletContext';
import { useWallet } from './hooks/useWallet';
import { useDataBridge } from './hooks/useDataBridge';
import ErrorBoundary from './components/ui/ErrorBoundary';
import AccountSelectorModal from './components/ui/AccountSelectorModal';

// Toast Component
const ToastNotification = ({ message, type, onClose }: { message: string, type: 'success' | 'info' | 'error', onClose: () => void }) => (
  <div className={`toast-enter fixed bottom-6 right-6 z-[100] px-6 py-4 rounded-lg border backdrop-blur-md shadow-2xl flex items-center gap-4 min-w-[300px] ${
    type === 'success' ? 'bg-green-500/10 border-green-500/50 text-green-400' : 
    type === 'error' ? 'bg-red-500/10 border-red-500/50 text-red-400' : 
    'bg-neon-cyan/10 border-neon-cyan/50 text-neon-cyan'
  }`}>
    <span className="material-symbols-outlined text-2xl">
        {type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info'}
    </span>
    <div className="flex flex-col">
        <span className="font-bold uppercase text-xs tracking-wider">{type}</span>
        <span className="text-sm font-mono text-white">{message}</span>
    </div>
    <button onClick={onClose} className="ml-auto hover:text-white"><span className="material-symbols-outlined text-lg">close</span></button>
  </div>
);

// Boot Sequence Component
const BootSequence = ({ isLoading, onComplete }: { isLoading: boolean, onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const messages = [
    "INITIALIZING KERNEL...",
    "LOADING NEURAL WEIGHTS [v2.4.1]... [65,536 bits]",
    "CONNECTING TO METAGRAPH... [MTN-RPC-SYNC]",
    "SYNCING SUBNET CONSENSUS...",
    "ESTABLISHING SECURE HANDSHAKE.."
  ];

  useEffect(() => {
    if (currentIndex < messages.length) {
      const delay = Math.random() * 300 + 200;
      const timer = setTimeout(() => {
        setLines(prev => [...prev, messages[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
        
        const el = document.getElementById('boot-terminal');
        if (el) el.scrollTop = el.scrollHeight;
      }, delay);
      return () => clearTimeout(timer);
    } else if (!isLoading) {
      // All predefined messages shown AND data is loaded
      const timer = setTimeout(() => {
        setLines(prev => [...prev, "SYSTEM ONLINE."]);
        setTimeout(onComplete, 1000);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isLoading, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#02050a] z-[9999] flex items-center justify-center font-mono text-neon-cyan p-4">
      <div className="w-full max-w-md border border-white/10 rounded-lg p-6 bg-black shadow-[0_0_50px_rgba(0,243,255,0.1)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-scan-input"></div>
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
            <span className="text-[10px] text-slate-500 tracking-[0.2em]">MODERNTENSOR_BIOS_UEFI_v1.0.4</span>
            <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50"></div>
            </div>
        </div>
        <div id="boot-terminal" className="flex flex-col gap-2 h-64 overflow-y-auto custom-scrollbar pr-2">
            {lines.map((line, i) => (
            <div key={i} className="text-xs animate-fade-in-up flex gap-2">
                <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}]</span>
                <span className={line === "SYSTEM ONLINE." ? "text-white font-bold glow-text-cyan" : "text-neon-cyan"}>{`> ${line}`}</span>
            </div>
            ))}
            {currentIndex < messages.length || isLoading ? (
              <div className="flex items-center gap-2 mt-1">
                <span className="h-4 w-2 bg-neon-cyan animate-pulse"></span>
                <span className="text-[10px] text-slate-600 animate-pulse italic">SYNCING_METAGRAPH...</span>
              </div>
            ) : null}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.SUBNETS);
  const [selectedSubnet, setSelectedSubnet] = useState<string | null>(null);
  const [activeSubnetNetuid, setActiveSubnetNetuid] = useState<number>(1);
  const [selectedValidator, setSelectedValidator] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedContract, setSelectedContract] = useState<string | null>(null);
  
  // UI State
  const [isBooting, setIsBooting] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data } = useDataBridge();
  const { 
    selectedAccount: walletAccount, 
    accounts: walletAccounts, 
    isConnecting, 
    connect: walletConnect, 
    disconnect: walletDisconnect,
    setSelectedAccountByAddress: setWalletAccountByAddress,
    error: walletError 
  } = useWallet();

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: number, message: string, type: 'success' | 'info' | 'error'}>>([]);
  
  // Command Palette State
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState('');
  const cmdInputRef = useRef<HTMLInputElement>(null);

  // Global Clipboard Handler & Keyboard Shortcuts
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    addNotification('Copied to clipboard', 'success');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsCmdKOpen(prev => !prev);
        }
        if (e.key === 'Escape') {
            setIsCmdKOpen(false);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
      if (isCmdKOpen && cmdInputRef.current) {
          cmdInputRef.current.focus();
      }
      if (!isCmdKOpen) {
          setCmdQuery('');
      }
  }, [isCmdKOpen]);

  const addNotification = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
      const id = Date.now();
      setNotifications(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);
  };

  const handleConnectWallet = async () => {
      if (walletAccount) {
          walletDisconnect();
          addNotification('Wallet Disconnected', 'info');
      } else {
          try {
              await walletConnect();
          } catch (err: any) {
              addNotification(err.message || 'Failed to connect', 'error');
          }
      }
  };

  // Trigger account selector modal if multiple accounts found but none selected
  useEffect(() => {
    if (!walletAccount && walletAccounts.length > 1 && !isConnecting) {
      setIsAccountModalOpen(true);
    }
    if (walletAccount && isAccountModalOpen) {
      setIsAccountModalOpen(false);
      addNotification(`Connected: ${walletAccount.meta.name}`, 'success');
    }
  }, [walletAccount, walletAccounts, isConnecting]);

  // Handle wallet errors
  useEffect(() => {
    if (walletError) {
      addNotification(walletError, 'error');
    }
  }, [walletError]);

  const handleSubnetSelect = (subnetId: string, netuid?: number) => {
      setSelectedSubnet(subnetId);
      if (netuid !== undefined) {
        setActiveSubnetNetuid(netuid);
      } else {
        // Parse netuid from subnetId like "SN1", "SN2"
        const parsed = parseInt(subnetId.replace('SN', ''));
        if (!isNaN(parsed)) setActiveSubnetNetuid(parsed);
      }
  };

  const handleBackToHub = () => {
      setSelectedSubnet(null);
  };

  const handleViewHistory = () => {
    setCurrentView(ViewState.ACCOUNT_HISTORY);
  }

  const handleValidatorSelect = (validatorId: string) => {
    setSelectedValidator(validatorId);
    setCurrentView(ViewState.VALIDATOR_DETAIL);
  }

  const handleAccountSelect = (accountId: string) => {
    // Check if the account ID is a contract address
    if (accountId.startsWith('0x7f')) {
      setSelectedContract(accountId);
      setCurrentView(ViewState.CONTRACT_DETAILS);
    } else {
      setSelectedAccount(accountId);
      setCurrentView(ViewState.ACCOUNT);
    }
  };

  const handleTransactionSelect = (txHash: string) => {
    setSelectedTransaction(txHash);
    setCurrentView(ViewState.TRANSACTION_DETAILS);
  };

  const handleBlockSelect = (blockHeight: string) => {
    setSelectedBlock(blockHeight);
    setCurrentView(ViewState.BLOCK_DETAILS);
  }

  const handleNavClick = (view: ViewState) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    if (view === ViewState.SUBNETS) {
        setSelectedSubnet(null);
    }
  };

  const handleCommandSelect = (action: () => void) => {
      action();
      setIsCmdKOpen(false);
  };

  // Command Palette Options
  const commands = [
      { category: 'Navigation', label: 'View Subnets', icon: 'hub', action: () => handleNavClick(ViewState.SUBNETS) },
      { category: 'Navigation', label: 'Validators', icon: 'verified_user', action: () => handleNavClick(ViewState.VALIDATORS) },
      { category: 'Navigation', label: 'Tokenomics', icon: 'pie_chart', action: () => handleNavClick(ViewState.TOKENOMICS) },
      { category: 'Action', label: walletAccount ? 'Disconnect Wallet' : 'Connect Wallet', icon: 'account_balance_wallet', action: handleConnectWallet },
  ];

  const filteredCommands = commands.filter(cmd => 
      cmd.label.toLowerCase().includes(cmdQuery.toLowerCase()) || 
      cmd.category.toLowerCase().includes(cmdQuery.toLowerCase())
  );

  const renderView = () => {
    switch (currentView) {
      case ViewState.TRANSACTION_DETAILS:
        return <TransactionDetailsView onBack={() => setCurrentView(ViewState.SUBNETS)} transactionHash={selectedTransaction} onSelectBlock={handleBlockSelect} onSelectAccount={handleAccountSelect} />;
      case ViewState.BLOCK_DETAILS:
        return <BlockDetailsView onBack={() => setCurrentView(ViewState.SUBNETS)} blockHeight={selectedBlock} onSelectTransaction={handleTransactionSelect} onSelectAccount={handleAccountSelect} />;
      case ViewState.ACCOUNT_HISTORY:
        return <AccountHistoryView onBack={() => setCurrentView(selectedValidator ? ViewState.VALIDATOR_DETAIL : ViewState.ACCOUNT)} accountId={selectedAccount || selectedValidator} onSelectTransaction={handleTransactionSelect} />;
      case ViewState.CONTRACT_DETAILS:
        return <ContractDetailsView onBack={() => setCurrentView(ViewState.SUBNETS)} contractAddress={selectedContract} />;
      case ViewState.SUBNETS:
        if (selectedSubnet) {
            return <SubnetView 
              onBack={handleBackToHub} 
              onViewAllNodes={() => setCurrentView(ViewState.SUBNET_NODES)} 
              onViewWeights={() => setCurrentView(ViewState.SUBNET_WEIGHTS)}
              onViewRegistration={() => setCurrentView(ViewState.SUBNET_REGISTRATION)}
              onViewDistribution={() => setCurrentView(ViewState.SUBNET_DISTRIBUTION)}
              onSelectAccount={handleAccountSelect}
              netuid={activeSubnetNetuid}
            />;
        }
        return <SubnetsHub onSelect={handleSubnetSelect} />;
      case ViewState.SUBNET_NODES:
        return <SubnetNodesView onBack={() => setCurrentView(ViewState.SUBNETS)} onSelectAccount={handleAccountSelect} netuid={activeSubnetNetuid} />;
      case ViewState.SUBNET_WEIGHTS:
        return <SubnetWeightsView onBack={() => setCurrentView(ViewState.SUBNETS)} netuid={activeSubnetNetuid} />;
      case ViewState.SUBNET_REGISTRATION:
        const currentRegSubnet = data?.subnets.find(s => s.netuid === activeSubnetNetuid);
        return <SubnetRegistrationView onBack={() => setCurrentView(ViewState.SUBNETS)} subnet={currentRegSubnet} />;
      case ViewState.SUBNET_DISTRIBUTION:
        const currentDistSubnet = data?.subnets.find(s => s.netuid === activeSubnetNetuid);
        return <SubnetDistributionView onBack={() => setCurrentView(ViewState.SUBNETS)} subnet={currentDistSubnet} />;
      case ViewState.VALIDATORS:
        return <ValidatorsView onBack={() => setCurrentView(ViewState.SUBNETS)} onSelectValidator={handleValidatorSelect} />;
      case ViewState.VALIDATOR_DETAIL:
        return <ValidatorDetailView onBack={() => setCurrentView(ViewState.VALIDATORS)} onSelectAccount={handleAccountSelect} onViewHistory={handleViewHistory} validatorId={selectedValidator} />;
      case ViewState.ACCOUNT:
        return <AccountView onBack={() => setCurrentView(ViewState.SUBNETS)} accountId={selectedAccount} onSelectTransaction={(hash) => {
            setSelectedTransaction(hash);
            setCurrentView(ViewState.TRANSACTION_DETAILS);
        }} onViewHistory={() => setCurrentView(ViewState.ACCOUNT_HISTORY)} />;
      case ViewState.ACCOUNT_HISTORY:
        return <AccountHistoryView onBack={() => setCurrentView(ViewState.ACCOUNT)} accountId={selectedAccount} onSelectTransaction={(hash) => {
            setSelectedTransaction(hash);
            setCurrentView(ViewState.TRANSACTION_DETAILS);
        }} />;
      case ViewState.TOKENOMICS:
        return <TokenomicsView />;
      default:
        return <SubnetsHub onSelect={handleSubnetSelect} />;
    }
  };

  return (
    <>
    {isBooting ? (
      <BootSequence isLoading={!data} onComplete={() => setIsBooting(false)} />
    ) : (
      <div className="bg-bg-dark min-h-screen text-slate-300 font-body selection:bg-neon-cyan selection:text-black flex flex-col overflow-x-hidden animate-fade-in-up">
        {/* Toast Container */}
        <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-6 pointer-events-none">
            {notifications.map(n => (
                <div key={n.id} className="pointer-events-auto">
                    <ToastNotification message={n.message} type={n.type} onClose={() => setNotifications(prev => prev.filter(x => x.id !== n.id))} />
                </div>
            ))}
        </div>

        {/* Command Palette Overlay */}
        {isCmdKOpen && (
            <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4" onClick={() => setIsCmdKOpen(false)}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <div 
                  className="relative w-full max-w-lg bg-[#0a0e17] border border-neon-cyan/30 rounded-xl shadow-[0_0_50px_rgba(0,243,255,0.15)] overflow-hidden animate-fade-in-up flex flex-col max-h-[60vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center px-4 py-3 border-b border-white/10">
                        <span className="material-symbols-outlined text-neon-cyan text-xl">search</span>
                        <input 
                            ref={cmdInputRef}
                            type="text" 
                            placeholder="Type a command or search..." 
                            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 font-mono ml-2 h-8"
                            value={cmdQuery}
                            onChange={(e) => setCmdQuery(e.target.value)}
                        />
                        <div className="px-2 py-1 rounded bg-white/10 text-xs text-slate-400 font-bold">ESC</div>
                    </div>
                    <div className="overflow-y-auto custom-scrollbar p-2">
                        {filteredCommands.length > 0 ? (
                            filteredCommands.map((cmd, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => handleCommandSelect(cmd.action)}
                                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-neon-cyan/10 group transition-all"
                                >
                                    <span className={`material-symbols-outlined text-slate-400 group-hover:text-neon-cyan transition-colors`}>{cmd.icon}</span>
                                    <span className="text-sm text-slate-200 group-hover:text-white font-medium flex-1 text-left">{cmd.label}</span>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-600 group-hover:text-neon-cyan/50">{cmd.category}</span>
                                </button>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-500 text-sm">No commands found.</div>
                        )}
                    </div>
                    <div className="px-4 py-2 bg-white/[0.02] border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
                        <span>ProTip: Use arrows to navigate</span>
                        <span>ModernTensor v1.0</span>
                    </div>
                </div>
            </div>
        )}

        {/* Header */}
        <header className="sticky top-0 z-50 bg-bg-dark/80 backdrop-blur-xl border-b border-white/5">
          <div className="w-full px-6 py-3 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"></div>
            
            <div className="flex items-center gap-8">
              <div 
                className="flex items-center gap-3 text-white group cursor-pointer"
                onClick={() => setCurrentView(ViewState.SUBNETS)}
              >
                <div className="size-8 text-neon-cyan group-hover:drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] transition-all duration-300">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M24 4L6 14V34L24 44L42 34V14L24 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M24 14V34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                     <path d="M6 14L24 24L42 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h1 className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neon-cyan/80 uppercase">
                  ModernTensor
                </h1>
              </div>

              <nav className="hidden md:flex items-center gap-6">
                {[
                  { id: ViewState.SUBNETS, label: 'Subnets' },
                  { id: ViewState.VALIDATORS, label: 'Validators' }, 
                  { id: ViewState.TOKENOMICS, label: 'Tokenomics' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-xs font-semibold tracking-wide transition-all px-3 py-1.5 rounded-md border ${
                      currentView === item.id || (item.id === ViewState.SUBNETS && (currentView === ViewState.SUBNET_NODES || currentView === ViewState.SUBNET_WEIGHTS)) || (item.id === ViewState.VALIDATORS && (currentView === ViewState.VALIDATOR_DETAIL || currentView === ViewState.ACCOUNT || currentView === ViewState.ACCOUNT_HISTORY)) || (currentView === ViewState.TRANSACTION_DETAILS || currentView === ViewState.BLOCK_DETAILS || currentView === ViewState.CONTRACT_DETAILS)
                        ? 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30 shadow-[0_0_10px_rgba(0,243,255,0.2)] font-bold tracking-widest'
                        : 'text-text-secondary border-transparent hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div 
                  className="hidden lg:flex items-center bg-panel-dark/80 border border-panel-border rounded-md h-9 px-3 w-64 hover:border-neon-cyan/50 hover:shadow-[0_0_10px_rgba(0,243,255,0.1)] transition-all cursor-pointer group"
                  onClick={() => setIsCmdKOpen(true)}
              >
                <span className="material-symbols-outlined text-text-secondary text-[18px] group-hover:text-neon-cyan transition-colors">search</span>
                <span className="text-xs text-text-secondary ml-2 group-hover:text-white transition-colors">Search...</span>
                <span className="ml-auto text-[10px] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-slate-500 font-mono">⌘K</span>
              </div>
              <button 
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className={`hidden md:flex items-center justify-center h-9 px-4 transition-all duration-300 text-xs font-bold rounded-md uppercase tracking-wider ${walletAccount ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30' : 'bg-white text-black hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,243,255,0.6)]'}`}
              >
                {isConnecting ? (
                    <span className="flex items-center gap-2">
                        <span className="size-3 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        Connecting...
                    </span>
                ) : walletAccount ? (
                    <span className="flex items-center gap-2">
                        <span className="size-2 bg-green-500 rounded-full animate-pulse"></span>
                        {walletAccount.address.slice(0, 5)}...{walletAccount.address.slice(-3)}
                    </span>
                ) : 'Connect Wallet'}
              </button>
              <button 
                  className="md:hidden text-white p-2"
                  onClick={() => setIsMobileMenuOpen(true)}
              >
                  <span className="material-symbols-outlined text-2xl">menu</span>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
              <div className="relative w-3/4 max-w-sm bg-panel-dark border-l border-white/10 h-full shadow-2xl animate-slide-in-right p-6 flex flex-col gap-6">
                  <div className="flex justify-between items-center pb-6 border-b border-white/10">
                      <h2 className="text-xl font-bold text-white font-display">Menu</h2>
                      <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-400 hover:text-white">
                          <span className="material-symbols-outlined text-2xl">close</span>
                      </button>
                  </div>
                  <nav className="flex flex-col gap-2">
                      {[
                          { id: ViewState.SUBNETS, label: 'Subnets', icon: 'hub' },
                          { id: ViewState.VALIDATORS, label: 'Validators', icon: 'verified_user' }, 
                          { id: ViewState.TOKENOMICS, label: 'Tokenomics', icon: 'pie_chart' },
                      ].map((item) => (
                          <button
                              key={item.id}
                              onClick={() => handleNavClick(item.id)}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                                  currentView === item.id 
                                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' 
                                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                              }`}
                          >
                              <span className="material-symbols-outlined">{item.icon}</span>
                              {item.label}
                          </button>
                      ))}
                  </nav>
                  <div className="mt-auto">
                      <button 
                          onClick={() => { setIsMobileMenuOpen(false); setIsCmdKOpen(true); }}
                          className="w-full h-10 mb-3 flex items-center justify-center bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors gap-2"
                      >
                          <span className="material-symbols-outlined text-sm">search</span> Search (Cmd+K)
                      </button>
                      <button 
                          onClick={handleConnectWallet}
                          className="w-full h-12 flex items-center justify-center bg-white text-black hover:bg-neon-cyan transition-colors font-bold uppercase tracking-wider rounded-lg"
                      >
                          {walletAccount ? `${walletAccount.address.slice(0, 5)}...${walletAccount.address.slice(-3)}` : 'Connect Wallet'}
                      </button>
                  </div>
              </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-grow relative z-10 w-full max-w-[1920px] mx-auto flex flex-col">
          <div key={currentView} className="animate-fade-in-up w-full">
              {renderView()}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/5 bg-bg-dark/50 backdrop-blur py-6 z-20">
          <div className="w-full px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs font-mono">© 2024 MODERN TENSOR. SYSTEM ONLINE.</p>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-wider text-slate-500">
              <button className="hover:text-neon-cyan transition-colors">Docs</button>
              <button className="hover:text-neon-cyan transition-colors">API</button>
              <button className="hover:text-neon-cyan transition-colors">Privacy</button>
              <button className="hover:text-neon-cyan transition-colors">Terms</button>
            </div>
          </div>
        </footer>
      </div>
    )}
    {isAccountModalOpen && (
      <AccountSelectorModal 
        accounts={walletAccounts} 
        onSelect={(addr) => setWalletAccountByAddress(addr)}
        onClose={() => setIsAccountModalOpen(false)}
      />
    )}
    </>
  );
};

const AppWrapper: React.FC = () => (
  <ErrorBoundary>
    <DataBridgeProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </DataBridgeProvider>
  </ErrorBoundary>
);

export default AppWrapper;