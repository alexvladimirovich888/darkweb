
import React from 'react';

const Ticker: React.FC = () => {
  return (
    <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] h-8 flex items-center overflow-hidden whitespace-nowrap text-[10px] text-[#71717A] font-mono">
      <div className="animate-marquee flex gap-12 items-center">
        <span className="flex gap-2">SOL/USD: <span className="text-white">$142.45</span> <span className="text-green-500">+2.4%</span></span>
        <span className="flex gap-2">ETH/USD: <span className="text-white">$2,412.10</span> <span className="text-red-500">-0.8%</span></span>
        <span className="flex gap-2">GLOBAL RUG-PULL MITIGATION: <span className="text-white">14,204</span></span>
        <span className="flex gap-2">INSTITUTIONAL TVL: <span className="text-white">$1.2B</span></span>
        <span className="flex gap-2">SOL/USD: <span className="text-white">$142.45</span></span>
        <span className="flex gap-2">ETH/USD: <span className="text-white">$2,412.10</span></span>
        <span className="flex gap-2">GLOBAL RUG-PULL MITIGATION: <span className="text-white">14,204</span></span>
        <span className="flex gap-2">INSTITUTIONAL TVL: <span className="text-white">$1.2B</span></span>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: flex;
          width: max-content;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
