
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import HowToBuy from './components/HowToBuy';
import Chart from './components/Chart';

function App() {
  return (
    <div className="min-h-screen text-brand-dark font-sans selection:bg-brand-pink selection:text-white bg-white">
      <Navbar />
      
      <main className="relative">
        <Hero />
        
        <div className="relative z-10">
            <Story />
            <HowToBuy />
            <Chart />
        </div>
        
        {/* Floating background memes */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
            <div className="absolute top-[10%] left-[5%] animate-float text-6xl">🕶️</div>
            <div className="absolute top-[40%] right-[10%] animate-float text-7xl delay-700">💎</div>
            <div className="absolute bottom-[20%] left-[15%] animate-float text-8xl delay-1000">🔥</div>
            <div className="absolute top-[70%] right-[5%] animate-float text-6xl delay-300">💪</div>
        </div>
      </main>

      <footer className="py-12 bg-brand-dark text-center font-mono text-sm text-white/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-brand-pink/10 to-brand-green/10 animate-pulse" />
        <div className="container mx-auto px-4 relative z-10">
            <div className="relative inline-block mb-6">
                 <img src="https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/neww/20260216_073229.jpg" className="w-12 h-12 rounded-full mx-auto ring-4 ring-brand-blue" alt="Footer Logo" />
                 <div className="absolute -inset-2 bg-gradient-to-r from-brand-blue to-brand-pink rounded-full blur opacity-50 animate-spin-slow" />
            </div>
            <p className="mb-2 font-bold text-white">$MOG is the culture. The attitude. The peak of Solana.</p>
            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-brand-blue via-brand-pink to-brand-green mx-auto rounded-full" />
            <p className="mt-6 font-slab text-xl tracking-widest rainbow-text">MOGGED SINCE 2026</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
