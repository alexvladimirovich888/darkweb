
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Terminal from './pages/Terminal';
import Scan from './pages/Scan';
import Protocol from './pages/Protocol';
import Access from './pages/Access';
import Blacklist from './pages/Blacklist';
import ConnectWalletModal from './components/ConnectWalletModal';
import { AnimatePresence } from 'framer-motion';
import { WalletProvider, useWallet } from './hooks/useWallet';

const AppContent: React.FC = () => {
  const { isModalOpen, setIsModalOpen, connect } = useWallet();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col relative overflow-hidden">
      {/* GLOBAL INTERFERENCE BACKGROUND */}
      <div className="interference-overlay">
        <div className="noise" />
        <div className="flicker" />
        <div className="vignette" />
        <div className="scanline-effect" />
      </div>

      <Navbar />
      <main className="flex-1 z-10">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dark-stream" element={<Terminal />} />
            <Route path="/scan/:mint" element={<Scan />} />
            <Route path="/protocol" element={<Protocol />} />
            <Route path="/access" element={<Access />} />
            <Route path="/blacklist" element={<Blacklist />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <footer className="border-t border-[#1A1A1A] p-6 text-center text-[10px] text-[#222] font-mono tracking-widest mt-auto z-10">
        SYSTEM_STATUS: NOMINAL // VERSION_HASH: 0xDARK_POCKET_BETA // SURVEILLANCE: ACTIVE
      </footer>

      <ConnectWalletModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={connect}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <WalletProvider>
      <Router>
        <AppContent />
      </Router>
    </WalletProvider>
  );
};

export default App;
