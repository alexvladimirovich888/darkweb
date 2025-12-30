
import React, { useState, useCallback, createContext, useContext, ReactNode } from 'react';

export interface WalletState {
  connected: boolean;
  publicKey: string | null;
  balance: number;
  isVerified: boolean;
}

interface WalletContextType {
  wallet: WalletState;
  connect: () => Promise<void>;
  disconnect: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  toggleModal: () => void;
  threshold: number;
}

const POCKET_TOKEN_THRESHOLD = 100000;

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    publicKey: null,
    balance: 0,
    isVerified: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen(prev => !prev);
  }, []);

  const connect = async () => {
    try {
      // @ts-ignore - Phantom injection detection
      const { solana } = window;
      
      if (solana?.isPhantom) {
        const response = await solana.connect();
        const pubKey = response.publicKey.toString();
        
        // Mock institutional balance check
        const charSum = pubKey.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        const mockBalance = (charSum % 10) > 3 ? 150000 : 25000; 

        setWallet({
          connected: true,
          publicKey: pubKey,
          balance: mockBalance,
          isVerified: mockBalance >= POCKET_TOKEN_THRESHOLD,
        });
        setIsModalOpen(false);
      } else {
        console.warn('Uplink failed: Phantom provider not detected.');
      }
    } catch (err) {
      console.error('Handshake failed:', err);
    }
  };

  const disconnect = useCallback(() => {
    setWallet({
      connected: false,
      publicKey: null,
      balance: 0,
      isVerified: false,
    });
  }, []);

  return React.createElement(
    WalletContext.Provider,
    {
      value: {
        wallet,
        connect,
        disconnect,
        isModalOpen,
        setIsModalOpen,
        toggleModal,
        threshold: POCKET_TOKEN_THRESHOLD,
      },
    },
    children
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
