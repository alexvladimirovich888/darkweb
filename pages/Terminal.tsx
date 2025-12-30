
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPulseData, performAudit, PulseToken } from '../services/tokenService';
import DeepAnalysisModal from '../components/DeepAnalysisModal';
import { Zap, Wifi, Layers, MousePointer2, Globe, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';

const Terminal: React.FC = () => {
  const navigate = useNavigate();
  const { wallet, toggleModal } = useWallet();
  const [tokens, setTokens] = useState<PulseToken[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [selectedToken, setSelectedToken] = useState<PulseToken | null>(null);
  
  const pollTimer = useRef<number | null>(null);
  const prevMints = useRef<Set<string>>(new Set());

  const loadPulse = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    setIsRefreshing(true);
    
    try {
      const data = await fetchPulseData();
      if (data.length > 0) {
        const newMints = new Set(data.map(t => t.mint));
        const updatedData = data.map(t => ({
          ...t,
          isFlash: prevMints.current.size > 0 && !prevMints.current.has(t.mint)
        }));
        
        setTokens(updatedData);
        prevMints.current = newMints;
        setError(false);
      } else if (tokens.length === 0) {
        setError(true);
      }
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (e) {
      console.error("Pulse sync interrupted:", e);
      if (tokens.length === 0) setError(true);
    } finally {
      setLoading(false);
      setTimeout(() => setIsRefreshing(false), 300);
    }
  };

  useEffect(() => {
    loadPulse(true);
    pollTimer.current = window.setInterval(() => {
      loadPulse(false);
    }, 4000); 

    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, []);

  const handleFlag = (e: React.MouseEvent, mint: string) => {
    e.stopPropagation();
    if (!wallet.connected) {
      toggleModal();
      return;
    }
    navigate(`/blacklist?address=${mint}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="p-2 md:p-6 max-w-[1800px] mx-auto min-h-screen"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4 px-2">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-white flex items-center justify-center text-black">
               <Zap className="w-5 h-5 fill-current" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">DARK STREAM</h1>
            <div className={`px-2 py-0.5 rounded-sm border ${isRefreshing ? 'bg-white text-black border-white' : 'bg-black text-[#333] border-[#1A1A1A]'} transition-all duration-300`}>
              <span className="text-[9px] font-bold font-mono tracking-widest uppercase">
                {isRefreshing ? 'STREAMING_ALL' : 'SURVEILLANCE'}
              </span>
            </div>
          </div>
          <p className="text-[#333] text-[10px] font-mono uppercase tracking-[0.3em]">
            Real-Time Aggregator // High Velocity Stream // Sync: {lastUpdate || '---'}
          </p>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <div className="text-[9px] text-[#222] font-mono uppercase tracking-widest">Global Heat</div>
            <div className="text-xs font-bold text-green-500 font-mono">EXTREME</div>
          </div>
          <div className="flex items-center gap-2 bg-[#0A0A0A] border border-[#1A1A1A] px-4 py-2">
            <Wifi className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-[#444]">
              Node_Active
            </span>
          </div>
        </div>
      </div>

      <div className="border border-[#1A1A1A] bg-[#050505] overflow-x-auto relative min-h-[600px]">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[#1A1A1A] text-[9px] text-[#333] font-bold tracking-[0.2em] uppercase bg-[#080808] sticky top-0 z-20">
              <th className="px-4 py-4">Asset Info</th>
              <th className="px-4 py-4 text-right">Safety Score</th>
              <th className="px-4 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A1A]">
            {loading && tokens.length === 0 ? (
              Array.from({ length: 20 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td colSpan={3} className="px-4 py-5"><div className="h-4 bg-[#0A0A0A] w-full" /></td>
                </tr>
              ))
            ) : (
              tokens.map((token) => {
                const audit = performAudit(token);
                const isFlash = (token as any).isFlash;
                const isVeryNew = (Date.now() - token.created_timestamp) < 30000;
                
                return (
                  <tr 
                    // @ts-ignore
                    key={token.mint} 
                    onClick={() => setSelectedToken(token)}
                    className={`group cursor-pointer transition-all duration-500 border-l-2 ${
                      isFlash ? 'border-white bg-[#ffffff10]' : isVeryNew ? 'border-white/40 bg-[#ffffff03]' : 'border-transparent'
                    } hover:bg-[#0A0A0A]`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          {token.image_uri ? (
                            <img 
                              src={token.image_uri} 
                              alt="" 
                              className="w-10 h-10 rounded-none border border-[#1A1A1A] object-cover bg-black grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100" 
                              onError={(e) => { (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/identicon/svg?seed=${token.mint}` }}
                            />
                          ) : (
                            <div className="w-10 h-10 bg-[#080808] border border-[#1A1A1A] flex items-center justify-center text-[8px] text-[#222]">NO_IMG</div>
                          )}
                          {isVeryNew && <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-base tracking-tighter text-white uppercase italic">
                              {token.symbol || '---'}
                            </span>
                            <span className="text-[10px] text-[#444] font-medium truncate max-w-[250px]">{token.name}</span>
                            {isVeryNew && <span className="text-[8px] bg-white text-black px-1.5 py-0.5 font-black tracking-widest">DETECTED</span>}
                          </div>
                          <div className="text-[9px] text-[#222] font-mono truncate max-w-[400px]">
                            {token.mint}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-3">
                        <span className={`text-[10px] font-mono font-bold ${audit.riskScore < 30 ? 'text-white' : 'text-[#333]'}`}>
                          {100 - Math.round(audit.riskScore)}%
                        </span>
                        <div className="w-16 bg-[#111] h-1 relative overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${audit.riskScore < 30 ? 'bg-white' : audit.riskScore < 60 ? 'bg-[#777]' : 'bg-[#222]'}`}
                            style={{ width: `${100 - audit.riskScore}%` }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                       <div className="flex items-center justify-end gap-3">
                          <button 
                            title="Flag Developer"
                            onClick={(e) => handleFlag(e, token.mint)}
                            className="p-2 border border-[#1A1A1A] text-[#111] hover:text-red-500 hover:border-red-500 transition-all"
                          >
                            <ShieldAlert className="w-3 h-3" />
                          </button>
                          <div className="p-2 border border-[#1A1A1A] text-[#111] group-hover:text-white group-hover:border-white transition-all">
                             <MousePointer2 className="w-3 h-3" />
                          </div>
                       </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-[#222] font-mono tracking-[0.2em] uppercase px-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5"><Layers className="w-3 h-3" /> BUFFER: {tokens.length}/150</span>
          <span className="flex items-center gap-1.5"><Globe className="w-3 h-3" /> UPLINK: PROXY_AGNOSTIC</span>
          <span className="flex items-center gap-1.5 text-white/10 uppercase tracking-widest">Dark Feed Active</span>
        </div>
        <div className="text-[#111]">
          DARK POCKET TERMINAL v1.8 // STREAMING_BETA
        </div>
      </div>

      <DeepAnalysisModal 
        token={selectedToken} 
        onClose={() => setSelectedToken(null)} 
      />
    </motion.div>
  );
};

export default Terminal;
