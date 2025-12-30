
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lock, Search, AlertCircle, Loader2, CheckCircle2, ArrowRight, ExternalLink, ShieldX, Gavel } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

const Blacklist: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { wallet, toggleModal, threshold } = useWallet();
  const [formStatus, setFormStatus] = useState<'idle' | 'scanning' | 'denied' | 'success'>('idle');
  
  const [targetAddress, setTargetAddress] = useState('');
  const [category, setCategory] = useState('RUG_PULL');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const prefill = searchParams.get('address');
    if (prefill) {
      setTargetAddress(prefill);
    }
  }, [searchParams]);

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.connected) {
      toggleModal();
      return;
    }
    
    if (!wallet.isVerified) {
      setFormStatus('denied');
      return;
    }

    setFormStatus('scanning');
    setTimeout(() => {
      setFormStatus('success');
    }, 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-5xl mx-auto py-20 min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-[#1A1A1A] pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter italic uppercase mb-2">Dark Database</h1>
          <p className="text-[#444] text-xs font-mono uppercase tracking-[0.3em]">Institutional Malicious Entity Tracking // v2.0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Information Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="p-6 border border-[#1A1A1A] bg-[#030303] relative overflow-hidden">
            <div className="scan-line opacity-20" />
            <h3 className="text-[10px] font-black tracking-[0.4em] text-[#333] uppercase mb-4 flex items-center gap-2">
              <AlertCircle className="w-3 h-3" /> Governance
            </h3>
            <p className="text-zinc-500 text-[11px] leading-relaxed">
              The Dark Database is a decentralized forensic layer. Contributors are required to hold $POCKET tokens to ensure skin-in-the-game and prevent sybil reporting attacks.
            </p>
            <div className="mt-6 pt-6 border-t border-[#1A1A1A]">
               <div className="text-[9px] text-white/20 font-mono mb-2 uppercase">Required Holdings</div>
               <div className="text-xl font-black font-mono tracking-tighter">{threshold.toLocaleString()} $POCKET</div>
               <div className="mt-2 text-[9px] text-[#444] font-mono italic">Current: {wallet.balance.toLocaleString()} $POCKET</div>
            </div>
          </div>

          <div className="p-6 border border-white/5 bg-black">
             <h4 className="text-[10px] font-black tracking-widest uppercase mb-4 text-white/40">Recent Activity</h4>
             <div className="space-y-4">
               {[
                 { addr: '4xSg...92Kz', time: '4m ago', type: 'RUG_PULL' },
                 { addr: '9WqA...Lp81', time: '14m ago', type: 'DEV_DUMP' },
                 { addr: 'B2m3...88Yp', time: '22m ago', type: 'CLUSTERING' }
               ].map((h, i) => (
                 <div key={i} className="flex items-center gap-3 text-[10px] font-mono text-[#222]">
                   <div className="w-1 h-1 bg-red-500 rounded-full" />
                   <span className="text-white/40">{h.addr}</span>
                   <span className="ml-auto text-white/10 italic">{h.time}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Contribution Form */}
        <div className="lg:col-span-2 relative">
          {!wallet.connected ? (
            <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center border border-[#1A1A1A] text-center p-8">
               <Lock className="w-10 h-10 text-[#222] mb-6" />
               <h3 className="text-lg font-black tracking-tighter uppercase italic mb-2">Auth Required</h3>
               <p className="text-zinc-500 text-xs mb-8 max-w-xs">Connect your Solana wallet to access the contribution terminal.</p>
               <button onClick={toggleModal} className="bg-white text-black px-8 py-4 text-[10px] font-black tracking-[0.3em] uppercase hover:bg-zinc-200 transition-all">
                  INITIALIZE UPLINK
               </button>
            </div>
          ) : !wallet.isVerified && formStatus !== 'denied' ? (
             <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center border border-[#1A1A1A] text-center p-8">
               <ShieldAlert className="w-10 h-10 text-red-900 mb-6" />
               <h3 className="text-lg font-black tracking-tighter uppercase italic mb-2">Access Restricted</h3>
               <p className="text-zinc-500 text-xs mb-8 max-w-xs leading-relaxed">
                 To contribute to the Dark Database, you must hold at least 100,000 $POCKET tokens.
                 <span className="block mt-2 font-bold text-white/40">Current Balance: {wallet.balance.toLocaleString()} $POCKET</span>
               </p>
               <div className="flex flex-col gap-3 w-full max-w-[240px]">
                 <a href="https://raydium.io" target="_blank" className="bg-[#111] border border-[#222] text-white px-8 py-4 text-[10px] font-black tracking-[0.3em] uppercase hover:border-white transition-all flex items-center justify-center gap-2">
                    BUY $POCKET <ExternalLink className="w-3 h-3" />
                 </a>
                 <button onClick={toggleModal} className="text-[9px] font-mono text-[#444] uppercase tracking-widest hover:text-white transition-colors">
                    Re-Scan Balance
                 </button>
               </div>
            </div>
          ) : null}

          <form onSubmit={handleSumbit} className={`space-y-8 bg-[#050505] border border-[#1A1A1A] p-10 transition-all relative overflow-hidden ${!wallet.isVerified ? 'opacity-20 pointer-events-none' : ''}`}>
             <div className="scan-line opacity-5" />
             <div className="grid grid-cols-1 gap-8">
                <div>
                   <label className="text-[10px] font-black tracking-widest text-[#333] uppercase block mb-3">Suspect Wallet / CA (Dev DNA)</label>
                   <input 
                    type="text" 
                    value={targetAddress}
                    onChange={(e) => setTargetAddress(e.target.value)}
                    placeholder="ENTER MINT OR WALLET SIGNATURE..."
                    className="w-full bg-black border border-[#1A1A1A] p-4 text-xs font-mono tracking-widest text-white focus:border-white focus:outline-none transition-all placeholder:text-[#222]"
                    required
                   />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                      <label className="text-[10px] font-black tracking-widest text-[#333] uppercase block mb-3">Offense Category</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-black border border-[#1A1A1A] p-4 text-xs font-mono tracking-widest text-white focus:border-white focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="RUG_PULL">LIQUIDITY_DRAIN_EVENT</option>
                        <option value="CLUSTERING">WALLET_CLUSTERING_SYBIL</option>
                        <option value="DEV_DUMP">TEAM_EXIT_DUMP</option>
                        <option value="HONEYPOT">HONEYPOT_CONTRACT</option>
                      </select>
                   </div>
                   <div className="flex flex-col justify-end">
                      <div className="text-[9px] text-[#222] font-mono italic leading-relaxed">
                        Entries are committed to the forensic queue. High confidence matches will trigger a global alert.
                      </div>
                   </div>
                </div>

                <div>
                   <label className="text-[10px] font-black tracking-widest text-[#333] uppercase block mb-3">Evidence Description / Observed Pattern</label>
                   <textarea 
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="DESCRIBE THE MALICIOUS SIGNATURE CLUSTER..."
                    className="w-full bg-black border border-[#1A1A1A] p-4 text-xs font-mono tracking-widest text-white focus:border-white focus:outline-none transition-all resize-none placeholder:text-[#222]"
                   />
                </div>
             </div>

             <button type="submit" className="w-full bg-white text-black py-5 text-xs font-black tracking-[0.4em] uppercase hover:bg-zinc-200 transition-all flex items-center justify-center gap-3 group">
                <Gavel className="w-4 h-4 group-hover:scale-110 transition-transform" /> COMMIT TO DARK DATABASE
             </button>
          </form>
        </div>
      </div>

      <AnimatePresence>
        {formStatus === 'scanning' && (
          <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center">
             <div className="relative w-24 h-24 mb-10">
                <div className="absolute inset-0 border border-white/10 rounded-full" />
                <div className="absolute inset-0 border-t border-white rounded-full animate-spin" />
                <ShieldX className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-white" />
             </div>
             <h3 className="text-[10px] font-mono tracking-[0.6em] text-white uppercase animate-pulse">Scanning On-Chain Metadata...</h3>
          </div>
        )}

        {formStatus === 'success' && (
           <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
           >
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-8" />
              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Signature Flagged</h2>
              <p className="text-[#555] text-sm max-w-md mb-12">Entity has been successfully added to the Dark database triage queue. De-anonymization in progress.</p>
              <button 
                onClick={() => setFormStatus('idle')}
                className="border border-white text-white px-12 py-5 text-[10px] font-black tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all"
              >
                RETURN TO TERMINAL
              </button>
           </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Blacklist;
