
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { Wallet, ShieldCheck, ShieldAlert } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { wallet, toggleModal } = useWallet();

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'DARK STREAM', path: '/dark-stream' },
    { name: 'BLACKLIST', path: '/blacklist' },
    { name: 'DOCS', path: '/protocol' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-[#1A1A1A] px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <img 
          src="https://i.postimg.cc/pd36C2hv/Untitled-design-2025-12-30T043418-706.png" 
          alt="Dark Pocket Logo" 
          className="w-8 h-8 object-contain transition-transform group-hover:scale-110"
        />
        <span className="font-bold tracking-tighter text-lg italic">DARK POCKET</span>
      </Link>
      
      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-[10px] font-black tracking-[0.2em] transition-colors ${
              location.pathname === link.path ? 'text-white border-b border-white pb-1' : 'text-[#333] hover:text-white'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {wallet.connected ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-mono text-[#444] tracking-wider">
                {wallet.publicKey?.slice(0, 4)}...{wallet.publicKey?.slice(-4)}
              </span>
              <div className="flex items-center gap-1">
                {wallet.isVerified ? (
                  <span className="text-[8px] font-black text-white bg-zinc-800 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                    <ShieldCheck className="w-2 h-2" /> VERIFIED HOLDER
                  </span>
                ) : (
                  <span className="text-[8px] font-black text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded-sm flex items-center gap-1">
                    <ShieldAlert className="w-2 h-2" /> SPECTATOR
                  </span>
                )}
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        ) : (
          <button 
            onClick={toggleModal}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 text-[10px] font-black tracking-widest hover:bg-zinc-200 transition-all uppercase"
          >
            <Wallet className="w-3 h-3" /> CONNECT WALLET
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
