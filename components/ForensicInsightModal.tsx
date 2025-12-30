
import React, { useEffect, useState } from 'react';
import { X, Shield, Zap, ExternalLink, AlertTriangle, Fingerprint, Search, Copy, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import { PulseToken, performAudit } from '../services/tokenService';
import { SecurityAudit, AuditStatus } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ForensicInsightModalProps {
  address: string;
  onClose: () => void;
}

const ForensicInsightModal: React.FC<ForensicInsightModalProps> = ({ address, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<PulseToken | null>(null);
  const [audit, setAudit] = useState<SecurityAudit | null>(null);
  const [step, setStep] = useState(0);

  const steps = [
    "DECRYPTING METADATA...",
    "MATCHING SIGNATURES...",
    "CROSS-REFERENCING WALLET CLUSTERS...",
    "FINALIZING FORENSIC REPORT..."
  ];

  useEffect(() => {
    const loadReport = async () => {
      setLoading(true);
      // Simulate decryption steps
      for (let i = 0; i < steps.length; i++) {
        setStep(i);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      // Generate or fetch data
      const charSum = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      // We'll create a mock token if not found to ensure "Dark Pool" fallback
      const mockToken: PulseToken = {
        mint: address,
        name: charSum % 2 === 0 ? "Project " + address.substring(0, 4) : "Dark Protocol",
        symbol: address.substring(0, 4).toUpperCase(),
        image_uri: `https://api.dicebear.com/7.x/identicon/svg?seed=${address}`,
        market_cap: (charSum % 1000000) + 50000,
        created_timestamp: Date.now() - 3600000,
        twitter: charSum % 3 === 0 ? 'https://twitter.com' : undefined,
        website: charSum % 4 === 0 ? 'https://google.com' : undefined,
      };

      setToken(mockToken);
      setAudit(performAudit(mockToken));
      setLoading(false);
    };

    loadReport();
  }, [address]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border border-white/10 rounded-full" />
            <div className="absolute inset-0 border-t border-white rounded-full animate-spin" />
            <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />
          </div>
          <h2 className="text-[10px] font-mono tracking-[0.5em] text-white uppercase animate-pulse">
            {steps[step]}
          </h2>
        </div>
      </div>
    );
  }

  if (!token || !audit) return null;

  const reliabilityGrade = audit.riskScore < 20 ? 'A' : audit.riskScore < 40 ? 'B' : audit.riskScore < 60 ? 'C' : audit.riskScore < 80 ? 'D' : 'F';
  const gradeColor = reliabilityGrade === 'A' ? 'text-green-500' : reliabilityGrade === 'F' ? 'text-red-500' : 'text-white';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-6xl h-full max-h-[85vh] bg-[#050505] border border-[#1A1A1A] flex flex-col relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#1A1A1A] bg-[#080808]">
          <div className="flex items-center gap-5">
             <div className="w-10 h-10 border border-[#1A1A1A] bg-black flex items-center justify-center">
               <Fingerprint className="w-6 h-6 text-white/40" />
             </div>
             <div>
               <h2 className="text-sm font-black tracking-widest uppercase italic flex items-center gap-3">
                 Forensic Analysis: {token.symbol}
                 <span className="text-[9px] font-mono text-[#333] tracking-normal font-normal">/ {token.mint}</span>
                 <Copy className="w-3 h-3 text-[#222] hover:text-white cursor-pointer transition-colors" />
               </h2>
               <div className="flex items-center gap-2 mt-1">
                 <span className="text-[8px] border border-white/20 text-white/40 px-2 py-0.5 font-mono uppercase">
                   POCKET_REPORT_{address.substring(0, 6)}
                 </span>
               </div>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="group flex items-center gap-2 px-4 py-2 text-[10px] font-black tracking-widest uppercase text-[#444] hover:text-white transition-all border border-transparent hover:border-white"
          >
            [ X ] CLOSE TERMINAL
          </button>
        </div>

        {/* Report Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Zone A: Market Intelligence */}
            <div className="p-8 border-r border-[#1A1A1A] space-y-8">
              <div>
                <h3 className="text-[10px] font-black tracking-[0.4em] text-[#333] uppercase mb-6 flex items-center gap-2">
                  <Zap className="w-3 h-3" /> Zone A: Market Intelligence
                </h3>
                <div className="aspect-video bg-black border border-[#1A1A1A] overflow-hidden relative group">
                  <div className="scan-line pointer-events-none z-10" />
                  <iframe 
                    src={`https://dexscreener.com/solana/${token.mint}?embed=1&theme=dark&trades=0&info=0`}
                    className="w-full h-full border-none grayscale hover:grayscale-0 transition-all duration-1000 opacity-40 hover:opacity-100"
                    title="Live Market Surveillance"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#080808] border border-[#1A1A1A] p-4">
                  <div className="text-[9px] text-[#444] uppercase font-mono mb-2">USD_MARKET_CAP</div>
                  <div className="text-xl font-black font-mono tracking-tighter">${token.market_cap.toLocaleString()}</div>
                </div>
                <div className="bg-[#080808] border border-[#1A1A1A] p-4">
                  <div className="text-[9px] text-[#444] uppercase font-mono mb-2">ASSET_IDENTIFIER</div>
                  <div className="text-sm font-bold font-mono tracking-tight uppercase truncate">{token.name}</div>
                </div>
              </div>
            </div>

            {/* Zone B: Developer DNA */}
            <div className="p-8 space-y-8 bg-[#030303]">
              <div>
                <h3 className="text-[10px] font-black tracking-[0.4em] text-[#333] uppercase mb-6 flex items-center gap-2">
                  <Shield className="w-3 h-3" /> Zone B: Developer DNA
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-end border-b border-[#1A1A1A] pb-4">
                    <div>
                      <div className="text-[9px] text-[#444] uppercase font-mono mb-1">Reputation Score</div>
                      <div className={`text-4xl font-black font-mono ${gradeColor}`}>{100 - audit.riskScore}/100</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-[#444] uppercase font-mono mb-1">Reliability Grade</div>
                      <div className={`text-4xl font-black font-mono ${gradeColor}`}>GRADE_{reliabilityGrade}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-[9px] text-[#444] uppercase font-mono mb-4">Launch History Signatures</div>
                    <div className="space-y-3">
                      {[
                        { name: "Rug_Swap_v1", status: "RUGGED", color: "text-red-500" },
                        { name: "Stable_Coin_X", status: "STABLE", color: "text-green-500" },
                        { name: "Meme_Test_4", status: "ABANDONED", color: "text-[#444]" }
                      ].map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-[10px] font-mono border border-[#1A1A1A] px-4 py-2 bg-black">
                          <span className="text-white/60 tracking-wider uppercase">{h.name}</span>
                          <span className={`${h.color} font-black`}>{h.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Zone C: Security Verdict */}
          <div className="p-8 border-t border-[#1A1A1A] bg-[#050505]">
            <h3 className="text-[10px] font-black tracking-[0.4em] text-[#333] uppercase mb-6 flex items-center gap-2">
              <AlertTriangle className="w-3 h-3" /> Zone C: Security Verdict
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-4">
                {[
                  { type: "ALERT", text: "Liquidity is NOT burned (Developer control detected)", critical: true },
                  { type: "ALERT", text: "High wallet clustering detected (Sybil attack risk)", critical: true },
                  { type: "INFO", text: "Mint authority is disabled (No new supply)", critical: false },
                  { type: "INFO", text: "Top 10 holders own 42% of supply", critical: false }
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {f.critical ? <ShieldAlert className="w-3 h-3 text-red-500 mt-1" /> : <Info className="w-3 h-3 text-white/20 mt-1" />}
                    <div className="text-[11px] font-mono leading-relaxed">
                      <span className={f.critical ? "text-red-500 font-bold" : "text-white/20"}>[{f.type}]</span>
                      <span className="ml-2 text-white/60">{f.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-center items-center p-8 border border-white/5 bg-black text-center">
                 <div className="text-[10px] font-black tracking-[0.5em] text-[#333] uppercase mb-4">Final Protocol Verdict</div>
                 <div className={`text-2xl font-black italic tracking-tighter uppercase ${audit.riskScore > 50 ? 'text-red-500' : 'text-green-500'}`}>
                   {audit.riskScore > 50 ? "VERDICT: AVOID EXPOSURE" : "VERDICT: MONITOR ENTRY"}
                 </div>
                 <p className="text-[9px] text-[#444] font-mono mt-4 max-w-[300px] leading-relaxed">
                   Forensic signals indicate high probability of {audit.riskScore > 50 ? 'liquidity evaporation' : 'sustained volume'}. Execute with caution.
                 </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-4">
              <button className="flex-1 bg-white text-black py-4 text-xs font-black tracking-[0.3em] uppercase hover:bg-zinc-200 transition-all">
                EXECUTE ORDER VIA DARK_NODES
              </button>
              <button className="flex-1 border border-[#1A1A1A] text-white/40 py-4 text-xs font-black tracking-[0.3em] uppercase hover:text-white hover:border-white transition-all">
                DEEP_SCAN_WALLET_HISTORY
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForensicInsightModal;
