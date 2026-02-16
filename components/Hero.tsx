
import React from 'react';
import { motion } from 'framer-motion';
import MogLogo from './MogLogo';
import CopyAddress from './CopyAddress';
import { Trophy, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const XLogo = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
  );

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-8 px-4 relative overflow-hidden bg-white">
      
      {/* Dynamic Background Blurs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-blue/30 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1], rotate: [0, -90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-brand-pink/20 rounded-full blur-[180px] pointer-events-none"
      />

      <div className="text-center z-10 flex flex-col items-center max-w-5xl mx-auto w-full">
        
        <div className="relative">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 bg-gradient-to-r from-brand-blue via-brand-pink to-brand-green rounded-full opacity-20 blur-xl"
            />
            <MogLogo />
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 mb-4 bg-brand-yellow/20 px-6 py-2 rounded-full border-2 border-brand-yellow flex items-center gap-3"
        >
            <Trophy className="text-brand-yellow w-5 h-5" />
            <span className="font-slab text-brand-dark tracking-widest text-sm md:text-base">MOGGING EVERYONE ELSE</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-slab text-6xl sm:text-8xl md:text-[10rem] leading-[0.85] mb-4 tracking-tighter rainbow-text filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
        >
          MOG COIN
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="font-zilla text-xl sm:text-3xl md:text-4xl text-brand-dark/80 mb-8 max-w-3xl px-2 font-bold leading-tight"
        >
          The official MOG coin on Solana. <br className="hidden md:block" /> 
          <span className="bg-brand-pink text-white px-2 py-1 -rotate-1 inline-block mt-2">WE ARE JUST SUPERIOR.</span>
        </motion.p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center mb-8 w-full px-4">
            <motion.a 
                href="https://pump.fun/4MdtwK7ezBemvAWsW32HuvVD7o7j89Y3poYwJpWopump" 
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-blue text-white px-8 py-4 rounded-[2rem] font-slab text-xl md:text-2xl shadow-[0_15px_30px_rgba(46,144,250,0.4)] hover:shadow-brand-blue/60 transition-all flex items-center justify-center gap-3"
            >
                <Zap fill="currentColor" /> BUY $MOG
            </motion.a>

            <motion.a 
                href="https://x.com/i/communities/2023241965891092502" 
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-dark text-white px-8 py-4 rounded-[2rem] font-slab text-xl md:text-2xl border-2 border-transparent hover:border-brand-pink transition-all flex items-center justify-center gap-3"
            >
                <XLogo /> JOIN THE CULT
            </motion.a>
        </div>

        <div className="w-full max-w-xl">
            <CopyAddress />
        </div>
      </div>
    </section>
  );
};

export default Hero;
