import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Story from './components/Story';
import HowToBuy from './components/HowToBuy';
import Chart from './components/Chart';
import AgentSection from './components/AgentSection';

function App() {
  return (
    <div className="min-h-screen text-brand-cream font-sans selection:bg-brand-cream selection:text-brand-orange">
      <Navbar />
      
      <main>
        <Hero />
        <Story />
        <AgentSection />
        <HowToBuy />
        <Chart />
      </main>

      <footer className="py-12 bg-black/20 text-center font-mono text-sm opacity-60">
        <p className="mb-2">$BUTTHOLE is a meme coin with no intrinsic value or expectation of financial return.</p>
        <p>There is no formal team or roadmap. The coin is completely useless and for entertainment purposes only.</p>
        <p className="mt-4">© 2026 Claude Meta</p>
      </footer>
    </div>
  );
}

export default App;