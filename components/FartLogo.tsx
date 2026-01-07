import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';

const FartLogo: React.FC = () => {
  const [isFarting, setIsFarting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playFart = useCallback(() => {
    if (!audioRef.current) {
      // Using a generic funny sound effect
      audioRef.current = new Audio('https://www.myinstants.com/media/sounds/fart-meme-sound.mp3');
      audioRef.current.volume = 0.6;
    }
    
    // Reset and play
    if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error("Audio play failed", e));
    }

    setIsFarting(true);
    
    // Reset animation state after a short delay
    setTimeout(() => {
      setIsFarting(false);
    }, 1500);
  }, []);

  return (
    <div className="relative group cursor-pointer z-20" onClick={playFart}>
      
      {/* Tooltip hint */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-brand-cream text-brand-orange px-3 py-1 rounded-full font-bold font-mono text-sm whitespace-nowrap pointer-events-none">
        <Volume2 className="inline-block w-4 h-4 mr-1" />
        Squeeze Me
      </div>

      {/* The Fart Clouds */}
      <AnimatePresence>
        {isFarting && (
          <>
            {/* Cloud 1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 0, x: 0 }}
              animate={{ opacity: [0, 0.8, 0], scale: 1.5, y: -100, x: -50 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-32 h-32 bg-green-500 rounded-full blur-xl -z-10 mix-blend-screen"
            />
            {/* Cloud 2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3, y: 0, x: 0 }}
              animate={{ opacity: [0, 0.7, 0], scale: 1.2, y: -120, x: 40 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, delay: 0.1, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-24 h-24 bg-brand-green rounded-full blur-2xl -z-10"
            />
            {/* Cloud 3 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.2, y: 10 }}
              animate={{ opacity: [0, 0.9, 0], scale: 1.8, y: -80, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.05, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#8cb818] rounded-full blur-xl -z-10"
            />
          </>
        )}
      </AnimatePresence>

      {/* The Logo Image */}
      <motion.img 
        src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg"
        alt="Butthole Logo"
        className="w-48 h-48 md:w-64 md:h-64 rounded-3xl shadow-2xl border-4 border-brand-cream relative z-10"
        whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.9, rotate: [0, -5, 5, 0] }}
        transition={{ type: "spring", stiffness: 300 }}
      />
    </div>
  );
};

export default FartLogo;
