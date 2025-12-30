
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Shield, ArrowRight, AlertCircle, Info } from 'lucide-react';

interface ConnectWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
}

const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  // @ts-ignore
  const isPhantomInstalled = !!window.solana?.isPhantom;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#050505] border border-[#1A1A1A] overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#080808]">
              <div className="flex items-center gap-3">
                <Wallet className="w-4 h-4 text-white" />
                <h2 className="text-[10px] font-black tracking-[0.3em] uppercase italic">Uplink Authorization</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-1 hover:text-white text-[#444] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8">
              <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-none border border-[#1A1A1A] mb-6 bg-black relative">
                  <img 
                    src="https://i.postimg.cc/pd36C2hv/Untitled-design-2025-12-30T043418-706.png" 
                    className="w-10 h-10 object-contain"
                    alt="Dark Pocket"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
                </div>
                <h3 className="text-lg font-black tracking-tighter uppercase italic mb-2">Initialize Interface</h3>
                <p className="text-[#555] text-xs leading-relaxed uppercase font-medium">
                  Select your institutional provider to establish a secure connection to the Solana Dark Stream.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onConnect}
                  disabled={!isPhantomInstalled}
                  className={`w-full flex items-center justify-between px-6 py-5 border transition-all group ${
                    isPhantomInstalled 
                    ? 'border-[#1A1A1A] bg-black hover:border-white hover:bg-white/5' 
                    : 'border-[#1A1A1A] opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 flex items-center justify-center bg-[#1A1A1A] rounded-sm group-hover:bg-white group-hover:text-black transition-colors">
                      <img src="https://phantom.app/favicon.ico" className="w-4 h-4 grayscale group-hover:grayscale-0" alt="" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] font-black tracking-widest text-white uppercase">Phantom Wallet</div>
                      <div className="text-[9px] text-[#444] font-mono uppercase">Extension Detection: {isPhantomInstalled ? 'Active' : 'Missing'}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#222] group-hover:text-white transition-all group-hover:translate-x-1" />
                </button>

                {!isPhantomInstalled && (
                  <div className="p-4 border border-red-900/20 bg-red-900/5 flex gap-3">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[9px] text-red-500/80 leading-relaxed font-mono uppercase">
                      Phantom provider not detected in browser. Please activate the extension and refresh the terminal to establish uplink.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-[#1A1A1A]">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-[#222] shrink-0 mt-0.5" />
                  <p className="text-[9px] text-[#333] leading-relaxed uppercase font-mono">
                    Privacy Note: Connection requests are processed locally. Your private keys never leave your encrypted provider container.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#080808] border-t border-[#1A1A1A] px-6 py-3 flex justify-between items-center">
              <span className="text-[8px] font-mono text-[#222] tracking-widest uppercase">Encryption: AES-256-GCM</span>
              <div className="flex items-center gap-2">
                <Info className="w-3 h-3 text-[#222]" />
                <span className="text-[8px] font-mono text-[#222] uppercase">Institutional Auth v1.8</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConnectWalletModal;
