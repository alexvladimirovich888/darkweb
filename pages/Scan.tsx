
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// Fix: Import fetchPulseData instead of fetchTokens as it's the correct exported function
import { fetchPulseData, performAudit } from '../services/tokenService';
import { Token, SecurityAudit } from '../types';
import { ArrowLeft, ExternalLink, Twitter, Globe, ShieldCheck, AlertCircle } from 'lucide-react';

const Scan: React.FC = () => {
  const { mint } = useParams<{ mint: string }>();
  const [token, setToken] = useState<Token | null>(null);
  const [audit, setAudit] = useState<SecurityAudit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      setLoading(true);
      // Fix: Call fetchPulseData which is defined in tokenService.ts
      const tokens = await fetchPulseData();
      const found = tokens.find(t => t.mint === mint);
      if (found) {
        setToken(found);
        setAudit(performAudit(found));
      }
      setLoading(false);
    };
    loadToken();
  }, [mint]);

  if (loading) return <div className="p-12 text-center text-[#71717A] animate-pulse">INITIATING_DEEP_SCAN...</div>;
  if (!token || !audit) return <div className="p-12 text-center text-red-500">ASSET_NOT_FOUND</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Link to="/" className="text-[#71717A] hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold tracking-tight uppercase">ANALYTICS: {token.symbol}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Chart */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-[#1A1A1A] bg-[#0A0A0A] aspect-video w-full overflow-hidden relative group">
            <iframe 
              src={`https://dexscreener.com/solana/${token.mint}?embed=1&theme=dark&trades=0&info=0`}
              className="w-full h-full border-none opacity-80 group-hover:opacity-100 transition-opacity"
              title="DexScreener Chart"
            />
            <div className="absolute top-4 left-4 bg-black/80 border border-[#1A1A1A] p-2 text-[10px] font-mono pointer-events-none">
              REAL-TIME_DATA_STREAM
            </div>
          </div>

          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
            <h3 className="text-xs font-bold text-[#71717A] mb-4 tracking-widest uppercase">Asset Metadata</h3>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-[10px] text-[#71717A] block mb-1">MINT_ADDRESS</label>
                <code className="text-sm font-mono break-all text-white">{token.mint}</code>
              </div>
              <div>
                <label className="text-[10px] text-[#71717A] block mb-1">MARKET_CAP</label>
                <div className="text-xl font-bold font-mono">${token.market_cap.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Analysis Panel */}
        <div className="space-y-6">
          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-[#71717A] tracking-widest uppercase">Dark Analysis</h3>
              <div className={`px-2 py-0.5 text-[9px] font-bold ${audit.riskScore < 30 ? 'bg-white text-black' : 'bg-[#1A1A1A] text-[#71717A]'}`}>
                {audit.status}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-[#71717A]">DEVELOPER REPUTATION</span>
                  <span className="font-mono">{audit.developerReputation}%</span>
                </div>
                <div className="w-full bg-[#1A1A1A] h-1.5">
                  <div className="bg-white h-full" style={{ width: `${audit.developerReputation}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-[#71717A]">SOCIAL INTEGRITY SCORE</span>
                  <span className="font-mono">{audit.socialIntegrity}%</span>
                </div>
                <div className="w-full bg-[#1A1A1A] h-1.5">
                  <div className="bg-white h-full" style={{ width: `${audit.socialIntegrity}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-2">
                  <span className="text-[#71717A]">LIQUIDITY BONDING PROGRESS</span>
                  <span className="font-mono">{audit.liquidityProgress}%</span>
                </div>
                <div className="w-full bg-[#1A1A1A] h-1.5">
                  <div className="bg-white h-full" style={{ width: `${audit.liquidityProgress}%` }} />
                </div>
              </div>

              <div className="pt-4 border-t border-[#1A1A1A] grid grid-cols-2 gap-4">
                <a href={token.twitter || '#'} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-[#1A1A1A] p-2 text-xs font-bold text-[#71717A] hover:border-white hover:text-white transition-all">
                  <Twitter className="w-3 h-3" /> TWITTER
                </a>
                <a href={token.website || '#'} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border border-[#1A1A1A] p-2 text-xs font-bold text-[#71717A] hover:border-white hover:text-white transition-all">
                  <Globe className="w-3 h-3" /> WEBSITE
                </a>
              </div>
            </div>
          </div>

          <div className="border border-[#1A1A1A] bg-[#0A0A0A] p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2">
                <ShieldCheck className={`w-12 h-12 opacity-5 ${audit.riskScore < 30 ? 'text-white' : 'text-gray-500'}`} />
             </div>
             <h3 className="text-xs font-bold text-[#71717A] mb-4 tracking-widest uppercase">Verdict</h3>
             <p className="text-sm leading-relaxed text-[#71717A]">
                {audit.riskScore < 30 
                  ? "Signature matching institutional patterns. High social integrity detected. Safe for exposure."
                  : "Anomalous metadata signature. No verifiable institutional links found. Exercise extreme caution."}
             </p>
             <button className="w-full mt-6 bg-white text-black text-xs font-bold py-3 hover:bg-gray-200">
                EXECUTE ORDER
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;
