
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap, Shield, FileText, ArrowRight, Loader2, MousePointer2, AlertCircle, Fingerprint, ShieldAlert, Gavel } from 'lucide-react';
import { fetchPulseData, PulseToken } from '../services/tokenService';
import { motion, AnimatePresence } from 'framer-motion';
import ForensicInsightModal from '../components/ForensicInsightModal';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [previewTokens, setPreviewTokens] = useState<PulseToken[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [reportAddress, setReportAddress] = useState('');

  const searchSteps = [
    "SEQUENCING SIGNATURES...",
    "CROSS-REFERENCING WALLET CLUSTERS...",
    "CALCULATING REPUTATION INDEX...",
    "FINALIZING FORENSIC REPORT..."
  ];

  useEffect(() => {
    const loadPreview = async () => {
      const data = await fetchPulseData();
      setPreviewTokens(data.slice(0, 5));
    };
    loadPreview();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    setSearchStep(0);
    
    // Animate search steps
    const interval = setInterval(() => {
      setSearchStep(prev => {
        if (prev >= searchSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSearching(false);
            setReportAddress(searchQuery);
            setShowReport(true);
          }, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black"
    >
      <AnimatePresence>
        {showReport && (
          <ForensicInsightModal 
            address={reportAddress} 
            onClose={() => setShowReport(false)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className={`pt-24 pb-12 px-6 max-w-7xl mx-auto text-center transition-all duration-700 ${showReport ? 'blur-md scale-95 opacity-50' : ''}`}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic mb-6 leading-tight">
            <span className="glitch-wrapper">
              <span 
                className="glitch-text block" 
                data-text="UNMASKING THE"
              >
                UNMASKING THE
              </span>
            </span>
            <br />
            <span className="glitch-wrapper">
              <span 
                className="glitch-text block" 
                data-text="SOLANA DARK POCKET"
              >
                SOLANA DARK POCKET
              </span>
            </span>
          </h1>
          <p className="text-[#71717A] text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-12">
            Institutional-grade surveillance for hyper-volatile markets. <br />
            Turn information asymmetry into your primary advantage.
          </p>
        </motion.div>

        {/* Forensic Scanner Search Bar */}
        <div className="max-w-3xl mx-auto relative mb-24">
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="ENTER MINT ADDRESS OR DEV WALLET..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050505] border border-[#1A1A1A] px-16 py-6 text-sm font-mono tracking-widest text-white focus:border-white focus:outline-none transition-all duration-500 placeholder:text-[#222]"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#333] group-hover:text-white transition-colors" />
            
            <AnimatePresence>
              {isSearching && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black flex items-center justify-center border border-white z-20"
                >
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-white">
                      {searchSteps[searchStep]}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
          
          {/* Utility Bar */}
          <div className="flex justify-center gap-12 mt-10 text-[9px] font-black tracking-[0.3em] uppercase text-[#333]">
            <button onClick={() => navigate('/dark-stream')} className="flex items-center gap-2 hover:text-zinc-300 transition-all group">
              <Zap className="w-3 h-3 group-hover:fill-current" /> New Liquidity
            </button>
            <div className="flex items-center gap-2 text-zinc-800">
              <Shield className="w-3 h-3" /> Dev Audit
            </div>
            <button onClick={() => navigate('/protocol')} className="flex items-center gap-2 hover:text-zinc-300 transition-all">
              <FileText className="w-3 h-3" /> Whitepaper
            </button>
          </div>
        </div>

        {/* Community Governance Section */}
        <div className="max-w-4xl mx-auto mb-32 border border-white/10 bg-[#050505] p-12 text-left relative overflow-hidden group">
          <div className="scan-line pointer-events-none opacity-10" />
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Gavel className="w-6 h-6 text-white" />
                <h2 className="text-xl font-black italic tracking-tighter uppercase">Community Governance & Forensic Control</h2>
              </div>
              <p className="text-[#555] text-sm leading-relaxed mb-8 uppercase font-medium">
                The Dark Pocket Blacklist is a decentralized database powered by $POCKET holders. Flag malicious actors, protect the ecosystem, and earn reputation within the Dark Network.
              </p>
              <button 
                onClick={() => navigate('/blacklist')}
                className="group flex items-center gap-4 bg-white text-black px-10 py-5 font-black tracking-widest uppercase text-xs hover:bg-zinc-200 transition-all"
              >
                MANAGE BLACKLIST <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="w-48 h-48 border border-white/5 bg-black flex items-center justify-center relative overflow-hidden">
               <img 
                 src="https://i.postimg.cc/B6WmDMkq/Untitled-design-2025-12-30T043407-778.png" 
                 alt="Forensic Hub" 
                 className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
               />
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-mono text-white/40 tracking-[0.5em] -rotate-45 bg-black/40 px-2 py-1">RESTRICTED</span>
               </div>
            </div>
          </div>
        </div>

        {/* Primary CTA & Live Preview Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start text-left mb-32">
          <div className="lg:col-span-2 space-y-8">
            <div className="border-l border-white/20 pl-8">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-6">The Dark Stream</h2>
              <p className="text-[#555] text-sm leading-relaxed mb-8 uppercase font-medium">
                Our high-fidelity aggregator monitors the Solana mempool for institutional patterns. Access the firehose.
              </p>
              <button 
                onClick={() => navigate('/dark-stream')}
                className="group flex items-center gap-4 bg-white text-black px-10 py-5 font-black tracking-widest uppercase text-xs hover:bg-zinc-200 transition-all"
              >
                ACCESS LIVE STREAM <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
             <div 
              onClick={() => navigate('/dark-stream')}
              className="border border-[#1A1A1A] bg-[#050505] p-1 cursor-pointer group relative overflow-hidden"
             >
                <div className="scan-line pointer-events-none" />
                <div className="bg-[#080808] border-b border-[#1A1A1A] px-5 py-3 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-[#444] tracking-loose uppercase">MINIMIZED_STREAM_V1.8</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                    <span className="text-[9px] font-mono text-red-500 font-bold uppercase">LIVE_FEED</span>
                  </div>
                </div>
                <table className="w-full text-left border-collapse font-mono">
                   <tbody className="divide-y divide-[#1A1A1A]">
                    {previewTokens.map((t) => (
                      <tr key={t.mint} className="hover:bg-white/5 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-8 h-8 border border-[#1A1A1A] bg-black">
                              {t.image_uri && <img src={t.image_uri} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 transition-all" />}
                            </div>
                            <span className="text-xs font-bold text-white tracking-widest">{t.symbol}</span>
                            <span className="text-[10px] text-[#222] truncate max-w-[120px]">{t.mint}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                           <div className="inline-flex items-center gap-2">
                              <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">New Asset Detected</span>
                              <div className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                           </div>
                        </td>
                      </tr>
                    ))}
                   </tbody>
                </table>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <div className="bg-black border border-white px-6 py-3 text-[10px] font-black tracking-[0.2em] flex items-center gap-3">
                      <MousePointer2 className="w-4 h-4" /> ENTER DEEP LAYER
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Info Sections */}
      <section className={`py-24 px-6 border-t border-[#1A1A1A] bg-[#020202] transition-all duration-700 ${showReport ? 'blur-md opacity-50' : ''}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-[10px] font-black tracking-[0.4em] text-[#333] uppercase mb-6 flex items-center gap-2">
              <Shield className="w-3 h-3" /> Protocol
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Dark Pocket is a forensic-grade analytical layer for Solana's hyper-volatile markets. We specialize in real-time developer de-anonymization.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black tracking-[0.4em] text-[#333] uppercase mb-6 flex items-center gap-2">
              <Fingerprint className="w-3 h-3" /> Target
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Designed for institutional traders and alpha callers who require absolute transparency before deploying capital in the dark forest.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black tracking-[0.4em] text-[#333] uppercase mb-6 flex items-center gap-2">
              <Zap className="w-3 h-3" /> Mechanics
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Our engine utilizes 'Signature Matching' technology to cross-reference deployments against a database of 500k+ historical launches.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black tracking-[0.4em] text-[#333] uppercase mb-6 flex items-center gap-2">
              <AlertCircle className="w-3 h-3" /> Horizon
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Phase 2: AI-driven predictive sniping. Phase 3: Cross-chain shadow tracking. Phase 4: Institutional API for private desks.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
