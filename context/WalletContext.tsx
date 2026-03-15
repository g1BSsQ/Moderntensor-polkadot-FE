import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  web3Enable, 
  web3Accounts, 
} from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';

interface WalletContextType {
  selectedAccount: InjectedAccountWithMeta | null;
  accounts: InjectedAccountWithMeta[];
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  setSelectedAccountByAddress: (address: string) => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      // Step 1: Enable extension access
      // 'ModernTensor Dashboard' is the name shown in the extension pop-up
      const extensions = await web3Enable('ModernTensor Dashboard');
      
      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js, Talisman or SubWallet.');
      }

      // Step 2: Get accounts
      const allAccounts = await web3Accounts();
      setAccounts(allAccounts);

      if (allAccounts.length === 0) {
        throw new Error('No accounts found in your wallet extension.');
      }

      // Step 3: Auto-select first account if none selected
      const savedAddress = localStorage.getItem('modernhub_wallet_address');
      const savedAccount = allAccounts.find(acc => acc.address === savedAddress);
      
      if (savedAccount) {
        setSelectedAccount(savedAccount);
      } else if (allAccounts.length > 0) {
        // We don't auto-select if multiple accounts found, let them choose
        // But for initial implementation, let's select the first if only one exists
        if (allAccounts.length === 1) {
          setSelectedAccount(allAccounts[0]);
          localStorage.setItem('modernhub_wallet_address', allAccounts[0].address);
        }
      }
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setSelectedAccount(null);
    localStorage.removeItem('modernhub_wallet_address');
  }, []);

  const setSelectedAccountByAddress = useCallback((address: string) => {
    const account = accounts.find(acc => acc.address === address);
    if (account) {
      setSelectedAccount(account);
      localStorage.setItem('modernhub_wallet_address', address);
    }
  }, [accounts]);

  // Handle re-connection on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('modernhub_wallet_address');
    if (savedAddress) {
      connect();
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      selectedAccount,
      accounts,
      isConnecting,
      error,
      connect,
      disconnect,
      setSelectedAccountByAddress
    }}>
      {children}
    </WalletContext.Provider>
  );
};
