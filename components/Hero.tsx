import React from 'react';
import { motion } from 'framer-motion';
import FartLogo from './FartLogo';
import CopyAddress from './CopyAddress';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-20%] w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-black/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="text-center z-10 flex flex-col items-center max-w-4xl mx-auto">
        
        <FartLogo />

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-slab text-6xl md:text-9xl mt-8 mb-4 text-brand-cream drop-shadow-md tracking-wider"
        >
          BUTTHOLE
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-mono text-xl md:text-2xl text-brand-cream/90 mb-8 max-w-2xl"
        >
          $butthole is to Claude what $fartcoin is to Truth Terminal.
        </motion.p>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
            <motion.a 
                href="https://x.com/buttholeonsol" 
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, rotate: -3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-3 rounded-xl font-zilla font-bold text-xl border-2 border-transparent hover:border-brand-cream transition-colors flex items-center gap-2"
            >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                X (Twitter)
            </motion.a>
            
            <motion.a 
                href="https://pump.fun/GbuqNYmJGfNTbCM8D4GusJ8qzckZoFroGSXT5yLSpump" 
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-cream text-brand-orange px-8 py-3 rounded-xl font-zilla font-bold text-xl border-2 border-brand-cream hover:bg-transparent hover:text-brand-cream transition-colors"
            >
                Buy on Pump.fun
            </motion.a>
        </div>

        <CopyAddress />
      </div>
    </section>
  );
};

export default Hero;
