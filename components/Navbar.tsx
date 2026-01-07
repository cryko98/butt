import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-brand-orange/90 backdrop-blur-md border-b-2 border-brand-cream/20"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <img src="https://pbs.twimg.com/profile_images/2008817315454828545/KRRwxMEY_400x400.jpg" alt="Logo" className="w-8 h-8 rounded-md" />
            <span className="font-slab text-xl text-brand-cream hidden md:block">BUTTHOLE</span>
        </div>

        <div className="flex gap-4 md:gap-8 font-zilla font-bold text-lg items-center">
            <button onClick={() => scrollToSection('story')} className="hover:text-white hover:underline decoration-wavy underline-offset-4 transition-all">Story</button>
            <button onClick={() => scrollToSection('agent')} className="hover:text-white hover:underline decoration-wavy underline-offset-4 transition-all">Agent</button>
            <button onClick={() => scrollToSection('howtobuy')} className="hover:text-white hover:underline decoration-wavy underline-offset-4 transition-all">How to Buy</button>
            <button onClick={() => scrollToSection('chart')} className="hover:text-white hover:underline decoration-wavy underline-offset-4 transition-all">Chart</button>
            <a href="https://pump.fun/GbuqNYmJGfNTbCM8D4GusJ8qzckZoFroGSXT5yLSpump" target="_blank" rel="noopener noreferrer" className="bg-brand-cream text-brand-orange px-4 py-1 rounded-full hover:scale-110 transition-transform">
                Buy Now
            </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;