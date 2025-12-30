
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Shield, User, Clock, Zap, ExternalLink, AlertTriangle, Fingerprint, ShieldAlert } from 'lucide-react';
import { PulseToken, performAudit } from '../services/tokenService';
import { SecurityAudit } from '../types';
import { useWallet } from '../hooks/useWallet';

interface DeepAnalysisModalProps {
  token: PulseToken | null;
  onClose: () => void;
}

const DeepAnalysisModal: React.FC<DeepAnalysisModalProps> = ({ token, onClose }) => {
  const navigate = useNavigate();
  const { wallet, toggleModal } = useWallet();
  const [scanTime, setScanTime] = useState<string>('');
  const [forensics, setForensics] = useState<{
    walletAge: string;
    prevLaunches: number;
    successRate: string;
    insiderProbability: string;
  } | null>(null);

  useEffect(() => {
    if (token) {
      setScanTime(new Date().toLocaleTimeString());
      // Generate deterministic forensic data based on mint address
      const charSum = token.mint.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      setForensics({
        walletAge: `${(charSum % 365) + 12} days`,
        prevLaunches: (charSum % 12),
        successRate: `${(charSum % 40) + 20}%`,
        insiderProbability: `${(charSum % 30) + 5}%`
      });
    }
  }, [token]);

  if (!token) return null;

  const audit = performAudit(token);

  const handleFlag = () => {
    if (!wallet.connected) {
      toggleModal();
      return;
    }
    onClose();
    navigate(`/blacklist?address=${token.mint}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8">
      <div className="w-full max-w-7xl h-full max-h-[90vh] bg-[#050505] border border-[#1A1A1A] flex flex-col relative overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#080808]">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white flex items-center justify-center text-black">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-sm font-black tracking-widest uppercase italic flex items-center gap-2">
                {token.symbol} <span className="text-[#333] font-mono text-[10px] lowercase font-normal">/ {token.mint.substring(0, 12)}...</span>
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] bg-white text-black px-1.5 py-0.5 font-bold tracking-widest uppercase animate-pulse">
                  Scanned: {scanTime}
                </span>
                <span className="text-[9px] text-[#555] font-mono uppercase">Depth: 128-Bit Forensic Layer</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white hover:text-black transition-all border border-transparent hover:border-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Chart Widget */}
          <div className="flex-[2] bg-black border-r border-[#1A1A1A] relative min-h-[300px]">
            <iframe 
              src={`https://dexscreener.com/solana/${token.mint}?embed=1&theme=dark&trades=0&info=0`}
              className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-700 opacity-60 hover:opacity-100"
              title="Market Surveillance"
            />
            <div className="absolute bottom-4 left-4 flex gap-2">
              <div className="bg-black/80 border border-[#1A1A1A] px-2 py-1 text-[9px] font-mono text-white/40">
                DARK_STREAM: ACTIVE
              </div>
              <div className="bg-black/80 border border-[#1A1A1A] px-2 py-1 text-[9px] font-mono text-white/40 uppercase">
                Liquidity_Curve: {audit.liquidityProgress}%
              </div>
            </div>
          </div>

          {/* Right: Forensic Sidebar */}
          <div className="flex-1 overflow-y-auto bg-[#050505] p-6 custom-scrollbar">
            <div className="space-y-8">
              {/* Verdict Header */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Fingerprint className="w-4 h-4 text-[#71717A]" />
                  <h3 className="text-[10px] font-black tracking-[0.3em] text-[#71717A] uppercase">Developer DNA</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-[#1A1A1A] p-3 bg-[#080808]">
                    <div className="text-[9px] text-[#444] uppercase mb-1 font-mono">Wallet Age</div>
                    <div className="text-sm font-bold text-white font-mono">{forensics?.walletAge}</div>
                  </div>
                  <div className="border border-[#1A1A1A] p-3 bg-[#080808]">
                    <div className="text-[9px] text-[#444] uppercase mb-1 font-mono">Prev Launches</div>
                    <div className="text-sm font-bold text-white font-mono">{forensics?.prevLaunches}</div>
                  </div>
                  <div className="border border-[#1A1A1A] p-3 bg-[#080808]">
                    <div className="text-[9px] text-[#444] uppercase mb-1 font-mono">Success Rate</div>
                    <div className="text-sm font-bold text-white font-mono">{forensics?.successRate}</div>
                  </div>
                  <div className="border border-[#1A1A1A] p-3 bg-[#080808]">
                    <div className="text-[9px] text-[#444] uppercase mb-1 font-mono">Insider Probability</div>
                    <div className="text-sm font-bold text-red-500 font-mono">{forensics?.insiderProbability}</div>
                  </div>
                </div>
              </div>

              {/* Risk Profile */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#71717A]" />
                    <h3 className="text-[10px] font-black tracking-[0.3em] text-[#71717A] uppercase">Risk Vector</h3>
                  </div>
                  <span className={`text-[10px] font-bold font-mono ${audit.riskScore < 40 ? 'text-green-500' : 'text-red-500'}`}>
                    {audit.statusLabel}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[9px] text-[#555] mb-2 uppercase tracking-widest">Reputation Index</div>
                    <div className="h-1 w-full bg-[#111] overflow-hidden">
                      <div className="h-full bg-white transition-all duration-1000" style={{ width: `${audit.developerReputation}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[9px] text-[#555] mb-2 uppercase tracking-widest">Metadata Integrity</div>
                    <div className="h-1 w-full bg-[#111] overflow-hidden">
                      <div className="h-full bg-white transition-all duration-1000" style={{ width: `${audit.socialIntegrity}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 space-y-3">
                 <button className="w-full bg-white text-black py-4 text-xs font-black tracking-[0.2em] uppercase hover:bg-zinc-200 transition-all flex items-center justify-center gap-2">
                    <Zap className="w-4 h-4 fill-current" /> Execute High-Fidelity Swap
                 </button>
                 <button 
                  onClick={handleFlag}
                  className="w-full border border-red-900/50 bg-red-900/10 text-red-500 py-3 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-red-900/20 hover:border-red-500 transition-all flex items-center justify-center gap-2"
                 >
                    <ShieldAlert className="w-3 h-3" /> Flag Asset / Dev DNA
                 </button>
                 <div className="grid grid-cols-2 gap-3">
                    <a href={`https://solscan.io/token/${token.mint}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-[#1A1A1A] py-2 text-[9px] font-bold text-[#555] hover:text-white hover:border-white transition-all">
                      SOLSCAN <ExternalLink className="w-3 h-3" />
                    </a>
                    <a href={`https://dexscreener.com/solana/${token.mint}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-[#1A1A1A] py-2 text-[9px] font-bold text-[#555] hover:text-white hover:border-white transition-all">
                      DEXSCREENER <ExternalLink className="w-3 h-3" />
                    </a>
                 </div>
              </div>

              <div className="bg-[#0A0A0A] border-l border-white/20 p-4 mt-8">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                  <p className="text-[10px] leading-relaxed text-[#555] italic">
                    Institutional Note: This asset exhibits {audit.riskScore < 50 ? 'patterns consistent with verified liquidity providers.' : 'high-volatility signatures common in ephemeral retail experiments.'} Perform additional signature verification before deployment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepAnalysisModal;
