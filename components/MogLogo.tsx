
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

const MogLogo: React.FC = () => {
  const [isMogging, setIsMogging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMog = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('https://www.myinstants.com/media/sounds/shhh.mp3');
      audioRef.current.volume = 0.5;
    }
    
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }

    setIsMogging(true);
    setTimeout(() => {
      setIsMogging(false);
    }, 2000);
  }, []);

  return (
    <div className="relative group cursor-pointer z-20" onClick={startMog}>
      
      {/* Mog Badge */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-brand-pink text-white px-5 py-2 rounded-2xl font-slab text-lg whitespace-nowrap shadow-xl border-2 border-white rotate-3 group-hover:rotate-0 transition-transform"
      >
        <Zap className="inline-block w-5 h-5 mr-2 fill-current" />
        PEAK PHYSIQUE
      </motion.div>

      <AnimatePresence>
        {isMogging && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: 3 }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-brand-blue via-brand-pink to-brand-green rounded-full blur-3xl -z-10"
            />
            <motion.div
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: [0, 1, 0], rotate: 180 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
               <Sparkles className="text-brand-yellow w-64 h-64" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="relative">
          {/* Animated rings */}
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-blue via-brand-pink to-brand-green rounded-full animate-spin-slow opacity-30" />
          <div className="absolute -inset-2 bg-gradient-to-r from-brand-pink via-brand-yellow to-brand-blue rounded-full animate-spin-slow delay-500 opacity-40" />

          <motion.img 
            src="https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/neww/20260216_073229.jpg"
            alt="Mog Logo"
            className="w-56 h-56 md:w-80 md:h-80 rounded-full shadow-[0_0_80px_rgba(46,144,250,0.5)] border-[12px] border-white relative z-10"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1, rotate: 2 }}
          />
      </div>
    </div>
  );
};

export default MogLogo;
