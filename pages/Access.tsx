
import React, { useState } from 'react';
import { Shield, Loader2, CheckCircle2 } from 'lucide-react';

const Access: React.FC = () => {
  const [wallet, setWallet] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet) return;
    
    setStatus('verifying');
    // Simulate chain verification
    setTimeout(() => {
      setStatus('success');
    }, 3000);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-[#1A1A1A] bg-[#0A0A0A] p-12 text-center">
        {status === 'idle' && (
          <>
            <div className="flex justify-center mb-8">
              <Shield className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Request Institutional Access</h1>
            <p className="text-[#71717A] text-sm mb-8 font-light">
              Submit your Solana Public Key to request inclusion in the Dark Pocket whitelist. 
              Applications are reviewed manually for liquidity history.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="0x... or Solana Address"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full bg-black border border-[#1A1A1A] px-4 py-3 text-sm font-mono text-white focus:border-white focus:outline-none transition-colors"
                required
              />
              <button 
                type="submit"
                className="w-full bg-white text-black font-bold py-3 text-xs tracking-widest hover:bg-gray-200 transition-colors uppercase"
              >
                REQUEST WHITELIST
              </button>
            </form>
          </>
        )}

        {status === 'verifying' && (
          <div className="py-12 flex flex-col items-center">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-sm font-mono text-white">Verifying Signature on Solana Mainnet...</p>
            <p className="text-[10px] text-[#71717A] mt-2">Checking address: {wallet.substring(0, 10)}...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="py-12 flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Application Pending Review</h2>
            <p className="text-[#71717A] text-sm">
              Your signature has been successfully logged. Our compliance team will reach out via the associated metadata.
            </p>
            <button 
                onClick={() => setStatus('idle')}
                className="mt-8 text-xs font-bold text-white border-b border-white hover:text-[#71717A] hover:border-[#71717A]"
            >
                SUBMIT ANOTHER
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Access;
