
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const MogLogo: React.FC = () => {
  const [isMogging, setIsMogging] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMog = useCallback(() => {
    if (!audioRef.current) {
      // Shush / Mogging sound effect
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
      
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-blue text-white px-3 py-1 rounded-full font-bold font-mono text-sm whitespace-nowrap pointer-events-none">
        <Sparkles className="inline-block w-4 h-4 mr-1 animate-pulse" />
        MOG ME
      </div>

      <AnimatePresence>
        {isMogging && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: 2 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-brand-yellow rounded-full -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: 2.5 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-brand-blue rounded-full -z-10"
            />
          </>
        )}
      </AnimatePresence>

      <motion.img 
        src="https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/neww/20260216_073229.jpg"
        alt="Mog Logo"
        className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-2xl border-8 border-brand-blue relative z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
    </div>
  );
};

export default MogLogo;
