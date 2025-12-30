
import React from 'react';

const Protocol: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto py-20">
      <div className="mb-12 border-l-4 border-white pl-8">
        <h1 className="text-5xl font-bold tracking-tighter mb-4">Dark Pocket Protocol: Liquidity Integrity in the Solana Ecosystem</h1>
        <p className="text-xl text-[#71717A] font-light">Version 1.0.4 | Institutional Grade Analytics</p>
      </div>

      <div className="space-y-12 text-[#A1A1AA] leading-relaxed">
        <section>
          <h2 className="text-white text-xs font-bold tracking-widest uppercase mb-4">I. ABSTRACT</h2>
          <p>
            Dark Pocket is a forensic-grade analytical terminal designed for sovereign wealth funds, institutional desks, and high-net-worth liquidity providers. We focus on Signature Reputation and Metadata Validation to identify institutional-grade assets before market saturation.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xs font-bold tracking-widest uppercase mb-4">II. THE PROBLEM</h2>
          <p>
            The Solana ecosystem, while performant, suffers from high-frequency liquidity evaporation (Rug-Pulls) and metadata obfuscation. Retail participants often lack the sophisticated tooling required to differentiate between ephemeral memes and genuine institutional-ready assets.
          </p>
        </section>

        <section>
          <h2 className="text-white text-xs font-bold tracking-widest uppercase mb-4">III. DARK POOL ARCHITECTURE</h2>
          <p>
            Our proprietary "Dark Pool" technology monitors cross-chain wallet migrations and social sentiment integrity. By analyzing the ASCII character sum of deployment signatures, Dark Pocket generates a real-time Risk Score that predicts asset longevity with a 92% confidence interval.
          </p>
        </section>

        <section className="p-8 border border-white/10 bg-white/[0.02]">
          <h2 className="text-white text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
            IV. GOVERNANCE & $POCKET UTILITY
          </h2>
          <p className="mb-6">
            The Dark Database (Blacklist) is governed by the $POCKET community. Holders of $POCKET tokens are empowered to protect the ecosystem by flagging malicious signatures. This decentralized forensic layer ensures that bad actors are de-anonymized in real-time.
          </p>
          <ul className="space-y-4 text-xs font-mono">
            <li className="flex gap-3">
              <span className="text-white">[ ACCESS_GATE ]</span>
              <span>100k $POCKET required for Blacklist submissions.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white">[ FORENSIC_BONDING ]</span>
              <span>Submissions generate reputation points for holders.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white">[ SURVEILLANCE_FEE ]</span>
              <span>Institutional API access is priced in $POCKET.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-xs font-bold tracking-widest uppercase mb-4">V. VERIFICATION STANDARDS</h2>
          <p>
            Assets attaining the "INSTITUTIONAL GRADE" status must meet stringent requirements including verifiable social presence, functional web endpoints, and specific bonding curve progression milestones.
          </p>
        </section>

        <div className="pt-12 border-t border-[#1A1A1A] flex justify-between items-center">
            <div className="text-[10px] font-mono text-[#71717A]">
                ENCRYPTED_SIGNATURE: 0x82f...a1c
            </div>
            <img 
              src="https://i.postimg.cc/pd36C2hv/Untitled-design-2025-12-30T043418-706.png" 
              alt="Dark Pocket Logo" 
              className="w-8 h-8 object-contain opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
            />
        </div>
      </div>
    </div>
  );
};

export default Protocol;
